import React, {useEffect, useState} from 'react';
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
const HighLevelReportsSprintDetails = ({item, index}) => {
  const [colorsForPieChart, setColorsForPieChart] = useState([
    '#36A2EB', //NLU BOT
    '#4BC0C0', // CHAT
    '#FFCE56', // Whatsapp
    '#FF6384', // SMS
    '#964B00', // EMAIL
    
    
  ]);
  const [selectedColor, setSelectedColor] = useState('#00000000');

  useEffect(()=>{
    if(item.channel == "NLU BOT" || item.channel == "NLU BOT" || item.channel == "Nlu Bot")
    {
      setSelectedColor(colorsForPieChart[0]);
    }else if(item.channel == "SMS" || item.channel == "sms" || item.channel == "Sms")
    {
      setSelectedColor(colorsForPieChart[3]);
    }else if(item.channel == "WHATSAPP" || item.channel == "WhatsApp" || item.channel == "whatsapp" )
    {
      setSelectedColor(colorsForPieChart[2]);
    }else if(item.channel == "Chat" || item.channel == "CHAT" || item.channel == "chat" )
    {
      setSelectedColor(colorsForPieChart[1]);
    }else if(item.channel == "EMAIL" || item.channel == "Email" || item.channel == "email" )
    {
      setSelectedColor(colorsForPieChart[4]);
    }
  
  },[]);
 
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Sprint Name : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.sprintName}
        </Text>
        <Badge
          style={[
            ReportScreenStyles.sprintDetailsBadgeRed,
            {backgroundColor: selectedColor},
          ]}>
          {item.noOfRuns}
        </Badge>
        {/* <Badge style={ReportScreenStyles.sprintDetailsBadgeGreen}>12</Badge>
            <Badge style={ReportScreenStyles.sprintDetailsBadgeBlue}>12</Badge> */}
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Number of Runs : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.noOfRuns}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Success Count : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.successCount}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Failed Count : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.failedCount}
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
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Test Type : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
          {item.testType}
        </Text>
      </View>
      {/* <View
        style={{
          borderColor: 'grey',
          borderWidth: 0.5,
          borderStyle: 'dashed',
          borderRadius: 1,
          marginTop: 15,
        }}></View> */}
    </Card>
  );
};
export default withTheme(withNavigation(HighLevelReportsSprintDetails));
