import { StyleSheet } from "react-native";
import colors from "../../colors/colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const DashboardStyles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:colors.white
},
topCurvedView:{
    backgroundColor:colors.primaryPurple,
    height:hp('15'),
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    // padding:12
},
topNavView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
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
swiperView:{
    position:'absolute',
    top:hp('7'),
    margin:5,
    // padding:5,
},
gradientCards:{
    height:hp('14'),
    width:wp('50'),
    backgroundColor:colors.blue,
    paddingHorizontal:15,
    paddingVertical:7,
    borderRadius:10,
    marginRight:wp('3')
},
percentageBadgeGreen:{
    backgroundColor:colors.green,
    borderRadius:15,
    flexDirection:'row',
    paddingHorizontal:4,
    height:18
},
percentageBadgeRed:{
    backgroundColor:colors.red,borderRadius:15,flexDirection:'row',paddingHorizontal:4,height:18
},
badgeText:{
    fontFamily:'Poppins-Regular',
    fontSize:12,
    color:colors.white
},
gradientCardCount:{
    fontSize:14,
    fontFamily:'Poppins-Bold',
    color:colors.white,
    marginTop:hp('1.5')
},
gradientCardCountDiscription:{
    fontSize:12,
    fontFamily:'Poppins-Regular',
    color:colors.white,
    marginTop:hp('1.5')
},
gradientCardDiscription:{
    fontSize:12,
    fontFamily:'Poppins-Regular',
    color:colors.white
},
gridIcon:{
    height:16,
    width:16
},
centeredView: {
    height:hp('70'),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(136,136,136,0.6)',
  },
modalView: {
    padding:20,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 4,
    width:wp('94')
  },
centeredViewRequests: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(136,136,136,0.6)',
  },
modalViewRequests: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 4,
    width:wp('94')
  },
modalViewCalendar: {
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 4,
    width:wp('94'),
  },
textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  avgPercentageThisWeek:{
      fontSize:16,
      fontFamily:'Poppins-SemiBold',
      color:colors.blue
  },
  avgPercentageLastWeek:{
      fontSize:16,
      fontFamily:'Poppins-SemiBold',
      color:colors.orange
  },
  avgThisWeek:{
    fontSize:14,
    fontFamily:'Poppins-Regular',
    color:colors.blue,
    alignSelf:'flex-end'
  },
  avgLastWeek:{
    fontSize:14,
    fontFamily:'Poppins-Regular',
    color:colors.orange,
    alignSelf:'flex-end',
  },
  avgSeperatorPerformanceModal:{
    color:colors.grey,
    marginHorizontal:wp('2'),
    fontFamily:'Poppins-Regular',
    fontSize:16
  },
  mainScroll:{
    height:hp('80')
  },
  gradientCardIcons:{
      flex:1
  },
  calendarCard:{ 
    elevation:4,
    borderRadius:10,
    marginVertical:hp('2'),
    width:wp('94'),
    alignSelf:'center'
  },
  todayView:{
    backgroundColor:'#9E5CE1',
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  todayText:{
    color:colors.white,
    margin:10,
    fontSize:15,
    fontFamily:'Poppins-Regular',
    alignSelf:'center'
  },
  txtForPieChartLabel:{
    margin:4,
    fontSize:10,
    fontFamily:'Poppins-Regular',
    alignSelf:'center'
  },
  calendarColor:{
      color:colors.white
  },
  calendarHeaderStyle:{
      color:colors.white
  },
  dateNumberStyle:{ 
      fontFamily:'Poppins-Regular',
      fontSize:14
  },
  dateNameStyle:{
      color: colors.grey,
      fontFamily:'Poppins-Medium',
      fontSize:14
  },
  requestsModalHeadings:{ 
    fontSize:13,
    fontFamily:'Poppins-Medium'
  },
  requestsModalDiscriptions:{
    fontSize:13,
    fontFamily:'Poppins-Regular',
    color:colors.grey
  },
  dottedView:{  
    borderColor:'grey',
    borderWidth:0.5,
    borderStyle:'dashed',
    borderRadius:1,
  }
});
export default DashboardStyles;