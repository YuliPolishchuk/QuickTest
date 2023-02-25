import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  Button,
  Card,
  HelperText,
  withTheme,
  TextInput,
  Badge,
} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReportScreenStyles from '../../../assets/styles/MoreScreensStyles/ReportScreensStyles/ReportScreenStyles';
import colors from '../../../assets/colors/colors';
import DashboardStyles from '../../../assets/styles/DashboardStyles/DashboardStyles';
import {PieChart} from 'react-native-svg-charts';

const HighLevelReportChart = ({highLevelChartData}) => {
  const data = [
    {key: 1, amount: 25, svg: {fill: '#36A2EB'}},
    {key: 2, amount: 25, svg: {fill: '#4BC0C0'}}, 
    {key: 3, amount: 25, svg: {fill: '#FFCE56'}}, 
    {key: 4, amount: 25, svg: {fill: '#FF6384'}}, 
  ];

  return (
    // <View style={{margin: 15}}>
    <Card style={DashboardStyles.calendarCard}>
      <View style={DashboardStyles.todayView}>
        <Text style={DashboardStyles.todayText}>High Level Report Details</Text>
      </View>
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
                NLU BOT ()
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
                SMS ()
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
                WhatsApp ()
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
    </Card>
    // </View>
  );
};
export default withTheme(withNavigation(HighLevelReportChart));
