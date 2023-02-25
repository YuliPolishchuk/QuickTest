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
import RNFetchBlob from 'react-native-fetch-blob';

const Verification = ({navigation}) => {
  const {
    storeFirstName,
    storeLastName,
    storeEmail,
    storePhone,
    storeToken,
    regex,
    baseUrl,
    storePassword
  } = useContext(AppContext);

  const [code, setCode] = useState('');
  const [codeMessage, setCodeMessage] = useState('');
  const [resendCodeMessage, setResendCodeMessage] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [isMessageError, setIsMessageError] = useState('');
  const [isSigningUP, setIsSigningUP] = useState(false);
  const [isStarterPackageActive, setIsStarterPackageActive] = useState(false);
  const [email, setEmail] = useState(navigation.state.params.email);
  const [password, setPassword] = useState(navigation.state.params.password);

  const verifyUser = () => {
    Auth.confirmSignUp(email, code)
      .then((res) => {
        loginUser();
      })
      .catch((err) => {
        setCodeMessage('Error: Invalid Code');
        setResendCodeMessage('');
        setVerificationLoading(false);
      });
  };

  const resendConfirmationCode = async () => {
    try {
      await Auth.resendSignUp(email);
      setResendCodeMessage('Code Resent Successfully');
      setCodeMessage('');
      setResendLoading(false);
    } catch (err) {
      console.log('error resending code: ', err);
      setResendCodeMessage(err.message);
      setResendnLoading(false);
    }
  };

  const activateStarterpackage = (token) => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('POST', `${baseUrl}/paymentcheckout/upgardeMembership?membershipId=1`, {
        Authorization: `${token}`,
        tokenType:'aws',
      })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setIsStarterPackageActive(true);
        loginUser(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginUser = (starterPackage) => {
    Auth.signIn(email, password)
      .then((user) => {
        const arrayOfAttrib = Object.values(user.attributes);
        console.log(arrayOfAttrib[4]);
        storeFirstName(user.attributes.name);
        storeLastName(arrayOfAttrib[4]);
        storeEmail(user.attributes.email);
        storePassword(password);
        storePhone(user.attributes.phone_number);
        storeToken(user.signInUserSession.idToken.jwtToken);
        storeData(
          user.attributes.name,
          arrayOfAttrib[4],
          user.attributes.email,
          user.attributes.phone_number,
          user.signInUserSession.idToken.jwtToken,
          password,
        );
        
        starterPackage ? 
        storeIsLoggInValue('1'):
        activateStarterpackage(user.signInUserSession.idToken.jwtToken)
        
      })
      .catch((err) => {
        console.log(err.message);
        setIsMessageError(err.message);
        setIsSigningUP(false);
      });
  };

  const storeData = async (name, lastname, email, phone_number, token,password) => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('lastname', lastname);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('phone_number', phone_number);
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.log(e);
    }
  };

  const storeIsLoggInValue = async (isloginvalue) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', isloginvalue + '');
      navigation.replace('Dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={ContainerStyle.safeAreaContainer}>
      {Platform.OS == 'ios' ? null : (
        <StatusBar
          hidden={false}
          backgroundColor={colors.purple}
          barStyle="light-content"
        />
      )}
      <KeyboardAvoidingView
        behavior="position"
        style={VerificationStyles.container}>
        <Image
          source={require('../../assets/images/CardBase2x.png')}
          style={VerificationStyles.backgroundImage}
        />
        <View style={{flex: 1, position: 'absolute', top: hp('7')}}>
          <Text style={VerificationStyles.VerificationHeading}>
            Verification
          </Text>
          <Text style={VerificationStyles.VerificationDiscription}>
            Once you verify your Email Address you'll be able to proceed to
            Dashboard and Choose Membership plan
          </Text>

          <Card style={VerificationStyles.card}>
            <Text style={VerificationStyles.mailDiscripion}>
              We've sent you Verification Mail
            </Text>
            <Image
              style={VerificationStyles.mailImage}
              source={require('../../assets/images/Mail.png')}
            />
            <TextInput
              fontFamily={"Poppins-Regular"}
              autoCapitalize="none"
              dense={true}
              theme={{
                fonts: {
                  regular: "Poppins-Regular"
                },
                colors: {
                  primary: colors.purple
                }}
              }
              style={VerificationStyles.textInput}
              mode="outlined"
              placeholder="Enter verification code here..."
              value={code}
              onChangeText={(text) => {
                setCode(text);
              }}
            />
            {codeMessage != '' ? (
              <Text style={LoginRegisterStyles.errorLabel}>{codeMessage}</Text>
            ) : null}
            {resendCodeMessage != '' ? (
              <Text style={LoginRegisterStyles.successLabel}>
                {resendCodeMessage}
              </Text>
            ) : null}
            {verificationLoading ? (
              <ActivityIndicator color={colors.orange} />
            ) : null}
            <Button
              onPress={() => {
                verifyUser();
                setVerificationLoading(true);
              }}
              style={VerificationStyles.button}
              mode="contained">
              Verify
            </Button>
            <TouchableOpacity
              onPress={() => {
                resendConfirmationCode();
                setResendLoading(true);
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={VerificationStyles.resendStyle}>
                  Resend Verification
                </Text>
                {resendLoading ? (
                  <ActivityIndicator color={colors.blue} />
                ) : null}
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default withTheme(withNavigation(Verification));
