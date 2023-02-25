import React, {useEffect, useState, useContext} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Button, Card, HelperText, withTheme} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../assets/colors/colors';
import ReportScreenStyles from '../../../assets/styles/MoreScreensStyles/ReportScreensStyles/ReportScreenStyles';
import SummarySprintDetails from '../../../components/More/Reports/SummarySprintDetails';
import SprintDetailReportsSprintDetails from '../../../components/More/Reports/SprintDetailReportsSprintDetails';
import HighLevelReportsSprintDetails from '../../../components/More/Reports/HighLevelReportsSprintDetails';
import InvoiceSprintDetails from '../../../components/More/Reports/InvoiceSprintDetails';
import {PieChart} from 'react-native-svg-charts';
import Modal from 'react-native-modal';
import {
  LineChart,
  Grid,
  AreaChart,
  XAxis,
  YAxis,
} from 'react-native-svg-charts';
import DrawerNavbar from '../../../components/Navbars/DrawerNavbar';
import RadioGroupLoading from '../../../components/RadioGroupLoading/RadioGroupLoading';
import TestMethod from '../../../assets/styles/TestMethodStyle/TestMethod';
import BottomSheet from 'reanimated-bottom-sheet';
import GeneralProperties from '../../../assets/styles/GeneralProperties';
import ScriptListScreenStyles from '../../../assets/styles/MoreScreensStyles/ScriptScreensStyles/ScriptListScreenStyles';
import ContainerStyle from '../../../assets/styles/ContainerStyle';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import HighLevelReportChart from '../../../components/More/Reports/HighLevelReportChart';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../../context/AppContext';
import DashboardStyles from '../../../assets/styles/DashboardStyles/DashboardStyles';

