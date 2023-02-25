import React, {useState, useContext} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import {
  Card,
  HelperText,
  withTheme,
  Button,
  TextInput,
} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VerificationStyles from '../../assets/styles/AuthStyles/VerificationStyles';
import colors from '../../assets/colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginRegisterStyles from '../../assets/styles/AuthStyles/LoginRegisterStyles';
import Amplify, {Auth} from 'aws-amplify';
import AppContext from '../../context/AppContext';
import ContainerStyle from '../../assets/styles/ContainerStyle';

const RecoveryEmail = ({navigation}) => {
  const { regex,} = useContext(AppContext);
  const [verificationLoading, setVerificationLoading] = useState(false);

  // State variables to send with aws request.
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailVerification, setEmailVerification] = useState('');
  const [emailChecker, setEmailChecker] = useState(false);

  const forgotPassword = async (email) => {

    await Auth.forgotPassword(email)
      .then(data => {
        navigation.navigate('ResetPassword', {email: email})
        setVerificationLoading(false);
      })
      .catch(err => {
        setEmailMessage(err);
        console.log(err);
      });
  };

  const validate = (text) => {
    if (regex.test(text) === false) {
      setEmailChecker(false);
      
      return false;
    } else {
      setEmailChecker(true);
      return true;
    }
  };

  return (
    <View style={ContainerStyle.safeAreaContainer}>
      {Platform.OS == 'ios' ? null : (
        <StatusBar
          hidden={false}
          backgroundColor={colors.white}
          barStyle="dark-content"
        />
      )}
      <KeyboardAvoidingView
        behavior="position"
        style={VerificationStyles.container}>
        <Image
          source={require('../../assets/images/CardBase2x.png')}
          style={VerificationStyles.backgroundImage}
        />
        <View style={{position:"absolute",top:wp(20)}}>
          <Text style={VerificationStyles.VerificationHeading}>
            Recovery Password
          </Text>
          <Text style={VerificationStyles.VerificationDiscription}>
            Once you verify your Email Address you'll be able to proceed to
            Reset your password.
          </Text>
          <Card style={[VerificationStyles.card, {paddingVertical: wp('10%')}]}>
            {/* <Text style={VerificationStyles.mailDiscripion}>
              We've sent you Verification Mail
            </Text> */}
            <Image
              style={VerificationStyles.mailImage}
              source={require('../../assets/images/Mail.png')}
            />
            <TextInput
              fontFamily={"Poppins-Regular"}
              keyboardType={'email-address'}
              autoCapitalize="none"
              dense={true}
              theme={{
                fonts: {
                  regular: "Poppins-Regular"
                },
                colors: {
                    primary: colors.darkPurple,
                    underlineColor: 'transparent',
                },
              }}
              style={LoginRegisterStyles.textInput}
              mode="outlined"
              placeholder="test@gmail.com"
              value={email} 
              // value={email} 
              onChangeText={(text) => {
                  setEmail(text);
              }}
              
            />

            {emailVerification != '' ? (
                <Text style={LoginRegisterStyles.errorLabel}>
                {emailVerification}
                </Text>
            ) : null}

            {emailMessage != '' ? (
                <Text style={LoginRegisterStyles.errorLabel}>
                {emailMessage}
                </Text>
            ) : null}

            {verificationLoading ? <ActivityIndicator color={colors.orange}  /> : null}
            <Button
              onPress={() => {
                if(email=="")
                {
                  setEmailMessage("Email required.")
                  
                }else if(!validate(email))
                {
                  setEmailMessage("Error: Invalid email.");
                }
                else
                {
                  setEmailMessage("");
                  forgotPassword(email);
                  setVerificationLoading(true);
                }
                
              }}
              style={VerificationStyles.button}
              mode="contained">
              Send Verification Code
            </Button>
            
          </Card>
        
          </View>
          
      </KeyboardAvoidingView>
    </View>
  );
};
export default withTheme(withNavigation(RecoveryEmail));
