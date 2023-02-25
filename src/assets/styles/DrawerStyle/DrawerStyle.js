import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../colors/colors';

const DrawerStyle = StyleSheet.create({
    imageContainer: {
        alignItems: "center", 
        backgroundColor: colors.greyWhite
    },
    imageCircularView: {
        marginTop: wp('5%'), 
        height: 100, 
        width: 100, 
        borderColor: 'purple', 
        borderWidth: 1.5, 
        borderRadius: 100, 
        justifyContent: "center", 
        alignItems: "center"
    },
    image: {
        height: 93, 
        width: 93, 
        borderRadius: 93
    }, 
    userName: {
        marginVertical: wp('3%'), 
        fontFamily: "Poppins-Regular", 
        fontSize: wp('7%'),
        color: colors.grey11
    },
    drawerStack: {
        paddingHorizontal: wp('4%'), 
        height: hp('9%'), 
        justifyContent: "space-between", 
        alignItems: "center", 
        flexDirection: 'row'
    },
    drawerScreens: {
        fontFamily: "Poppins-Regular",
        fontSize: wp('5%'), 
        marginTop: wp('1%'),
        color: colors.textGrey
    }
});

export default DrawerStyle;