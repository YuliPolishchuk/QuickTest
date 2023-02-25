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
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
const LoadSprintCard = ({item, navigation,refresh,deleteFromFlatlist, index}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectServicePlaceHolder, SetSelectServicePlaceHolder] = useState("");
  const [selectScriptPlaceHolder, SetSelectScriptPlaceHolder] = useState("");
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const {
    baseUrl,
    token
  } = useContext(AppContext);

  const getServiceList = (selectedServiceId) => { 
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/service/list`, {Authorization: `${token}`,tokenType:'aws'})
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.length > 0) {
          let allItems = [];
          resp.map((item) =>{
            if(item.id == selectedServiceId)
            {
                SetSelectServicePlaceHolder(item.serviceName+"");
            }
            });
          
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getScriptList = (selectedScriptId) => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/script/list`, {Authorization: `${token}`,tokenType:'aws'})
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.length > 0) {
          let allItems = [];
          resp.map((item) =>{
            if(item.id == selectedScriptId)
            {
                SetSelectScriptPlaceHolder(item.scriptName+"");
            }
            
          });
          
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <Card style={{width:wp('80'),margin:wp('5'),elevation: 4,padding:10}}>
                          <Text style={[TestMethod.TestMethodFormHeadings,{textAlign:"left"}]}>
                            Number of calls : <Text style={[TestMethod.TestMethodFormHeadings,{fontFamily: 'Poppins-Regular',}]}>
                            {item.noOfCalls}
                          </Text>
                          </Text>
                          <Text style={[TestMethod.TestMethodFormHeadings,{textAlign:"left"}]}>
                            Duration : <Text style={[TestMethod.TestMethodFormHeadings,{fontFamily: 'Poppins-Regular',}]}>
                            {item.duration / 1000}
                          </Text>
                          </Text>
                          <Text style={[TestMethod.TestMethodFormHeadings,{textAlign:"left"}]}>
                            Language : <Text style={[TestMethod.TestMethodFormHeadings,{fontFamily: 'Poppins-Regular',}]}>
                            {item.language}
                          </Text>
                          </Text>
                          <Text style={[TestMethod.TestMethodFormHeadings,{textAlign:"left"}]}>
                            Rampup no : <Text style={[TestMethod.TestMethodFormHeadings,{fontFamily: 'Poppins-Regular',}]}>
                            {item.rampupNo}
                          </Text>
                          </Text>
                          <Text style={[TestMethod.TestMethodFormHeadings,{textAlign:"left"}]}>
                            Rampup Time : <Text style={[TestMethod.TestMethodFormHeadings,{fontFamily: 'Poppins-Regular',}]}>
                            {item.rampupTime / 1000}
                          </Text>
                          </Text>
                          <Text style={[TestMethod.TestMethodFormHeadings,{textAlign:"left"}]}>
                            Script : <Text style={[TestMethod.TestMethodFormHeadings,{fontFamily: 'Poppins-Regular',}]}>
                            {getScriptList(item.script)}{selectScriptPlaceHolder}
                          </Text>
                          </Text>
                          <Text style={[TestMethod.TestMethodFormHeadings,{textAlign:"left"}]}>
                            Service : <Text style={[TestMethod.TestMethodFormHeadings,{fontFamily: 'Poppins-Regular',}]}>
                            {getServiceList(item.selectService)}{selectServicePlaceHolder}
                          </Text>
                          </Text>

                          <View style={{alignSelf:"flex-end"}}>
                            <TouchableOpacity onPress={()=>{
                                deleteFromFlatlist(index);
                            }}>
                              <MaterialCommunityIcons
                                style={{flex: 1}}
                                name="delete"
                                size={28}
                                color={colors.purple}
                              />
                            </TouchableOpacity>
                          </View>
                          
                  </Card>
  );
};
export default withTheme(withNavigation(LoadSprintCard));