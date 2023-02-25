import React, {useState} from 'react';
import {Image, Text, View,ScrollView, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { Button, Card, HelperText, withTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import ScriptListScreenStyles from '../../../../assets/styles/MoreScreensStyles/ScriptScreensStyles/ScriptListScreenStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../assets/colors/colors';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import TestMethod from '../../../../assets/styles/TestMethodStyle/TestMethod';
import GeneralProperties from '../../../../assets/styles/GeneralProperties';
import ServiceStyles from '../../../../assets/styles/Service/ServiceStyles';
import Modal from 'react-native-modal';
import {convertUtcToLocal} from "../../../../Helpers/UtcToLocalConverter";
const ScriptListCards = ({item, navigation, DeleteScript}) => {


  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(isModalVisible ? false:true);
  };

return(
    <View style={{position: "relative", zIndex: 1}}>
    <Card style={{
        width:widthPercentageToDP('94'),
        elevation:5,
        alignSelf:'center',
        margin:10,
        paddingVertical:15,
        paddingHorizontal:10,
        position: "relative"
    }}>
        <View style={{flexDirection:'row'}}>
            <Text style={ScriptListScreenStyles.ScriptCardHeadings}>
                Script Name : {''}
            </Text>
            <Text style={ScriptListScreenStyles.ScriptCardDiscriptions}>
                {item.scriptName}
            </Text>
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
                            <MenuOption 
                              onSelect={() => {
                                navigation.navigate('EditScript', {scriptData:item});
                              }}>
                          <View style={TestMethod.flexRow}>
                          <FontAwesome5
                              name="edit"
                              size={18}
                              color={colors.blue}
                            />
                              <Text style={TestMethod.labelHeight}>Edit</Text>
                          </View>
                            </MenuOption>
                            <MenuOption onSelect={() => {
                              toggleModal();
                            }}>
                            <View style={TestMethod.flexRow}>
                          <AntDesign
                              name="delete"
                              size={22}
                              color={colors.red}
                            />
                              <Text style={TestMethod.labelHeight}>Delete</Text>
                              </View>
                            </MenuOption>
                          </MenuOptions>
                        </Menu>
                      </View>
                    </TouchableOpacity>
            {/* <MaterialCommunityIcons name='dots-vertical' size={20} color={colors.grey} /> */}
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={ScriptListScreenStyles.ScriptCardHeadings}>
                Created Date & Time : {''}
            </Text>
            <Text style={ScriptListScreenStyles.ScriptCardDiscriptions}>
                {convertUtcToLocal(item.createdOn)}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={ScriptListScreenStyles.ScriptCardHeadings}>
                Channel : {''}
            </Text>
            <Text style={ScriptListScreenStyles.ScriptCardDiscriptions}>
                {item.channelName}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={ScriptListScreenStyles.ScriptCardHeadings}>
                NLU/BOT : {''}
            </Text>
            <Text style={ScriptListScreenStyles.ScriptCardDiscriptions}>
                {item.voiceNLUSupport == true ? 
                "NLU": "BOT"}
            </Text>
        </View>      
    </Card>

    <Modal isVisible={isModalVisible} backdropColor={colors.grey4}>
      <View style={ServiceStyles.modalContainer}>
        <Text style={ServiceStyles.modalLightText}>Do you really want to delete this Script ?</Text>

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
              toggleModal();
              DeleteScript(item.id);
              
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
                source={require('../../../../assets/images/CardBase.png')}
                style={ServiceStyles.modalImage}
              />
            </View>
            <Text style={ServiceStyles.modalLightText}>
              <Text style={[ServiceStyles.modalBoldText,{marginHorizontal:20}]}>Are you sure you want to delete {item.scriptName} ?</Text>
            </Text>

            <View style={[ServiceStyles.modalForScriptDelete]}>
            <TouchableOpacity
            style={{flex: 1}}
              onPress={() => {
                
              }}>
              <Text style={ServiceStyles.modalButtonTextForDeleteButton}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                toggleModal();
              }}>
              <Text style={ServiceStyles.modalButtonTextForDeleteButton}>No</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
    </View>
)
}
export default withTheme(withNavigation(ScriptListCards));