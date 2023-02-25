import React, {useState} from 'react';
import {Image, Text, View,ScrollView, ImageBackground, TouchableOpacity,Modal, Alert} from 'react-native';
import { Button, Card, HelperText, withTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import ScriptListScreenStyles from '../../../../assets/styles/MoreScreensStyles/ScriptScreensStyles/ScriptListScreenStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ExpectedIOCards = ({item,index,deleteData, navigation, DeleteScript}) => {
  return (
    <Card
      style={{
        width: widthPercentageToDP('80'),
        elevation: 5,
        alignSelf: 'center',
        marginHorizontal: wp('3'),
        marginVertical: 15,
      }}>
      <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center"}}>
        <View style={{flex: 9}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <Ionicons
              style={{flex: 1}}
              name="person"
              size={24}
              color={colors.purple}
            />
            <Text
              style={{
                flex: 9,
                marginHorizontal: 10,
                fontFamily: 'Poppins-Regular',
              }}>
              {item.expectedInput}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#f5f5f5',
              marginHorizontal: 15,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <MaterialCommunityIcons
              style={{flex: 1}}
              name="face-agent"
              size={28}
              color={colors.purple}
            />
            <Text
              style={{
                flex: 9,
                marginHorizontal: 10,
                fontFamily: 'Poppins-Regular',
              }}>
              {item.expectedResponse}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={()=>{
                deleteData(index);
            }}>
              <MaterialCommunityIcons
                style={{flex: 1}}
                name="delete"
                size={28}
                color={colors.purple}
              />
            </TouchableOpacity>
          </View>
      </View>
    </Card>
  );
};
export default withTheme(withNavigation(ExpectedIOCards));