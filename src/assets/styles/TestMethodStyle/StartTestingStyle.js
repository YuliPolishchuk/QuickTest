import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../colors/colors';
// import GeneralProperties from './GeneralProperties';
const StartTestingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    paddingHorizontal: wp('4%'), 
    paddingVertical: wp('2%')
  },
  actualResultCard: {
    paddingHorizontal: wp('2%'), 
    paddingVertical: wp('2%'), 
    // justifyContent: "center", 
    // alignItems: 'center', 
    elevation: 4,
  },
  actualCardSmall: {
    margin: wp('2%'), 
    padding: wp('3%'), 
    width: wp('55%'), 
    // height: hp('12%'), 
    elevation: 2
  },
  actualCardSmallLoadTest: {
    margin: wp('2%'), 
    padding: wp('3%'), 
    width: wp('85%'), 
    // height: hp('12%'), 
    elevation: 2
  },
  actualCardLong: {
    margin: wp('2%'), 
    padding: wp('3%'),
    height: hp('12%'), 
    elevation: 2
  },
  expectedCard: {
    paddingHorizontal: wp('2%'), 
    paddingVertical: wp('2%'), 
    // height: hp('24%'), 
    elevation: 4, 
    marginVertical: wp('2%')
  },
  expectedCardSmall: {
    margin: wp('1%'), 
    // height: hp('10%'), 
    width: wp('75%'), 
    elevation: 2
  },
  confidenceView: {
    borderRadius: wp('3%'), 
    padding: wp('3%'), 
    backgroundColor: '#C4E5FF',
    marginVertical: wp('2%') 
  },
  headingHistoryText: {
    fontFamily: 'Poppins-SemiBold', 
    fontSize: wp('3.5%'), 
    color: colors.grey,
    marginVertical: wp('5'),
    alignSelf:"flex-end"
  },
  headingText: {
    fontFamily: 'Poppins-SemiBold', 
    fontSize: wp('3.5%'), 
    color: colors.grey
  },
  expectedHeadingText: {
    fontFamily: 'Poppins-SemiBold', 
    fontSize: wp('4%'),
  },
  expectedText: {
    fontFamily: 'Poppins-Regular', 
    fontSize: wp('3.5%'),
  },
  button: {
    height: hp('6%'),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange,
    marginVertical: wp('3%'),
    width: wp('50%')
  },
  buttonContainer: {
    marginVertical: wp('2%'),
    borderColor: colors.orange, 
    borderWidth: 1, 
    borderRadius: 50, 
    height: hp('8%'),
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp('54.5%'),
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: wp('2%'),
    backgroundColor: colors.white
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: wp('4%'),
    color: colors.white
  },

});
export default StartTestingStyle;
