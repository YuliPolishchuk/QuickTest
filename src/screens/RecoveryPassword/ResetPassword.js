import React, {useState, useRef, useContext} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ColorPropType,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  HelperText,
  withTheme,
  Avatar,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import colors from '../../assets/colors/colors';
import ServiceStyles from '../../assets/styles/Service/ServiceStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from 'reanimated-bottom-sheet';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import GeneralProperties from '../../assets/styles/GeneralProperties';
import RadioGroupLoading from '../../components/RadioGroupLoading/RadioGroupLoading';
import {DrawerActions} from 'react-navigation-drawer';
import ProfileStyle from '../../assets/styles/ProfileStyle/ProfileStyle';
import PhoneInput from 'react-native-phone-number-input';
import MembershipStyle from '../../assets/styles/MembershipStyle/MembershipStyle';
import DashboardNavbar from '../../components/Navbars/DashboardNavbar';
import Amplify, {Auth} from 'aws-amplify';
import config from '../../aws/aws-export';
import ContainerStyle from '../../assets/styles/ContainerStyle';
import LoginRegisterStyles from '../../assets/styles/AuthStyles/LoginRegisterStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../context/AppContext';
Amplify.configure(config);

const ResetPassword = ({navigation}) => {
  const [username, setUsername] = useState(navigation.state.params.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordDisplay, setNewPasswordDisplay] = useState(false);
  const [confirmPasswordDisplay, setConfirmPasswordDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageError, setIsMessageError] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  const [code, setCode] = useState('');
  const [codeErrorMessage, setCodeErrorMessage] = useState('');

  const {
    storeFirstName,
    storeLastName,
    storeEmail,
    storePhone,
    storeToken,
    regex,
  } = useContext(AppContext);

  const forgotPasswordSubmission = async (code, newPassword) => {
    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then((data) => {
        console.log(data);
        loginUser();
      })
      .catch((err) => {
        console.log('error');
        if (err.code == 'CodeMismatchException') {
          setCodeErrorMessage('Invalid Code');
          setIsLoading(false);
        }
      });
  };

  const loginUser = () => {
    Auth.signIn(username, newPassword)
      .then((user) => {
        console.log(user.signInUserSession.idToken.jwtToken);
        console.log('login');
        const arrayOfAttrib = Object.values(user.attributes);
        console.log(arrayOfAttrib[4]);
        storeFirstName(user.attributes.name);
        storeLastName(arrayOfAttrib[4]);
        storeEmail(user.attributes.email);
        storePhone(user.attributes.phone_number);
        storeToken(user.signInUserSession.idToken.jwtToken);
        storeData(
          user.attributes.name,
          arrayOfAttrib[4],
          user.attributes.email,
          user.attributes.phone_number,
          user.signInUserSession.idToken.jwtToken,
          false,
        );
        storeIsLoggInValue('1');
      })
      .catch((err) => {
        console.log(err.message);
        setIsMessageError(err.message);
        setIsSigningUP(false);
      });
  };

  const storeData = async (name, lastname, email, phone_number, token) => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('lastname', lastname);
      await AsyncStorage.setItem('email', email);
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
          backgroundColor={colors.white}
          barStyle="dark-content"
        />
      )}
      <KeyboardAvoidingView
        behavior="position"
        style={LoginRegisterStyles.container}>
        <Image
          source={require('../../assets/images/CardBase2x.png')}
          style={LoginRegisterStyles.backgroundImage}
        />
        <View style={LoginRegisterStyles.innerContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={LoginRegisterStyles.scrollContainer}>
            <Text style={LoginRegisterStyles.Heading}>Reset Your Password</Text>
            <Text style={LoginRegisterStyles.Discription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Card
              style={[
                LoginRegisterStyles.card,
                {paddingHorizontal: wp('4%'), paddingVertical: wp('10%')},
              ]}>
              <View>
                <Text style={LoginRegisterStyles.label}>Verification Code</Text>
                <View style={ProfileStyle.changePasswordTextinputContainer}>
                  <TextInput
                    placeholder="Enter Code"
                    // placeholderTextColor={colors.grey9}
                    style={{
                      // marginHorizontal:5,
                      backgroundColor: colors.white,
                      fontSize: 10,
                      flex: 1,
                      fontFamily:'Poppins-Regular'
                    }}
                    value={code}
                    onChangeText={(text) => {
                      setCode(text);
                    }}
                  />
                </View>
                {codeErrorMessage != '' ? (
                  <Text style={LoginRegisterStyles.errorLabel}>
                    {codeErrorMessage}
                  </Text>
                ) : null}

                <View
                  style={{
                    borderWidth: 1,
                    borderColor: colors.grey5,
                    marginTop: wp('2%'),
                  }}
                />

                <Text style={LoginRegisterStyles.label}>New Password</Text>
                <View style={ProfileStyle.changePasswordTextinputContainer}>
                  <TextInput
                    placeholder="Enter New Password"
                    // placeholderTextColor={colors.grey9}
                    style={{
                      // marginHorizontal:5,
                      backgroundColor: colors.white,
                      fontSize: 10,
                      flex: 1,
                      fontFamily:'Poppins-Regular'
                    }}
                    value={newPassword}
                    onChangeText={(text) => {
                      setNewPassword(text);
                    }}
                    secureTextEntry={newPasswordDisplay ? false : true}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      newPasswordDisplay
                        ? [setNewPasswordDisplay(false)]
                        : [setNewPasswordDisplay(true)];
                    }}>
                    {
                      newPasswordDisplay ? (
                        <Image
                          source={require('../../assets/images/EyeBlueOpen.png')}
                          style={MembershipStyle.image}
                        />
                      ) : (
                        <Ionicons
                          name="eye-off"
                          size={24}
                          color={colors.purple}
                        />
                      )
                      // <Image
                      //     source={require('../../assets/images/EyeOpenPurple.png')}
                      //     style={MembershipStyle.image}
                      // />
                    }
                  </TouchableOpacity>
                </View>

                <Text style={LoginRegisterStyles.label}>Confirm Password</Text>
                <View style={ProfileStyle.changePasswordTextinputContainer}>
                  <TextInput
                    placeholder="Re-enter New Password"
                    // placeholderTextColor={colors.grey9}
                    style={{
                      // marginHorizontal:5,
                      backgroundColor: colors.white,
                      fontSize: 10,
                      flex: 1,
                      fontFamily:'Poppins-Regular'
                    }}
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                    }}
                    secureTextEntry={confirmPasswordDisplay ? false : true}
                    onEndEditing={() => {
                      if (confirmPassword === newPassword) {
                        setPasswordMessage('');
                      } else {
                        setIsMessageError(true);
                        setPasswordMessage('Password does not match');
                      }
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      confirmPasswordDisplay
                        ? [setConfirmPasswordDisplay(false)]
                        : [setConfirmPasswordDisplay(true)];
                    }}>
                    {
                      confirmPasswordDisplay ? (
                        <Image
                          source={require('../../assets/images/EyeBlueOpen.png')}
                          style={MembershipStyle.image}
                        />
                      ) : (
                        <Ionicons
                          name="eye-off"
                          size={24}
                          color={colors.purple}
                        />
                      )
                      // <Image
                      //     source={require('../../assets/images/EyeOpenPurple.png')}
                      //     style={MembershipStyle.image}
                      // />
                    }
                  </TouchableOpacity>
                </View>

                {isMessageError ? (
                  <Text style={{
                    fontFamily:'Poppins-Regular',
                    fontSize:10,
                    color: colors.red,
                    marginTop:5,
                    marginHorizontal: 5
                    }}>
                    {passwordMessage}
                  </Text>
                ) : null}

                {codeErrorMessage ? (
                  <Text style={{
                    fontFamily:'Poppins-Regular',
                    fontSize:10,
                    color: colors.red,
                    marginTop:5,
                    marginHorizontal: 5
                    }}>
                    {codeErrorMessage}
                  </Text>
                ) : null}
              </View>
              <View
                style={[
                  LoginRegisterStyles.nextPasswordResetStyle,
                  // {top: 295},
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    setIsLoading(true);
                    forgotPasswordSubmission(code, newPassword);
                  }}
                  style={LoginRegisterStyles.nextInnerViewStyle}>
                  {isLoading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Feather
                      name="arrow-right"
                      color={colors.white}
                      size={wp('12')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </Card>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default withTheme(withNavigation(ResetPassword));
