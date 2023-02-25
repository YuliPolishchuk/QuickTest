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
import {convertUtcToLocal} from "../../../Helpers/UtcToLocalConverter";

const SprintDetailReportsSprintDetails = ({item}) => {
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
          {item.sprint_name}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Channel : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>{item.channel_name}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Test Type : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>{item.test_type}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Start Time : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>{convertUtcToLocal(item.current_session_time)}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          End Time : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>{convertUtcToLocal(item.end_session_time)}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Execution Time in mins : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>{item.session_time_minutes}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Results : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>{item.result}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ReportScreenStyles.ScriptCardHeadings}>
          Status : {''}
        </Text>
        <Text style={ReportScreenStyles.ScriptCardDiscriptions}>{item.status}</Text>
      </View>
      
    </Card>
  );
};
export default withTheme(withNavigation(SprintDetailReportsSprintDetails));
