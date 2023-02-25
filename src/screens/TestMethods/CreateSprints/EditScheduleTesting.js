import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  FlatList,
  TextInput,
  StatusBar,
  Platform,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  RadioButton,
  Checkbox,
  Card,
  DarkTheme,
} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TabView, SceneMap} from 'react-native-tab-view';
import {withNavigation} from 'react-navigation';
import colors from '../../../assets/colors/colors';
import GeneralProperties from '../../../assets/styles/GeneralProperties';
import TestMethod from '../../../assets/styles/TestMethodStyle/TestMethod';
import DashboardNavbar from '../../../components/Navbars/DashboardNavbar';
import {Select, Option} from 'react-native-select-lists';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconn from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-timezone';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';
import AppContext from '../../../context/AppContext';
import RNFetchBlob from 'react-native-fetch-blob';
import SelectInput from 'react-native-select-input-ios';
import RNPickerSelect from 'react-native-picker-select';
import {Dropdown} from 'react-native-material-dropdown-v2';
import ContainerStyle from '../../../assets/styles/ContainerStyle';
import ServiceStyles from '../../../assets/styles/Service/ServiceStyles';
import * as RNLocalize from 'react-native-localize';
import {convertUtcToLocalTime} from '../../../Helpers/UtcToLocalConverter';
import CardForEditSceduleTimeSlots from '../../../components/Testing/CardForEditSceduleTimeSlots';

