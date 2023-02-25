import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  StatusBar,
  SafeAreaView,
  Button,
  Dimensions,
} from 'react-native';
import {Card, HelperText, withTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  withNavigation,
  NavigationActions,
  StackActions,
} from 'react-navigation';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardStyles from '../../assets/styles/DashboardStyles/DashboardStyles';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import TestCard from '../../components/Dashboard/TestCard';
import RequestDetails from '../../components/Dashboard/RequestDetails';
import CalendarPicker from 'react-native-calendar-picker';
import {
  PieChart,
  Path,
  LineChart,
  Grid,
  AreaChart,
  XAxis,
  YAxis,
  BarChart,
} from 'react-native-svg-charts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as shape from 'd3-shape';
import DrawerNavbar from '../../components/Navbars/DrawerNavbar';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';
import LinearGradient from 'react-native-linear-gradient';
import ContainerStyle from '../../assets/styles/ContainerStyle';
import Auth from '@aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LineChart as LC} from 'react-native-chart-kit';

const Dashboard = ({navigation}) => {
  var Today = moment(new Date()).format('MMM , DD YYYY');
  const [showPerformanceGraph, setshowPerforamnceGraph] = useState(false);
  const [showLoadGraph, setshowLoadGraph] = useState(false);
  const [showResponseGraph, setshowResponseGraph] = useState(false);
  const [showSlowestRequests, setShowSlowestRequests] = useState(false);
  const [showFullMonthVew, setShowFullMonthView] = useState(false);
  const [today, setToday] = useState(true);
  const [tomorrow, setTomorrow] = useState(false);
  const [upcoming, setUpcoming] = useState(false);
  const [totalSuccess, setTotalSuccess] = useState(0);
  const [totalFailed, setTotalFailed] = useState(0);
  const [totalRuns, setTotalRuns] = useState(0);
  const [smsTotalPie, setSmsTotalPie] = useState(0);
  const [nluTotalPie, setNluTotalPie] = useState(0);
  const [chatTotalPie, setChatTotalPie] = useState(0);
  const [whatsappTotalPie, setWhatsappTotalPie] = useState(0);
  const [totalRunForBarChart, setTotalRunForBarChart] = useState([0,0,0,0,0,0,0]);
  const [totalSuccessForBarChart, setTotalSuccessForBarChart] = useState([0,0,0,0,0,0,0]);
  const [totalXAxisDataForBarChart, setTotalXAxisDataForBarChart] = useState(
    [],
  );
  const {baseUrl, token, storeToken, storePassword} = useContext(AppContext);
  const [savedPassword, setSavedPassword] = useState('');

  const getSavedPassword = async () => {
    let pw = await AsyncStorage.getItem('password');
    storePassword(pw);
  };

  const getAllDashboardDetails = objTosend => {
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
        console.log(resp);
        let dateLables = [];
        let dateLablesForXAxis = [];
        let totalsuccessCountForState = [];
        let totalRunCountForState = [];

        let labelsOfDate = [];
        resp.response.map(item => {
          let date = item.end_session_time.split(' ');

          if (dateLables.includes(date[0], 0)) {
          } else {
            console.log("#######################")
            console.log(date[0].split("/")[1] + "/" + date[0].split("/")[0]);
            console.log("#######################")
            let dateToPush = date[0].split("/")[1] + "/" + date[0].split("/")[0];
            dateLables.push(date[0]);
            dateLablesForXAxis.push(dateToPush);
          }
        });
        setTotalXAxisDataForBarChart(dateLablesForXAxis);
        dateLables.map(itemP => {
          let countIteration = 0;
          let successIteration = 0;
          resp.response.map(itemC => {
            let date = itemC.end_session_time.split(' ');
            if (itemP.localeCompare(date[0]) == 0) {
              countIteration++;
              if (itemC.result.localeCompare('failure') == 0) {
              } else {
                successIteration++;
              }
            }
          });
          totalRunCountForState.push(countIteration);
          totalsuccessCountForState.push(successIteration);
        });

        if(totalsuccessCountForState.length > 0) {
          setTotalRunForBarChart(totalRunCountForState);
          setTotalSuccessForBarChart(totalsuccessCountForState);
        }
        

        // console.log(labelsOfDate);

        // PIE CHART IMPLEMENTATION
        let totalFailed = 0;
        let totalSuccess = 0;
        let totalRun = resp.response.length;
        let totalSmsForPie = 0;
        let totalNluForPie = 0;
        let totalChatForPie = 0;
        let totalWhatsappForPie = 0;
        resp.response.map(
          item => (
            item.result == 'failure' ? totalFailed++ : totalSuccess++,
            item.channel_name == 'NLU BOT' ? totalNluForPie++ : totalNluForPie,
            item.channel_name == 'SMS' ? totalSmsForPie++ : totalSmsForPie,
            item.channel_name == 'WhatsApp'
              ? totalWhatsappForPie++
              : totalWhatsappForPie,
            item.channel_name == 'Chat' ? totalChatForPie++ : totalChatForPie
          ),
        );
        setTotalSuccess(totalSuccess);
        setTotalFailed(totalFailed);
        setTotalRuns(totalRun);
        setNluTotalPie(totalNluForPie);
        setWhatsappTotalPie(totalWhatsappForPie);
        setChatTotalPie(totalChatForPie);
        setSmsTotalPie(totalSmsForPie);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const data = [
    {key: 1, amount: smsTotalPie, svg: {fill: '#36A2EB'}}, //SMS
    {key: 2, amount: chatTotalPie, svg: {fill: '#4BC0C0'}}, //CHAT
    {key: 3, amount: whatsappTotalPie, svg: {fill: '#FFCE56'}}, //WHATSAPP
    {key: 4, amount: nluTotalPie, svg: {fill: '#FF6384'}}, //NLU BOT
  ];

  const data1 = totalRunForBarChart.map(value => ({
    value,
  }));
  const data2 = totalSuccessForBarChart.map(value => ({
    value,
  }));

  const barData = [
    {
      data: data1,
      svg: {
        fill: '#9E5CE1',
      },
    },
    {
      data: data2,
      svg: {
        fill: 'rgb(115,198,109)',
      },
    },
  ];

  const contentInset = {top: 20, bottom: 20};

  useEffect(() => {
    console.log(data1);
    console.log(data2);
    var startDate = moment().subtract(1, 'week').format('MM/DD/YYYY');
    var endDate = moment().format('MM/DD/YYYY');
    getSavedPassword();
    Auth.currentSession()
      .then(data => {
        console.log(data.idToken.jwtToken);
        storeToken(data.idToken.jwtToken);
      })
      .catch(err => {
        console.log(err);
      });

    var objTosend = {
      startDate: `${startDate}`,
      endDate: `${endDate}`,
    };

    getAllDashboardDetails(JSON.stringify(objTosend));
    const unsubsribe = navigation.addListener('didFocus', () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Dashboard'})],
      });
      navigation.dispatch(resetAction);
      var startDate = moment().subtract(1, 'week').format('MM/DD/YYYY');
      var endDate = moment().format('MM/DD/YYYY');
      var objTosend = {
        startDate: `${startDate}`,
        endDate: `${endDate}`,
      };
      getAllDashboardDetails(JSON.stringify(objTosend));
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
      <View style={DashboardStyles.container}>
        <View style={DashboardStyles.topCurvedView}>
          <DrawerNavbar title="Dashboard" />
        </View>

        <View style={DashboardStyles.swiperView}>
          <ScrollView style={DashboardStyles.mainScroll}>
            <ScrollView
              style={{margin: 7}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <LinearGradient
                colors={['#D455B8', '#C355C7', '#B555D5']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                // source ={require('../../assets/images/RectangleBlue.png')}
                style={DashboardStyles.gradientCards}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name="ios-person-outline"
                    color={colors.white}
                    size={24}
                    style={DashboardStyles.gradientCardIcons}
                  />
                </View>
                <Text style={DashboardStyles.gradientCardCount}>
                  {totalRuns}
                </Text>
                <Text style={DashboardStyles.gradientCardDiscription}>
                  Total Runs
                </Text>
              </LinearGradient>
              <LinearGradient
                colors={['#7BC96F', '#A7D673', '#CDE079']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                //  source ={require('../../assets/images/RectangleBlue.png')}
                style={DashboardStyles.gradientCards}>
                <View style={{flexDirection: 'row'}}>
                  <MaterialIcons
                    name="touch-app"
                    color={colors.white}
                    size={24}
                    style={DashboardStyles.gradientCardIcons}
                  />
                </View>
                <Text style={DashboardStyles.gradientCardCount}>
                  {totalSuccess}
                </Text>
                <Text style={DashboardStyles.gradientCardDiscription}>
                  Success
                </Text>
              </LinearGradient>
              <LinearGradient
                colors={['#F0B04C', '#EF8B49', '#EB6344']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                //  source ={require('../../assets/images/RectangleBlue.png')}
                style={DashboardStyles.gradientCards}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name="warning-outline"
                    color={colors.white}
                    size={24}
                    style={DashboardStyles.gradientCardIcons}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={DashboardStyles.gradientCardCount}>
                    {totalFailed}
                  </Text>
                </View>
                <Text style={DashboardStyles.gradientCardDiscription}>
                  Failed
                </Text>
              </LinearGradient>
            </ScrollView>

            
            <Card style={DashboardStyles.calendarCard}>
              <View style={DashboardStyles.todayView}>
                <Text style={DashboardStyles.todayText}>Performance Graph (7 Days)</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={[
                    DashboardStyles.txtForPieChartLabel,
                    {color: '#9E5CE1'},
                  ]}>
                  Total Run
                </Text>
                <View
                  style={{
                    backgroundColor: '#9E5CE1',
                    height: hp('2%'),
                    width: wp('10%'),
                    marginTop: 5,
                  }}
                />
                <Text
                  style={[
                    DashboardStyles.txtForPieChartLabel,
                    {color: 'green', marginLeft: 20},
                  ]}>
                  Total Success
                </Text>
                <View
                  style={{
                    backgroundColor: 'green',
                    height: hp('2%'),
                    width: wp('10%'),
                    marginTop: 5,
                  }}
                />
              </View>
              {barData.length > 0 ? (
                <View>
                  <View>
                    <LC
                      data={{
                        labels: totalXAxisDataForBarChart,
                        datasets: [
                          {
                            data:totalRunForBarChart,
                            color: (opacity = 1) => `rgba(158, 92, 225, ${opacity})` // optional
                          },
                          {
                            data:totalSuccessForBarChart,
                            color: (opacity = 1) => `rgba(39, 199, 21, ${opacity})` // optional
                          },
                        ],
                      }}
                      width={Dimensions.get('window').width- wp('6')} // from react-native
                      height={220}
                      // yAxisLabel="$"
                      // yAxisSuffix="k"
                      yAxisInterval={1} // optional, defaults to 1
                      chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#e3e3e3',
                        backgroundGradientTo: '#FFFFFF',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) =>
                          `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) =>
                          `rgba(0, 0, 0, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        },
                        propsForDots: {
                          r: '6',
                          strokeWidth: '2',
                          stroke: '#ffa726',
                        },
                      }}
                      bezier
                      style={{
                        marginVertical: 8,
                        borderRadius: 16,
                      }}
                    />
                  </View>
                </View>
              ) : (
                <Text>Nothing to display</Text>
              )}
            </Card>
            <Card style={DashboardStyles.calendarCard}>
              <View style={DashboardStyles.todayView}>
                <Text style={DashboardStyles.todayText}>
                  Channel Wise Performance Graph (7 Days)
                </Text>
              </View>
              {data.length > 0 ? (
                <View>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={[
                            DashboardStyles.txtForPieChartLabel,
                            {color: '#FF6384'},
                          ]}>
                          NLU BOT ({nluTotalPie})
                        </Text>
                        <View
                          style={{
                            backgroundColor: '#FF6384',
                            height: hp('2%'),
                            width: wp('10%'),
                            marginTop: wp('1%'),
                          }}
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={[
                            DashboardStyles.txtForPieChartLabel,
                            {color: '#36A2EB'},
                          ]}>
                          SMS ({smsTotalPie})
                        </Text>
                        <View
                          style={{
                            backgroundColor: '#36A2EB',
                            height: hp('2%'),
                            width: wp('10%'),
                            marginTop: wp('1%'),
                          }}
                        />
                      </View>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={[
                            DashboardStyles.txtForPieChartLabel,
                            {color: '#FFCE56'},
                          ]}>
                          WhatsApp ({whatsappTotalPie})
                        </Text>
                        <View
                          style={{
                            backgroundColor: '#FFCE56',
                            height: hp('2%'),
                            width: wp('10%'),
                            marginTop: wp('1%'),
                          }}
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={[
                            DashboardStyles.txtForPieChartLabel,
                            {color: '#4BC0C0'},
                          ]}>
                          Chat ({chatTotalPie})
                        </Text>
                        <View
                          style={{
                            backgroundColor: '#4BC0C0',
                            height: hp('2%'),
                            width: wp('10%'),
                            marginTop: wp('1%'),
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <PieChart
                    style={{
                      height: 200,
                      marginHorizontal: wp('5%'),
                      marginVertical: wp('5%'),
                    }}
                    valueAccessor={({item}) => item.amount}
                    data={data}
                    spacing={0}
                    outerRadius={'95%'}>
                    {/* <Labels /> */}
                  </PieChart>
                </View>
              ) : (
                <Text>Nothing to display</Text>
              )}
            </Card>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default withTheme(withNavigation(Dashboard));
