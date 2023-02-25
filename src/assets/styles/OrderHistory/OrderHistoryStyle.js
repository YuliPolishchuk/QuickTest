import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../colors/colors';

const OrderHistoryStyle = StyleSheet.create({
    container: {
        paddingHorizontal: wp('5%'), 
        paddingVertical: wp('7%')
    }, 
    heading: {
        fontFamily: "Poppins-Regular", 
        fontSize: wp('4.8%'), 
        color: colors.grey4
    },
    currentCard: {
        borderColor: colors.purple,
        borderWidth: 1.5,
        marginVertical: wp('5%'),
        borderRadius: wp('3%')
    },
    premiumText :{
        fontFamily: "Poppins-Bold",
        color: colors.darkPurple,
        fontSize: wp('3.5%')
    },
    upgradeText: {
        fontFamily: "Poppins-Regular",
        color: colors.purple,
        fontSize: wp('3%'),
        textDecorationLine: 'underline',
    },
    dateText: {
        fontFamily: "Poppins-Regular",
        color: colors.grey8,
        fontSize: wp('4%'),
    },
    date: {
        fontFamily: "Poppins-Regular",
        color: colors.grey4,
        fontSize: wp('4%'),
    },
    borderLine: {
        borderWidth: 1,
        borderColor: colors.grey5
    },
    editPlan: {
        fontFamily: "Poppins-Regular",
        color: colors.purple,
        fontSize: wp('3.2%'),
        marginTop: wp('1%')
    },
    dot: {
        color: colors.purple,
        fontFamily: "Poppins-Bold",
    },
    dateContainer: {
        flexDirection: "row",
        marginVertical: wp('2%')
    },
    editPlanContainer: {
        flexDirection: "row", 
        justifyContent: "space-around", 
        marginTop: wp('2%')
    },
    historyCard: {
        backgroundColor: colors.white2,
        marginVertical: wp('5%'),
        elevation: 3,
        borderRadius: wp('3%')
    },
    cardHeaderContainer: {
        flexDirection: "row", 
        justifyContent: "space-between"
    },
    plan: {
        fontFamily: "Poppins-Regular",
        color: colors.darkGrey,
        fontSize: wp('4%'),
    },
    planHistory: {
        fontFamily: "Poppins-Regular",
        color: colors.darkGrey,
        fontSize: wp('4%'),
        marginLeft: wp('3%')
    },
    planName: {
        fontFamily: "Poppins-SemiBold",
        color: colors.darkPurple
    },
    planContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    planCardHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    price: {
        fontFamily: "Poppins-Bold",
        color: colors.darkBlue,
        fontSize: wp('5%')
    },
    historyDate: {
        color: colors.textGrey,
        fontFamily: "Poppins-Regular"
    },
    starImage: {
        height: 10, 
        width: 10,
        margin: 3
    },
});

export default OrderHistoryStyle;