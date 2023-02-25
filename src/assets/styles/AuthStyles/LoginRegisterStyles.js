import { StyleSheet } from "react-native";
import colors from "../../colors/colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const LoginRegisterStyles = StyleSheet.create({
backgroundImage:{
    height:hp('50'),
    alignSelf:'center',
},
Heading:{
    fontFamily:'Poppins-Medium',
    fontSize:24,
    color:colors.white,
    // position:'absolute',
    // top:hp('7'),
    marginHorizontal:20,
},
Discription:{
    fontFamily:'Poppins-Light',
    fontSize:15,
    color:colors.white,
    // position:'absolute',
    // top:hp('14'),
    marginHorizontal:20,
    marginBottom:10

},
container:{
    flex:1,
    backgroundColor:colors.white
},
signinRegister:{
    fontFamily:'Poppins-Light',
    fontSize:20,
    alignSelf:'center',
    textAlign:'center',
    marginTop:20
},
button:{
    marginHorizontal:20,
    marginBottom:20,
    backgroundColor:colors.orange
},
textInput:{
    marginHorizontal:20,
    backgroundColor:colors.white,
    fontFamily:'Poppins-Regular',
    fontSize:12
},
label:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    marginHorizontal:19,
    color:'grey',
    marginTop:10
},
errorLabel:{
    fontFamily:'Poppins-Regular',
    fontSize:10,
    marginHorizontal:22,
    color: colors.red,
    marginTop:5
},
successLabel:{
    fontFamily:'Poppins-Regular',
    fontSize:10,
    marginHorizontal:22,
    color: colors.blue,
    marginTop:5
},
signinRegisterTab:{
    borderBottomColor:colors.blue,
    borderBottomWidth:3,
    marginHorizontal:20,
    marginBottom:20
},
card:{
    backgroundColor:colors.white,
    elevation:4,
    borderRadius:10,
    // position:'absolute',
    // top:hp('28'),
    alignSelf:'center',
    width:wp('94'),
    marginTop:30,
    marginBottom:70
},
rememberStyle:{
    fontSize:14, 
    fontFamily:'Poppins-Regular',
    // marginVertical:20,
    color:'grey',
    flex:1
},
forgotPasswordStyle:{
    fontSize:14,
    fontFamily:'Poppins-Regular',
    margin:20,
    color:'grey'
},
nextLoginContainerStyle:{
    backgroundColor:colors.white,
    elevation:4,
    borderRadius:wp('50'),
    height:wp('18'),
    width:wp('18'),
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    position:'absolute',
    bottom:-wp('9'),
},
nextPasswordResetStyle:{
    backgroundColor:colors.white,
    elevation:4,
    borderRadius:wp('50'),
    height:wp('18'),
    width:wp('18'),
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    position:'absolute',
    bottom:-wp('20'),
},
nextInnerViewStyle:{
    backgroundColor:colors.orange,
    height:wp('15'),
    width:wp('15'),
    borderRadius:wp('50'),
    alignItems:'center',
    justifyContent:'center',
},
nextInnerViewDisabledStyle:{
    backgroundColor:colors.grey9,
    height:wp('15'),
    width:wp('15'),
    borderRadius:wp('50'),
    alignItems:'center',
    justifyContent:'center'
},
nextRegisterContainerStyle:{
    backgroundColor:colors.white,
    elevation:4,
    borderRadius:wp('50'),
    height:wp('18'),
    width:wp('18'),
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    position:'absolute',
    bottom:-wp("9"),
    // marginBottom:wp('2')
},
scrollContainer:{
    height:hp('89')
},
innerContainer:{
    flex:1,
    position:'absolute',
    top:hp('8'),
    left:10,
    right:10
},
loginCheckboxView:{
    flexDirection:'row',
    marginBottom:25,
    justifyContent:"center",
    alignItems:'center',
    paddingHorizontal:Platform.OS=="ios" ? 8 : 3
},
SignupCheckboxView:{
    flexDirection:'row',
    marginTop:25,
    marginBottom:50,
    paddingHorizontal:Platform.OS=="ios" ? 20 : 3
},
loginCheckbox:{
    marginLeft:13,
    height:20,   
}
});
export default LoginRegisterStyles;