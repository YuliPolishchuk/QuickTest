import React, {useState, useContext, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import TestOrder from '../../components/TestOrders/TestOrder';
import DrawerNavbar from '../../components/Navbars/DrawerNavbar';
import {HelperText,TextInput, withTheme, Button, Card, Title} from 'react-native-paper';
import GeneralProperties from '../../assets/styles/GeneralProperties';
import Searchbar from '../../components/SearchBar.js/SearchBar';
import BottomSheet from 'reanimated-bottom-sheet';
import RadioGroupLoading from '../../components/RadioGroupLoading/RadioGroupLoading';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import colors from '../../assets/colors/colors';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';
import axios from "axios";
import NavbarStyles from '../../assets/styles/NavbarStyles/NavbarStyles';
import ContainerStyle from '../../assets/styles/ContainerStyle';
import _ from "lodash";
import AllHistoryCard from '../../components/TestOrders/AllHistoryCard';
import DashboardNavbar from '../../components/Navbars/DashboardNavbar';

const TestMethodHistory = ({image, title, paragraph, navigation}) => {
  
  const [allSprints, setAllSprints] = useState([]);
  const sprintId = navigation.state.params.sprintId;
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [bottomSheetWidth, setBottomSheetWidth] = useState(
    Dimensions.get('window').width,
  );
  const {token,baseUrl} = useContext(AppContext);

  const fetchAllSprintList = ()=>{
    setIsHistoryLoading(true);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/sprint/getAutoPilotHist?sprintId=${sprintId}`, {
        Authorization: `${token}`,
        tokenType:'aws',
      })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("================================================");
        console.log(resp);
        console.log("********************************");
        setAllSprints(resp);
        setIsHistoryLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  

  useEffect(()=>{
    fetchAllSprintList();
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
        <DashboardNavbar title="History" />
      {isHistoryLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.primaryPurple} />
        </View>
      ) : allSprints.length > 0 ? (
        <FlatList
          style={{marginVertical: 20}}
          data={allSprints}
          renderItem={({item}) => {
            return <AllHistoryCard item={item} />
          }}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[TestMethod.filterText]}>No Sprint History found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default withNavigation(TestMethodHistory);
