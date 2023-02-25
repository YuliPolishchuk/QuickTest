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
  TextInput,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import TestOrder from '../../components/TestOrders/TestOrder';
import DrawerNavbar from '../../components/Navbars/DrawerNavbar';
import {HelperText, withTheme, Button, Card, Title, Banner} from 'react-native-paper';
import GeneralProperties from '../../assets/styles/GeneralProperties';
import Searchbar from '../../components/SearchBar.js/SearchBar';
import BottomSheet from 'reanimated-bottom-sheet';
import RadioGroupLoading from '../../components/RadioGroupLoading/RadioGroupLoading';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import colors from '../../assets/colors/colors';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';
import axios from 'axios';
import NavbarStyles from '../../assets/styles/NavbarStyles/NavbarStyles';
import ContainerStyle from '../../assets/styles/ContainerStyle';
import _ from 'lodash';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import ServiceStyles from '../../assets/styles/Service/ServiceStyles';

const TextMethods = ({image, title, paragraph, navigation}) => {
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [allSprints, setAllSprints] = useState([]);
  const [allSprintsCopyForSearch, setAllSprintsCopyForSearch] = useState([]);
  const [allTestTypes, setAllTestTypes] = useState([]);
  const [allTestTypesKeys, setAllTestTypesKeys] = useState([]);
  const [isSprintLoading, setIsSprintLoading] = useState(true);
  const [bottomSheetWidth, setBottomSheetWidth] = useState(
    Dimensions.get('window').width,
  );
  const {token, baseUrl} = useContext(AppContext);
  const [successDeleteBannerVisible, setSuccessDeleteBannerVisible] = useState(false);
  const [messageDeleteBannerVisible, setMessageDeleteBannerVisible] = useState("");


  const showDeleteSuccessBanner = (message) => {
    setMessageDeleteBannerVisible(message);
    setSuccessDeleteBannerVisible(!successDeleteBannerVisible);
    setTimeout(()=>{
      setSuccessDeleteBannerVisible(false);
    },3000)
  }

  const fetchAllSprintList = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/sprint/listSprint`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        setAllSprints(resp);
        setAllSprintsCopyForSearch(resp);
        setIsSprintLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const listSprintByTestType = testType => {
    console.log(testType);

    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        `${baseUrl}/sprint/listSprintByTestType?testType=${testType}`,
        {Authorization: `${token}`,
        tokenType: 'aws',
      },
      )
      .then(resp => resp.json())
      .then(resp => {
        // console.log(resp);
        setAllSprints(resp);
        setAllSprintsCopyForSearch(resp);
        setIsSprintLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsSprintLoading(false);
      });
  };

  const getTestTypeForGroup = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/sprint/getTestTypeForGroup`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then(resp => resp.json())
      .then(resp => {
        // console.log(Object.entries(resp));
        setAllTestTypes(Object.values(resp));
        setAllTestTypesKeys(Object.keys(resp));
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllSprintList();
    getTestTypeForGroup();
  }, []);

  const renderContent = () => (
    <View style={[TestMethod.containerBackground]}>
      <Card style={[TestMethod.filterCard]}>
        <Text style={[TestMethod.clearAll]}>Clear All</Text>
        <Text style={[TestMethod.filterBy]}>Filter By</Text>
      </Card>

      <View style={[GeneralProperties.flexRow]}>
        <View>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv1]}
            onPress={() => {
              console.log('ok');
            }}>
            Sprint Name
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv1]}
            onPress={() => {
              console.log('ok');
            }}>
            Created Date
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv1]}
            onPress={() => {
              console.log('ok');
            }}>
            Created Time
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv1]}
            onPress={() => {
              console.log('ok');
            }}>
            Completed Date
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv1]}
            onPress={() => {
              console.log('ok');
            }}>
            Completed Time
          </Button>
          <Button
            color={colors.grey3}
            style={[GeneralProperties.mv1]}
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
  return (
    <SafeAreaView style={ContainerStyle.safeAreaContainer}>
      {Platform.OS == 'ios' ? null : (
        <StatusBar
          hidden={false}
          backgroundColor={colors.purple}
          barStyle="light-content"
        />
      )}
      <View style={[TestMethod.container]}>
        <DrawerNavbar title="Test Method" />
        <Card style={[TestMethod.CardStyling]}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[GeneralProperties.ml1]}>
            {allTestTypes[0] == true ? (
              <TouchableOpacity>
                <Button
                  mode="outlined"
                  color={colors.grey2}
                  style={[TestMethod.ButtonStyle]}
                  onPress={() => {
                    listSprintByTestType(allTestTypes[0] ? 'Scheduled' : '');
                    setIsSprintLoading(true);
                  }}>
                  <Text style={[TestMethod.button]}>Schedule Testing</Text>
                </Button>
              </TouchableOpacity>
            ) : null}

            {allTestTypes[1] == true ? (
              <TouchableOpacity>
                <Button
                  mode="outlined"
                  color={colors.grey2}
                  style={[TestMethod.ButtonStyle]}
                  onPress={() => {
                    listSprintByTestType(allTestTypesKeys[1] ? 'Load' : '');
                    setIsSprintLoading(true);
                  }}>
                  <Text style={[TestMethod.button]}>Load Testing</Text>
                </Button>
              </TouchableOpacity>
            ) : null}

            {allTestTypes[2] == true ? (
              <TouchableOpacity>
                <Button
                  mode="outlined"
                  color={colors.grey2}
                  style={[TestMethod.ButtonStyle]}
                  onPress={() => {
                    listSprintByTestType(allTestTypes[2] ? 'Automatic' : '');
                    setIsSprintLoading(true);
                  }}>
                  <Text style={[TestMethod.button]}>Automated Testing</Text>
                </Button>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
          <View style={NavbarStyles.searchAddScriptView}>
            <View style={NavbarStyles.searchTextFieldView}>
              <Feather
                name="search"
                size={20}
                color={colors.grey}
                style={[GeneralProperties.ml2]}
              />
              <TextInput
                autoCapitalize="none"
                value={searchTerm}
                backgroundColor="transparent"
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace') {
                    if (searchTerm == '') {
                      fetchAllSprintList();
                      setSearchTerm(searchTerm);
                    } else {
                      const data = _.filter(allSprintsCopyForSearch, item => {
                        if (
                          item.sprintName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return true;
                        }
                        return false;
                      });

                      setAllSprints(allSprintsCopyForSearch);
                      setSearchTerm(searchTerm);
                    }
                  }
                }}
                onChangeText={text => {
                  console.log(searchTerm.length);

                  if (text == '') {
                    fetchAllSprintList();
                    setSearchTerm(text);
                  } else {
                    const data = _.filter(allSprints, item => {
                      if (
                        item.sprintName
                          .toLowerCase()
                          .includes(text.toLowerCase())
                      ) {
                        return true;
                      }
                      return false;
                    });

                    setAllSprints(data);
                    setSearchTerm(text);
                  }
                }}
                style={NavbarStyles.textInput}
                placeholder="Search..."
              />
            </View>
            <Button
              onPress={() => {
                navigation.navigate('ChooseTestMethod', {
                  schedule: allTestTypes[0],
                  load: allTestTypes[1],
                  auto: allTestTypes[2],
                });
              }}
              mode="contained"
              style={NavbarStyles.addScriptButton}>
              <Text style={NavbarStyles.button}>+ Sprint</Text>
            </Button>
          </View>
        </Card>

        <View style={[TestMethod.allSprintView]}>
          <TouchableOpacity
            onPress={() => {
              fetchAllSprintList();
              setIsSprintLoading(true);
            }}>
            <Text style={[TestMethod.allSprints]}>All Sprints</Text>
          </TouchableOpacity>

          
          {/* <TouchableOpacity
            onPress={() => {
              setBottomSheetHeight(Dimensions.get('window').height / 2);
              sheetRef.current.snapTo(0);
            }}>
            <View style={[TestMethod.filterView]}>
              <Icon
                name="filter"
                size={15}
                style={[GeneralProperties.mt0]}
                color={colors.grey2}
              />
              <Text style={[TestMethod.filterText]}>FILTER</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        <Banner
              visible={successDeleteBannerVisible}
              actions={[]}
              >
             <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                <LottieView style={{height:50,width:wp("15")}} source={require('../../assets/animations/delete.json')} autoPlay loop />
                <Text style={[ServiceStyles.deleteModalButtonText,{color:colors.red,marginLeft:5,width:wp('60')}]}>{messageDeleteBannerVisible}</Text>
                <TouchableOpacity  style={{width:wp('15')}} onPress={()=>{ setSuccessDeleteBannerVisible(false)}}><MaterialCommunityIcons name="close" size={32} color={colors.red} /></TouchableOpacity> 
            </View>   
          </Banner>
        {isSprintLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.primaryPurple} />
          </View>
        ) : allSprints.length > 0 ? (
          <FlatList
            style={{marginVertical: 20}}
            data={allSprints}
            renderItem={({item}) => {
              return item.status == 'Pending' ? (
                <TestOrder
                  status="In Progress"
                  item={item}
                  refresh={fetchAllSprintList}
                  showDeleteSuccessBanner={showDeleteSuccessBanner}
                />
              ) : (
                <TestOrder
                  status="Completed"
                  item={item}
                  refresh={fetchAllSprintList}
                  showDeleteSuccessBanner={showDeleteSuccessBanner}
                />
              );
            }}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[TestMethod.filterText]}>No Sprint found.</Text>
          </View>
        )}

        <BottomSheet
          style={[TestMethod.bottomSheet]}
          ref={sheetRef}
          snapPoints={[bottomSheetHeight, bottomSheetWidth, 0]}
          borderRadius={10}
          renderContent={renderContent}
        />
      </View>
    </SafeAreaView>
  );
};

export default withNavigation(TextMethods);
