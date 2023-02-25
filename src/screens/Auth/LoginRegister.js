import React, {useState, useContext, useEffect} from 'react';
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
  SafeAreaView
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
import LoginRegisterStyles from '../../assets/styles/AuthStyles/LoginRegisterStyles';
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import Amplify, {Auth} from 'aws-amplify';
import config from '../../aws/aws-export';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../context/AppContext';
import ContainerStyle from '../../assets/styles/ContainerStyle';

Amplify.configure(config);

const LoginRegister = ({navigation}) => {
  const [register, setRegister] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('sonalkgarg+lab@gmail.com');
  const [email, setEmail ] = useState('');
  const [phone, setPhone] = useState('');
  // const [password, setPassword] = useState('Test@1234');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleRememberCheckBox, setToggleRememberCheckBox] = useState(false);
  const [toggleTermsCheckBox, setToggleTermsCheckBox] = useState(false);
  const [isSigningUP, setIsSigningUP] = useState(false);
  const [allFieldsRequired, setAllFieldsRequired] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [isMessageError, setIsMessageError] = useState('');
  const [signupErrorMsg, setSignupErrorMsg] = useState('');
  const [emailVerification, setEmailVerification] = useState('');
  const [emailChecker, setEmailChecker] = useState(false);
  const [remEmail, setRemEmail] = useState('');

  const {
    storeFirstName,
    storeLastName,
    storeEmail,
    storePhone,
    storeToken,
    regex,
    storePassword
  } = useContext(AppContext);

  const createUser = () => {
    const {user} = Auth.signUp({
      username: `${email}`,
      password: `${password}`,
      attributes: {
        name: `${firstName}`,
        email: `${email}`,
        phone_number: `${phone}`,
        'custom:lastname': `${lastName}`,
      },
    })
      .then((res) => {
        console.log(res);
        console.log('signup');
        setIsSigningUP(false);
        storeFirstName(firstName);
        storeLastName(lastName);
        storeEmail(email);
        storePhone(phone);
        navigation.replace('Verification', {email: email, password: password});
      })
      .catch((err) => {
        setIsSigningUP(false);
        console.log(err);
        setAllFieldsRequired(err.message);
        setSignupErrorMsg(err.message);
        if(err.code == "InvalidParameterException"){
          setIsMessageError(err.message);
        }
        setIsMessageError(err.message);
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

  const loginUser = () => {
    Auth.signIn(email, password)
      .then((user) => {
        console.log(user.signInUserSession.idToken.jwtToken);
        console.log('login');
        const arrayOfAttrib = Object.values(user.attributes);
        console.log(arrayOfAttrib);
        storeFirstName(user.attributes.name);
        storeLastName(arrayOfAttrib[6]);
        storeEmail(user.attributes.email);
        storePassword(password);
        storePhone(user.attributes.phone_number);
        storeToken(user.signInUserSession.idToken.jwtToken);
        storeData(
          user.attributes.name,
          arrayOfAttrib[6],
          user.attributes.email,
          user.attributes.phone_number,
          user.signInUserSession.idToken.jwtToken,
          password,
        );
        storeIsLoggInValue('1');
      })
      .catch((err) => {
        console.log(err);
        if(err.code == "InvalidParameterException"){
          setIsMessageError(err.message);
        }
        // setIsMessageError(err.message);
        setIsSigningUP(false);
      });
  };

  const storeData = async (name, lastname, email, phone_number, token,password) => {
    try {
      await AsyncStorage.setItem('name', name+"");
      await AsyncStorage.setItem('lastname', lastname+"");
      await AsyncStorage.setItem('email', email+"");
      await AsyncStorage.setItem('password', password+"");
      await AsyncStorage.setItem('phone_number', phone_number+"");
      await AsyncStorage.setItem('token', token+"");
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

  const storeRememberEmail = async (email) => {
    if(toggleRememberCheckBox) {
      try {
        await AsyncStorage.setItem('rem_email', '');
        console.log('not saved');
      } catch (e) {
        console.log(e);
      }
    }else {
      console.log(email);
      try {
        await AsyncStorage.setItem('rem_email', email+'');
        console.log('saved');
      } catch (e) {
        console.log(e);
      }
    }
  };

  const IsAlreadyRemembered = async () => {
    const rememberEmail = await AsyncStorage.getItem('rem_email');
    let res = validate(rememberEmail);
    if(res == true) {
      setEmail(rememberEmail);
      setToggleRememberCheckBox(true);  
    } else {
      setEmail(email);
    }
  }

  useEffect(()=>{
    IsAlreadyRemembered();
    navigation.addListener('didFocus', () => {
      IsAlreadyRemembered();
    });
  }, [])

  return (
   <SafeAreaView style={ContainerStyle.safeAreaContainerAuth}>
    {Platform.OS =="ios" ? null : <StatusBar hidden={false} backgroundColor={colors.white} barStyle="dark-content" /> }
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
          {register == false ? (
            <Text style={LoginRegisterStyles.Heading}>Welcome Back!</Text>
          ) : (
            <Text style={LoginRegisterStyles.Heading}>Register Now</Text>
          )}
          {register == false ? (
            <Text style={LoginRegisterStyles.Discription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          ) : (
            <Text style={LoginRegisterStyles.Discription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          )}
          <Card style={LoginRegisterStyles.card}>
            {register == false ? (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={LoginRegisterStyles.signinRegisterTab}>
                  <Text style={LoginRegisterStyles.signinRegister}>
                    Sign in
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsMessageError("");
                    setRegister(true);
                  }}>
                  <Text
                    style={[
                      LoginRegisterStyles.signinRegister,
                      {marginBottom: 20},
                    ]}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    setIsMessageError("");
                    setRegister(false);
                  }}>
                  <Text
                    style={[
                      LoginRegisterStyles.signinRegister,
                      {marginBottom: 20, marginLeft: 20},
                    ]}>
                    Sign in
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={LoginRegisterStyles.signinRegisterTab}>
                  <Text style={LoginRegisterStyles.signinRegister}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {register == false ? (
              <View>
                <Text style={LoginRegisterStyles.label}>Email</Text>
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
                  style={[LoginRegisterStyles.textInput]}
                  mode="outlined"
                  placeholder="test@gmail.com"
                  value={email} 
                  // value={email} 
                  onChangeText={(text) => {
                    setEmail(text);
                    validate(text);
                  }}
                  onEndEditing={(text) => {
                    emailChecker
                      ? setEmailVerification('')
                      : setEmailVerification('Error: Invalid Email');
                  }}
                />
                {emailVerification != '' ? (
                  <Text style={LoginRegisterStyles.errorLabel}>
                    {emailVerification}
                  </Text>
                ) : null}
                <Text style={LoginRegisterStyles.label}>Password</Text>
                <TextInput
                  fontFamily={"Poppins-Regular"}
                  autoCapitalize="none"
                  dense={true}
                  theme={{
                    fonts: {
                      regular: "Poppins-Regular"
                    },
                    colors: {
                      primary: colors.darkPurple
                    }
                  }}
                  style={[LoginRegisterStyles.textInput]}
                  mode="outlined"
                  secureTextEntry={true}
                  placeholder="********"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                />
                {isMessageError ? (
                  <Text style={LoginRegisterStyles.errorLabel}>
                    {isMessageError}
                  </Text>
                ) : null}
                <View style={LoginRegisterStyles.loginCheckboxView}>
                  <CheckBox
                    style={LoginRegisterStyles.loginCheckbox}
                    disabled={false}
                    value={toggleRememberCheckBox}
                    boxType="square"
                    tintColors={{true: colors.darkPurple}}
                    onFillColor={colors.darkPurple}
                    onCheckColor={colors.white}
                    onValueChange={(newValue) => {
                      setToggleRememberCheckBox(newValue);
                      storeRememberEmail(email);
                    }}
                  />
                  <Text style={LoginRegisterStyles.rememberStyle}>
                    Remember Me
                  </Text>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('RecoveryEmail');
                    }}>
                    <Text style={LoginRegisterStyles.forgotPasswordStyle}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={LoginRegisterStyles.nextLoginContainerStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      loginUser();
                      setIsSigningUP(true);
                    }}
                    style={LoginRegisterStyles.nextInnerViewStyle}>
                    {isSigningUP ? (
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
              </View>
            ) : (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={LoginRegisterStyles.label}>Name</Text>
                    <TextInput
                      fontFamily={"Poppins-Regular"}
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
                      placeholder="Sonal"
                      value={firstName}
                      onChangeText={(text) => {
                        setFirstName(text);
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={LoginRegisterStyles.label}>Last Name</Text>
                    <TextInput
                      fontFamily={"Poppins-Regular"}
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
                      placeholder="Gerg"
                      value={lastName}
                      onChangeText={(text) => {
                        setLastName(text);
                      }}
                    />
                  </View>
                </View>
                <Text style={LoginRegisterStyles.label}>Email</Text>
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
                  placeholder="sonal.agrg@gmail.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    validate(text);
                  }}
                  onEndEditing={(text) => {
                    emailChecker
                      ? setEmailVerification('')
                      : setEmailVerification('Error: Invalid Email');
                  }}
                />
                {emailVerification != '' ? (
                  <Text style={LoginRegisterStyles.errorLabel}>
                    {emailVerification}
                  </Text>
                ) : null}
                <Text style={LoginRegisterStyles.label}>Phone</Text>
                <TextInput
                  fontFamily={"Poppins-Regular"}
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
                  keyboardType="phone-pad"
                  placeholder="123456789"
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                  }}
                />
                <Text style={LoginRegisterStyles.label}>Password</Text>
                <TextInput
                  fontFamily={"Poppins-Regular"}
                  autoCapitalize="none"
                  dense={true}
                  theme={{
                    fonts: {
                      regular: "Poppins-Regular"
                    },
                    colors: {
                      primary: colors.darkPurple
                    }
                  }}
                  style={LoginRegisterStyles.textInput}
                  secureTextEntry={true}
                  mode="outlined"
                  placeholder="********"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                />
                {passwordMessage ? (
                  <Text style={LoginRegisterStyles.errorLabel}>
                    {passwordMessage}
                  </Text>
                ) : null}
                <Text style={LoginRegisterStyles.label}>Confirm Password</Text>
                <TextInput
                  fontFamily={"Poppins-Regular"}
                  autoCapitalize="none"
                  dense={true}
                  theme={{
                    fonts: {
                      regular: "Poppins-Regular"
                    },
                    colors: {
                      primary: colors.darkPurple
                    }}
                  }
                  style={LoginRegisterStyles.textInput}
                  secureTextEntry={true}
                  mode="outlined"
                  placeholder="********"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                  }}
                  onEndEditing={() => {
                    if (confirmPassword === password) {
                      setConfirmPasswordMessage('');
                    } else {
                      setConfirmPasswordMessage('Password does not match');
                    }
                  }}
                />
                {confirmPasswordMessage ? (
                  <Text style={LoginRegisterStyles.errorLabel}>
                    {confirmPasswordMessage}
                  </Text>
                ) : null}
                {signupErrorMsg ? (
                  <Text style={LoginRegisterStyles.errorLabel}>
                    {signupErrorMsg}
                  </Text>
                ) : null}

                <View style={LoginRegisterStyles.SignupCheckboxView}>
                  <CheckBox
                  style={[LoginRegisterStyles.loginCheckbox]}
                    disabled={false}
                    value={toggleTermsCheckBox}
                    boxType="square"
                    tintColors={{true: colors.darkPurple}}
                    onFillColor={colors.darkPurple}
                    onCheckColor={colors.white}
                    onValueChange={(newValue) =>
                      setToggleTermsCheckBox(newValue)
                    }
                  />
                    <Text style={{flex:7,fontFamily: 'Poppins-Regular', fontSize: 14}}>
                      I Accept The Terms Of Services And Have <Text
                        style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
                        Read The
                      </Text>
                      <Text
                        style={{
                          color: colors.blue,
                          fontSize: 14,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        {'  '}Privacy Statement
                      </Text>
                    </Text>
                    <Text style={{flex:1}}>
                     
                    </Text>
                  
                </View>
                <View style={LoginRegisterStyles.nextRegisterContainerStyle}>
                  {toggleTermsCheckBox &&
                  firstName != '' &&
                  lastName != '' &&
                  email != '' &&
                  phone != '' &&
                  password != '' &&
                  confirmPassword != '' ? (
                    <TouchableOpacity
                      onPress={() => {
                        setIsSigningUP(true);
                        createUser();
                      }}
                      style={LoginRegisterStyles.nextInnerViewStyle}>
                      {isSigningUP ? (
                        <ActivityIndicator color={colors.white} />
                      ) : (
                        <Feather
                          name="arrow-right"
                          color={colors.white}
                          size={wp('12')}
                        />
                      )}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      onPress={() => {
                        // navigation.replace('Verification');
                      }}
                      style={LoginRegisterStyles.nextInnerViewDisabledStyle}>
                      {isSigningUP ? (
                        <ActivityIndicator color={colors.white} />
                      ) : (
                        <Feather
                          name="arrow-right"
                          color={colors.white}
                          size={wp('12')}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </Card>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default withTheme(withNavigation(LoginRegister));
