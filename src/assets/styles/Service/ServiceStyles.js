import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../colors/colors';

const ServiceStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerBar: {
        backgroundColor: colors.headerBarPurple, 
        height: hp('8%'), 
        paddingVertical: wp('3%'),
        paddingHorizontal: wp('4%')
    },
    headerBarItems: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuIcon: {
        height: 18,
        width: 25
    },
    bellIcon: {
        height: 23,
        width: 18
    },
    headerText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        textAlign: 'center',
        color: colors.white,
        flex: 1,
        marginTop: 5
    },
    button: {
        height: 40,
    },
    textInputView: {
        borderWidth: 1,
        borderRadius: 6,
        flex: 1,
        marginRight: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        borderColor: colors.grey1,
    },
    textInput:{
        flex: 1,
        
        borderColor: colors.grey9,
        marginHorizontal: 10,
        fontFamily: "Poppins-Regular",
        paddingBottom: 7
    },
    iconStyle: {
        alignSelf: 'center', 
        alignItems: 'center', 
        marginLeft: 10
    },
    filterText: {
        fontFamily:'Poppins-Regular',
        fontSize:12,
        color:colors.grey
    },
    filterView: {
        flexDirection: "row", 
        justifyContent:"flex-end", 
        alignItems: "center", 
        marginTop: wp('3%'),
    },
    touchableOpacity: {
        flexDirection: "row", 
        justifyContent:"flex-end", 
        alignItems: "flex-end"
    },
    card: {
        paddingHorizontal: 10,
        paddingVertical:15, 
        marginHorizontal:2, 
        marginBottom: wp('4%'),
        marginTop: wp('2%'),
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.20,
        shadowRadius: 7.49,
        elevation: 4,
        position: "relative"
    }, 
    darkText: {
        color: colors.darkGrey,
        fontFamily: "Poppins-Medium",
        fontSize: wp('3.6%')
    },
    lightText: {
        color: colors.textGrey,
        fontFamily: "Poppins-Regular",
        fontSize: wp('3.6%')
    },
    dotIcon: {
        alignSelf: "flex-end", 
        // position: "absolute", 
 },
    navigationBar: {
        backgroundColor: colors.white, 
        height: hp('8%'), 
        paddingVertical: wp('3%'),
        paddingHorizontal: wp('4%'),
        flexDirection: "row",
        marginTop: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    navigationBarText: {
        fontFamily: "Poppins-Medium", 
        color: colors.grey4
    },
    navigationBarDisabledText: {
        fontFamily: "Poppins-Medium", 
        color: "grey"
    },
    navigationBarLine: {
        borderBottomColor: colors.blue,
        marginVertical: 5,
        borderBottomWidth: 2
    },
    navigationBarHidden: {
        borderBottomColor: colors.white,
        marginVertical: 5,
        borderBottomWidth: 2
    },
    titleInputField: {
        marginHorizontal: wp("3"),
        marginVertical: 5,
        fontFamily: "Poppins-SemiBold", 
        color: colors.grey
    },
    placeHolderText: {
        fontFamily: "Poppins-Regular", 
        color: colors.grey4, 
        fontSize: wp('4%')
    },
    greyBar: {
        backgroundColor: colors.grey5, 
        height: hp('5.5%'), 
        paddingTop: wp('1%'),
        justifyContent: "center",
        alignItems: "center"
    },
    nextButton: {
        height: hp('6.5%'),
        borderRadius: 5,
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 60,
    },
    phoneInputContainer: {
        marginHorizontal: 10, 
        width: wp("95"), 
        borderRadius: 4, 
        borderWidth: 1.5, 
        borderColor: colors.grey6
    },
    phoneInputTextInput: {
        fontFamily: "Poppins-Regular", 
        margin: 0, 
        padding: 0, 
        color: colors.grey4
    },
    phoneInputCodeText: {
        fontFamily: "Poppins-Regular", 
        color: colors.grey4
    },
    saveButtonText: {
        color: colors.white, 
        fontFamily: "Poppins-SemiBold", 
        marginTop: 3
    },
    modalContainer: {
        // padding: hp('4%'),
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.grey7
    },
    modalImageContainer: {
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10,
        overflow: "hidden",
        // borderWidth: 3,
        // borderColor: colors.grey6,
        justifyContent: "center",
        alignItems: "center"
    },
    modalImage: {
        height: hp('15%'), 
        width: wp('110%'), 
        // marginTop: 20,
    },
    modalLightText: {
        marginTop: 20, 
        fontFamily: "Poppins-SemiBold", 
        alignSelf: "center",
        color: colors.grey8
    },
    modalBoldText: {
        marginTop: 20, 
        fontFamily: "Poppins-SemiBold", 
        alignSelf: "center",
        color: colors.grey4
    },
    modalVerticalLine: {
        // borderWidth:1.5, 
        marginTop: 20, 
        width: wp('90%'), 
        color: colors.purple
    },
    modalForScriptDelete: {
       flexDirection:"row", 
        marginTop: 20, 
        width: wp('90%'), 
        color: colors.purple,
        justifyContent: "center",
        alignItems: "center"
    },
    modalButton: {
        marginHorizontal: 30, 
        marginBottom: 20, 
        alignItems: "center"
    },
    deleteModalButtonLeft: {
        flex: 1,
        // marginHorizontal: 5, 
        // paddingHorizontal: 30, 
        // paddingVertical: 10, 
        // marginBottom: 20, 
        height: hp('7%'),
        alignItems: "center",
        justifyContent: 'center',
        borderBottomLeftRadius: 10, 
        backgroundColor: colors.purple
    },
    deleteModalButtonRight: {
        flex: 1,
        // marginHorizontal: 5, 
        // paddingHorizontal: 30, 
        // paddingVertical: 10, 
        // marginBottom: 20, 
        height: hp('7%'),
        alignItems: "center",
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        backgroundColor: colors.purple
    },
    modalButtonText: {
        fontFamily: "Poppins-SemiBold", 
        color: colors.blue
    },
    modalButtonTextForDeleteButton: {
        fontFamily: "Poppins-SemiBold", 
        color: colors.blue,
        textAlign:"center",
        paddingVertical:20


    },
    deleteModalButtonText: {
        fontFamily: "Poppins-Regular", 
        color: colors.white
    },
    indexNumber: {
        color: colors.darkGrey, 
        fontFamily: "Poppins-Regular"
    },
    indexLimit: {
        fontFamily: "Poppins-Regular", 
        color: colors.grey
    },
    serviceNameInputField: {
        marginHorizontal: 10, 
        height: 50, 
        borderColor: colors.white1, 
        borderWidth: 1.5, 
        fontFamily: "Poppins-Regular",
        borderRadius: 4,
        paddingLeft: 15,
        backgroundColor:"transparent"
    },
    serviceNameInputFieldForDropDown: {
        marginHorizontal: 10, 
        height: 50, 
        borderColor: colors.white1, 
        borderWidth: 1.5, 
        // fontFamily: "Poppins-Regular",
        borderRadius: 4,
        backgroundColor:"transparent"
    } 
});

export default ServiceStyles;