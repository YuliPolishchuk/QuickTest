import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../colors/colors';

const NavbarStyles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  Button1: {
    fontFamily: 'Poppins-Regular',
    color: colors.blue,
    alignItems: 'center',
    alignSelf: 'center',
  },
  viewBorder:
  {
    borderBottomWidth: 1,
    color: colors.blue,
    marginHorizontal: wp('35%'),
  },
  textInput:{
    flex: 1,
    height: 35,
    borderColor: colors.white,
    // marginHorizontal: 10,
    backgroundColor:"white",
    fontFamily: 'Poppins-Regular',
    marginLeft:10
  },
  addScriptButton:{
    backgroundColor:colors.primaryPurple,
    justifyContent:'center',
    // marginLeft:10,
    height:hp('5'),
    fontFamily:'Poppins-Medium',
    // height:40
  },
  button:{
    fontFamily:'Poppins-Medium',
    //  margin:10,
  },
  searchTextFieldView:{
    borderWidth: 1,
    borderRadius: 6,
    flex: 1,
    alignItems:'center',
    flexDirection: 'row',
    borderColor: colors.grey1,
    marginRight:15
  },
  searchAddScriptView:{
    flexDirection:'row',
    margin:15,
  },
});
export default NavbarStyles;
