import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DrawerItems} from 'react-navigation-drawer';
import colors from '../assets/colors/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerStyle from '../assets/styles/DrawerStyle/DrawerStyle';
import {
  NavigationActions,
  StackActions,
  withNavigation,
} from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Amplify, {Auth} from 'aws-amplify';
import GeneralProperties from '../assets/styles/GeneralProperties';
import AppContext from '../context/AppContext';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';

const CustomDrawerComponent = ({navigation}) => {
  const {token, baseUrl, storeToken, firstName, lastName} = useContext(AppContext);
  const [remEmail, setRemEmail] = useState('');
  const [imageUriToShow, setImageUriToShow] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [MessageUpload, setMessageUpload] = useState('');

  const options = {
    title: 'Select Avatar (Max 5mb)',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    maxHeight: 800,
    maxWidth: 800
  };

  const imagepicker = async () => {
    await ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.fileSize/1000000);
        if (Platform.OS == 'ios') {
          uploadProfileImage(
            response.uri.replace('file://', ''),
            response.type,
            response.fileName,
          );
        } else {
          uploadProfileImage(response.path, response.type, response.fileName);
        }
      } 
    });
  };

  const uploadProfileImage = async (imageuri, type, filename) => {
    await Auth.currentSession().then((data)=>{
      storeToken(data.idToken.jwtToken);
      RNFetchBlob.config({
        trusty: true,
        timeout: 60000,
      })
        .fetch(
          'POST',
          `${baseUrl}/user/uploadImage`,
          {
            Authorization: `${data.idToken.jwtToken}`,
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'imageFile' + '',
              filename: filename == null ? firstname + "'s Profile" : filename,
              type: type + '',
              data: RNFetchBlob.wrap(imageuri + ''),
            },
          ],
        )
        .then((resp) => {
          setIsImageLoading(false);
          console.log(resp);
          setMessageUpload(resp.respInfo.status);
          getProfileImage();
        })
        .catch((err) => {
          console.log(err);
          setIsImageLoading(false);
        });
    }).catch((err) => {
      console.log(err);
    });
    setIsImageLoading(true);
  };

  const getProfileImage = async () => {
    await Auth.currentSession().then((data)=>{
      storeToken(data.idToken.jwtToken);
      setIsImageLoading(true);
    RNFetchBlob.config({
      trusty: true,
      timeout: 60000,
    })
      .fetch('GET', `${baseUrl}/user/getImage`, {
        Authorization: `${data.idToken.jwtToken}`,
      })
      .then((resp) => {
        // console.log(resp.data);
        setIsImageLoading(false);
        console.log(resp.respInfo.status);
        if(resp.respInfo.status ==500)
        {
          setImageUriToShow('');  
        }else
        {
           setImageUriToShow(resp.data); 
        }
      })
      .catch((err) => {
        setIsImageLoading(false);
        console.log(err);
        setImageUriToShow('');
      });
    }).catch((err) => {
      console.log(err);
    });
  };

  const IsAlreadyRemembered = async () => {
    // const rememberEmail = AsyncStorage.getItem('rem_email');
    setRemEmail(await AsyncStorage.getItem('rem_email'));
    // setRemEmail(rememberEmail);
    console.log(remEmail);
  };

  useEffect(() => {
    IsAlreadyRemembered();
    getProfileImage();
    navigation.addListener('didFocus', () => {
      IsAlreadyRemembered();
      getProfileImage();
    });
  }, []);

  return (
    <SafeAreaView>
      <View
        style={DrawerStyle.imageContainer}>
        {isImageLoading ? (
          <View>
            <ActivityIndicator
              color={colors.orange}
              style={DrawerStyle.image}
            />
          </View>
        ) : imageUriToShow == '' ? (
          <TouchableOpacity  onPress={() => {imagepicker()}} style={DrawerStyle.imageCircularView}>
            <Image
              source={require('../assets/images/user.png')}
              style={DrawerStyle.image}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => {imagepicker()}} style={DrawerStyle.imageCircularView}>
            <Image
              source={{uri: `data:image/png;base64,${imageUriToShow}`}}
              style={DrawerStyle.image}
            />
          </TouchableOpacity>
        )}
        <Text style={DrawerStyle.userName}> {firstName}{' '}{lastName} </Text>
      </View>

      

      <TouchableOpacity
        style={DrawerStyle.drawerStack}
        onPress={() => {
          navigation.navigate('UserProfile');
        }}>
        <Text style={DrawerStyle.drawerScreens}>Profile</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={25}
          color={colors.grey10}
        />
      </TouchableOpacity>

            <TouchableOpacity 
                style={DrawerStyle.drawerStack}
                onPress={()=>{navigation.navigate('Membership')
                }}
            >
                <Text style={DrawerStyle.drawerScreens}>
                    Membership
                </Text>
                <MaterialCommunityIcons name="chevron-right" size={25} color={colors.grey10} />
            </TouchableOpacity>

            <TouchableOpacity 
                style={DrawerStyle.drawerStack}
                onPress={()=>{navigation.navigate('OrderHistory')
                }}
            >
                <Text style={DrawerStyle.drawerScreens}>
                    Order History
                </Text>
                <MaterialCommunityIcons name="chevron-right" size={25} color={colors.grey10} />
            </TouchableOpacity>

      {/* <View style={{borderColor: colors.grey7, borderWidth: wp('0.2%')}} />

      <TouchableOpacity
        style={DrawerStyle.drawerStack}
        onPress={() => {
          navigation.navigate('Membership');
        }}>
        <Text style={DrawerStyle.drawerScreens}>Membership</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={25}
          color={colors.grey10}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={DrawerStyle.drawerStack}
        onPress={() => {
          navigation.navigate('OrderHistory');
        }}>
        <Text style={DrawerStyle.drawerScreens}>Order History</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={25}
          color={colors.grey10}
        />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={DrawerStyle.drawerStack}
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}>
        <Text style={DrawerStyle.drawerScreens}>Change Password</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={25}
          color={colors.grey10}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={DrawerStyle.drawerStack}
        onPress={() => {
          navigation.navigate('CallDialing');
        }}>
        <Text style={DrawerStyle.drawerScreens}>Call Dialing</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={25}
          color={colors.grey10}
        />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={DrawerStyle.drawerStack}
        onPress={() => {
          try {
            Auth.signOut();
            AsyncStorage.setItem('isLoggedIn', '0');
            {
              remEmail != ''
                ? AsyncStorage.setItem('rem_email', remEmail + '')
                : AsyncStorage.setItem('rem_email', '');
            }
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'LoginRegister'}),
              ],
            });
            navigation.dispatch(resetAction);
          } catch (e) {
            console.log(e);
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'LoginRegister'}),
              ],
            });
            navigation.dispatch(resetAction);
          }
        }}>
        <Text style={DrawerStyle.drawerScreens}>Logout</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={25}
          color={colors.grey10}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default withNavigation(CustomDrawerComponent);
