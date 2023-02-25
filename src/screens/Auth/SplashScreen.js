import React, {useState, useContext, useEffect} from 'react';
import {Image, View, StatusBar,SafeAreaView} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../context/AppContext';
import Amplify, {Auth} from 'aws-amplify';
import config from '../../aws/aws-export';

Amplify.configure(config);

const FakeSplashScreen = ({navigation}) => {
  const {
    storeEmail,
    storeFirstName,
    storeLastName,
    storePhone,
    storeToken,
  } = useContext(AppContext);

  const validateUserSession = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn !== null && isLoggedIn == '1') {
        storeEmail(await AsyncStorage.getItem('email'));
        storeFirstName(await AsyncStorage.getItem('name'));
        storeLastName(await AsyncStorage.getItem('lastname'));
        storePhone(await AsyncStorage.getItem('phone_number'));
        navigation.replace('Dashboard');
      } else {
        navigation.replace('GettingStarted');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    
    Auth.currentSession()
      .then((data) => {
        console.log(data);
        // console.log(data.idToken.jwtToken);
        storeToken(data.idToken.jwtToken);
        validateUserSession();
      })
      .catch((err) => {
        navigation.replace('GettingStarted');
      });
    
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar hidden={true} />
      <Image
        style={{
          height: hp('100%'),
          width: wp('100%'),
          
        }}
        source={require('../../assets/images/Splash.png')}
      />
    </View>
  );
};

export default withNavigation(FakeSplashScreen);