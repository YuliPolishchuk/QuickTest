import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../colors/colors';

const ProfileStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp('5%'), 
        paddingVertical: wp('7%')
    }, 
    updateButton: {
        height: hp('6.5%'),
        borderRadius: 5,
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
        // marginVertical: 10,
        marginBottom: 20,
    },
    updateButtonText: {
        color: colors.white, 
        fontFamily: "Poppins-SemiBold", 
        marginTop: 3
    },
    labelText: {
        fontFamily: "Poppins-Regular", 
        fontSize: wp('4.5%'), 
        color: colors.grey12
    },
    errorLabelText: {
        color: colors.red, 
        fontFamily: "Poppins-Regular",
        marginTop: 5,
    },
    labelTextInput: {
        fontFamily: "Poppins-Regular", 
        fontSize: wp('4.5%'), 
        color: colors.grey12, 
        marginTop: wp('4%')
    },
    textInput: {
        height: hp('7%'),
        borderColor: colors.grey9,
        borderRadius: wp('1%'),
        marginVertical: wp('3%'),
        fontFamily: "Poppins-Regular",
        paddingLeft: wp('4%'),
        borderWidth: 1,
        paddingBottom: wp('1.5%'),
        fontSize: wp('4.5%'),
        marginTop: wp('2%'),
        color: colors.grey4,
    },
    changePasswordTextinputContainer: {
        height: hp('7%'),
        marginTop: wp('2%'),
        borderRadius: wp('1%'),
        borderWidth: 1,
        borderColor: colors.grey9,
        marginVertical: wp('3%'),
        // padding: 0,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    changePasswordTextinput: {
        flex: 1, 
        fontSize: wp('4.5%'),  
        fontFamily: "Poppins-Regular", 
        paddingTop: 5, 
        paddingBottom: 0, 
        padding: 0
    },
    phoneInputContainer: {
        // marginHorizontal: 10, 
        width: wp('90%'), 
        borderRadius: 4, 
        borderWidth: 1.5, 
        borderColor: colors.grey6
    },
});

export default ProfileStyle;