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
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import colors from '../../assets/colors/colors';
import ServiceStyles from '../../assets/styles/Service/ServiceStyles';
import {DrawerActions} from 'react-navigation-drawer';
import ProfileStyle from '../../assets/styles/ProfileStyle/ProfileStyle';
import PhoneInput from 'react-native-phone-number-input';
import DashboardNavbar from '../../components/Navbars/DashboardNavbar';
import AppContext from '../../context/AppContext';
import Amplify, {Auth} from 'aws-amplify';
import config from '../../aws/aws-export';
import ContainerStyle from '../../assets/styles/ContainerStyle';
Amplify.configure(config);

const UserProfile = ({navigation}) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    storeFirstName,
    storeLastName,
    storePhone,
  } = useContext(AppContext);

  const [updateFirstName, setUpdateFirstName] = useState(firstName);
  const [updateLastName, setUpdateLastName] = useState(lastName);
  const [updateEmail, setUpdateEmail] = useState(email);
  const [updatePassword, setUpdatePassword] = useState(phone);
  const [updatePhone, setUpdatePhone] = useState(phone);
  const [formattedValue, setFormattedValue] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const updateUserAttrib = (attributes) => {
    let user = Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.updateUserAttributes(user, attributes);
      })
      .then(() => {
        console.log('Updated');
        const arrayOfAttrib = Object.values(attributes);
        console.log(arrayOfAttrib);
        storeFirstName(attributes.name),
          storeLastName(arrayOfAttrib[1]),
          storePhone(attributes.phone_number);
        setUpdateLoading(false);
        navigation.replace('Dashboard');
      })
      .catch((err) => console.log(err));
  };

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
        <DashboardNavbar title="My Profile" />
        {/* <View 
            style={ServiceStyles.headerBar}>
            <View 
                style={ServiceStyles.headerBarItems}>
                  <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <AntDesign
                      name="arrowleft"
                    //   style={ServiceStyles.menuIcon}
                      size={30}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                    <Text 
                        style={ServiceStyles.headerText}>
                        My Profile
                    </Text>
                <Image 
                    source={require('../../assets/images/bell.png')} 
                    style={ServiceStyles.bellIcon}
                />
            </View>
        </View>  */}

        <ScrollView>
          <View style={ProfileStyle.container}>
            <Text style={ProfileStyle.labelText}>First Name</Text>
            <TextInput
              style={ProfileStyle.textInput}
              placeholder="Sonal"
              placeholderTextColor={colors.textGrey}
              value={updateFirstName}
              onChangeText={(updateFirstName) => {
                setUpdateFirstName(updateFirstName);
              }}
            />

            <Text style={ProfileStyle.labelTextInput}>Last Name</Text>
            <TextInput
              style={ProfileStyle.textInput}
              placeholder="Garg"
              // placeholderTextColor= {colors.textGrey}
              value={updateLastName}
              onChangeText={(updateLastName) => {
                setUpdateLastName(updateLastName);
              }}
            />

            <Text style={ProfileStyle.labelTextInput}>Email Address</Text>
            <TextInput
              editable={false}
              style={[ProfileStyle.textInput, {color: colors.grey}]}
              placeholder="sonal.garg@onetest.com"
              placeholderTextColor={colors.grey}
              // placeholderTextColor= {colors.textGrey}
              value={updateEmail}
              onChangeText={(updateEmail) => {
                setUpdateEmail(updateEmail);
              }}
            />

            <Text style={ProfileStyle.labelTextInput}>Phone Number</Text>
            
            <TextInput
              style={ProfileStyle.textInput}
              placeholder="+4412345677"
              // placeholderTextColor= {colors.textGrey}
              value={updatePhone}
              onChangeText={(updateLastName) => {
                setUpdatePhone(updateLastName);
              }}
            />
            
            
          </View>

          {updateLoading ? <ActivityIndicator color={colors.orange} /> : null}
          <TouchableOpacity
            style={[ProfileStyle.updateButton]}
            onPress={() => {
              let attrib = {
                name: `${updateFirstName}`,
                'custom:lastname': `${updateLastName}`,
                phone_number: `${phone}`,
              };
              updateUserAttrib(attrib);
              setUpdateLoading(true);
            }}>
            <Text style={ProfileStyle.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(withNavigation(UserProfile));
