import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../colors/colors';

const MembershipStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    container: {
        paddingHorizontal: wp('5%'),
        backgroundColor: colors.white,
    },
    navigationCard: {
        backgroundColor: colors.white,
        borderRadius: wp('1.5%'),
        elevation: 2,
        marginVertical: wp('8%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: wp('4%'),
    }, 
    navCardContainer: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center"
    },
    image: {
        height: 15, 
        width: 20
    },
    cardText: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('4.5%'),
        color: colors.grey11
    },
    toggleSwitchContainer: {
        borderColor: colors.headerBarPurple, 
        borderWidth: 1, 
        borderRadius: 50, 
        height: hp('10%'),
        flexDirection: "row",
        justifyContent: "space-between",
        width: wp('75%'),
        alignSelf: "center",
        alignItems: "center",
        paddingHorizontal: wp('2%'),
        backgroundColor: colors.white
    },
    toggleTrue: {
        height: hp('8%'),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.headerBarPurple,
        marginVertical: wp('3%'),
        width: wp('70%')
    },
    toggleTrueText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: wp('5%'),
        color: colors.white
    },
    toggleFalse: {
        height: hp('8%'),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        marginVertical: wp('3%'),
        width: wp('35%')
    },
    toggleFalseText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: wp('5%'),
        color: colors.headerBarPurple
    },
    buyNowButton: {
        height: hp('7%'),
        borderRadius: 5,
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp('10%'),
        // marginVertical: 10,
        marginBottom: 20,
    },
    activeButton: {
        height: hp('7%'),
        borderRadius: 5,
        // backgroundColor: colors.grey5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp('10%'),
        // marginVertical: 10,
        marginBottom: 20,
    },
    activeButtonText: {
        color: colors.green, 
        fontFamily: "Poppins-SemiBold", 
        marginTop: 3
    },
    enterpriseBuyNow: {
        height: hp('7%'),
        borderRadius: 5,
        backgroundColor: "blue",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp('10%'),
        // marginVertical: 10,
        marginBottom: 20,
    },
    unlimitedBuyNow: {
        height: hp('7%'),
        borderRadius: 5,
        backgroundColor: colors.purple,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp('10%'),
        // marginVertical: 10,
        marginBottom: 20,
    },
    enterpriseButtonText: {
        color: colors.white, 
        fontFamily: "Poppins-SemiBold", 
        marginTop: 3
    },
    cardContainer: {
        marginTop: wp('8%'), 
        alignSelf: "center", 
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    unlimintedCardContainer: {
        marginVertical: wp('8%'), 
        marginBottom: wp('8%'), 
        alignSelf: "center", 
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    basicCard: {
        // justifyContent: "center",
        // alignItems: "center",
        elevation: 3,
        borderTopColor: colors.orange,
        borderTopWidth: 10,
        backgroundColor: colors.white,
        width: wp('65%'),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    premiumCard: {
        // justifyContent: "center",
        // alignItems: "center",
        elevation: 3,
        borderTopColor: colors.green,
        borderTopWidth: 10,
        backgroundColor: colors.white,
        width: wp('65%'),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    enterpriseCard: {
        // justifyContent: "center",
        // alignItems: "center",
        elevation: 3,
        borderTopColor: "blue",
        borderTopWidth: 10,
        backgroundColor: colors.white,
        width: wp('65%'),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    unlimitedCard: {
        // justifyContent: "center",
        // alignItems: "center",
        elevation: 3,
        borderTopColor: colors.purple,
        borderTopWidth: 10,
        backgroundColor: colors.white,
        width: wp('65%'),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    cardContent: {
        marginVertical: wp('5%'), 
        justifyContent: "center", 
        alignItems: "center"
    },
    cardTitle: {
        fontFamily: "Poppins-SemiBold", 
        fontSize: wp('6%')
    },
    basicPrice: {
        fontFamily: "Poppins-Bold", 
        fontSize: wp('7%'), 
        color: colors.orange
    },
    premiumPrice: {
        fontFamily: "Poppins-Bold", 
        fontSize: wp('7%'), 
        color: colors.green
    },
    enterprisePrice: {
        fontFamily: "Poppins-Bold", 
        fontSize: wp('7%'), 
        color: "blue"
    },
    unlimitedPrice: {
        fontFamily: "Poppins-Bold", 
        fontSize: wp('7%'), 
        color: colors.purple
    },
    cardBill: {
        fontFamily: "Poppins-Regular", 
        fontSize: wp('5%'), 
        color: colors.textGrey
    },
    borderLine: {
        borderWidth: 1, 
        borderColor: colors.white1
    },
    textContainer: {
        marginVertical: wp('5%'), 
        marginLeft: wp('8%'), 
        flexDirection: "row"
    },
    textActive: {
        fontSize: wp('4.5%'), 
        fontFamily: "Poppins-Regular", 
        color: colors.grey4
    },
    shortBorderLine: {
        borderWidth: 1, 
        borderColor: colors.white1, 
        marginHorizontal: wp('8%')
    },
    textDeactivated: {
        fontSize: wp('4.5%'), 
        fontFamily: "Poppins-Regular", 
        color: colors.textGrey
    },
    cutText: {
        fontFamily: "Poppins-Regular", 
        color: colors.textGrey, 
        textDecorationLine: 'line-through', 
        fontSize: wp('4%'), 
        marginTop: wp('2.5%')
    },
    modalContainer: {
        // padding: hp('4%'),
        flexDirection: "row",
        backgroundColor: colors.white,
        width: wp('90%'),
        // height: wp('133%'),
        // borderRadius: 10,
        // borderWidth: 1,
        borderColor: colors.grey7,
    },
    modalListConatiner: {
        // flex: 1,
        // borderRadius: 10, 
        backgroundColor: colors.white1, 
        paddingHorizontal: wp('3%'), 
        paddingVertical: wp('4%'),
        width: wp('40%'),
    },
    modalListConatinerForMembershipTypes: {
       backgroundColor: colors.white, 
        paddingHorizontal: wp('3%'), 
        paddingVertical: wp('4%'),
        width: wp('15%'),
    },
    modalListConatinerForMembershipTypeProfessional: {
        backgroundColor: colors.white, 
         paddingHorizontal: wp('3%'), 
         paddingVertical: wp('4%'),
         width: wp('15%'),
     },
    modalListConatinerForMembershipTypeAdvance: {
        backgroundColor: colors.white, 
         paddingHorizontal: wp('3%'), 
         paddingVertical: wp('4%'),
         width: wp('15%'),
     },
    modalCheckListConatiner: {
        // flex: 1,
        borderRadius: 10, 
        backgroundColor: colors.white, 
        paddingHorizontal: wp('3%'), 
        paddingVertical: wp('4%'),
        width: wp('45%'),
        // alignItems: "flex-end"
    },
    modalListHeading: {
        fontFamily: "Poppins-SemiBold", 
        fontSize: wp('4.5%'), 
        color: colors.grey4,
        marginTop: wp('2%')
    },
    modalListHeadingForMembershipType: {
        fontFamily: "Poppins-Bold", 
        fontSize: wp('2.5%'), 
        color: colors.grey4,
        marginTop: wp('2%'),
        textAlign: "center"
    },
    modalBasicCheckListHeading: {
        fontFamily: "Poppins-SemiBold", 
        fontSize: wp('4.5%'), 
        color: colors.orange,
        marginTop: wp('2%')
    },
    modalPremiumCheckListHeading: {
        fontFamily: "Poppins-SemiBold", 
        fontSize: wp('4.5%'), 
        color: colors.green,
        marginTop: wp('2%'),
        marginLeft: 20
    },
    modalEnterpriseCheckListHeading: {
        fontFamily: "Poppins-SemiBold", 
        fontSize: wp('4.5%'), 
        color: "blue",
        marginTop: wp('2%'),
        marginLeft: 20
    },
    modalUnlimitedCheckListHeading: {
        fontFamily: "Poppins-SemiBold", 
        fontSize: wp('4.5%'), 
        color: colors.purple,
        marginTop: wp('2%'),
        marginLeft: 20
    },
    modalList: {
        fontFamily: "Poppins-Regular", 
        fontSize: wp('4%'), 
        color: colors.grey4,
        marginTop: wp('2%')
    },
});

export default MembershipStyle;