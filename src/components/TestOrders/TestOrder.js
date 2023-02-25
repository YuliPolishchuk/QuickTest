import React, {useContext,useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
  Image
} from 'react-native';
import {NavigationActions, withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Iconn from 'react-native-vector-icons/FontAwesome5';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import GeneralProperties from '../../assets/styles/GeneralProperties';
import colors from '../../assets/colors/colors';
import {Card} from 'react-native-paper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AppContext from '../../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';
import Modal from 'react-native-modal';
import ServiceStyles from '../../assets/styles/Service/ServiceStyles';

import {convertUtcToLocal} from "../../Helpers/UtcToLocalConverter";


const TestOrder = ({status,item,navigation,refresh,showDeleteSuccessBanner}) => {
  const {baseUrl,token,storeSelectedTestType} = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(isModalVisible ? false:true);
  };

  const deleteSprint = ()=>{
            RNFetchBlob.config({
              trusty : true
            }).fetch('DELETE',`${baseUrl}/sprint/deleteSprint?sprintId=${item.id}`,
            {
              Authorization: `${token}`,tokenType:'aws',
            })
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              
              toggleModal();
              refresh();
              showDeleteSuccessBanner(response.result);
              // ServicesList();
              // refresh();
            })
            .catch((error) => {
              console.log(error);
            });
            
        }

  
  return (
    <TouchableOpacity 
      onPress={() => {
        if(item.testType == "Load Testing")
        {
        navigation.navigate('StartLoadTesting', 
                {sprintName: item.sprintName, sprintId: item.id}
                )
        }else
        {
        navigation.navigate('StartTesting', 
                {sprintName: item.sprintName, sprintId: item.id}
                )
        }
        
      }}>
    <Card style={[TestMethod.textCardView]}>
      <View style={TestMethod.testCardView}>
        <Text style={[TestMethod.testCard]}>Sprint Name : </Text>
        <Text style={[TestMethod.testDetail]}>{item.sprintName}</Text>

        <TouchableOpacity onPress={() => {}}>
          <View>
            <Menu style={TestMethod.flexEnd}>
              <MenuTrigger style={TestMethod.flexEnd}>
                <Icon
                  // style={[TestMethod.threeIcon]}
                  name="dots-vertical"
                  size={22}
                  color="grey"
                />
              </MenuTrigger>

              <MenuOptions style={GeneralProperties.ph}>
                <MenuOption onSelect={() => {
                  storeSelectedTestType(item.testType+"");
                  console.log(item.testType);
                  if(item.testType == "Load Testing")
                  {
                    navigation.navigate("EditLoadTesting",{
                      sprintId:item.id
                    });

                  }else if(item.testType == "Automatic Testing")
                  {
                    navigation.navigate("EditAutomaticTesting",{
                      sprintId:item.id
                    });

                  }else
                  {
                    navigation.navigate("EditScheduleTesting",{
                        sprintId:item.id
                      });
                  }
                  
                }}>
                  <View style={TestMethod.flexRow}>
                    <Iconn name="edit" size={18} color={colors.blue} />
                    <Text style={TestMethod.labelHeight}>Edit</Text>
                  </View>
                </MenuOption>
                <MenuOption onSelect={() => {toggleModal()}}>
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

      <View style={TestMethod.testCardView}>
        <Text style={[TestMethod.testCard]}>Created Date & Time : </Text>
        <Text style={[TestMethod.testDetail]}>{convertUtcToLocal(item.createdOn)}</Text>
        {/* <Text style={[TestMethod.testDetail]}>{moment.utc(item.createdOn).format("MM-DD-YYYY hh:mm:ss") }</Text> */}
      </View>

      <View style={TestMethod.testCardView}>
        <Text style={[TestMethod.testCard]}>Completed Date & Time : </Text>
        <Text style={[TestMethod.testDetail]}>{item.completedOn== null ? "":convertUtcToLocal(item.completedOn)}</Text>
      </View>

      <View style={TestMethod.testCardView}>
        <Text style={[TestMethod.testCard]}>Channel : </Text>
        <Text style={[TestMethod.testDetail]}>{item.channelName}</Text>
      </View>

      {status == 'Completed' ? (
        <View style={TestMethod.testCardView}>
          <Text style={[TestMethod.testCard]}>Status : </Text>
          <Icon
            style={[GeneralProperties.mh1]}
            name="check-bold"
            size={20}
            color={colors.green}
          />
          <Text style={[TestMethod.textCardGreen]}>{item.status}</Text>
        </View>
      ) : (
        <View style={[TestMethod.testCardView]}>
          <Text style={[TestMethod.testCard]}>Status : </Text>
          <Icon
            style={[GeneralProperties.mh1]}
            name="clock"
            size={20}
            color={colors.yellow}
          />
          <Text style={[TestMethod.textCardYellow]}>{item.status}</Text>
        </View>
      )}
    </Card>
    
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
              deleteSprint(item.id);
              
            }}>
            <Text style={ServiceStyles.deleteModalButtonText}>Delete Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal> 

    {/* <Modal isVisible={isModalVisible} backdropColor={colors.grey4}>
          <View style={ServiceStyles.modalContainer}>
            <View style={ServiceStyles.modalImageContainer}>
              <Image
                source={require('../../assets/images/CardBase.png')}
                style={ServiceStyles.modalImage}
              />
            </View>
            <Text style={ServiceStyles.modalLightText}>
              <Text style={ServiceStyles.modalBoldText}>{item.sprintName}</Text> is
              Successfully Deleted.
            </Text>

            <View style={ServiceStyles.modalVerticalLine} />
            <TouchableOpacity
              style={ServiceStyles.modalButton}
              onPress={() => {
                
              }}>
              <Text style={ServiceStyles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}
    </TouchableOpacity>
  );
};

export default withNavigation(TestOrder);
