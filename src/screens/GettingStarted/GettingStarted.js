import React, {useState, useRef} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';
import {HelperText, withTheme, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';
import GettingStartedStyles from '../../assets/styles/GettingStartedStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import ContainerStyle from '../../assets/styles/ContainerStyle';

const GettingStarted = ({navigation}) => {
  const swiperRef = useRef(null);
  const [showGettingStartedButton, setShowGetStartingButton] = useState(false);
  return (
    <SafeAreaView style={ContainerStyle.safeAreaContainer}>
      {Platform.OS == 'ios' ? null : (
        <StatusBar
          hidden={false}
          backgroundColor={colors.white}
          barStyle="dark-content"
        />
      )}
      <View style={GettingStartedStyles.container}>
        <Image
          style={GettingStartedStyles.logo}
          source={require('../../assets/images/logo.png')}
        />
        <Swiper
          ref={swiperRef}
          autoplay={false}
          loop={false}
          onIndexChanged={(index) => {
            if (index == 2) {
              setShowGetStartingButton(true);
              console.log(index);
            }
          }}
          // showsButtons={true}
          activeDotColor={colors.darkPurple}
          index={0}
          activeDotStyle={{bottom: 20}}
          dotStyle={{bottom: 20}}>
          <View style={GettingStartedStyles.sliderContainer}>
            <Image
              style={GettingStartedStyles.sliderImage}
              source={require('../../assets/images/Slider1.png')}
            />
            <Text style={GettingStartedStyles.heading}>
              Scalability in Testing
            </Text>
            <Text style={GettingStartedStyles.discription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              pulvinar eros in neque ultrices, vel gravida massa sodales.
            </Text>
          </View>
          <View style={GettingStartedStyles.sliderContainer}>
            <Image
              style={GettingStartedStyles.sliderImage}
              source={require('../../assets/images/Slider2.png')}
            />
            <Text style={GettingStartedStyles.heading}>
              Reliability in Reports
            </Text>
            <Text style={GettingStartedStyles.discription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              pulvinar eros in neque ultrices, vel gravida massa sodales.
            </Text>
          </View>
          <View style={GettingStartedStyles.sliderContainer}>
            <Image
              style={GettingStartedStyles.sliderImage3}
              source={require('../../assets/images/Slider3.png')}
            />
            <Text style={GettingStartedStyles.heading}>
              Flexibility in Membership Plans
            </Text>
            <Text style={GettingStartedStyles.discription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              pulvinar eros in neque ultrices, vel gravida massa sodales.
            </Text>
          </View>
        </Swiper>
        {showGettingStartedButton == false ? (
          <TouchableOpacity
            onPress={() => {
              navigation.replace('LoginRegister');
            }}>
            <Text style={GettingStartedStyles.skipStyle}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <Button
            onPress={() => {
              navigation.replace('LoginRegister');
            }}
            style={GettingStartedStyles.button}
            mode="contained">
            Getting Started
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};
export default withTheme(withNavigation(GettingStarted));
