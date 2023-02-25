import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../colors/colors';
// import GeneralProperties from './GeneralProperties';
const TestMethod = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ViewNotification: {
    backgroundColor: 'white',
    borderColor: colors.grey1,
    borderBottomWidth: 3,
    paddingTop: hp('5%'),
    marginHorizontal: wp('4%'),
    fontFamily: 'Poppins-Regular',
  },
  labelMargin: {
    fontFamily: 'Poppins-Regular',
  },
  containerBackground: {
    backgroundColor: 'white',
  },
  container2: {
    flexDirection: 'row',
    marginHorizontal: wp('3%'),
    marginBottom: wp('15%'),
    marginVertical: hp('2%'),
    backgroundColor: colors.white,
  },
  button: {
    // fontWeight: 'bold',
    fontSize: 14,
  },
  allButton: {
    // borderBottomWidth: 3,
    // borderColor: colors.blue,
    color: colors.blue,
  },

  textCardYellow: {
    fontFamily: 'Poppins-Medium',
    color: colors.yellow,
    fontSize: 14,
  },
  textCardGreen: {
    fontFamily: 'Poppins-Medium',
    color: colors.green,
    fontSize: 14,
  },
  textCardRed: {
    fontFamily: 'Poppins-Medium',
    color: colors.red,
    fontSize: 14,
  },
  ButtonStyle: {
    marginTop: hp('2%'),
    marginHorizontal: wp('0.5%'),
    backgroundColor: colors.grey1,
    fontFamily: 'Poppins-Meduim',
  },
  scrollview: {
    margin: wp('2.5%'),
  },
  Steps: {
    backgroundColor: colors.grey1,
    padding: wp('2%'),
    alignItems: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  viewBorderLeftGreen: {
    backgroundColor: colors.green,
    width: 6,
    height: 35,
    borderRadius: 50,
  },
  viewBorderLeftYellow: {
    backgroundColor: colors.yellow,
    width: 6,
    height: 35,
    borderRadius: 50,
  },
  SprintName: {
    marginHorizontal: hp('1%'),
    marginTop: hp('3%'),
    fontFamily: 'Poppins-Light',
  },
  TestMethodFormHeadings: {
    marginTop: hp('1%'),
    marginHorizontal: hp('2%'),
    color: colors.grey2,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  TestMethodError: {
    marginTop: hp('1%'),
    marginHorizontal: hp('2%'),
    color: "red",
    fontFamily: 'Poppins-Bold',
    
  },
  label: {
    // marginHorizontal: hp('2%'),
    marginLeft:10,
    color: colors.grey2,
    fontFamily: 'Poppins-Light',
  },
  labelForDateTimeScheduleCard: {
    marginHorizontal: hp('1%'),
   
    color: colors.grey2,
    fontFamily: 'Poppins-Bold',
  },
  label1: {
    marginHorizontal: hp('2%'),
    marginTop: hp('1%'),
    color: colors.grey2,
    fontFamily: 'Poppins-Light',
  },

  label2: {
    marginTop: hp('1%'),
    color: colors.grey2,
    fontFamily: 'Poppins-Light',
  },
  label3: {
    marginHorizontal: hp('1%'),
    color: colors.grey4,
    fontFamily: 'Poppins-Regular',
  },
  labelHeight: {
    marginHorizontal: hp('1%'),
    color: colors.grey4,
    fontFamily: 'Poppins-Regular',
    width: wp('85%'),
  },
  labelBold: {
    color: colors.grey3,
    fontWeight: 'bold',
    marginTop: hp('1%'),
    fontFamily: 'Poppins-SemiBold',
  },
  labelBoldText: {
    fontWeight: 'bold',
    marginTop: hp('1%'),
    fontFamily: 'Poppins-SemiBold',
  },
  label1Bold: {
    marginHorizontal: hp('2%'),
    marginTop: hp('3%'),
    color: colors.grey3,
    fontFamily: 'Poppins-SemiBold',
  },
  timeStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  label2Bold: {
    marginHorizontal: hp('2%'),
    color: colors.grey3,
    fontFamily: 'Poppins-SemiBold',
  },
  NextButton: {
    backgroundColor: colors.yellow,
    marginHorizontal: wp('3%'),
    marginVertical: wp('3%'),
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  OutlinedButton: {
    marginHorizontal: wp('3%'),
    marginVertical: wp('3%'),
    color: 'white',
    borderColor: colors.yellow,
    color: colors.yellow,
  },

  filterCard: {
    flexDirection: 'row',
    elevation: 1,
    padding: wp('3%'),
  },
  DashboardView: {
    flexDirection: 'row',
    paddingHorizontal: wp('3%'),
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgb(158,92,225)',
  },
  titleDashboard: {
    justifyContent: 'center',
    fontSize: wp('5%'),
    color: colors.white,
    fontFamily: 'Poppins-Medium',
  },

  active: {
    margin: wp('2%'),
    borderBottomColor: colors.grey4,
    borderBottomWidth: 2,
    color: colors.grey4,
    fontFamily: 'Poppins-Medium',
  },
  disable: {
    margin: wp('2%'),
    color: colors.grey2,
    fontFamily: 'Poppins-Regular',
  },
  textInputRow: {
    flex: 1,
    width: wp('40%'),
    marginHorizontal: hp('2%'),
    backgroundColor: 'transparent',
    height: wp('12%'),
  },
  redText: {
    color: colors.red,
    marginHorizontal: wp('3%'),
    fontFamily: 'Poppins-Light',
  },
  InputViewRow: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'stretch',
  },
  ViewFilter: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
  },
  positionAbsolute: {
    position: 'absolute',
    bottom: 0,
  },
  filterText: {
    fontSize: 13,
    marginHorizontal: 10,
    color: 'grey',
    fontFamily: 'Poppins-Regular',
  },

  Card: {
    fontWeight: 'bold',
    marginHorizontal: wp('2%'),
  },
  clearAll: {
    position: 'absolute',
    right: 0,
    marginHorizontal: 10,
    fontFamily: 'Poppins-SemiBold',
    color: colors.blue,
  },
  filterBy: {
    marginHorizontal: wp('2%'),
    fontFamily: 'Poppins-SemiBold',
  },
  applyCard: {
    flexDirection: 'row',
    borderColor: colors.grey2,
    elevation: 5,
    bottom: 0,
    padding: wp('3%'),
  },

  applyText: {
    position: 'absolute',
    right: 0,
    marginHorizontal: wp('2%'),
    fontFamily: 'Poppins-SemiBold',
    color: colors.blue,
  },

  CloseText: {
    marginHorizontal: 10,
    fontFamily: 'Poppins-SemiBold',
  },

  allSprints: {
    fontSize: 16,
    marginHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },

  filterView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
  },
  filterText: {
    fontSize: wp('4%'),
    marginHorizontal: 10,
    color: 'grey',
    fontFamily: 'Poppins-Medium',
  },

  testCard: {
    color: colors.grey3,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  testCardText: {
    fontWeight: 'bold',
    color: colors.grey3,
    margin: wp('3%'),
    fontFamily: 'Poppins-Medium',
  },
  testCardText2: {
    fontWeight: 'bold',
    color: colors.grey3,
    marginHorizontal: wp('3%'),
    marginVertical: hp('0.2%'),
    fontFamily: 'Poppins-Medium',
  },
  CardMargin: {
    fontWeight: 'bold',
    color: colors.grey3,
    marginHorizontal: wp('3%'),
  },
  testDetail: {
    color: colors.grey2,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    flex: 4,
  },

  textCardView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 4,
    margin: 10,
    borderRadius: 5,
  },
  testCardView: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  threeIcon: {
    position: 'absolute',
    right: 0,
    top: 7,
    // width:wp("20%")
  },
  threeIcons: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  menuOptionStyling: {
    backgroundColor: 'white',
    width: wp('88%'),
    position: 'relative',
    right: 110,
    borderRadius: 5,
    elevation: 5,
    paddingRight: 15,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
  },
  allSprintView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  textInput: {
    marginHorizontal: hp('2%'),
    backgroundColor: 'transparent',
    fontFamily: 'Poppins-Regular',
    height: 40,
  },
  textInputFlex: {
    flex: 1,
    marginHorizontal: hp('2%'),
    backgroundColor: 'transparent',
    fontFamily: 'Poppins-Regular',
    height: 40,
  },
  radioView: {
    flexDirection: 'row',
    marginVertical: hp('1%'),
    borderWidth: 1,
    borderColor: colors.grey1,
    margin: wp('3%'),
    borderRadius: 5,
    marginTop: hp('3.5%'),
  },
  CardStyling: {
    elevation: 5,
  },
  testRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  flexRow: {
    flexDirection: 'row',
  },
  selectedDate: {
    flex: 1,
    borderColor: colors.grey10,
    borderWidth: 2,
    flexDirection: 'row',
    marginHorizontal: hp('1%'),
    marginVertical: hp('1%'),
    borderRadius: 5,
    
    paddingVertical: 10,
    justifyContent:"center",
    alignItems: 'center',
  },
  cardFlatList: {
    marginHorizontal: hp('2%'),
    marginVertical: hp('1%'),
    borderRadius: 5,
    paddingVertical: 5,
  },
  selectedDateForButton: {
    flex: 1,

    flexDirection: 'row',
    marginHorizontal: hp('2%'),
    marginVertical: hp('1%'),
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedDateForDropDown: {
    flex: 1,
    borderColor: colors.grey2,
    borderWidth: 2,
    flexDirection: 'row',
    marginHorizontal: hp('2%'),
    marginVertical: hp('1%'),
    borderRadius: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
  },
  selectChannelStyles: {
    borderColor: colors.grey2,
    borderWidth: 2,
    marginHorizontal: hp('2%'),
    marginVertical: hp('1%'),
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 45,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins-Regular'
  },
  selectedDateIcon: {
    backgroundColor: colors.grey1,
    paddingVertical: wp('2%'),
    paddingHorizontal: wp('3%'),
    position: 'absolute',
    right: 0,
    borderRadius: 4,
  },
  purpleTexts: {
    color: colors.purple,
  },
  purpleTextBold: {
    color: colors.purple,
    fontWeight: 'bold',
  },
  textAlign: {
    textAlign: 'center',
  },
  textAlign2: {
    textAlign: 'center',
    color: colors.grey2,
  },
  testalignRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: wp('10%'),
  },
  dotedBorder: {
    paddingVertical: wp('10%'),
    marginHorizontal: wp('4%'),
    marginVertical: hp('3%'),
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.grey2,
  },
  radioText: {
    color: colors.grey2,
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
  },
  selectedOption: {
    borderColor: colors.grey2,
    borderWidth: 1,
    marginHorizontal: wp('3.5%'),
    borderRadius: 5,
    fontFamily: 'Poppins-Regular',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchContainer2: {
    borderWidth: 1,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    borderColor: colors.grey1,
  },
  iconStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
  },
  searchInput: {
    flex: 1,
    height: wp('11%'),
    borderColor: 'gray',
    marginHorizontal: wp('2%'),
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  fontRegular: {
    fontFamily: 'Poppins-Regular',
  },
  fontSemiBold: {
    fontFamily: 'Poppins-SemiBold',
  },
  fontLight: {
    fontFamily: 'Poppins-Light',
  },
});
export default TestMethod;
