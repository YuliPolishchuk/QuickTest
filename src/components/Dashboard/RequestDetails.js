import React, {useState} from 'react';
import {Image, Text, View,ScrollView, ImageBackground, TouchableOpacity,Modal, Alert} from 'react-native';
import { Card, HelperText, withTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
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

const RequestDetails = () =>{
    return(
            <View style={{
                 margin:10
             }}>
                 <View style={{flexDirection:'row'}}>
                    <Text style={DashboardStyles.requestsModalHeadings}>
                        Sprint Name : {''}
                    </Text>
                    <Text style={DashboardStyles.requestsModalDiscriptions}>
                        Loading_001
                    </Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                    <Text style={DashboardStyles.requestsModalHeadings}>
                        Created Date & Time : {''}
                    </Text>
                    <Text style={DashboardStyles.requestsModalDiscriptions}>
                         07/06/2020 . 09:45:55
                    </Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                    <Text style={DashboardStyles.requestsModalHeadings}>
                        Completed Date & Time : {''}
                    </Text>
                    <Text style={DashboardStyles.requestsModalDiscriptions}>
                        07/06/2020 . 09:45:55
                    </Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                    <Text style={DashboardStyles.requestsModalHeadings}>
                        Testing Method : {''}
                    </Text>
                    <Text style={DashboardStyles.requestsModalDiscriptions}>
                        Schedule Testing
                    </Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                    <Text style={DashboardStyles.requestsModalHeadings}>
                        Channel : {''}
                    </Text>
                    <Text style={DashboardStyles.requestsModalDiscriptions}>
                        Chat
                    </Text>
                 </View>
             </View>

    )
}
export default withTheme(withNavigation(RequestDetails));