const Reports = () => {
  const [index, setIndex] = useState(2);
  const [pieData, setPieData] = useState([]);
  const [reportTitleHighLevel, setReportTitleHighLevel] = useState("");
  const [reportTitleSprint, setReportTitleSprint] = useState("");
  const [reportTitleInvoice, setReportTitleInvoice] = useState("");
  const [isLoadingChart, setIsLoadingChart] = useState(false);

  const [dataForCards, setDataForCards] = useState([]);
  const [channelList, setChannelList] = useState([]);

  const {baseUrl, token, storeToken, storePassword} = useContext(AppContext);
  const [startDate, setStartDate] = useState('Start Date');
  const [endDate, setEndDate] = useState('End Date');
  const [initialDate, setInitialDate] = useState(new Date());
  const [startDatePickerShow, setStartDatePickerShow] = useState(false);
  const [endDatePickerShow, setEndDatePickerShow] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
  const [messageForCharts, setMessageForCharts] = useState('');
  const [messageColor, setMessageColor] = useState('red');
  const [bottomSheetWidth, setBottomSheetWidth] = useState(
    Dimensions.get('window').width,
  );

  const [colorsForPieChart, setColorsForPieChart] = useState([
    '#36A2EB', //NLU BOT
    '#4BC0C0', // CHAT
    '#FFCE56', // Whatsapp
    '#FF6384', // SMS
    '#964B00', // EMAIL
    
  ]);

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

  const getHighLevelChartDetails = (objTosend,first) => {
    setIsLoadingChart(true);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        `${baseUrl}/report/getHighLevelDetails`,
        {Authorization: `${token}`,tokenType:'aws', 'Content-Type': 'application/json'},
        objTosend,
      )
      .then(resp => resp.json())
      .then(resp => {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(resp[0]);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        let nluCounterForPie = 0;
        let chatCounterForPie = 0;
        let whatsAppCounterForPie = 0;
        let smsCounterForPie = 0;
        let emailCounterForPie = 0;
        resp.map((item)=>{
          if (item.channel == 'NLU BOT') {
            nluCounterForPie += item.noOfRuns;
          } else if (item.channel == 'Chat') {
            chatCounterForPie+= item.noOfRuns;
          } else if (item.channel == 'SMS') {
            smsCounterForPie+= item.noOfRuns;
          } else if (item.channel == 'WhatsApp') {
            whatsAppCounterForPie+= item.noOfRuns;
          }else if (item.channel == 'Email') {
            emailCounterForPie+= item.noOfRuns;
          }
        });
       
        if(first==1)
        {
          setReportTitleHighLevel("High Level Report Details");
        }

        setDataForCards(resp);
        
        let pieDataArray = [];
        pieDataArray.push({
          key: 1,
          amount: nluCounterForPie,
          svg: {fill: colorsForPieChart[0],
          onPress: () => {
            setMessageColor(colorsForPieChart[0]);
            setMessageForCharts(`${nluCounterForPie} runs for NLU BOT`)
          },
          },
        });
        pieDataArray.push({
          key: 2,
          amount: chatCounterForPie,
          svg: {fill: colorsForPieChart[1],
            onPress: () => {
              setMessageColor(colorsForPieChart[1]);
              setMessageForCharts(`${chatCounterForPie} runs for Chat`)
            },
            },
        });
        pieDataArray.push({
          key: 3,
          amount: whatsAppCounterForPie,
          svg: {fill: colorsForPieChart[2],
            onPress: () => {
              setMessageColor(colorsForPieChart[2]);
              setMessageForCharts(`${whatsAppCounterForPie} runs for WhatsApp`)
            },
            },
        });
        pieDataArray.push({
          key: 4,
          amount: smsCounterForPie,
          svg: {fill: colorsForPieChart[3],
            onPress: () => {
              setMessageColor(colorsForPieChart[3]);
              setMessageForCharts(`${smsCounterForPie} runs for SMS`)
            },
            },
        });
        pieDataArray.push({
          key: 5,
          amount: emailCounterForPie,
          svg: {fill: colorsForPieChart[4],
            onPress: () => {
              setMessageColor(colorsForPieChart[4]);
              setMessageForCharts(`${emailCounterForPie} runs for Email`)
            },
            },
        });
        
        // resp.map((item, index) => {
        //   pieDataArray.push({
        //     key: index + 1,
        //     amount: item.noOfRuns,
        //     svg: {fill: colorsForPieChart[index]},
        //   });
        // });
        setPieData(pieDataArray);
        setIsLoadingChart(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getSprintDetailsReport = (objTosend,first) => {
    setIsLoadingChart(true);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        `${baseUrl}/report/billing`,
        {Authorization: `${token}`,tokenType:'aws', 'Content-Type': 'application/json'},
        objTosend,
      )
      .then(resp => resp.json())
      .then(resp => {
        
        console.log(resp.response);
        setDataForCards(resp.response);
        let nluCounterForPie = 0;
        let chatCounterForPie = 0;
        let whatsAppCounterForPie = 0;
        let smsCounterForPie = 0;
        let emailCounterForPie = 0;

        resp.response.map(item => {
          if (item.channel_name == 'NLU BOT') {
            nluCounterForPie++;
          } else if (item.channel_name == 'Chat') {
            chatCounterForPie++;
          } else if (item.channel_name == 'SMS') {
            smsCounterForPie++;
          } else if (item.channel_name == 'WhatsApp') {
            whatsAppCounterForPie++;
          }else if (item.channel_name == 'Email') {
            emailCounterForPie++;
          }
        });
        
        if(first==1)
        {
          setReportTitleSprint("Sprint Details Report");
        }

        console.log(nluCounterForPie);
        console.log(chatCounterForPie);
        console.log(whatsAppCounterForPie);
        console.log(smsCounterForPie);

        let pieDataArray = [];
        pieDataArray.push({
          key: 1,
          amount: nluCounterForPie,
          svg: {fill: colorsForPieChart[0],
            onPress: () => {
              setMessageColor(colorsForPieChart[0]);
              setMessageForCharts(`${nluCounterForPie} runs for NLU BOT`)
            },
            },
        });
        pieDataArray.push({
          key: 2,
          amount: chatCounterForPie,
          svg: {fill: colorsForPieChart[1],
            onPress: () => {
              setMessageColor(colorsForPieChart[1]);
              setMessageForCharts(`${chatCounterForPie} runs for Chat`)
            },
            },
        });
        pieDataArray.push({
          key: 3,
          amount: whatsAppCounterForPie,
          svg: {fill: colorsForPieChart[2],
            onPress: () => {
              setMessageColor(colorsForPieChart[2]);
              setMessageForCharts(`${whatsAppCounterForPie} runs for WhatsApp`)
            },
            },
        });
        pieDataArray.push({
          key: 4,
          amount: smsCounterForPie,
          svg: {fill: colorsForPieChart[3],
            onPress: () => {
              setMessageColor(colorsForPieChart[3]);
              setMessageForCharts(`${smsCounterForPie} runs for SMS`)
            },
            },
        });
        pieDataArray.push({
          key: 4,
          amount: emailCounterForPie,
          svg: {fill: colorsForPieChart[4],
            onPress: () => {
              setMessageColor(colorsForPieChart[4]);
              setMessageForCharts(`${emailCounterForPie} runs for Email`)
            },
            },
        });

        setPieData(pieDataArray);
        setIsLoadingChart(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getInvoiceDetailsReport = (objTosend,first) => {
    setIsLoadingChart(true);
    console.log("First "+first);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        `${baseUrl}/report/getInvoiceDetails`,
        {Authorization: `${token}`,tokenType:'aws', 'Content-Type': 'application/json'},
        objTosend,
      )
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        setDataForCards(resp);
         let totalChargedCount = 0; 
         let totalFreeCount = 0; 
         resp.map((item)=>{
              if(item.costPerUnit == 0){
                totalFreeCount++;
              }else{
                totalChargedCount++;
              } 
          });

        if(first==1)
        {
          setReportTitleInvoice("Invoice Report Details");
        }

      let pieDataArray = [];
          pieDataArray.push({
            key: 1,
            amount: totalFreeCount,
            svg: {fill: colorsForPieChart[0]},
          });
          pieDataArray.push({
            key: 2,
            amount: totalChargedCount,
            svg: {fill: colorsForPieChart[3]},
          });
          setPieData(pieDataArray);
          setIsLoadingChart(false);
      })
      .catch(err => {
        console.log(err);
      }); 
  };

  useEffect(() => {
    var startDate = moment().subtract(1, 'week').format('MM/DD/YYYY');
    var endDate = moment().format('MM/DD/YYYY');
    var objTosend = {
      startDate: `${startDate}`,
      endDate: `${endDate}`,
    };
    getHighLevelChartDetails(JSON.stringify(objTosend),0);
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
      <View style={ReportScreenStyles.container}>
        <ScrollView>
          <DrawerNavbar title="Reports" />
          <View
            style={{
              height: 50,
              borderBottomColor: '#00000029',
              borderBottomWidth: 0.3,
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginHorizontal: wp('2.5%')}}>
              {index == 2 ? (
                <TouchableOpacity
                  onPress={() => {
                    setReportTitleHighLevel("High Level Report Details (7 Days)");
                    setMessageForCharts("");
                    setIndex('2');
                  }}>
                  <Text style={[ReportScreenStyles.active]}>
                    High Level Report
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setMessageForCharts("");
                    var startDate = moment()
                      .subtract(1, 'week')
                      .format('MM/DD/YYYY');
                    var endDate = moment().format('MM/DD/YYYY');
                    var objTosend = {
                      startDate: `${startDate}`,
                      endDate: `${endDate}`,
                    };
                    setReportTitleHighLevel("High Level Report Details (7 Days)");
                    getHighLevelChartDetails(JSON.stringify(objTosend),0);
                    
                    setIndex('2');
                    setStartDate("Start Date");
                    setEndDate("End Date");
                  }}>
                  <Text style={[ReportScreenStyles.disable]}>
                    High Level Report
                  </Text>
                </TouchableOpacity>
              )}

              {index == 3 ? (
                <TouchableOpacity
                  onPress={() => {
                    setMessageForCharts("");
                    var startDate = moment()
                      .subtract(1, 'week')
                      .format('MM/DD/YYYY');
                    var endDate = moment().format('MM/DD/YYYY');
                    var objTosend = {
                      startDate: `${startDate}`,
                      endDate: `${endDate}`,
                    };
                    setReportTitleSprint("Sprint Level Report Details (7 Days)")
                    getSprintDetailsReport(JSON.stringify(objTosend));
                    setIndex('3');
                  }}>
                  <Text style={[ReportScreenStyles.active]}>
                    Sprint Detail Report
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setMessageForCharts("");
                    var startDate = moment()
                      .subtract(1, 'week')
                      .format('MM/DD/YYYY');
                    var endDate = moment().format('MM/DD/YYYY');
                    var objTosend = {
                      startDate: `${startDate}`,
                      endDate: `${endDate}`,
                    };
                    setReportTitleSprint("Sprint Level Report Details (7 Days)");
                    getSprintDetailsReport(JSON.stringify(objTosend));
                    setIndex('3');
                    setStartDate("Start Date");
                    setEndDate("End Date");
                  }}>
                  <Text style={[ReportScreenStyles.disable]}>
                    Sprint Detail Report
                  </Text>
                </TouchableOpacity>
              )}

              {index == 4 ? (
                <TouchableOpacity
                  onPress={() => {
                    setMessageForCharts("");
                    var startDate = moment()
                      .subtract(1, 'week')
                      .format('MM/DD/YYYY');
                    var endDate = moment().format('MM/DD/YYYY');
                    var objTosend = {
                      startDate: `${startDate}`,
                      endDate: `${endDate}`,
                    };
                    setReportTitleInvoice("Invoice Report Details (7 Days)");
                    getInvoiceDetailsReport(JSON.stringify(objTosend),0);
                    setIndex('4');
                  }}>
                  <Text style={[ReportScreenStyles.active]}>Invoice</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setMessageForCharts("");
                    var startDate = moment()
                      .subtract(1, 'week')
                      .format('MM/DD/YYYY');
                    var endDate = moment().format('MM/DD/YYYY');
                    var objTosend = {
                      startDate: `${startDate}`,
                      endDate: `${endDate}`,
                    };
                    setReportTitleInvoice("Invoice Report Details (7 Days)");  
                    getInvoiceDetailsReport(JSON.stringify(objTosend),0);
                    setIndex('4');
                    setStartDate("Start Date");
                    setEndDate("End Date");
                  }}>
                  <Text style={[ReportScreenStyles.disable]}>Invoice</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20,marginHorizontal:15, alignItems: 'center'}}>
            <View style={[TestMethod.selectedDate]}>
              <Text style={[TestMethod.label]}>{startDate}{'  '}</Text>
              <TouchableOpacity
                onPress={() => {
                  setStartDatePickerShow(true);
                }}>
                <Image
                  source={require('../../../assets/images/calendar.png')}
                  style={ReportScreenStyles.calendarIcon}
                />
              </TouchableOpacity>
            </View>

            {startDatePickerShow ? (
              <DateTimePicker
              maximumDate={new Date()}
                isVisible={startDatePickerShow}
                onConfirm={date => {
                  console.log(moment(date).format('MM/DD/YYYY'));
                  setStartDate(moment(date).format('MM/DD/YYYY'));
                  setStartDatePickerShow(false);
                }}
                onCancel={() => {
                  setStartDatePickerShow(false);
                }}
                mode="date"
              />
            ) : null}

            <View style={[TestMethod.selectedDate]}>
              <Text style={[TestMethod.label]}>{endDate}{'  '}</Text>
              <TouchableOpacity
                onPress={() => {
                  setEndDatePickerShow(true);
                }}>
                <Image
                  source={require('../../../assets/images/calendar.png')}
                  style={ReportScreenStyles.calendarIcon}
                />
              </TouchableOpacity>
            </View>

            {endDatePickerShow ? (
              <DateTimePicker
                maximumDate={new Date()}
                isVisible={endDatePickerShow}
                onConfirm={date => {
                  console.log(moment(date).format('MM/DD/YYYY'));
                  setEndDate(moment(date).format('MM/DD/YYYY'));
                  setEndDatePickerShow(false);
                  setMessageForCharts('');
                }}
                onCancel={() => {
                  setEndDatePickerShow(false);
                }}
                mode="date"
              />
            ) : null}

           <TouchableOpacity onPress={() =>{
             setMessageForCharts("");
              var objTosend = {
                startDate: `${startDate}`,
                endDate: `${endDate}`,
              };
              if (index == 2) {
                getHighLevelChartDetails(JSON.stringify(objTosend),1);
              }
              if (index == 3) {
                getSprintDetailsReport(JSON.stringify(objTosend),1);
              }
              if (index == 4) {
                getInvoiceDetailsReport(JSON.stringify(objTosend),1);
              }
           }}>
                <Text>Search</Text>
            </TouchableOpacity> 
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={[ReportScreenStyles.headings, {flex: 1}]}>
              Sprint Details
            </Text>
            {/* <TouchableOpacity
              style={ScriptListScreenStyles.filterView}
              onPress={() => {
                setBottomSheetHeight(Dimensions.get('window').height / 3);
                sheetRef.current.snapTo(0);
              }}>
              <MaterialCommunityIcons
                name="filter"
                size={24}
                color={colors.grey}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: colors.grey,
                  marginRight: 15,
                }}>
                {'  '}FILTER
              </Text>
            </TouchableOpacity> */}
          </View>
          <View>
            {index == 2 ? 
            <Card style={DashboardStyles.calendarCard}>
              <View style={DashboardStyles.todayView}>
                <Text style={DashboardStyles.todayText}>
                  {reportTitleHighLevel == "" ? "High Level Report Details (7 Days)" : reportTitleHighLevel}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex:2}}>
                {isLoadingChart ? 
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <ActivityIndicator style={{marginTop:50}} size="large"/>
                </View> : 
                <PieChart
                    style={{
                      height: 200,
                      marginHorizontal: wp('5%'),
                      marginVertical: wp('5%'),
                    }}
                    valueAccessor={({item}) => item.amount}
                    data={pieData}
                    spacing={0}
                    outerRadius={'95%'}>
                    
                  </PieChart>
                  }
                  <Text style={[DashboardStyles.todayText,{color: messageColor}]}>
                  {messageForCharts}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <View
                      style={{
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <View>
                        <View style={{flexDirection: 'row'}}>
                          
                          <View
                            style={{
                              backgroundColor: '#FF6384',
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color: '#FF6384'},
                            ]}>
                            SMS
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          
                          <View
                            style={{
                              backgroundColor: '#36A2EB',
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color: '#36A2EB'},
                            ]}>
                            NLU BOT
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          
                          <View
                            style={{
                              backgroundColor: '#FFCE56',
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color: '#FFCE56'},
                            ]}>
                            WhatsApp
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: '#4BC0C0',
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color: '#4BC0C0'},
                            ]}>
                            Chat
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: colorsForPieChart[4],
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color:colorsForPieChart[4]},
                            ]}>
                            Email
                          </Text>
                        </View>
                      </View>
                      
                    </View>
                </View>
              </View>
            </Card>
            : null}

          {index == 3 ? 
            <Card style={DashboardStyles.calendarCard}>
              <View style={DashboardStyles.todayView}>
                <Text style={DashboardStyles.todayText}>
                  {reportTitleSprint}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex:2}}>
                {isLoadingChart ? 
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <ActivityIndicator style={{marginTop:50}} size="large"/>
                </View> : 
                <PieChart
                      style={{
                        height: 200,
                        marginHorizontal: wp('5%'),
                        marginVertical: wp('5%'),
                      }}
                      valueAccessor={({item}) => item.amount}
                      data={pieData}
                      spacing={0}
                      outerRadius={'95%'}>
                      {/* <Labels /> */}
                    </PieChart>
                    }
                    <Text style={[DashboardStyles.todayText,{color: messageColor}]}>
                  {messageForCharts}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <View
                      style={{
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <View>
                        <View style={{flexDirection: 'row'}}>
                          
                          <View
                            style={{
                              backgroundColor: '#FF6384',
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color: '#FF6384'},
                            ]}>
                            SMS
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          
                          <View
                            style={{
                              backgroundColor: '#36A2EB',
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color: '#36A2EB'},
                            ]}>
                            NLU BOT
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          
                          <View
                            style={{
                              backgroundColor: '#FFCE56',
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color: '#FFCE56'},
                            ]}>
                            WhatsApp
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: '#4BC0C0',
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color: '#4BC0C0'},
                            ]}>
                            Chat
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: colorsForPieChart[4],
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color:colorsForPieChart[4]},
                            ]}>
                            Email
                          </Text>
                        </View>
                      </View>
                      
                    </View>
                </View>
              </View>
            </Card>
            : null}
           
           
           
           {index == 4 ? 
            <Card style={DashboardStyles.calendarCard}>
              <View style={DashboardStyles.todayView}>
                <Text style={DashboardStyles.todayText}>
                  {reportTitleInvoice}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
              <View style={{flex: 2}}>
               {isLoadingChart ? 
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <ActivityIndicator style={{marginTop:50}} size="large"/>
                </View> : 
                    <PieChart
                      style={{
                        height: 200,
                        marginHorizontal: wp('5%'),
                        marginVertical: wp('5%'),
                      }}
                      valueAccessor={({item}) => item.amount}
                      data={pieData}
                      spacing={0}
                      outerRadius={'95%'}>
                      {/* <Labels /> */}
                    </PieChart>
                    }
                      </View>  
                    <View
                      style={{
                        flex:1,marginTop: 30
                      }}>
                        <View style={{flexDirection: 'row'}}>
                          
                          <View
                            style={{
                              backgroundColor: '#FF6384',
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color: '#FF6384'},
                            ]}>
                            Charged
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: '#36A2EB',
                              height: hp('2%'),
                              width: wp('10%'),
                              marginTop: wp('1%'),
                            }}
                          />
                          <Text
                            style={[
                              DashboardStyles.txtForPieChartLabel,
                              {color: '#36A2EB'},
                            ]}>
                            Free
                          </Text>
                        </View>
                     
                    </View>
                          
                    
               </View>
                
            </Card>
            : null}
          </View>

          {index == 2 ? (
            <FlatList
              keyExtractor={(item)=>{`${item.sprintId}${item.sprintName}${item.successCount}`}}
              data={dataForCards}
              renderItem={({item, index}) => {
                return (
                  <HighLevelReportsSprintDetails item={item} index={index} />
                );
              }}
            />
          ) : null}

          {index == 3 ? (
            <FlatList
            keyExtractor={(item)=>{item.current_session_time}}
              data={dataForCards}
              renderItem={({item, index}) => {
                return (
                  <SprintDetailReportsSprintDetails item={item} index={index} />
                );
              }}
            />
          ) : null}

          {index == 4 ? (
            <FlatList
            keyExtractor={(item)=>{`${item.id}${item.end_session_time}`}}
              data={dataForCards}
              renderItem={({item, index}) => {
                return <InvoiceSprintDetails item={item} index={index} />;
              }}
            />
          ) : null}
        </ScrollView>
        <BottomSheet
          style={{position: 'absolute', bottom: 0, zIndex: 2}}
          ref={sheetRef}
          snapPoints={[bottomSheetHeight, bottomSheetWidth, 0]}
          borderRadius={10}
          renderContent={renderContent}
        />
      </View>
    </SafeAreaView>
  );
};
export default withTheme(withNavigation(Reports));
