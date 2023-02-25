import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import colors from "../../../colors/colors";

const ScriptListScreenStyles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:colors.white
},
menuIcon:{
    height:22,
    width:32
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
ScriptCardHeadings:{ 
    fontSize:13,
    fontFamily:'Poppins-Medium'
  },
ScriptCardDiscriptions:{
    fontSize:13,
    fontFamily:'Poppins-Regular',
    color:colors.grey,
    flex:1
  },
  addScriptButton:{
    backgroundColor:colors.primaryPurple,
    justifyContent:'center',
    marginLeft:10,
    height:hp('5'),
    fontFamily:'Poppins-Medium',
    height:40
  },
  filterView:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginHorizontal:15,
    alignItems:'center'
  },
  filterHeading:{
    fontFamily:'Poppins-Regular',
    fontSize:12,
    color:colors.grey
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
  button:{
    fontFamily:'Poppins-Medium',
    //  margin:10,
  }
})
export default ScriptListScreenStyles;