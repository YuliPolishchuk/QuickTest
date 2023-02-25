import React, {useState, useContext, useRef} from 'react';
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
  SafeAreaView,
  FlatList,
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
import {NavigationActions,StackActions, withNavigation} from 'react-navigation';
import colors from '../../assets/colors/colors';
import ServiceStyles from '../../assets/styles/Service/ServiceStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import BottomSheet from 'reanimated-bottom-sheet';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import GeneralProperties from '../../assets/styles/GeneralProperties';
import RadioGroupLoading from '../../components/RadioGroupLoading/RadioGroupLoading';
import {DrawerActions} from 'react-navigation-drawer';
import ProfileStyle from '../../assets/styles/ProfileStyle/ProfileStyle';
import MembershipStyle from '../../assets/styles/MembershipStyle/MembershipStyle';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import DashboardNavbar from '../../components/Navbars/DashboardNavbar';
import AppContext from '../../context/AppContext';
import RNFetchBlob from 'react-native-fetch-blob';
import {useEffect} from 'react';
import ContainerStyle from '../../assets/styles/ContainerStyle';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Membership = ({navigation}) => {
  const [toggleMonthlySwitch, setToggleMonthlySwitch] = useState(true);
  const [toggleYearlySwitch, setToggleYearlySwitch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleTwo, setIsModalVisibleTwo] = useState(false);
  const [allMemberShips, setAllMemberShips] = useState([]);
  const {
    baseUrl,
    token,
    email,
    password,
    storeFirstName,
    storeLastName,
    storeEmail,
    storePassword,
    storePhone,
    storeToken,
  } = useContext(AppContext);
  const [dataForComparison, setDataForComparison] = useState();

  // States to show data on membership cards
  const [membershipOne, setMembershipOne] = useState('');
  const [membershipTwo, setMembershipTwo] = useState('');
  const [membershipThree, setMembershipThree] = useState('');
  const [membershipOnePrice, setMembershipOnePrice] = useState(0);
  const [membershipTwoPrice, setMembershipTwoPrice] = useState(0);
  const [membershipThreePrice, setMembershipThreePrice] = useState(0);
  const [membershipOneLoadTesting, setMembershipOneLoadTesting] = useState('');
  const [
    membershipOneScheduledTesting,
    setMembershipOneScheduledTesting,
  ] = useState('');
  const [
    membershipOneAutomatedTesting,
    setMembershipOneAutomatedTesting,
  ] = useState('');
  const [membershipTwoLoadTesting, setMembershipTwoLoadTesting] = useState('');
  const [
    membershipTwoScheduledTesting,
    setMembershipTwoScheduledTesting,
  ] = useState('');
  const [
    membershipTwoAutomatedTesting,
    setMembershipTwoAutomatedTesting,
  ] = useState('');
  const [membershipThreeLoadTesting, setMembershipThreeLoadTesting] = useState(
    '',
  );
  const [
    membershipThreeScheduledTesting,
    setMembershipThreeScheduledTesting,
  ] = useState('');
  const [
    membershipThreeAutomatedTesting,
    setMembershipThreeAutomatedTesting,
  ] = useState('');
  //agr membership sahi na aye to ID zrur check karain. Id k against membership change ho skti ha backend sy
  const [activeMembershipId, setActiveMembershipId] = useState(0);

  const fetchAllMemberships = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/membership/list`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        let allkeys = [];
        let valueForStarter = [];
        let valueForProfessional = [];
        let valueForAdvance = [];
        let dataForComparison = [];
        Object.keys(resp[0]).map(item => {
          allkeys.push(item);
        });
        Object.values(resp[0]).map(item => {
          valueForStarter.push(item);
        });
        Object.values(resp[1]).map(item => {
          valueForProfessional.push(item);
        });
        Object.values(resp[2]).map(item => {
          valueForAdvance.push(item);
        });

        setMembershipOne(resp[0].name);
        setMembershipOnePrice(resp[0].price);
        setMembershipOneLoadTesting(resp[0].loadTesting);
        setMembershipOneScheduledTesting(resp[0].scheduleTesting);
        setMembershipOneAutomatedTesting(resp[0].automaticTesting);

        setMembershipTwo(resp[1].name);
        setMembershipTwoPrice(resp[1].price);
        setMembershipTwoLoadTesting(resp[1].loadTesting);
        setMembershipTwoScheduledTesting(resp[1].scheduleTesting);
        setMembershipTwoAutomatedTesting(resp[1].automaticTesting);

        setMembershipThree(resp[2].name);
        setMembershipThreePrice(resp[2].price);
        setMembershipThreeLoadTesting(resp[2].loadTesting);
        setMembershipThreeScheduledTesting(resp[2].scheduleTesting);
        setMembershipThreeAutomatedTesting(resp[2].automaticTesting);

        for (let i = 0; i < allkeys.length; i++) {
          if (i == 0 || i == 1 || i == 2) {
          } else {
            let objToStore = {
              name: allkeys[i],
              starter: valueForStarter[i],
              professional: valueForProfessional[i],
              advance: valueForAdvance[i],
            };
            dataForComparison.push(objToStore);
          }
        }
        setDataForComparison(dataForComparison);
        setAllMemberShips(resp);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchActiveMembershipDetail = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/getCognitoUserGroup`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        setActiveMembershipId(resp.id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const upgradeMembership = memId => {
    console.log(memId);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        `${baseUrl}/paymentcheckout/upgardeMembership?membershipId=${memId}`,
        {
          Authorization: `${token}`,tokenType:'aws',
        },
      )
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        logout();
        
      })
      .catch(err => {
        console.log(err);
      });
  };

  const saveMembershipPackage = membershipId => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        `${baseUrl}/paymentcheckout/savePaymentCard?membershipId=${membershipId}`,
        {
          Authorization: `${token}`,tokenType:'aws',
        },
      )
      .then(resp => resp.json())
      .then(resp => {
        if (resp.hasOwnProperty('id')) {
          navigation.navigate('MembershipPaymentScreen', {
            id: resp.id,
          });
        } else {
          console.log('Problem in buying');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  const customerPaymentMethod = membership => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('POST', `${baseUrl}/paymentcheckout/getPaymentMethodForCustomer`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then(resp => resp.json())
      .then(resp => {
        // console.log(resp);
        if (isEmpty(resp)) {
          saveMembershipPackage(membership);
        } else {
          upgradeMembership(membership);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const logout = () => {
    Auth.signOut();
    reLoginUser();
  };

  const reLoginUser = () => {
    console.log(email);
    console.log(password);
    Auth.signIn(email, password)
      .then(user => {
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
      .catch(err => {
        console.log(err);
        if (err.code == 'InvalidParameterException') {
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
  const storeIsLoggInValue = async isloginvalue => {
    try {
      await AsyncStorage.setItem('isLoggedIn', isloginvalue + '');
      fetchActiveMembershipDetail();
      
      toggleModalTwo();
    } catch (e) {
      console.log(e);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalTwo = () => {
    setIsModalVisibleTwo(!isModalVisibleTwo);
  };

  const drawerTogglerCallBack = () => {
    console.log('drawer');
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  useEffect(() => {
    fetchAllMemberships();
    fetchActiveMembershipDetail();

    const unSubscribe = navigation.addListener('didFocus', () => {
      fetchAllMemberships();
      fetchActiveMembershipDetail();
    });
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
      <DashboardNavbar title="Membership" />
      <ScrollView>
        <View style={MembershipStyle.container}>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}>
            <Card style={MembershipStyle.navigationCard}>
              <View style={MembershipStyle.navCardContainer}>
                <Text style={MembershipStyle.cardText}>Feature Comparison</Text>
                <Image
                  source={require('../../assets/images/EyeOpenPurple.png')}
                  style={MembershipStyle.image}
                />
              </View>
            </Card>
          </TouchableOpacity>

          <View>
            <Modal
              style={{height: hp('65'), position: 'relative'}}
              onBackButtonPress={() => toggleModal()}
              isVisible={isModalVisible}
              backdropColor={colors.grey4}>
              <View>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <MaterialCommunityIcons
                    style={{
                      width: wp('10'),
                      backgroundColor: colors.white,
                      textAlign: 'center',
                      paddingVertical: 10,
                    }}
                    name="close-thick"
                    size={25}
                    color={colors.red}
                  />
                </TouchableOpacity>

                <View style={MembershipStyle.modalContainer}>
                  <View style={MembershipStyle.modalListConatiner}>
                    <Text style={MembershipStyle.modalListHeading}>
                      Memberships
                    </Text>
                  </View>
                  <View
                    style={
                      MembershipStyle.modalListConatinerForMembershipTypes
                    }>
                    <Text
                      style={MembershipStyle.modalListHeadingForMembershipType}>
                      Starter
                    </Text>
                  </View>
                  <View
                    style={
                      MembershipStyle.modalListConatinerForMembershipTypeProfessional
                    }>
                    <Text
                      style={MembershipStyle.modalListHeadingForMembershipType}>
                      Professional
                    </Text>
                  </View>
                  <View
                    style={
                      MembershipStyle.modalListConatinerForMembershipTypeAdvance
                    }>
                    <Text
                      style={MembershipStyle.modalListHeadingForMembershipType}>
                      Advance
                    </Text>
                  </View>
                </View>
                <FlatList
                  style={{height: hp('60')}}
                  data={dataForComparison}
                  renderItem={({item}) => {
                    return (
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            width: wp('40'),
                            backgroundColor: colors.white1,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {item.name}
                        </Text>
                        {item.starter == true ? (
                          <FontAwesome5
                            style={{
                              width: wp('14.5'),
                              backgroundColor: colors.white,
                              textAlign: 'center',
                              paddingVertical: 10,
                            }}
                            name="check"
                            size={22}
                            color={colors.green}
                          />
                        ) : (
                          <Text
                            style={{
                              width: wp('14.5'),
                              backgroundColor: colors.white,
                            }}></Text>
                        )}

                        {item.professional == true ? (
                          <FontAwesome5
                            style={{
                              width: wp('18'),
                              backgroundColor: colors.white,
                              textAlign: 'center',
                              paddingVertical: 10,
                            }}
                            name="check"
                            size={22}
                            color={colors.green}
                          />
                        ) : (
                          <Text
                            style={{
                              width: wp('18'),
                              backgroundColor: colors.white,
                            }}></Text>
                        )}

                        {item.advance == true ? (
                          <FontAwesome5
                            style={{
                              width: wp('18'),
                              backgroundColor: colors.white,
                              textAlign: 'center',
                              paddingVertical: 10,
                            }}
                            name="check"
                            size={22}
                            color={colors.green}
                          />
                        ) : (
                          <Text
                            style={{
                              width: wp('18'),
                              backgroundColor: colors.white,
                            }}></Text>
                        )}

                        {/* <MaterialCommunityIcons
                                style={{width:wp("27.5"),backgroundColor:colors.white,textAlign:"center",paddingVertical:10}}
                                  name="close-thick"
                                  size={25}
                                  color={colors.red}
                                /> */}
                      </View>
                    );
                  }}
                />
              </View>
            </Modal>
          </View>

          <View style={MembershipStyle.toggleSwitchContainer}>
            {toggleMonthlySwitch ? (
              <TouchableOpacity
                onPress={() => {
                  setToggleMonthlySwitch(true);
                  setToggleYearlySwitch(false);
                }}
                style={MembershipStyle.toggleTrue}>
                <Text style={MembershipStyle.toggleTrueText}>Monthly</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setToggleMonthlySwitch(true);
                  setToggleYearlySwitch(false);
                }}
                style={MembershipStyle.toggleFalse}>
                <Text style={MembershipStyle.toggleFalseText}>Monthly</Text>
              </TouchableOpacity>
            )}

            {/* {toggleYearlySwitch ? 
                <TouchableOpacity
                    onPress={()=>{
                        setToggleMonthlySwitch(true);
                        setToggleYearlySwitch(false);
                    }} 
                    style={MembershipStyle.toggleTrue}
                >
                    <Text style={MembershipStyle.toggleTrueText}>Yearly</Text>
                </TouchableOpacity>
            : 
                <TouchableOpacity 
                    onPress={()=>{
                        setToggleMonthlySwitch(false);
                        setToggleYearlySwitch(true);
                    }}
                    style={MembershipStyle.toggleFalse}
                >
                    <Text style={MembershipStyle.toggleFalseText}>Yearly</Text>
                </TouchableOpacity>
            } */}
          </View>

          {toggleMonthlySwitch ? (
            <View>
              <View style={MembershipStyle.cardContainer}>
                <Card style={MembershipStyle.basicCard}>
                  <View style={MembershipStyle.cardContent}>
                    <Text style={MembershipStyle.cardTitle}>
                      {membershipOne}
                    </Text>
                    <Text style={MembershipStyle.basicPrice}>
                      $ {membershipOnePrice}
                    </Text>
                    <Text style={MembershipStyle.cardBill}>Billed Monthly</Text>
                  </View>

                  <View style={MembershipStyle.borderLine} />
                  {membershipOneLoadTesting == true ? (
                    <View style={MembershipStyle.textContainer}>
                      <FontAwesome5
                        name="check"
                        size={22}
                        color={colors.green}
                      />
                      <Text style={MembershipStyle.textActive}>
                        {'  '}Load Testing
                      </Text>
                    </View>
                  ) : (
                    <View style={MembershipStyle.textContainer}>
                      <MaterialCommunityIcons
                        name="close-thick"
                        size={25}
                        color={colors.red}
                      />
                      <Text style={MembershipStyle.textDeactivated}>
                        {'  '}Load Testing
                      </Text>
                    </View>
                  )}

                  <View style={MembershipStyle.shortBorderLine} />

                  {membershipOneScheduledTesting == true ? (
                    <View style={MembershipStyle.textContainer}>
                      <FontAwesome5
                        name="check"
                        size={22}
                        color={colors.green}
                      />
                      <Text style={MembershipStyle.textActive}>
                        {'  '}Schedule Testing
                      </Text>
                    </View>
                  ) : (
                    <View style={MembershipStyle.textContainer}>
                      <MaterialCommunityIcons
                        name="close-thick"
                        size={25}
                        color={colors.red}
                      />
                      <Text style={MembershipStyle.textDeactivated}>
                        {'  '}Schedule Testing
                      </Text>
                    </View>
                  )}

                  <View style={MembershipStyle.shortBorderLine} />

                  {membershipOneAutomatedTesting == true ? (
                    <View style={MembershipStyle.textContainer}>
                      <FontAwesome5
                        name="check"
                        size={22}
                        color={colors.green}
                      />
                      <Text style={MembershipStyle.textActive}>
                        {'  '}Automated Testing
                      </Text>
                    </View>
                  ) : (
                    <View style={MembershipStyle.textContainer}>
                      <MaterialCommunityIcons
                        name="close-thick"
                        size={25}
                        color={colors.red}
                      />
                      <Text style={MembershipStyle.textDeactivated}>
                        {'  '}Automated Testing
                      </Text>
                    </View>
                  )}
                  <View style={MembershipStyle.shortBorderLine} />

                  {activeMembershipId == 1 ? (
                    <TouchableOpacity
                      style={MembershipStyle.activeButton}
                      onPress={() => {}}>
                      <Text style={MembershipStyle.activeButtonText}>
                        Active
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[
                        MembershipStyle.buyNowButton,
                        {marginVertical: 20},
                      ]}
                      onPress={() => {
                        customerPaymentMethod(1);
                      }}>
                      <Text style={ProfileStyle.updateButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                  )}
                </Card>
              </View>

              <View style={[MembershipStyle.cardContainer, {marginBottom: 30}]}>
                <Card style={MembershipStyle.premiumCard}>
                  <View style={MembershipStyle.cardContent}>
                    <Text style={MembershipStyle.cardTitle}>
                      {membershipTwo}
                    </Text>
                    <Text style={MembershipStyle.premiumPrice}>
                      $ {membershipTwoPrice}
                    </Text>
                    <Text style={MembershipStyle.cardBill}>Billed Monthly</Text>
                  </View>

                  <View style={MembershipStyle.borderLine} />

                  {membershipTwoLoadTesting == true ? (
                    <View style={MembershipStyle.textContainer}>
                      <FontAwesome5
                        name="check"
                        size={22}
                        color={colors.green}
                      />
                      <Text style={MembershipStyle.textActive}>
                        {'  '}Load Testing
                      </Text>
                    </View>
                  ) : (
                    <View style={MembershipStyle.textContainer}>
                      <MaterialCommunityIcons
                        name="close-thick"
                        size={25}
                        color={colors.red}
                      />
                      <Text style={MembershipStyle.textDeactivated}>
                        {'  '}Load Testing
                      </Text>
                    </View>
                  )}

                  <View style={MembershipStyle.shortBorderLine} />

                  {membershipTwoScheduledTesting == true ? (
                    <View style={MembershipStyle.textContainer}>
                      <FontAwesome5
                        name="check"
                        size={22}
                        color={colors.green}
                      />
                      <Text style={MembershipStyle.textActive}>
                        {'  '}Schedule Testing
                      </Text>
                    </View>
                  ) : (
                    <View style={MembershipStyle.textContainer}>
                      <MaterialCommunityIcons
                        name="close-thick"
                        size={25}
                        color={colors.red}
                      />
                      <Text style={MembershipStyle.textDeactivated}>
                        {'  '}Schedule Testing
                      </Text>
                    </View>
                  )}

                  <View style={MembershipStyle.shortBorderLine} />

                  {membershipTwoAutomatedTesting == true ? (
                    <View style={MembershipStyle.textContainer}>
                      <FontAwesome5
                        name="check"
                        size={22}
                        color={colors.green}
                      />
                      <Text style={MembershipStyle.textActive}>
                        {'  '}Automated Testing
                      </Text>
                    </View>
                  ) : (
                    <View style={MembershipStyle.textContainer}>
                      <MaterialCommunityIcons
                        name="close-thick"
                        size={25}
                        color={colors.red}
                      />
                      <Text style={MembershipStyle.textDeactivated}>
                        {'  '}Automated Testing
                      </Text>
                    </View>
                  )}
                  <View style={MembershipStyle.shortBorderLine} />

                  {activeMembershipId == 2 ? (
                    <TouchableOpacity
                      style={MembershipStyle.activeButton}
                      onPress={() => {}}>
                      <Text style={MembershipStyle.activeButtonText}>
                        Active
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[
                        MembershipStyle.buyNowButton,
                        {marginVertical: 20},
                      ]}
                      onPress={() => {
                        customerPaymentMethod(2);
                      }}>
                      <Text style={ProfileStyle.updateButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                  )}
                </Card>
              </View>

              <View style={[MembershipStyle.cardContainer, {marginBottom: 30}]}>
                <Card style={MembershipStyle.premiumCard}>
                  <View style={MembershipStyle.cardContent}>
                    <Text style={MembershipStyle.cardTitle}>
                      {membershipThree}
                    </Text>
                    <Text style={MembershipStyle.premiumPrice}>
                      $ {membershipThreePrice}
                    </Text>
                    <Text style={MembershipStyle.cardBill}>Billed Monthly</Text>
                  </View>

                  <View style={MembershipStyle.borderLine} />

                  {membershipThreeLoadTesting == true ? (
                    <View style={MembershipStyle.textContainer}>
                      <FontAwesome5
                        name="check"
                        size={22}
                        color={colors.green}
                      />
                      <Text style={MembershipStyle.textActive}>
                        {'  '}Load Testing
                      </Text>
                    </View>
                  ) : (
                    <View style={MembershipStyle.textContainer}>
                      <MaterialCommunityIcons
                        name="close-thick"
                        size={25}
                        color={colors.red}
                      />
                      <Text style={MembershipStyle.textDeactivated}>
                        {'  '}Load Testing
                      </Text>
                    </View>
                  )}

                  <View style={MembershipStyle.shortBorderLine} />

                  {membershipThreeScheduledTesting == true ? (
                    <View style={MembershipStyle.textContainer}>
                      <FontAwesome5
                        name="check"
                        size={22}
                        color={colors.green}
                      />
                      <Text style={MembershipStyle.textActive}>
                        {'  '}Schedule Testing
                      </Text>
                    </View>
                  ) : (
                    <View style={MembershipStyle.textContainer}>
                      <MaterialCommunityIcons
                        name="close-thick"
                        size={25}
                        color={colors.red}
                      />
                      <Text style={MembershipStyle.textDeactivated}>
                        {'  '}Schedule Testing
                      </Text>
                    </View>
                  )}

                  <View style={MembershipStyle.shortBorderLine} />

                  {membershipThreeAutomatedTesting == true ? (
                    <View style={MembershipStyle.textContainer}>
                      <FontAwesome5
                        name="check"
                        size={22}
                        color={colors.green}
                      />
                      <Text style={MembershipStyle.textActive}>
                        {'  '}Automated Testing
                      </Text>
                    </View>
                  ) : (
                    <View style={MembershipStyle.textContainer}>
                      <MaterialCommunityIcons
                        name="close-thick"
                        size={25}
                        color={colors.red}
                      />
                      <Text style={MembershipStyle.textDeactivated}>
                        {'  '}Automated Testing
                      </Text>
                    </View>
                  )}
                  <View style={MembershipStyle.shortBorderLine} />

                  {activeMembershipId == 3 ? (
                    <TouchableOpacity
                      style={MembershipStyle.activeButton}
                      onPress={() => {}}>
                      <Text style={MembershipStyle.activeButtonText}>
                        Active
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[
                        MembershipStyle.buyNowButton,
                        {marginVertical: 20},
                      ]}
                      onPress={() => {
                        customerPaymentMethod(3);
                      }}>
                      <Text style={ProfileStyle.updateButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                  )}
                </Card>
              </View>
            </View>
          ) : (
            <View>
              <View style={MembershipStyle.cardContainer}>
                <Card style={MembershipStyle.basicCard}>
                  <View style={MembershipStyle.cardContent}>
                    <Text style={MembershipStyle.cardTitle}>Basic</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={MembershipStyle.basicPrice}>$599 </Text>
                      <Text style={MembershipStyle.cutText}>$799</Text>
                    </View>
                    <Text style={MembershipStyle.cardBill}>Billed Annualy</Text>
                  </View>

                  <View style={MembershipStyle.borderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <FontAwesome5 name="check" size={22} color={colors.green} />
                    <Text style={MembershipStyle.textActive}>
                      {'  '}Load Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <MaterialCommunityIcons
                      name="close-thick"
                      size={25}
                      color={colors.red}
                    />
                    <Text style={MembershipStyle.textDeactivated}>
                      {'  '}Schedule Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <MaterialCommunityIcons
                      name="close-thick"
                      size={25}
                      color={colors.red}
                    />
                    <Text style={MembershipStyle.textDeactivated}>
                      {'  '}Automated Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <MaterialCommunityIcons
                      name="close-thick"
                      size={25}
                      color={colors.red}
                    />
                    <Text style={MembershipStyle.textDeactivated}>
                      {'  '}IVR Testing
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={MembershipStyle.buyNowButton}
                    onPress={() => {}}>
                    <Text style={ProfileStyle.updateButtonText}>Buy Now</Text>
                  </TouchableOpacity>
                </Card>
              </View>

              <View style={MembershipStyle.cardContainer}>
                <Card style={MembershipStyle.premiumCard}>
                  <View style={MembershipStyle.cardContent}>
                    <Text style={MembershipStyle.cardTitle}>Premium</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={MembershipStyle.basicPrice}>$999 </Text>
                      <Text style={MembershipStyle.cutText}>$1199</Text>
                    </View>
                    <Text style={MembershipStyle.cardBill}>Billed Annualy</Text>
                  </View>

                  <View style={MembershipStyle.borderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <FontAwesome5 name="check" size={22} color={colors.green} />
                    <Text style={MembershipStyle.textActive}>
                      {'  '}Load Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <FontAwesome5 name="check" size={22} color={colors.green} />
                    <Text style={MembershipStyle.textActive}>
                      {'  '}Schedule Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <MaterialCommunityIcons
                      name="close-thick"
                      size={25}
                      color={colors.red}
                    />
                    <Text style={MembershipStyle.textDeactivated}>
                      {'  '}Automated Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <MaterialCommunityIcons
                      name="close-thick"
                      size={25}
                      color={colors.red}
                    />
                    <Text style={MembershipStyle.textDeactivated}>
                      {'  '}IVR Testing
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={MembershipStyle.activeButton}
                    onPress={() => {}}>
                    <Text style={MembershipStyle.activeButtonText}>Active</Text>
                  </TouchableOpacity>
                </Card>
              </View>

              <View style={MembershipStyle.cardContainer}>
                <Card style={MembershipStyle.enterpriseCard}>
                  <View style={MembershipStyle.cardContent}>
                    <Text style={MembershipStyle.cardTitle}>Enterprise</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={MembershipStyle.basicPrice}>$1299 </Text>
                      <Text style={MembershipStyle.cutText}>$1399</Text>
                    </View>
                    <Text style={MembershipStyle.cardBill}>Billed Annualy</Text>
                  </View>

                  <View style={MembershipStyle.borderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <FontAwesome5 name="check" size={22} color={colors.green} />
                    <Text style={MembershipStyle.textActive}>
                      {'  '}Load Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <FontAwesome5 name="check" size={22} color={colors.green} />
                    <Text style={MembershipStyle.textActive}>
                      {'  '}Schedule Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <FontAwesome5 name="check" size={22} color={colors.green} />
                    <Text style={MembershipStyle.textActive}>
                      {'  '}Automated Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <MaterialCommunityIcons
                      name="close-thick"
                      size={25}
                      color={colors.red}
                    />
                    <Text style={MembershipStyle.textDeactivated}>
                      {'  '}IVR Testing
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={MembershipStyle.enterpriseBuyNow}
                    onPress={() => {}}>
                    <Text style={MembershipStyle.enterpriseButtonText}>
                      Buy Now
                    </Text>
                  </TouchableOpacity>
                </Card>
              </View>

              <View style={MembershipStyle.unlimintedCardContainer}>
                <Card style={MembershipStyle.unlimitedCard}>
                  <View style={MembershipStyle.cardContent}>
                    <Text style={MembershipStyle.cardTitle}>Unlimited</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={MembershipStyle.basicPrice}>$1499 </Text>
                      <Text style={MembershipStyle.cutText}>$1699</Text>
                    </View>
                    <Text style={MembershipStyle.cardBill}>Billed Annualy</Text>
                  </View>

                  <View style={MembershipStyle.borderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <FontAwesome5 name="check" size={22} color={colors.green} />
                    <Text style={MembershipStyle.textActive}>
                      {'  '}Load Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <FontAwesome5 name="check" size={22} color={colors.green} />
                    <Text style={MembershipStyle.textActive}>
                      {'  '}Schedule Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.shortBorderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <FontAwesome5 name="check" size={22} color={colors.green} />
                    <Text style={MembershipStyle.textActive}>
                      {'  '}Automated Testing
                    </Text>
                  </View>
                  <View style={MembershipStyle.borderLine} />

                  <View style={MembershipStyle.textContainer}>
                    <FontAwesome5 name="check" size={22} color={colors.green} />
                    <Text style={MembershipStyle.textActive}>
                      {'  '}IVR Testing
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={MembershipStyle.unlimitedBuyNow}
                    onPress={() => {}}>
                    <Text style={MembershipStyle.enterpriseButtonText}>
                      Buy Now
                    </Text>
                  </TouchableOpacity>
                </Card>
              </View>
            </View>
          )}
        </View>
        <Modal isVisible={isModalVisibleTwo} backdropColor={colors.grey4}>
          <View style={ServiceStyles.modalContainer}>
            <View style={ServiceStyles.modalImageContainer}>
              <Image
                source={require('../../assets/images/CardBase.png')}
                style={ServiceStyles.modalImage}
              />
            </View>
            <Text style={ServiceStyles.modalLightText}>
              <Text style={ServiceStyles.modalBoldText}>Membership Upgraded Successfully.</Text> 
             
            </Text>

            <View style={ServiceStyles.modalVerticalLine} />
            <TouchableOpacity
              style={ServiceStyles.modalButton}
              onPress={() => {
                toggleModalTwo();
                setTimeout(() => {
                  navigation.goBack();
                },1000)
                
              }}>
              <Text style={ServiceStyles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withTheme(withNavigation(Membership));
