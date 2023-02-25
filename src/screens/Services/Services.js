import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  Image,
  Platform,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import {
  Button,
  HelperText,
  withTheme,
  Avatar,
  Card,
  Title,
  Paragraph,
  Banner
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import colors from '../../assets/colors/colors';
import ServiceStyles from '../../assets/styles/Service/ServiceStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import GeneralProperties from '../../assets/styles/GeneralProperties';
import RadioGroupLoading from '../../components/RadioGroupLoading/RadioGroupLoading';
import {DrawerActions} from 'react-navigation-drawer';
import DrawerNavbar from '../../components/Navbars/DrawerNavbar';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';
import ServicesListCard from '../../components/Services/ServicesListCard';
import Modal from 'react-native-modal';
import ContainerStyle from '../../assets/styles/ContainerStyle';
import _ from "lodash";
import LottieView from 'lottie-react-native';



const Services = ({navigation}) => {
  const drawerTogglerCallBack = () => {
    console.log('drawer');
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
  const [bottomSheetWidth, setBottomSheetWidth] = useState(
    Dimensions.get('window').width,
  );
  const {baseUrl, token} = useContext(AppContext);
  const [list, setList] = useState([]);
  const [listCopy, setListCopy] = useState([]);
  const [serviceId, setServiceId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isServiceLoading, setIsServiceLoading] = useState(false);
  const [successDeleteBannerVisible, setSuccessDeleteBannerVisible] = useState(false);
  const [messageDeleteBannerVisible, setMessageDeleteBannerVisible] = useState("");

  const ServicesList = async () => {
    setIsServiceLoading(true);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/service/list`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setList(response);
        setListCopy(response);
        setIsServiceLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showDeleteSuccessBanner = (message) => {
    setMessageDeleteBannerVisible(message);
    setSuccessDeleteBannerVisible(!successDeleteBannerVisible);
    setTimeout(()=>{
      setSuccessDeleteBannerVisible(false);
    },3000)
  }

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
      }}>
      <Card style={[TestMethod.filterCard]}>
        <Text style={[TestMethod.clearAll]}>Clear All</Text>
        <Text style={[TestMethod.filterBy]}>Filter By</Text>
      </Card>

      <View style={[GeneralProperties.flexRow]}>
        <View>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Sprint Name
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Created Date
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Created Time
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Completed Date
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Completed Time
          </Button>
          <Button
            color={colors.grey3}
            style={{bottom: 0}}
            style={[GeneralProperties.mv2]}
            onPress={() => {
              console.log('ok');
            }}>
            Status
          </Button>
        </View>
        <View>
          <RadioGroupLoading />
        </View>
      </View>

      <Card style={[TestMethod.applyCard]}>
        <Text style={[TestMethod.applyText]}>Apply</Text>
        <TouchableOpacity onPress={() => sheetRef.current.snapTo(2)}>
          <Text style={[TestMethod.CloseText]}>Close</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );

  const sheetRef = React.useRef(null);
  useEffect(() => {
    ServicesList();
    const unSubscribe = navigation.addListener("didFocus",()=>{
      ServicesList();
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
      <View style={ServiceStyles.container}>
        <DrawerNavbar title="Service" />
        <View style={{paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row', marginTop: wp('4%')}}>
            <View style={[ServiceStyles.textInputView,{height:40,justifyContent: 'center',alignItems: 'center'}]}>
              <EvilIcons
                style={ServiceStyles.iconStyle}
                name="search"
                size={20}
                color={colors.grey}
              />
              <TextInput
                autoCapitalize="none"
                style={[ServiceStyles.textInput,{marginTop: 8}]}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    if(searchTerm == "")
                    {
                      ServicesList();
                    }
                    const data = _.filter(listCopy,item => {
                      if(item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()))
                      {
                        return true
                      }
                      return false
                    });
                  setList(listCopy);
                  setSearchTerm(searchTerm);  
                  }
                }}
                onChangeText={(text) =>{
                  if(text == "")
                  {
                    ServicesList();
                  }
                  const data = _.filter(list,item => {
                    if(item.serviceName.toLowerCase().includes(text.toLowerCase()))
                    {
                      return true
                    }
                    return false
                  });
                
                setList(data);
                setSearchTerm(text);  
                }}
                placeholder="Search..."
                value={searchTerm}
              />
            </View>
            <Button
              mode="contained"
              color={colors.headerBarPurple}
              style={ServiceStyles.button}
              onPress={() => {
                navigation.navigate('ServiceName');
              }}>
              <Text style={{fontFamily: 'Poppins-Medium'}}>+ Service</Text>
            </Button>
          </View>
          <View style={ServiceStyles.filterView}>
            {/* <TouchableOpacity
              style={ServiceStyles.touchableOpacity}
              onPress={() => {
                setBottomSheetHeight(Dimensions.get('window').height / 3);
                sheetRef.current.snapTo(0);
              }}>
              <MaterialCommunityIcons
                name="filter"
                size={24}
                color={colors.lightGrey}
              />
              <Text style={ServiceStyles.filterText}>{'  '}FILTER</Text>
            </TouchableOpacity> */}
          </View>
          <Banner
              
              visible={successDeleteBannerVisible}
              actions={[
                // {
                //   label: 'Ok',
                //   onPress: () => setSuccessDeleteBannerVisible(false),
                // },
                
              ]}
              >
             <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                <LottieView style={{height:50,width:wp("15")}} source={require('../../assets/animations/delete.json')} autoPlay loop />
                <Text style={[ServiceStyles.deleteModalButtonText,{color:colors.red,marginLeft:5,width:wp('60')}]}>{messageDeleteBannerVisible}</Text>
                <TouchableOpacity  style={{width:wp('15')}} onPress={()=>{ setSuccessDeleteBannerVisible(false)}}><MaterialCommunityIcons name="close" size={32} color={colors.red} /></TouchableOpacity> 
            </View>   
            </Banner>
          {isServiceLoading ? 
            <ActivityIndicator
              style={{alignSelf: 'center', marginTop: 200}}
              color={colors.primaryPurple}
              size="large"
            /> 
            :
            list.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={list}
              style={{height: hp('65')}}
              keyExtractor={(item) => item.id}
              renderItem={({item, index}) => {
                return <ServicesListCard item={item} refresh = {ServicesList} showDeleteSuccess={showDeleteSuccessBanner} />;
              }}
            />
          ) : (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
              <Text style={[TestMethod.filterText]}>No Service found.</Text>
            </View>
          )}
        </View>
        <BottomSheet
          style={{position: 'absolute', bottom: 0, zIndex: 2}}
          ref={sheetRef}
          snapPoints={[bottomSheetHeight, bottomSheetWidth, 0]}
          borderRadius={10}
          renderContent={renderContent}
        />
        {/* <Modal isVisible={isModalVisible} backdropColor={colors.grey4}>
      <View style={ServiceStyles.modalContainer}> */}
        {/* <View style={ServiceStyles.modalImageContainer}>
          <Image
            source={require('../../assets/images/CardBase.png')}
            style={ServiceStyles.modalImage}
          />
        </View> */}
        {/* <Text style={ServiceStyles.modalLightText}>Do you really want to delete this service</Text>

        <View style={ServiceStyles.modalVerticalLine} />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={ServiceStyles.deleteModalButtonLeft}
            onPress={() => {
             
            }}>
            <Text style={ServiceStyles.deleteModalButtonText}>Not Now</Text>
          </TouchableOpacity>
          <View style={{borderColor: colors.white, borderWidth: 1}} />
          <TouchableOpacity
            style={ServiceStyles.deleteModalButtonRight}
            onPress={() => {
              DeleteService(list.id);
              toggleModal();
            }}>
            <Text style={ServiceStyles.deleteModalButtonText}>Delete Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>   */}
      </View>
    </SafeAreaView>
  );
};

export default withTheme(withNavigation(Services));
