import { StyleSheet } from "react-native";
import colors from "../colors/colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

  

const GettingStartedStyles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:colors.white
},
sliderContainer:{
    flex:1,
    justifyContent:'center',
},
heading:{
    fontSize:20,
    textAlign:'center',
    alignSelf:'center',
    margin:10,
    fontFamily:'Poppins-Bold'
},
discription:{
    fontSize:14,
    textAlign:'center',
    alignSelf:'center',
    margin:10,
    // fontFamily:'Poppins-Medium'
},
button:{
    marginHorizontal:20,
    marginBottom:10,
    backgroundColor:colors.orange
},
logo:{
    height: 50,
    width: 100,
    alignSelf: 'center',marginTop:hp('7')
},
skipStyle:{
    fontSize:14,
    margin:10,
    fontFamily:'Poppins-Medium'
},
sliderImage:{
    height: 200,
    width: 220,
    alignSelf: 'center'
},
sliderImage3:{
    height: 200,
    width: 150,
    alignSelf: 'center'
}
})
export default GettingStartedStyles;