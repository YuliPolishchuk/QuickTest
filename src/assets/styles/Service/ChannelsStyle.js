import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../colors/colors';

const ChannelsStyle = StyleSheet.create({

    radioButton: {
        flexDirection: 'row',
        marginVertical: hp('1%'),
        borderWidth: 1,
        borderColor: colors.grey6,
        margin: wp('3%'),
        borderRadius: 5,
        marginTop: hp('3.5%')
    },
    nextButton: {
        height: hp('6.5%'),
        borderRadius: 5,
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 25,
    },
    radioButtonText: {
        color: colors.grey4,
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: "Poppins-Regular",
        marginTop: 5
    }
});

export default ChannelsStyle;