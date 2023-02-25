import React, {useState, useContext} from 'react';
import {Image, Text, View,ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { Button, Card, HelperText, withTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import ServiceStyles from '../../assets/styles/Service/ServiceStyles';
import GeneralProperties from '../../assets/styles/GeneralProperties';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import colors from '../../assets/colors/colors';
import AppContext from '../../context/AppContext';
import Modal from 'react-native-modal';
import RNFetchBlob from 'react-native-fetch-blob';
import {convertUtcToLocal} from "../../Helpers/UtcToLocalConverter";
const ServicesListCard = ({item, navigation,refresh,showDeleteSuccess}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleTwo, setIsModalVisibleTwo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalTwo = () => {
    setIsModalVisibleTwo(!isModalVisibleTwo);
  };
  const {
    baseUrl,
    token
  } = useContext(AppContext);

  const DeleteService = async (id) => {
    toggleModal();
    RNFetchBlob.config({
      trusty : true
    }).fetch('DELETE',`${baseUrl}/service/delete?serviceId=${id}`,
    {
      Authorization: `${token}`,tokenType:'aws',
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if(response.result.includes('Failed') || response.result.includes('failed'))
      {
        setErrorMessage(response.result);
        showDeleteSuccess(response.result);
      }else
      {
        // setErrorMessage(response.result);
        showDeleteSuccess(response.result);
        refresh();
      }
      
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <View>
    <View style={{position: 'relative', zIndex: 1}}>
      <Card style={ServiceStyles.card}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={ServiceStyles.darkText}>Service Name: </Text>
            <Text style={ServiceStyles.lightText}>{item.serviceName}</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <View>
              <Menu>
                <MenuTrigger>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={22}
                    color="grey"
                  />
                </MenuTrigger>

                <MenuOptions style={GeneralProperties.ph}>
                  <MenuOption onSelect={() => {
                    navigation.navigate('ServiceNameEdit', { 
                      serviceData:item
                    });
                  }}>
                    <View style={TestMethod.flexRow}>
                      <FontAwesome5 name="edit" size={18} color={colors.blue} />
                      <Text style={TestMethod.labelHeight}>Edit</Text>
                    </View>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => {
                      setIsModalVisible(true);
                    }}>
                    <View style={TestMethod.flexRow}>
                      <AntDesign name="delete" size={22} color={colors.red} />
                      <Text style={TestMethod.labelHeight}>Delete</Text>
                    </View>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={ServiceStyles.darkText}>Created Date & Time: </Text>
          <Text style={ServiceStyles.lightText}>{convertUtcToLocal(item.createdOn)}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={ServiceStyles.darkText}>Channel: </Text>
          <Text style={ServiceStyles.lightText}>{item.channelName}</Text>
        </View>
      </Card>
    </View>

    
    <Modal isVisible={isModalVisible} backdropColor={colors.grey4}>
      <View style={ServiceStyles.modalContainer}>
        <Text style={ServiceStyles.modalLightText}>Do you really want to delete this service</Text>

        <View style={ServiceStyles.modalVerticalLine} />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={ServiceStyles.deleteModalButtonLeft}
            onPress={() => {
              toggleModal();
            }}>
            <Text style={ServiceStyles.deleteModalButtonText}>Not Now</Text>
          </TouchableOpacity>
          <View style={{borderColor: colors.white, borderWidth: 1}} />
          <TouchableOpacity
            style={ServiceStyles.deleteModalButtonRight}
            onPress={() => {
              DeleteService(item.id);
            }}>
            <Text style={ServiceStyles.deleteModalButtonText}>Delete Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal> 

    <Modal isVisible={isModalVisibleTwo} backdropColor={colors.grey4}>
      <View style={ServiceStyles.modalContainer}>
        <Text style={ServiceStyles.modalLightText}>{errorMessage}</Text>

        <View style={ServiceStyles.modalVerticalLine} />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={ServiceStyles.deleteModalButtonLeft}
            onPress={() => {
              toggleModalTwo();
            }}>
            <Text style={ServiceStyles.deleteModalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <View style={{borderColor: colors.white, borderWidth: 1}} />
          <TouchableOpacity
            style={ServiceStyles.deleteModalButtonRight}
            onPress={() => {
              toggleModalTwo();
            }}>
            <Text style={ServiceStyles.deleteModalButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>  

    </View>
  );
};
export default withTheme(withNavigation(ServicesListCard));