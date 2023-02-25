import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../colors/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ContainerStyle = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  safeAreaContainerAuth: {
    flex: 1,
    justifyContent: 'center',
  },
  
  container: {
    flex: 1,
    paddingHorizontal: wp('10%'),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  sliderContainer: {
    flex: 1,
    // paddingHorizontal: wp('5%'),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  containerFluid: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: colors.white,
  }
});

export default ContainerStyle;
