import React, {useState,useEffect, useRef,useContext} from 'react';
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
import {withNavigation} from 'react-navigation';
import colors from '../../assets/colors/colors';
import ServiceStyles from '../../assets/styles/Service/ServiceStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomSheet from 'reanimated-bottom-sheet';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import GeneralProperties from '../../assets/styles/GeneralProperties';
import RadioGroupLoading from '../../components/RadioGroupLoading/RadioGroupLoading';
import {DrawerActions} from 'react-navigation-drawer';
import ProfileStyle from '../../assets/styles/ProfileStyle/ProfileStyle';
import OrderHistoryStyle from '../../assets/styles/OrderHistory/OrderHistoryStyle';
import PhoneInput from 'react-native-phone-number-input';
import DashboardNavbar from '../../components/Navbars/DashboardNavbar';
import MembershipStyle from '../../assets/styles/MembershipStyle/MembershipStyle';
import ContainerStyle from '../../assets/styles/ContainerStyle';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';

const OrderHistory = ({navigation}) => {
  const [value, setValue] = React.useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const {baseUrl,token} = useContext(AppContext);
  const [membershipName, setMembershipName] = useState('');
  const [membershipAmount, setMembershipAmount] = useState('');
  const [membershipRenewDate, setMembershipRenewDate] = useState('');
  const [history, setHistory] = useState([]);


  const drawerTogglerCallBack = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const getCurrentMembershipPlan = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/getCognitoUserGroup`, {Authorization: `${token}`,tokenType:'aws'})
      .then((resp) => resp.json())
      .then((resp) => {
        setMembershipName(resp.membershipName);
        setMembershipAmount(resp.membershipAmount);
        setMembershipRenewDate(resp.renewDate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMembershipHistory = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/paymentcheckout/membershipHistory`, {Authorization: `${token}`,tokenType:'aws'})
      .then((resp) => resp.json())
      .then((resp) => {
        setHistory(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
 useEffect(() => {
  getCurrentMembershipPlan();
  getMembershipHistory();
 },[])
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
        <DashboardNavbar title="Order History" />
        <ScrollView>
          <View style={OrderHistoryStyle.container}>
            <Text style={OrderHistoryStyle.heading}>
              Current Membership Plan
            </Text>

            <Card style={OrderHistoryStyle.currentCard}>
              <Card.Content>
                <View style={OrderHistoryStyle.cardHeaderContainer}>
                  <Text style={OrderHistoryStyle.premiumText}>
                    {membershipName}    ${membershipAmount}/mo
                  </Text>
                  <TouchableOpacity onPress={()=>{}} style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../assets/images/star.png')}
                      style={OrderHistoryStyle.starImage}
                    />
                    
                    <Text style={OrderHistoryStyle.upgradeText}>
                      Upgrade Plan
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={OrderHistoryStyle.dateContainer}>
                  <Text style={OrderHistoryStyle.dateText}>Renewal date:</Text>
                  <Text style={OrderHistoryStyle.date}> {membershipRenewDate}</Text>
                </View>
                <View style={OrderHistoryStyle.borderLine} />
                <View style={OrderHistoryStyle.editPlanContainer}>
                  <TouchableOpacity>
                    <Text style={OrderHistoryStyle.editPlan}>Edit Plan</Text>
                  </TouchableOpacity>
                  
                  <Text style={OrderHistoryStyle.dot}>{'\u2022'}</Text>
                  <TouchableOpacity>
                    <Text style={OrderHistoryStyle.editPlan}>Cancel Plan</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>

            <Text style={OrderHistoryStyle.heading}>Order History</Text>

            <FlatList 
                data={history}
                renderItem={({item})=>{
                  return <Card style={OrderHistoryStyle.historyCard}>
                  <Card.Content>
                    <View style={OrderHistoryStyle.planCardHeaderContainer}>
                      <View style={OrderHistoryStyle.planContainer}>
                        <Text style={OrderHistoryStyle.plan}>Plan :</Text>
                        <Text style={OrderHistoryStyle.planName}> {item.membership}</Text>
                      </View>
                      <Text style={OrderHistoryStyle.price}>${item.charge}</Text>
                    </View>
                    <View style={OrderHistoryStyle.planCardHeaderContainer}>
                      <View style={OrderHistoryStyle.planContainer}>
                        <Text style={OrderHistoryStyle.plan}>Date :</Text>
                        <Text style={OrderHistoryStyle.historyDate}>
                          {' '}
                          {item.endDate}
                        </Text>
                        <Text style={OrderHistoryStyle.planHistory}>
                          Plan Type :
                        </Text>
                        <Text style={OrderHistoryStyle.historyDate}> Monthly</Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
                }} 
            />
            
          
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(withNavigation(OrderHistory));
