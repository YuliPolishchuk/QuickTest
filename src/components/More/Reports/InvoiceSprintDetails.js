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
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReportScreenStyles from '../../../assets/styles/MoreScreensStyles/ReportScreensStyles/ReportScreenStyles';
import colors from '../../../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
const InvoiceSprintDetails = ({item}) => {
  return (
    <Card
      style={{
        elevation: 4,
        borderRadius: 10,
        width: wp('95'),
        alignSelf: 'center',
        marginBottom: 20,
        padding: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Created Date & Time : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.date}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Sprint Type : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.sprintType}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Sprint Name : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.sprintName}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Channel : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.channel}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>Unit : {''}</Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.unit}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Cost/Unit : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.costPerUnit}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>Cost : {''}</Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>{item.totalCost}</Text>
      </View>
    </Card>
  );
};
export default withTheme(withNavigation(InvoiceSprintDetails));
