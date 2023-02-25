import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  HelperText,
  withTheme,
  RadioButton,
  Checkbox,
  Card,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import Iconn from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ServiceStyles from '../../../assets/styles/Service/ServiceStyles';
import colors from '../../../assets/colors/colors';
import ChannelsStyle from '../../../assets/styles/Service/ChannelsStyle';
import PhoneInput from 'react-native-phone-number-input';
import Modal from 'react-native-modal';
import DashboardNavbar from '../../../components/Navbars/DashboardNavbar';
import {Dropdown} from 'react-native-material-dropdown-v2';
import TestMethod from '../../../assets/styles/TestMethodStyle/TestMethod';
import RNFetchBlob from 'react-native-fetch-blob';
// import CheckBox from '@react-native-community/checkbox';
import AppContext from '../../../context/AppContext';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ExpectedIOCards from '../../../components/More/Scripts/ScriptListScreen/ExpectedIOCards';
import ContainerStyle from '../../../assets/styles/ContainerStyle';

const EditScript = ({navigation}) => {
  const dataForEditing =
    navigation.state.params == null ? null : navigation.state.params.scriptData;
  const {baseUrl, token} = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [channelList, setChannelList] = useState([]);
  const [channelId, setChannelId] = useState();
  const [scriptName, setScriptName] = useState('');
  const [nluSupport, setNluSupport] = useState('');
  const [dtmfSupport, setDtmfSupport] = useState(false);
  const [nluSupportChecked, setNluSupportChecked] = useState(false);
  const [dtmfSupportChecked, setDtmfSupportChecked] = useState(false);
  const [expectedInput, setExpectedInput] = useState('');
  const [expectedResponse, setExpectedResponse] = useState('');
  const [singleScriptData, setSingleScriptData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [scriptId, setScriptId] = useState('');
  const [expectedInputOutputCards, setExpectedInputOutputCards] = useState([
    '1',
  ]);
  const [messageDataList, setMessageDataList] = useState([]);
  const [refreshCards, setRefereshCards] = useState([]);
  let counterCard = 0;
  const refContainer = useRef(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const getAllChannelLists = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/channel/list`, {Authorization: `${token}`,tokenType:'aws'})
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.length > 0) {
          let allItems = [];
          resp.map((item) =>
            allItems.push({label: `${item.name}`, value: `${item.id}`}),
          );
          setChannelList(allItems);
        } else {
          setChannelList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSingleScriptDataForEditing = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/script/get?scriptId=${dataForEditing.id}`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setSingleScriptData(resp);
        setChannelId(resp.channelId);
        setScriptId(resp.id);
        setNluSupport(resp.voiceNLUSupport);
        setDtmfSupport(resp.voiceDTMFSupport);
        setScriptName(resp.scriptName);
        setMessageDataList(resp.messageDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createScript = (dataToSend) => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        `${baseUrl}/script/addUpdate`,
        {Authorization: `${token}`,tokenType:'aws', 'Content-Type': 'application/json'},
        dataToSend,
      )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        console.log('script created');
        setIsModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFromExpectedInputArray = (index) => {
    console.log(index);
    if (index > -1) {
      messageDataList.splice(index, 1);
    }
    setRefereshCards(refreshCards ? false : true);
  };

  useEffect(() => {
    getSingleScriptDataForEditing();
    getAllChannelLists();
  }, []);

  return (
    <SafeAreaView style={ContainerStyle.safeAreaContainer}>
      {Platform.OS == 'ios' ? null : (
        <StatusBar
          hidden={false}
          backgroundColor={colors.purple}
          barStyle="light-content"
        />
      )}
      <View style={ServiceStyles.container}>
        <DashboardNavbar title=" Edit Script" />
        <ScrollView>
          <View style={{marginTop: 25}}>
            <Text style={ServiceStyles.titleInputField}>Script Name</Text>
            <TextInput
              placeholder="Script Name"
              mode="outlined"
              style={ServiceStyles.serviceNameInputField}
              value={scriptName}
              onChangeText={(text) => setScriptName(text)}
            />
          </View>
          <Text style={[ServiceStyles.titleInputField, {marginTop: 15}]}>
            Channel Selection
          </Text>
          <View style={{position: 'relative'}}>
            <Dropdown
              rippleInsets={{top: 5, bottom: -8}}
              rippleOpacity={0.1}
              rippleCentered={true}
              underlineColor="transparent"
              placeholder={navigation.state.params == null
                ? null
                : dataForEditing.channelName}
              //   placeholderTextStyle= {{fontFamily: 'Poppins-Regular'}}
              pickerStyle={{paddingHorizontal: wp('3%')}}
              onChangeText={(item) => {
                console.log(item);
                setChannelId(item);
              }}
              itemTextStyle={{fontFamily: 'Poppins-Regular'}}
              labelTextStyle={{fontFamily: 'Poppins-Regular'}}
              style={[ServiceStyles.serviceNameInputFieldForDropDown]}
              baseColor="#000"
              data={channelList}
            />
            <Iconn
              style={{position: 'absolute', right: hp('4'), top: 20}}
              name="caretdown"
              size={16}
              color={colors.purple}
            />
          </View>

          {nluSupport ? (
            <TouchableOpacity
              onPress={() => {
                setNluSupportChecked(false);
                setNluSupport(false);
              }}
              style={{
                flexDirection: 'row',
                padding: wp('3%'),
                backgroundColor: colors.purple,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: wp('3%'),
                marginTop: wp('5%'),
                borderRadius: wp('1%'),
              }}>
              <Text
                style={{fontFamily: 'Poppins-Regular', color: colors.white}}>
                NLU Support
              </Text>
              <Entypo name="check" size={22} color={colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setNluSupportChecked(true);
                setNluSupport(true);
              }}
              style={{
                flexDirection: 'row',
                padding: wp('3%'),
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.white1,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: wp('3%'),
                marginTop: wp('5%'),
                borderRadius: wp('1%'),
                height: hp('7%'),
              }}>
              <Text style={{fontFamily: 'Poppins-Regular', color: colors.grey}}>
                NLU Support
              </Text>
              {/* <Entypo name="check" size={22} color={colors.white} /> */}
            </TouchableOpacity>
          )}

          {dtmfSupport ? (
            <TouchableOpacity
              onPress={() => {
                setDtmfSupportChecked(false);
                setDtmfSupport(dtmfSupport?false:true);
              }}
              style={{
                flexDirection: 'row',
                padding: wp('3%'),
                backgroundColor: colors.purple,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: wp('3%'),
                marginTop: wp('5%'),
                borderRadius: wp('1%'),
              }}>
              <Text
                style={{fontFamily: 'Poppins-Regular', color: colors.white}}>
                DTMF Support
              </Text>
              <Entypo name="check" size={22} color={colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setDtmfSupportChecked(true);
                setDtmfSupport(dtmfSupport ? false:true);
              }}
              style={{
                flexDirection: 'row',
                padding: wp('3%'),
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.white1,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: wp('3%'),
                marginTop: wp('5%'),
                borderRadius: wp('1%'),
                height: hp('7%'),
              }}>
              <Text style={{fontFamily: 'Poppins-Regular', color: colors.grey}}>
                DTMF Support
              </Text>
              {/* <Entypo name="check" size={22} color={colors.white} /> */}
            </TouchableOpacity>
          )}

          <FlatList
            horizontal={true}
            ref={refContainer}
            onContentSizeChange={() => {
              refContainer != null ? refContainer.current.scrollToEnd() : null;
            }}
            showsHorizontalScrollIndicator={false}
            data={messageDataList}
            renderItem={({item, index}) => {
              return (
                <ExpectedIOCards
                  item={item}
                  index={index}
                  deleteData={deleteFromExpectedInputArray}
                />
              );
            }}
          />

          {expectedInputOutputCards.map((item) => (
            <Card
              style={{
                marginTop: wp('3%'),
                marginHorizontal: wp('3%'),
                paddingVertical: wp('3%'),
                elevation: 2,
              }}>
              <View>
                <Text style={ServiceStyles.titleInputField}>
                  Expected Input
                </Text>
                <TextInput
                  placeholder="Expected Input"
                  mode="outlined"
                  style={ServiceStyles.serviceNameInputField}
                  value={expectedInput}
                  onChangeText={(text) => setExpectedInput(text)}
                />
              </View>

              <View style={{marginTop: wp('3%')}}>
                <Text style={ServiceStyles.titleInputField}>
                  Expected Response
                </Text>
                <TextInput
                  placeholder="Expected Response"
                  mode="outlined"
                  style={ServiceStyles.serviceNameInputField}
                  value={expectedResponse}
                  onChangeText={(text) => setExpectedResponse(text)}
                />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    setMessageDataList([
                      ...messageDataList,
                      {
                        expectedInput: expectedInput,
                        expectedResponse: expectedResponse,
                      },
                    ]);

                    setExpectedInput('');
                    setExpectedResponse('');
                  }}
                  style={{
                    backgroundColor: colors.purple,
                    borderRadius: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    width: 30,
                    padding: wp('2%'),
                    marginTop: wp('2%'),
                    marginHorizontal: wp('3%'),
                  }}>
                  <FontAwesome name="plus" size={15} color={colors.white} />
                </TouchableOpacity>
              </View>
            </Card>
          ))}

          {errorMessage ? (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: colors.red,
                fontSize: wp('3%'),
                marginHorizontal:wp('3%'),
              }}>
              {errorMessage}
            </Text>
          ) : null}

          <TouchableOpacity
            style={{
              height: hp('6.5%'),
              borderRadius: 5,
              backgroundColor: colors.orange,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
              marginVertical: 30,
            }}
            onPress={() => {
              if(scriptName == ""){
                setErrorMessage("Script name is required.");
              }
              else if(nluSupport == false && dtmfSupport == false)
              {
                setErrorMessage("Please select support type.")
              }
              else if(messageDataList.length < 0){
                setErrorMessage("Empty expected inputs and responses are not allowed.")
              }
              else
              {
                var objTosend = {};
                objTosend = {
                  scriptName: scriptName,
                  channelId: channelId,
                  id: scriptId,
                  voiceNLUSupport: nluSupport,
                  voiceDTMFSupport: dtmfSupport,
                  messageDetails: messageDataList,
                };
                createScript(JSON.stringify(objTosend));
              }
             
            }}>
            <Text style={ServiceStyles.saveButtonText}>UPDATE</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal isVisible={isModalVisible} backdropColor={colors.grey4}>
          <View style={ServiceStyles.modalContainer}>
            <View style={ServiceStyles.modalImageContainer}>
              <Image
                source={require('../../../assets/images/CardBase.png')}
                style={ServiceStyles.modalImage}
              />
            </View>
            <Text style={ServiceStyles.modalLightText}>
              <Text style={ServiceStyles.modalBoldText}>{scriptName} </Text>
              Successfully Updated
            </Text>

            <View style={ServiceStyles.modalVerticalLine} />
            <TouchableOpacity
              style={ServiceStyles.modalButton}
              onPress={() => {
                toggleModal();
                navigation.replace('ScriptsList');
              }}>
              <Text style={ServiceStyles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(withNavigation(EditScript));