const EditScheduleTesting = ({navigation}) => {
  const {baseUrl, token, selectedTestType, storeSprintName} = useContext(
    AppContext,
  );
  const [index, setIndex] = useState(1);
  const [toggleCheckBoxRepeat, setToggleCheckBoxRepeat] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sprintName, setSprintName] = useState('');
  const [startDate, setStartDate] = useState('Start Date');
  const [startDateForSending, setStartDateForSending] = useState('Start Date');
  const [endDateForSending, setEndDateForSending] = useState('End Date');
  const [endDate, setEndDate] = useState('End Date');
  const [hours, setHours] = useState('01');
  const [minutes, setMinutes] = useState('00');
  const [meridiem, setMeridiem] = useState('am');
  const [repetitionType, setRepetitionType] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [numberOfCalls, setNumberOfCalls] = useState('1');
  const [durationOfChannel, setDurationOfChannel] = useState('');
  const [language, setLanguage] = useState([
    {label: 'af-ZA', value: 'af-ZA'},
    {label: 'am-ET', value: 'am-ET'},
    {label: 'ar-AE', value: 'ar-AE'},
    {label: 'ar-BH', value: 'ar-BH'},
    {label: 'ar-DZ', value: 'ar-DZ'},
    {label: 'ar-EG', value: 'ar-EG'},
    {label: 'ar-IL', value: 'ar-IL'},
    {label: 'ar-IQ', value: 'ar-IQ'},
    {label: 'ar-JO', value: 'ar-JO'},
    {label: 'ar-KW', value: 'ar-KW'},
    {label: 'ar-LB', value: 'ar-LB'},
    {label: 'ar-MA', value: 'ar-MA'},
    {label: 'ar-OM', value: 'ar-OM'},
    {label: 'ar-PS', value: 'ar-PS'},
    {label: 'ar-QA', value: 'ar-QA'},
    {label: 'ar-SA', value: 'ar-SA'},
    {label: 'ar-TN', value: 'ar-TN'},
    {label: 'ar-YE', value: 'ar-YE'},
    {label: 'az-AZ', value: 'az-AZ'},
    {label: 'bg-BG', value: 'bg-BG'},
    {label: 'bn-BD', value: 'bn-BD'},
    {label: 'bn-IN', value: 'bn-IN'},
    {label: 'bs-BA', value: 'bs-BA'},
    {label: 'ca-ES', value: 'ca-ES'},
    {label: 'cs-CZ', value: 'cs-CZ'},
    {label: 'da-DK', value: 'da-DK'},
    {label: 'de-AT', value: 'de-AT'},
    {label: 'de-CH', value: 'de-CH'},
    {label: 'de-DE', value: 'de-DE'},
    {label: 'el-GR', value: 'el-GR'},
    {label: 'en-AU', value: 'en-AU'},
    {label: 'en-CA', value: 'en-CA'},
    {label: 'en-GB', value: 'en-GB'},
    {label: 'en-GH', value: 'en-GH'},
    {label: 'en-HK', value: 'en-HK'},
    {label: 'en-IE', value: 'en-IE'},
    {label: 'en-IN', value: 'en-IN'},
    {label: 'en-KE', value: 'en-KE'},
    {label: 'en-NG', value: 'en-NG'},
    {label: 'en-NZ', value: 'en-NZ'},
    {label: 'en-PH', value: 'en-PH'},
    {label: 'en-PK', value: 'en-PK'},
    {label: 'en-SG', value: 'en-SG'},
    {label: 'en-TZ', value: 'en-TZ'},
    {label: 'en-US', value: 'en-US'},
    {label: 'en-ZA', value: 'en-ZA'},
    {label: 'es-AR', value: 'es-AR'},
    {label: 'es-BO', value: 'es-BO'},
    {label: 'es-CL', value: 'es-CL'},
    {label: 'es-CO', value: 'es-CO'},
    {label: 'es-CR', value: 'es-CR'},
    {label: 'es-DO', value: 'es-DO'},
    {label: 'es-EC', value: 'es-EC'},
    {label: 'es-ES', value: 'es-ES'},
    {label: 'es-GT', value: 'es-GT'},
    {label: 'es-HN', value: 'es-HN'},
    {label: 'es-MX', value: 'es-MX'},
    {label: 'es-NI', value: 'es-NI'},
    {label: 'es-PA', value: 'es-PA'},
    {label: 'es-PE', value: 'es-PE'},
    {label: 'es-PR', value: 'es-PR'},
    {label: 'es-PY', value: 'es-PY'},
    {label: 'es-SV', value: 'es-SV'},
    {label: 'es-US', value: 'es-US'},
    {label: 'es-UY', value: 'es-UY'},
    {label: 'es-VE', value: 'es-VE'},
    {label: 'et-EE', value: 'et-EE'},
    {label: 'eu-ES', value: 'eu-ES'},
    {label: 'fa-IR', value: 'fa-IR'},
    {label: 'fi-FI', value: 'fi-FI'},
    {label: 'fil-PH', value: 'fil-PH'},
    {label: 'fr-BE', value: 'fr-BE'},
    {label: 'fr-CA', value: 'fr-CA'},
    {label: 'fr-CH', value: 'fr-CH'},
    {label: 'fr-FR', value: 'fr-FR'},
    {label: 'gl-ES', value: 'gl-ES'},
    {label: 'gu-IN', value: 'gu-IN'},
    {label: 'hi-IN', value: 'hi-IN'},
    {label: 'hr-HR', value: 'hr-HR'},
    {label: 'hu-HU', value: 'hu-HU'},
    {label: 'hy-AM', value: 'hy-AM'},
    {label: 'id-ID', value: 'id-ID'},
    {label: 'is-IS', value: 'is-IS'},
    {label: 'it-CH', value: 'it-CH'},
    {label: 'it-IT', value: 'it-IT'},
    {label: 'iw-IL', value: 'iw-IL'},
    {label: 'ja-JP', value: 'ja-JP'},
    {label: 'jv-ID', value: 'jv-ID'},
    {label: 'ka-GE', value: 'ka-GE'},
    {label: 'km-KH', value: 'km-KH'},
    {label: 'kn-IN', value: 'kn-IN'},
    {label: 'ko-KR', value: 'ko-KR'},
    {label: 'lo-LA', value: 'lo-LA'},
    {label: 'lt-LT', value: 'lt-LT'},
    {label: 'lv-LV', value: 'lv-LV'},
    {label: 'mk-MK', value: 'mk-MK'},
    {label: 'ml-IN', value: 'ml-IN'},
    {label: 'mn-MN', value: 'mn-MN'},
    {label: 'mr-IN', value: 'mr-IN'},
    {label: 'ms-MY', value: 'ms-MY'},
    {label: 'my-MM', value: 'my-MM'},
    {label: 'ne-NP', value: 'ne-NP'},
    {label: 'nl-BE', value: 'nl-BE'},
    {label: 'nl-NL', value: 'nl-NL'},
    {label: 'no-NO', value: 'no-NO'},
    {label: 'pa-Guru-IN', value: 'pa-Guru-IN'},
    {label: 'pl-PL', value: 'pl-PL'},
    {label: 'pt-BR', value: 'pt-BR'},
    {label: 'pt-PT', value: 'pt-PT'},
    {label: 'ro-RO', value: 'ro-RO'},
    {label: 'ru-RU', value: 'ru-RU'},
    {label: 'si-LK', value: 'si-LK'},
    {label: 'sk-SK', value: 'sk-SK'},
    {label: 'sl-SI', value: 'sl-SI'},
    {label: 'sq-AL', value: 'sq-AL'},
    {label: 'sr-RS', value: 'sr-RS'},
    {label: 'su-ID', value: 'su-ID'},
    {label: 'sv-SE', value: 'sv-SE'},
    {label: 'sw-KE', value: 'sw-KE'},
    {label: 'sw-TZ', value: 'sw-TZ'},
    {label: 'ta-IN', value: 'ta-IN'},
    {label: 'ta-LK', value: 'ta-LK'},
    {label: 'ta-MY', value: 'ta-MY'},
    {label: 'ta-SG', value: 'ta-SG'},
    {label: 'te-IN', value: 'te-IN'},
    {label: 'th-TH', value: 'th-TH'},
    {label: 'tr-TR', value: 'tr-TR'},
    {label: 'uk-UA', value: 'uk-UA'},
    {label: 'ur-IN', value: 'ur-IN'},
    {label: 'ur-PK', value: 'ur-PK'},
    {label: 'uz-UZ', value: 'uz-UZ'},
    {label: 'vi-VN', value: 'vi-VN'},
    {label: 'zu-ZA', value: 'zu-ZA'},
  ]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedScript, setSelectedScript] = useState('');
  const [email, setEmail] = useState('');
  const deviceTimeZone = RNLocalize.getTimeZone();
  const [startDatePickerShow, setStartDatePickerShow] = useState(false);
  const [endDatePickerShow, setEndDatePickerShow] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState([]);
  const [scheduleDateTimeToSend, setScheduleDateTimeToSend] = useState([]);
  const options = [{value: 'NLU', label: 'NLU'}];
  const [channelList, setChannelList] = useState([]);
  const [channelId, setChannelId] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [service, setService] = useState('');
  const [script, setScript] = useState('');
  const [criteria, setCriteria] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState('');
  const [serviceList, setServiceList] = useState([]);
  const [scriptList, setScriptList] = useState([]);
  const [successCriteria, setSuccessCriteria] = useState([]);
  const [successSelectedCriteria, setSuccessSelectedCriteria] = useState([
    {
      label: 'Select Success Criteria First.',
      value: 'Select Success Criteria First.',
    },
  ]);
  const [channelListOne, setChannelListOne] = useState([]);
  const [scheduleSprintDetails, setScheduleSprintDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [channelNameToShow, setChannelNameToShow] = useState('');
  const [
    channelSelectedLanguageToShow,
    setChannelSelectedLanguageToShow,
  ] = useState('');
  const [serviceNameToShow, setServiceNameToShow] = useState('');
  const [scriptNameToShow, setScriptNameToShow] = useState('');
  const [successCriteriaToShow, setSuccessCriteriaToShow] = useState('');
  const [
    selectedSuccessCriteriaToShow,
    setSelectedSuccessCriteriaToShow,
  ] = useState('');
  const sprintId = navigation.state.params.sprintId;

  const [selectChannelPlaceHolder, setSelectChannelPlaceHolder] = useState('');
  const [selectLanguagePlaceHolder, SetSelectLanguagePlaceHolder] = useState(
    '',
  );
  const [selectServicePlaceHolder, SetSelectServicePlaceHolder] = useState('');
  const [selectScriptPlaceHolder, SetSelectScriptPlaceHolder] = useState('');
  const [
    selectSuccessCriteriaPlaceHolder,
    SetSelectSuccessCriteriaPlaceHolder,
  ] = useState('');
  const [
    selectedSuccessCriteriaPlaceHolder,
    SetSelectedSuccessCriteriaPlaceHolder,
  ] = useState('');

  const [refreshCards, setRefreshCards] = useState(false);

  // Get Channel list
  const toggleModal = () => {
    setIsModalVisible(isModalVisible ? false : true);
  };

  const getAllChannelLists = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/channel/list`, {Authorization: `${token}`,tokenType:'aws'})
      .then(resp => resp.json())
      .then(resp => {
        if (resp.length > 0) {
          let allItems = [];
          resp.map(item =>
            allItems.push({label: `${item.name}`, value: `${item.id}`}),
          );
          setChannelList(allItems);
        } else {
          setChannelList();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getSuccessCriteria = selectedSuccessCriteriaId => {
    console.log(selectedSuccessCriteriaId);

    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/sprint/getSuccessCriteria`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.length > 0) {
          let allItems = [];
          resp.map(item => {
            if (item.name == selectedSuccessCriteriaId) {
              SetSelectSuccessCriteriaPlaceHolder(item.name + '');
              getSelectedSuccessCriteria(item.id);
            }
            allItems.push({label: `${item.name}`, value: `${item.id}`});
          });
          setSuccessCriteria(allItems);
        } else {
          setSuccessCriteria();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getSelectedSuccessCriteria = value => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        `${baseUrl}/sprint/getCriteriaValues?successCriteriaId=${value}`,
        {Authorization: `${token}`,tokenType:'aws'},
      )
      .then(resp => resp.json())
      .then(resp => {
        if (resp.length > 0) {
          let allItems = [];
          resp.map(item =>
            allItems.push({label: `${item.value}`, value: `${item.value}`}),
          );
          setSuccessSelectedCriteria(allItems);
        } else {
          setSuccessSelectedCriteria([
            {label: 'Nothing Found', value: 'Nothing Found'},
          ]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getServiceList = selectedServiceId => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/service/list`, {Authorization: `${token}`,tokenType:'aws'})
      .then(resp => resp.json())
      .then(resp => {
        if (resp.length > 0) {
          let allItems = [];
          resp.map(item => {
            if (item.id == selectedServiceId) {
              SetSelectServicePlaceHolder(item.serviceName + '');
            }
            allItems.push({label: `${item.serviceName}`, value: `${item.id}`});
          });
          setServiceList(allItems);
        } else {
          setServiceList([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getScriptList = selectedScriptId => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/script/list`, {Authorization: `${token}`,tokenType:'aws'})
      .then(resp => resp.json())
      .then(resp => {
        if (resp.length > 0) {
          let allItems = [];
          resp.map(item => {
            if (item.id == selectedScriptId) {
              SetSelectScriptPlaceHolder(item.scriptName + '');
            }

            allItems.push({label: `${item.scriptName}`, value: `${item.id}`});
          });
          setScriptList(allItems);
        } else {
          setScriptList([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getSingleSprintDetails = () => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/sprint/getSprint?sprintId=${sprintId}`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.hasOwnProperty('error')) {
        } else {
          
          setSprintName(resp.sprintName);
          setEmail(resp.emailAddr);
          setChannelId(resp.channels.channelId);
          setDurationOfChannel(
            `${resp.channels.channelDetails.detail.duration / 1000}`,
          );
          setSelectChannelPlaceHolder(resp.channels.channelName);
          setSelectedLanguage(resp.channels.channelDetails.detail.language);
          SetSelectLanguagePlaceHolder(
            resp.channels.channelDetails.detail.language,
          );
          SetSelectedSuccessCriteriaPlaceHolder(resp.criteriaValue);
          setService(resp.channels.channelDetails.detail.selectService);
          setScript(resp.channels.channelDetails.detail.script);
          setCriteria(resp.successCriteria);
          SetSelectSuccessCriteriaPlaceHolder(resp.successCriteria);
          setSelectedCriteria(resp.criteriaValue);

          // console.log("****************************************************************");  
          // console.log(resp.scheduleDateTime);  
          // console.log("#######################################");
          // console.log(resp.scheduleSprintDetails);  
          // console.log("****************************************************************");  
          
          setScheduleSprintDetails(resp.scheduleSprintDetails);
          resp.scheduleDateTime.map((item)=>{
              setScheduleDateTimeToSend(oldDateTimeToSend => [...oldDateTimeToSend,{
                  scheduleDate: item.scheduleDate,
                }
              ]);
          });
          resp.scheduleSprintDetails.map((item)=>{
            let timeTosend = convertUtcToLocalTime(item.startDateTime.split(" ")[1]);
            let hoursToSend = timeTosend.split(" ")[0].split(":")[0];
            let minsToSend = timeTosend.split(" ")[0].split(":")[1];
            let meridiemToSend = timeTosend.split(" ")[1];
            setScheduleDateTime(oldDateTime=>[
              ...oldDateTime,item.hasOwnProperty('endDateTime') ? 
              {
                time: `${meridiemToSend=="pm" ? Number(hoursToSend)+ Number(12):hoursToSend}:${minsToSend}:00`,
                date: `${item.startDateTime.split(" ")[0]} - ${item.endDateTime.split(" ")[0]}`,
                repeat: `${item.repeatMode}`,
              }:{
                time: `${meridiemToSend=="pm" ? Number(hoursToSend)+ Number(12):hoursToSend}:${minsToSend}:00`,
                date: `${item.startDateTime.split(" ")[0]}`,
              },
            ]);
          });

          
          // getting all the data to show in the dropdowns.
          getAllChannelLists();
          getSuccessCriteria(resp.successCriteria);
          getServiceList(resp.channels.channelDetails.detail.selectService);
          getScriptList(resp.channels.channelDetails.detail.script);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const sendCreateSprintRequest = dataToSend => {
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        `${baseUrl}/sprint/addUpdateSprint`,
        {Authorization: `${token}`,tokenType:'aws', 'Content-Type': 'application/json'},
        dataToSend,
      )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.hasOwnProperty('error')) {
          setErrorMessage(response.message);
        } else {
          toggleModal();
        }
      });
  };

  const deleteFromScheduleDateTime = index => {
    console.log(index);
    if (index > -1) {
      scheduleDateTime.splice(index, 1);
    }
    setRefreshCards(refreshCards ? false : true);
  };

  useEffect(() => {
    getSingleSprintDetails();
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
      <View style={[TestMethod.container]}>
        <ScrollView>
          <DashboardNavbar title="Edit sprint" />
            {/* <TouchableOpacity onPress={()=>{
              console.log("================================================");
              console.log(scheduleDateTimeToSend);
              console.log("================================================");
              console.log(scheduleSprintDetails);
              console.log("================================================");
            }}>
              <Text style={{fontSize:32}}>click</Text>
            </TouchableOpacity> */}
            <View style={[TestMethod.selectedDateForDropDown]}>
              <TextInput
                style={{flex: 1, fontFamily: 'Poppins-Regular'}}
                placeholder="Sprint name"
                placeholderTextColor="rgba(0,0,0,0.7)"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType={'next'}
                value={sprintName}
                onChangeText={text => {
                  setSprintName(text);
                }}
                backgroundColor="transparent"
              />
            </View>

          {selectedTestType == 'Scheduled Testing' ? (
            <View>
              <Text style={[TestMethod.TestMethodFormHeadings]}>
                Scheduling Details
              </Text>

              <View style={{flexDirection: 'row'}}>
                <View style={[TestMethod.selectedDate]}>
                  <TouchableOpacity
                    onPress={() => {
                      setStartDatePickerShow(true);
                    }}>
                    <Icon
                      name="calendar-sharp"
                      color={colors.purple}
                      size={wp('6%')}
                    />
                  </TouchableOpacity>
                  <Text style={[TestMethod.label]}>{startDate}</Text>
                </View>

                {startDatePickerShow ? (
                  <DateTimePicker
                    isVisible={startDatePickerShow}
                    onConfirm={date => {
                      console.log(moment(date).format('MM-DD-YYYY'));
                      setStartDate(moment(date).format('MM-DD-YYYY'));
                      setStartDateForSending(moment(date).format('YYYY-MM-DD'));

                      setStartDatePickerShow(false);
                    }}
                    onCancel={() => {
                      setStartDatePickerShow(false);
                    }}
                    mode="date"
                  />
                ) : null}

                <View style={[TestMethod.selectedDate, {height: 55}]}>
                  <CheckBox
                    style={{height: 20, marginVertical: 5}}
                    disabled={false}
                    value={toggleCheckBoxRepeat}
                    boxType="square"
                    tintColors={{true: colors.purple}}
                    onFillColor={colors.purple}
                    onCheckColor={colors.white}
                    onValueChange={newValueFour =>
                      setToggleCheckBoxRepeat(newValueFour)
                    }
                  />
                  <Text style={[TestMethod.label]}>Repeat</Text>
                </View>
              </View>
              {toggleCheckBoxRepeat ? (
                <View style={{flexDirection: 'row'}}>
                  <View style={[TestMethod.selectedDate]}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('End Date');
                        setEndDatePickerShow(true);
                      }}>
                      <Icon
                        name="calendar-sharp"
                        color={colors.purple}
                        size={wp('6%')}
                      />
                    </TouchableOpacity>
                    <Text style={[TestMethod.label]}>{endDate}</Text>
                  </View>

                  {endDatePickerShow ? (
                    <DateTimePicker
                      isVisible={endDatePickerShow}
                      onConfirm={date => {
                        console.log('end' + date);
                        setEndDate(moment(date).format('MM-DD-YYYY'));
                        setEndDateForSending(moment(date).format('YYYY-MM-DD'));
                        setEndDatePickerShow(false);
                      }}
                      onCancel={() => {
                        setEndDatePickerShow(false);
                      }}
                      mode="date"
                    />
                  ) : null}

                  <View style={[TestMethod.selectedDate]}>
                    <Select
                      onSelect={value => {
                        console.log(value);
                        setHours(value);
                      }}
                      style={{flex: 1}}
                      selectTextStyle={{
                        width: wp('10%'),
                        backgroundColor: 'transparent',
                        fontFamily: 'Poppins-Regular',
                      }}
                      selectStyle={{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        width: wp('10%'),
                        height: 40,
                      }}
                      listStyle={{
                        width: wp('20%'),
                      }}>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="01">
                        01
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="02">
                        02
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="03">
                        03
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="04">
                        04
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="05">
                        05
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="06">
                        06
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="07">
                        07
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="08">
                        08
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="09">
                        09
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="10">
                        10
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="11">
                        11
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="12">
                        12
                      </Option>
                    </Select>
                    <Text style={{marginTop: 10}}>:</Text>
                    <Select
                      onSelect={value => {
                        console.log(value + 'Minutes');
                        setMinutes(value);
                      }}
                      style={{flex: 1}}
                      selectTextStyle={{
                        width: wp('10%'),
                        backgroundColor: 'transparent',
                        fontFamily: 'Poppins-Regular',
                      }}
                      selectStyle={{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        width: wp('10%'),
                        height: 40,
                      }}
                      listStyle={{
                        width: wp('15%'),
                      }}>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="00">
                        00
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="15">
                        15
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="30">
                        30
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="45">
                        45
                      </Option>
                    </Select>
                    <Text style={{marginTop: 10}}>:</Text>
                    <Select
                      onSelect={value => {
                        console.log(value);
                        setMeridiem(value);
                      }}
                      style={{flex: 1}}
                      selectTextStyle={{
                        width: wp('15%'),
                        backgroundColor: 'transparent',
                        fontFamily: 'Poppins-Regular',
                      }}
                      selectStyle={{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        width: wp('15%'),
                        height: 40,
                      }}
                      listStyle={{
                        width: wp('15%'),
                      }}>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="am">
                        am
                      </Option>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="pm">
                        pm
                      </Option>
                    </Select>
                  </View>
                </View>
              ) : null}
              {toggleCheckBoxRepeat ? (
                <View style={{flexDirection: 'row'}}>
                  <View style={[TestMethod.selectedDateForDropDown]}>
                    <Select
                      onSelect={value => {
                        console.log(value);
                        setRepetitionType(value);
                      }}
                      style={{flex: 1}}
                      selectTextStyle={{
                        width: wp('30%'),
                        backgroundColor: 'transparent',
                        fontFamily: 'Poppins-Regular',
                      }}
                      selectStyle={{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        width: wp('30%'),
                        height: 40,
                      }}
                      listHeight={200}
                      listStyle={{
                        width: wp('40%'),
                      }}>
                      <Option
                        optionStyle={{
                          color: colors.grey1,
                        }}
                        value="">
                        Select Repetition
                      </Option>
                      <Option value="Hourly">Hourly</Option>
                      <Option value="Everyday">Everyday</Option>
                      <Option value="Weekly">Weekly</Option>
                      <Option value="Monthly">Monthly</Option>
                    </Select>
                  </View>
                  <View style={[TestMethod.selectedDateForButton]}>
                    <Button
                      onPress={() => {
                        
                        setScheduleDateTime([
                          ...scheduleDateTime,
                          {
                            time: `${meridiem=="pm" ? Number(hours)+Number(12):hours}:${minutes}:00`,
                            // time: `${hours}:${minutes} ${meridiem}`,
                            date: `${
                              startDate == 'Start Date'
                                ? moment(new Date()).format('MM-DD-YYYY')
                                : startDate
                            } ${endDate == "End Date" ? "" : "-"} ${endDate == "End Date" ? "" : endDate}`,
                            repeat: `${repetitionType}`,
                          },
                        ]);

                        setScheduleSprintDetails([
                          ...scheduleSprintDetails,
                          {
                            startDateTime: `${
                              startDate == 'Start Date'
                                ? moment(new Date()).format('MM-DD-YYYY')
                                : startDate
                            } ${
                              meridiem == 'pm'
                                ? Number(hours) + Number(12)
                                : hours
                            }:${minutes}:00`,
                            endDateTime:
                              endDate == 'End Date'
                                ? null
                                : `${
                                    endDate == 'End Date' ? null : endDate
                                  } ${
                                    meridiem == 'pm'
                                      ? Number(hours) + Number(12)
                                      : hours
                                  }:${minutes}:00`,
                            repeat: endDate == 'End Date' ? false : true,
                            repeatMode: `${repetitionType}`,
                          },
                        ]);
                        

                        switch (repetitionType) {
                          case 'Hourly':
                            let date = `${startDateForSending} ${hours}:${minutes}:00`;
                            let enddate = `${endDateForSending} ${hours}:${minutes}:00`;

                            var firstDate = moment('' + date).format(
                              'YYYY-MM-DD HH:mm:ss',
                            );

                            scheduleDateTimeToSend.push({
                              scheduleDate: moment('' + firstDate).format(
                                'MM-DD-YYYY HH:mm:ss',
                              ),
                            });
                            var secondDate = moment('' + enddate).format(
                              'YYYY-MM-DD HH:mm:ss',
                            );
                            while (firstDate <= secondDate) {
                              firstDate = moment('' + firstDate)
                                .add(1, 'hours')
                                .format('YYYY-MM-DD HH:mm:ss');
                              scheduleDateTimeToSend.push({
                                scheduleDate: moment('' + firstDate).format(
                                  'MM-DD-YYYY HH:mm:ss',
                                ),
                              });
                            }
                            break;

                          case 'Everyday':
                            let eddate = `${startDateForSending} ${hours}:${minutes}:00`;
                            let edenddate = `${endDateForSending} ${hours}:${minutes}:00`;

                            var firstEdDate = moment('' + eddate).format(
                              'YYYY-MM-DD HH:mm:ss',
                            );
                            
                            scheduleDateTimeToSend.push({
                              scheduleDate: moment('' + firstEdDate).format(
                                'MM-DD-YYYY HH:mm:ss',
                              ),
                            });
                            var secondEdDate = moment('' + edenddate).format(
                              'YYYY-MM-DD HH:mm:ss',
                            );

                            while (firstEdDate < secondEdDate) {
                              firstEdDate = moment('' + firstEdDate)
                                .add(24, 'hours')
                                .format('YYYY-MM-DD HH:mm:ss');
                              scheduleDateTimeToSend.push({
                                scheduleDate: moment('' + firstEdDate).format(
                                  'MM-DD-YYYY HH:mm:ss',
                                ),
                              });
                            }
                            break;

                          case 'Weekly':
                            let wkdate = `${startDateForSending} ${hours}:${minutes}:00`;
                            let wkenddate = `${endDateForSending} ${hours}:${minutes}:00`;

                            var firstWkDate = moment('' + wkdate).format(
                              'YYYY-MM-DD HH:mm:ss',
                            );
                            scheduleDateTimeToSend.push({
                              scheduleDate: moment('' + firstWkDate).format(
                                'MM-DD-YYYY HH:mm:ss',
                              ),
                            });
                            var secondWkDate = moment('' + wkenddate).format(
                              'YYYY-MM-DD HH:mm:ss',
                            );

                            while (firstWkDate < secondWkDate) {
                              firstWkDate = moment('' + firstWkDate)
                                .add(168, 'hours')
                                .format('YYYY-MM-DD HH:mm:ss');
                              scheduleDateTimeToSend.push({
                                scheduleDate: moment('' + firstWkDate).format(
                                  'MM-DD-YYYY HH:mm:ss',
                                ),
                              });
                            }
                            break;

                          case 'Monthly':
                            console.log("Monthly Run\n");
                            let mndate = `${startDateForSending} ${hours}:${minutes}:00`;
                            let mnenddate = `${endDateForSending} ${hours}:${minutes}:00`;
                            
                            console.log(`MnDate : ${mndate} \n`);
                            console.log(`MnEndDate : ${mnenddate} \n`);

                            var firstMnDate = moment('' + mndate).format(
                              'YYYY-MM-DD HH:mm:ss',
                            );
                            console.log(`First Mn Date : ${firstMnDate} \n`);
                            

                            scheduleDateTimeToSend.push({
                              scheduleDate: moment('' + firstMnDate).format(
                                'MM-DD-YYYY HH:mm:ss',
                              ),
                            });
                            var secondMnDate = moment('' + mnenddate).format(
                              'YYYY-MM-DD HH:mm:ss',
                            );

                            console.log(`Second Mn Date : ${secondMnDate} \n`);
                            
                            while (firstMnDate < secondMnDate) {
                              firstMnDate = moment('' + firstMnDate)
                                .add(730, 'hours')
                                .format('YYYY-MM-DD HH:mm:ss');
                              
                              console.log(`While Date : ${secondMnDate} \n`);
                            
                              scheduleDateTimeToSend.push({
                                scheduleDate: moment('' + firstMnDate).format(
                                  'MM-DD-YYYY HH:mm:ss',
                                ),
                              });
                            }
                            break;
                        }
                      }}
                      labelStyle={{
                        color: 'white',
                        fontFamily: 'Poppins-Regular',
                        fontSize: Platform.OS == 'ios' ? 12 : 14,
                        marginTop: 12,
                      }}
                      style={{backgroundColor: colors.yellow}}
                      mode="outlined">
                      Add Schedule
                    </Button>
                  </View>
                </View>
              ) : null}

              <View style={{flexDirection: 'row'}}>
                <View style={[TestMethod.cardFlatList]}>
                  {scheduleDateTime.length > 0 ? (
                    <FlatList
                      keyExtractor={item => item.time+Math.floor(Math.random() * 100)}
                      style={{height: 150}}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={scheduleDateTime}
                      renderItem={({item, index}) => {
                        return (
                           <CardForEditSceduleTimeSlots item={item} index={index} deleteFromScheduleDateTime={deleteFromScheduleDateTime} />
                           );
                      }}
                    />
                  ) : null}
                </View>
              </View>
            </View>
          ) : null}

          <Text style={[TestMethod.TestMethodFormHeadings]}>
            Select Channel
          </Text>
          <View style={{position: 'relative'}}>
            <Dropdown
              rippleInsets={{top: 5, bottom: -8}}
              rippleOpacity={0.1}
              rippleCentered={true}
              underlineColor="transparent"
              placeholder={selectChannelPlaceHolder}
              onChangeText={item => {
                console.log(item);
                setChannelId(item);
              }}
              itemTextStyle={{fontFamily: 'Poppins-Regular'}}
              labelTextStyle={{fontFamily: 'Poppins-Regular'}}
              style={[TestMethod.selectChannelStyles]}
              baseColor="#000"
              data={channelList}
            />
            <Iconn
              style={{position: 'absolute', right: hp('4'), top: 25}}
              name="caretdown"
              size={16}
              color={colors.purple}
            />
          </View>

          <Text style={[TestMethod.TestMethodFormHeadings]}>
            Channel Details
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={[TestMethod.selectedDateForDropDown]}>
              <TextInput
                editable={false}
                style={{flex: 1, fontFamily: 'Poppins-Regular'}}
                placeholder="Number of calls"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType={'next'}
                value={numberOfCalls}
                onChangeText={text => {
                  setNumberOfCalls(text);
                }}
                backgroundColor="transparent"
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={[TestMethod.selectedDateForDropDown]}>
              <TextInput
                style={{flex: 1, fontFamily: 'Poppins-Regular'}}
                placeholder="Duration ( In Sec )"
                placeholderTextColor="rgba(0,0,0,0.7)"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType={'next'}
                value={durationOfChannel}
                onChangeText={text => {
                  setDurationOfChannel(text);
                }}
                backgroundColor="transparent"
              />
            </View>
          </View>
          <Text style={[TestMethod.TestMethodFormHeadings]}>
            Select Language
          </Text>
          <View style={{position: 'relative'}}>
            <Dropdown
              rippleInsets={{top: 5, bottom: -8}}
              rippleOpacity={0.1}
              rippleCentered={true}
              underlineColor="transparent"
              placeholder={selectLanguagePlaceHolder}
              onChangeText={item => {
                console.log(item);
                setSelectedLanguage(item);
              }}
              itemTextStyle={{fontFamily: 'Poppins-Regular'}}
              labelTextStyle={{fontFamily: 'Poppins-Regular'}}
              style={[TestMethod.selectChannelStyles]}
              baseColor="#000"
              data={language}
            />
            <Iconn
              style={{position: 'absolute', right: hp('4'), top: 25}}
              name="caretdown"
              size={16}
              color={colors.purple}
            />
          </View>

          <Text style={[TestMethod.TestMethodFormHeadings]}>
            Select Service
          </Text>
          <View style={{position: 'relative'}}>
            <Dropdown
              rippleOpacity={0.1}
              rippleCentered={true}
              rippleInsets={{top: 5, bottom: -8}}
              placeholder={selectServicePlaceHolder}
              underlineColor="transparent"
              onChangeText={item => {
                console.log(item);
                setService(item);
              }}
              itemTextStyle={{fontFamily: 'Poppins-Regular'}}
              labelTextStyle={{fontFamily: 'Poppins-Regular'}}
              style={[TestMethod.selectChannelStyles]}
              baseColor="#000"
              data={serviceList}
            />
            <Iconn
              style={{position: 'absolute', right: hp('4'), top: 25}}
              name="caretdown"
              size={16}
              color={colors.purple}
            />
          </View>

          <Text style={[TestMethod.TestMethodFormHeadings]}>Select Script</Text>
          <View style={{position: 'relative'}}>
            <Dropdown
              rippleOpacity={0.1}
              rippleInsets={{top: 5, bottom: -8}}
              rippleCentered={true}
              placeholder={selectScriptPlaceHolder}
              underlineColor="transparent"
              onChangeText={item => {
                console.log(item);
                setScript(item);
              }}
              itemTextStyle={{fontFamily: 'Poppins-Regular'}}
              labelTextStyle={{fontFamily: 'Poppins-Regular'}}
              style={[TestMethod.selectChannelStyles]}
              baseColor="#000"
              data={scriptList}
            />
            <Iconn
              style={{position: 'absolute', right: hp('4'), top: 25}}
              name="caretdown"
              size={16}
              color={colors.purple}
            />
          </View>

          {selectedTestType == 'Scheduled Testing' ? (
            <View style={{flexDirection: 'row'}}>
              <View style={[TestMethod.selectedDateForDropDown]}>
                <TextInput
                  style={{flex: 1, fontFamily: 'Poppins-Regular'}}
                  placeholder="Email"
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType={'next'}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                  }}
                  backgroundColor="transparent"
                />
              </View>
            </View>
          ) : null}

          <Text style={[TestMethod.TestMethodFormHeadings]}>
            Success Criteria
          </Text>
          <View style={{position: 'relative'}}>
            <Dropdown
              rippleOpacity={0.1}
              rippleInsets={{top: 5, bottom: -8}}
              rippleCentered={true}
              placeholder={selectSuccessCriteriaPlaceHolder}
              underlineColor="transparent"
              onChangeText={item => {
                console.log(item);
                getSelectedSuccessCriteria(item);
                setCriteria(item);
              }}
              itemTextStyle={{fontFamily: 'Poppins-Regular'}}
              labelTextStyle={{fontFamily: 'Poppins-Regular'}}
              style={[TestMethod.selectChannelStyles]}
              baseColor="#000"
              data={successCriteria}
            />
            <Iconn
              style={{position: 'absolute', right: hp('4'), top: 25}}
              name="caretdown"
              size={16}
              color={colors.purple}
            />
          </View>

          <Text style={[TestMethod.TestMethodFormHeadings]}>
            Select Criteria
          </Text>
          <View style={{position: 'relative'}}>
            <Dropdown
              rippleOpacity={0.1}
              rippleCentered={true}
              rippleInsets={{top: 5, bottom: -8}}
              placeholder={selectedSuccessCriteriaPlaceHolder}
              underlineColor="transparent"
              onChangeText={item => {
                console.log(item);
                setSelectedCriteria(item);
              }}
              itemTextStyle={{fontFamily: 'Poppins-Regular'}}
              labelTextStyle={{fontFamily: 'Poppins-Regular'}}
              style={[TestMethod.selectChannelStyles]}
              baseColor="#000"
              data={successSelectedCriteria}
            />
            <Iconn
              style={{position: 'absolute', right: hp('4'), top: 25}}
              name="caretdown"
              size={16}
              color={colors.purple}
            />
          </View>

          <Text style={[TestMethod.TestMethodError]}>{errorMessage}</Text>
          <Button
            onPress={() => {
              if (sprintName == '') {
                setErrorMessage('Sprint Name Required.');
              } else if (channelId == '') {
                setErrorMessage('Channel Required.');
              } else if (durationOfChannel == '') {
                setErrorMessage('Duration Required.');
              } else if (selectedLanguage == '') {
                setErrorMessage('Select Language.');
              } else if (service == '') {
                setErrorMessage('Select Service.');
              } else if (script == '') {
                setErrorMessage('Select Script.');
              } else if (email == '') {
                setErrorMessage('Email required.');
              } else if (numberOfCalls == '') {
                setErrorMessage('Number of calls required.');
              } else if (criteria == '') {
                setErrorMessage('Success Criteria required.');
              } else if (selectedCriteria == '') {
                setErrorMessage('Select Criteria.');
              } else {
                let dataToSend = {
                  channels: {
                    channelDetails: {
                      detail: {
                        duration: durationOfChannel * 1000,
                        selectService: `${service}`,
                        script: `${script}`,
                        language: `${selectedLanguage}`,
                      },
                      noOfCalls: `${numberOfCalls}`,
                      subChannelId: '2',
                      subChannelName: 'Genesys Cloud Chat',
                    },
                    channelId: channelId,
                    channelName: '',
                  },
                  scheduleDateTime: scheduleDateTimeToSend ,
                  sprintName: `${sprintName}`,
                  testType: `${selectedTestType}`,
                  id: sprintId,
                  scheduleSprintDetails: scheduleSprintDetails,
                  successCriteria: `${criteria}`,
                  criteriaValue: `${selectedCriteria}`,
                  emailAddr: `${email}`,
                  timezone: `${RNLocalize.getTimeZone()}`,
                };
                  // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                  // console.log(scheduleDateTimeToSend);
                  // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                  // console.log(scheduleSprintDetails);
                  // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                // console.log(JSON.stringify(dataToSend)); 
                sendCreateSprintRequest(JSON.stringify(dataToSend));
              }
            }}
            mode="contained"
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
              backgroundColor: colors.yellow,
            }}>
            Update
          </Button>
        </ScrollView>

        <Modal isVisible={isModalVisible} backdropColor={colors.grey4}>
          <View style={ServiceStyles.modalContainer}>
            <View style={ServiceStyles.modalImageContainer}>
              <Image
                source={require('../../../assets/images/CardBase.png')}
                style={ServiceStyles.modalImage}
              />
            </View>
            <Text style={ServiceStyles.modalLightText}>
              <Text style={ServiceStyles.modalBoldText}>{sprintName}</Text> is
              Successfully Updated.
            </Text>

            <View style={ServiceStyles.modalVerticalLine} />
            <TouchableOpacity
              style={ServiceStyles.modalButton}
              onPress={() => {
                toggleModal();
                navigation.replace('TestMethod');
              }}>
              <Text style={ServiceStyles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
export default withNavigation(EditScheduleTesting);
