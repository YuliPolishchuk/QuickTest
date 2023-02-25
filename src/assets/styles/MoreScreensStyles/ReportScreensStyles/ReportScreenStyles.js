import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import colors from "../../../colors/colors";

const ReportScreenStyles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:colors.white
},
menuIcon:{
    height:18,
    width:25
},
dashboardHeading:{
    fontFamily:'Poppins-Medium',
    fontSize:18,
    textAlign:'center',
    color:colors.white,
    flex:1
},
bellIcon:{
    height:23,
    width:18
},
headerView:{
    backgroundColor:colors.primaryPurple,
    flexDirection:'row',
    paddingHorizontal:15,
    paddingVertical:10,
    alignItems:'center',
},
textInput:{
  flex: 1,
  height: 40,
  borderColor: colors.grey9,
  marginHorizontal: 10,
  fontFamily: "Poppins-Regular",
  paddingBottom: 7
},
calendarIcon:{
    height:18,
    width:18,
    marginRight:5
},
headings:{
    fontSize:16,
    fontFamily:'Poppins-Medium',
    margin:15
},
eyeIcon:{
    height:15,
    width:18
},
active: {
    margin: wp('2%'),
    borderBottomColor: colors.blue,
    borderBottomWidth: 2,
    color: colors.grey4,
    fontFamily:'Poppins-Medium',
    fontSize:14
  },
  disable: {
    margin: wp('2%'),
    color: colors.grey2,
    fontFamily:'Poppins-Regular',
    fontSize:14
  },
  ScriptCardHeadings:{ 
    fontSize:13,
    fontFamily:'Poppins-Medium'
  },
  ScriptCardDiscriptions:{
    fontSize:13,
    fontFamily:'Poppins-Regular',
    color:colors.grey,
  },
  ScriptCardDiscriptionCompleted:{
    fontSize:13,
    fontFamily:'Poppins-Medium',
    color:colors.green,
  },
  sprintDetailsBadgeRed:{
    
    width:30,
    height:20,
    fontSize:12,
    fontFamily:'Poppins-Medium',
    marginLeft:10,
    marginBottom:3,
    color:colors.white
  },
  sprintDetailsBadgeGreen:{
    backgroundColor:colors.green,
    width:30,
    height:20,
    fontSize:12,
    fontFamily:'Poppins-Medium',
    marginLeft:10,
    marginBottom:3,
    color:colors.white
  },
  sprintDetailsBadgeBlue:{
    backgroundColor:colors.lightBlue,
    width:30,
    height:20,
    fontSize:12,
    fontFamily:'Poppins-Medium',
    marginLeft:10,
    marginBottom:3,
    color:colors.white
  },
  sprintDetailsBadgeOrange:{
    backgroundColor:colors.orange,
    width:30,
    height:20,
    fontSize:12,
    fontFamily:'Poppins-Medium',
    marginLeft:10,
    marginBottom:3,
    color:colors.white
  },
  sprintDetailsBadgePink:{
    backgroundColor:colors.pink,
    width:30,
    height:20,
    fontSize:12,
    fontFamily:'Poppins-Medium',
    marginLeft:10,
    marginBottom:3,
    color:colors.white
  }
})
export default ReportScreenStyles;