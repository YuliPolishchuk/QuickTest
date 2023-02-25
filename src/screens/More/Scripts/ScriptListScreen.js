import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {Banner, Button, Card, HelperText, withTheme} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import ScriptListScreenStyles from '../../../assets/styles/MoreScreensStyles/ScriptScreensStyles/ScriptListScreenStyles';
import colors from '../../../assets/colors/colors';
import ScriptListCards from '../../../components/More/Scripts/ScriptListScreen/ScriptListCards';
import ServiceStyles from '../../../assets/styles/Service/ServiceStyles';
import DrawerNavbar from '../../../components/Navbars/DrawerNavbar';
import RadioGroupLoading from '../../../components/RadioGroupLoading/RadioGroupLoading';
import TestMethod from '../../../assets/styles/TestMethodStyle/TestMethod';
import BottomSheet from 'reanimated-bottom-sheet';
import GeneralProperties from '../../../assets/styles/GeneralProperties';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../../context/AppContext';
import ContainerStyle from '../../../assets/styles/ContainerStyle';
import _ from "lodash";
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const ScriptListScreen = ({navigation}) => {
  const {baseUrl, token} = useContext(AppContext);
  const [list, setList] = useState([]);
  const [listCopy, setListCopy] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingScript, setIsLoadingScript] = useState(false);
  const [scriptDeleteMessage, setScriptDeleteMessage] = useState("Script deleted successfully.");
  const [successDeleteBannerVisible, setSuccessDeleteBannerVisible] = useState(false);
  const [messageDeleteBannerVisible, setMessageDeleteBannerVisible] = useState("");


  const toggleModal = () => {
    setIsModalVisible(isModalVisible ? false:true);
  };


  const ScriptList = async () => {
    setIsLoadingScript(true);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/script/list`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.length);
        setList(response);
        setListCopy(response);
        setIsLoadingScript(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingScript(false);
      });
  };

  const DeleteScript = async (id) => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('DELETE', `${baseUrl}/script/delete?scriptId=${id}`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        showDeleteSuccessBanner(response.result);
        ScriptList();
        // setScriptDeleteMessage(response.result);
        // toggleModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showDeleteSuccessBanner = (message) => {
    setMessageDeleteBannerVisible(message);
    setSuccessDeleteBannerVisible(!successDeleteBannerVisible);
    setTimeout(()=>{
      setSuccessDeleteBannerVisible(false);
    },3000)
  }

  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
  const [bottomSheetWidth, setBottomSheetWidth] = useState(
    Dimensions.get('window').width,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
      }}>
      <Card style={[TestMethod.filterCard]}>
        <Text style={[TestMethod.clearAll]}>Clear All</Text>
        <Text style={[TestMethod.filterBy]}>Filter By</Text>
      </Card>

      <View style={[GeneralProperties.flexRow]}>
        <View>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Sprint Name
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Created Date
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Created Time
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Completed Date
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Completed Time
          </Button>
          <Button
            color={colors.grey3}
            style={{bottom: 0}}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Status
          </Button>
        </View>
        <View>
          <RadioGroupLoading />
        </View>
      </View>

      <Card style={[TestMethod.applyCard]}>
        <Text style={[TestMethod.applyText]}>Apply</Text>
        <TouchableOpacity onPress={() => sheetRef.current.snapTo(2)}>
          <Text style={[TestMethod.CloseText]}>Close</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );

  const sheetRef = React.useRef(null);
  useEffect(() => {
    ScriptList();

    const unSubscribe = navigation.addListener('didFocus',()=>{
      ScriptList();
    });



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
      <View style={ScriptListScreenStyles.container}>
        <DrawerNavbar title="Script" />
        <View style={ScriptListScreenStyles.searchAddScriptView}>
          <View style={[ScriptListScreenStyles.searchTextFieldView,{height:40}]}>
            <EvilIcons
              style={ServiceStyles.iconStyle}
              name="search"
              size={20}
              color={colors.grey}
            />
            <TextInput
              autoCapitalize="none"
              style={[ScriptListScreenStyles.textInput,{marginTop:8}]}
              placeholder="Search..."
              value={searchTerm}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                      if(searchTerm == "")
                      {
                        ScriptList();
                      }
                      const data = _.filter(listCopy,item => {
                        if(item.scriptName.toLowerCase().includes(searchTerm))
                        {
                          return true
                        }
                        return false
                      });
                    setList(listCopy);
                    setSearchTerm(searchTerm);  
                    
                    }
              }}
              onChangeText={(text) =>{
                if(text == "")
                {
                  ScriptList();
                }
                const data = _.filter(list,item => {
                  if(item.scriptName.toLowerCase().includes(text))
                  {
                    return true
                  }
                  return false
                });
              setList(data);
              setSearchTerm(text);  
              }}
            />
          </View>
          <Button
            onPress={() => {
              navigation.navigate('CreateScript');
            }}
            mode="contained"
            color={colors.background}
            style={ScriptListScreenStyles.addScriptButton}>
            + Script
          </Button>
        </View>
        {/* <TouchableOpacity
          style={ScriptListScreenStyles.filterView}
          onPress={() => {
            setBottomSheetHeight(Dimensions.get('window').height / 3);
            sheetRef.current.snapTo(0);
          }}>
          <MaterialCommunityIcons name="filter" size={24} color={colors.grey} />
          <Text style={ScriptListScreenStyles.filterHeading}>{'  '}FILTER</Text>
        </TouchableOpacity> */}
        <Banner
            visible={successDeleteBannerVisible}
            actions={[]}
            >
            <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
              <LottieView style={{height:50,width:wp("15")}} source={require('../../../assets/animations/delete.json')} autoPlay loop />
              <Text style={[ServiceStyles.deleteModalButtonText,{color:colors.red,marginLeft:5,width:wp('60')}]}>{messageDeleteBannerVisible}</Text>
              <TouchableOpacity  style={{width:wp('15')}} onPress={()=>{ setSuccessDeleteBannerVisible(false)}}><MaterialCommunityIcons name="close" size={32} color={colors.red} /></TouchableOpacity> 
          </View>   
          </Banner>
        {
          isLoadingScript ? <View
          style={{
            marginTop: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={colors.purple} size="large" />
        </View>: 
        list.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={list}
            // style={{height:hp('65')}}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              return (
                <ScriptListCards item={item} DeleteScript={DeleteScript} />
              );
            }}
          />
        ) : (
          <View
            style={{
              marginTop: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={ServiceStyles.titleInputField}>No Script Found.</Text>
          </View>
        )}
        <BottomSheet
          style={{position: 'absolute', bottom: 0, zIndex: 2}}
          ref={sheetRef}
          snapPoints={[bottomSheetHeight, bottomSheetWidth, 0]}
          borderRadius={10}
          renderContent={renderContent}
        />
      </View>
      <Modal isVisible={isModalVisible} backdropColor={colors.grey4}>
          <View style={ServiceStyles.modalContainer}>
            <View style={ServiceStyles.modalImageContainer}>
              <Image
                source={require('../../../assets/images/CardBase.png')}
                style={ServiceStyles.modalImage}
              />
            </View>
            <Text style={ServiceStyles.modalLightText}>
              <Text style={[ServiceStyles.modalBoldText,{marginHorizontal:20}]}>{scriptDeleteMessage}</Text>
            </Text>

            <View style={[ServiceStyles.modalForScriptDelete]}>
            
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                toggleModal();
                ScriptList();
              }}>
              <Text style={ServiceStyles.modalButtonTextForDeleteButton}>Okay</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>
     
    </SafeAreaView>
  );
};
export default withTheme(withNavigation(ScriptListScreen));
