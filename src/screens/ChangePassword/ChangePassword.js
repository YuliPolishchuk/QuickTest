import React, {useState, useRef} from 'react';
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
  SafeAreaView,
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
Amplify.configure(config);

const ChangePassword = ({navigation}) => {
  const [value, setValue] = React.useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordDisplay, setOldPasswordDisplay] = useState(false);
  const [newPasswordDisplay, setNewPasswordDisplay] = useState(false);
  const [confirmPasswordDisplay, setConfirmPasswordDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageError, setIsMessageError] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [oldPasswordMessage, setOldPasswordMessage] = useState('');
  const [iconName, setIconName] = useState('eye-off');

  const drawerTogglerCallBack = () => {
    console.log('drawer');
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <SafeAreaView style={ContainerStyle.safeAreaContainer}>
      {Platform.OS == 'ios' ? null : (
        <StatusBar
          hidden={false}
          backgroundColor={colors.purple}
          barStyle="light-content"
        />
      )}
      <View style={ServiceStyles.container}>
        <DashboardNavbar title="Change Password" />

        <ScrollView>
          <View style={ProfileStyle.container}>
            <Text style={ProfileStyle.labelText}>Old Password</Text>

            <View style={ProfileStyle.changePasswordTextinputContainer}>
              <TextInput
                placeholder="Enter Old Password"
                placeholderTextColor={colors.grey9}
                style={ProfileStyle.changePasswordTextinput}
                value={oldPassword}
                onChangeText={(text) => {
                  setOldPassword(text);
                }}
                secureTextEntry={oldPasswordDisplay ? false : true}
              />
              <TouchableOpacity
                onPress={() => {
                  oldPasswordDisplay
                    ? [setOldPasswordDisplay(false)]
                    : [setOldPasswordDisplay(true)];
                }}>
                {
                  oldPasswordDisplay ? (
                    <Image
                      source={require('../../assets/images/EyeBlueOpen.png')}
                      style={MembershipStyle.image}
                    />
                  ) : (
                    <Ionicons name="eye-off" size={24} color={colors.purple} />
                  )
                  // <Image
                  //     source={require('../../assets/images/EyeOpenPurple.png')}
                  //     style={MembershipStyle.image}
                  // />
                }
              </TouchableOpacity>
            </View>

            {oldPasswordMessage ? (
              <Text style={ProfileStyle.errorLabelText}>
                {oldPasswordMessage}
              </Text>
            ) : null}

            <View
              style={{
                borderWidth: 1,
                borderColor: colors.grey5,
                marginTop: wp('2%'),
              }}
            />

            <Text style={ProfileStyle.labelTextInput}>New Password</Text>

            <View style={ProfileStyle.changePasswordTextinputContainer}>
              <TextInput
                placeholder="Enter New Password"
                placeholderTextColor={colors.grey9}
                style={ProfileStyle.changePasswordTextinput}
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
                    <Ionicons name="eye-off" size={24} color={colors.purple} />
                  )
                  // <Image
                  //     source={require('../../assets/images/EyeOpenPurple.png')}
                  //     style={MembershipStyle.image}
                  // />
                }
              </TouchableOpacity>
            </View>

            <Text style={ProfileStyle.labelTextInput}>Confirm Password</Text>

            <View style={ProfileStyle.changePasswordTextinputContainer}>
              <TextInput
                placeholder="Re-enter New Password"
                placeholderTextColor={colors.grey9}
                style={ProfileStyle.changePasswordTextinput}
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
                    <Ionicons name="eye-off" size={24} color={colors.purple} />
                  )
                  // <Image
                  //     source={require('../../assets/images/EyeOpenPurple.png')}
                  //     style={MembershipStyle.image}
                  // />
                }
              </TouchableOpacity>
            </View>

            {isMessageError ? (
              <Text
                style={{
                  color: colors.red,
                  fontFamily: 'Poppins-Regular',
                  marginTop: 5,
                  // paddingHorizontal: 15,
                }}>
                {passwordMessage}
              </Text>
            ) : null}
          </View>

          {isLoading ? <ActivityIndicator color={colors.orange} /> : null}
          <TouchableOpacity
            style={[ProfileStyle.updateButton]}
            onPress={() => {
              if (newPassword == '') {
                setIsMessageError(true);
                setPasswordMessage('Password Required');
              } else {
                setIsLoading(true);
                Auth.currentAuthenticatedUser()
                  .then((user) => {
                    return Auth.changePassword(user, oldPassword, newPassword);
                  })
                  .then((data) => {
                    navigation.replace('Dashboard');
                  })
                  .catch((err) => {
                    console.log(err);
                    console.log(err.message);
                    if (err.code == 'NotAuthorizedException') {
                      setIsLoading(false);
                      setOldPasswordMessage('Old password is incorrect');
                    } else {
                      setIsLoading(false);
                      setIsMessageError(true);
                      setPasswordMessage('Error: ' + err.message);
                    }
                  });
              }
            }}>
            <Text style={ProfileStyle.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(withNavigation(ChangePassword));
