import React, {useState, useEffect, useContext} from 'react';
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
  SafeAreaView,
} from 'react-native';
import {HelperText, withTheme, RadioButton} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import Iconn from 'react-native-vector-icons/AntDesign';
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
import AppContext from '../../../context/AppContext';
import ContainerStyle from '../../../assets/styles/ContainerStyle';
const ServiceNameEdit = ({navigation}) => {
  const dataForEditing =
    navigation.state.params == null
      ? null
      : navigation.state.params.serviceData;
  const {baseUrl, token} = useContext(AppContext);
  const [navigationIndex, setNavigationIndex] = useState(1);
  const [value, setValue] = React.useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [channelList, setChannelList] = useState([]);
  const [channelId, setChannelId] = useState();
  const [serviceId, setServiceId] = useState();
  const [serviceName, setServiceName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [singleService, setSingleService] = useState([]);
  const [selectedChannelPlaceHolder, setSelectedChannelPlaceHolder] = useState('');
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const getSingleServiceData = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/service/get?serviceId=${dataForEditing.id}`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setSingleService(resp);
        setServiceName(resp.serviceName);
        setPhoneNumber(resp.toPhoneNo);
        setChannelId(resp.channelId);
        setServiceId(resp.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createService = (dataToSend) => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        `${baseUrl}/service/addUpdate`,
        {Authorization: `${token}`,tokenType:'aws', 'Content-Type': 'application/json'},
        dataToSend,
      )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setIsModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
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

  useEffect(() => {
    getAllChannelLists();
    getSingleServiceData();
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
        <DashboardNavbar title=" Edit Service" />
        <ScrollView>
          <View style={{marginTop: 25}}>
            <Text style={ServiceStyles.titleInputField}>Service Name</Text>
            <TextInput
              placeholder="Service Name"
              mode="outlined"
              style={ServiceStyles.serviceNameInputField}
              value={serviceName}
              onChangeText={(text) => setServiceName(text)}
            />
          </View>
          <Text style={[ServiceStyles.titleInputField, {marginTop: 15}]}>
            Channel Selection
          </Text>
          <View style={{position: 'relative'}}>
            <Dropdown
              underlineColor="transparent"
              placeholder={navigation.state.params == null
                ? null
                : dataForEditing.channelName}
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

          <View style={{marginTop: 25}}>
            <Text style={ServiceStyles.titleInputField}>Phone number</Text>
            <TextInput
              placeholder=""
              mode="outlined"
              style={ServiceStyles.serviceNameInputField}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
          <Text style={[TestMethod.TestMethodError]}>{errorMessage}</Text>

          <TouchableOpacity
            style={ServiceStyles.nextButton}
            onPress={() => {
              if(serviceName=="")
              {
                setErrorMessage("Service Name required.")
              }
              else if(channelId=="")
              {
                setErrorMessage("Select a channel.")
              }
              else if(phoneNumber=="")
              {
                setErrorMessage("Phone number required.")
              }
              else
              {
              var objTosend = (objTosend = {
                channelId: channelId,
                id: serviceId,
                serviceName: serviceName,
                toPhoneNo: phoneNumber,
              });

              createService(JSON.stringify(objTosend));
            }
            }}>
            <Text style={ServiceStyles.saveButtonText}>Update</Text>
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
              <Text style={ServiceStyles.modalBoldText}>{serviceName}</Text> is
              Successfully Updated.
            </Text>

            <View style={ServiceStyles.modalVerticalLine} />
            <TouchableOpacity
              style={ServiceStyles.modalButton}
              onPress={() => {
                toggleModal();
                navigation.goBack();
              }}>
              <Text style={ServiceStyles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(withNavigation(ServiceNameEdit));
