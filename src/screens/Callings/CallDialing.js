import React, {useState, useEffect, useContext} from 'react';
import {Text, Platform, StatusBar, SafeAreaView, Button} from 'react-native';
import {withTheme} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import ContainerStyle from '../../assets/styles/ContainerStyle';
import TwilioVoice from 'react-native-twilio-programmable-voice';
import AppContext from '../../context/AppContext';
import colors from '../../assets/colors/colors';

const CallDialing = ({navigation}) => {
  const {token} = useContext(AppContext);
  const initTelephony = async () => {
    try {
      // const accessToken = await getAccessTokenFromServer()
      // const success = await TwilioVoice.initWithToken('9ebd4d091c000427f704fb8d0b35a068');
      const success = await TwilioVoice.initWithToken(token);
      TwilioVoice.configureCallKit({
        appName: 'QuickTest',
      });
      console.log('success');
    } catch (err) {
      console.log(err);
    }
  };

  TwilioVoice.addEventListener('deviceReady', () => {
    console.log('Device Is ready.');
  });
  TwilioVoice.addEventListener('deviceNotReady', function (data) {
    console.log(data);
  });

  useEffect(() => {
    initTelephony();
  }, []);
  return (
    <SafeAreaView style={ContainerStyle.safeAreaContainer}>
      {Platform.OS == 'ios' ? null : (
        <StatusBar
          hidden={false}
          backgroundColor={colors.purple}
          barStyle="light-content"
        />
      )}
      <Text>Hello Call Dialing</Text>
      <Button
        onPress={() => {
          console.log('call');
        }}
        title="Please Call"></Button>
    </SafeAreaView>
  );
};
export default withTheme(withNavigation(CallDialing));
