import { StyleSheet } from "react-native";
import colors from "../../colors/colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const VerificationStyles = StyleSheet.create({
backgroundImage:{
    height:hp('50'),
    alignSelf:'center',
},
VerificationHeading:{
    fontFamily:'Poppins-Medium',
    fontSize:24,
    color:colors.white,
    marginHorizontal:20
},
VerificationDiscription:{
    fontFamily:'Poppins-Light',
    fontSize:15,
    color:colors.white,
    marginHorizontal:20
},
container:{
    flex:1,
    backgroundColor:colors.white
},
mailImage:{
    height:150,
    width:150,
    alignSelf:'center'
},
mailDiscripion:{
    fontFamily:'Poppins-Light',
    fontSize:18,
    marginHorizontal:20,
    alignSelf:'center',
    textAlign:'center',
    marginVertical:30
},
button:{
    marginHorizontal:20,
    marginTop:20,
    backgroundColor:colors.orange
},
textInput:{
    marginHorizontal:20,
    marginTop:10,
    backgroundColor:colors.white,
    fontSize:12
},
card:{
    backgroundColor:colors.white,
    elevation:4,
    borderRadius:10,
    marginHorizontal:10,
    marginVertical:40,
    width:wp('94'),
    // marginVertical:20
},
resendStyle:{
    fontSize:18,
    color:colors.blue,
    alignSelf:'center',
    margin:10,
    fontFamily:'Poppins-Regular'
}
});
export default VerificationStyles;