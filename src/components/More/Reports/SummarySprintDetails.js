import React, {useState} from 'react';
import {Image, Text, View,ScrollView, ImageBackground, TouchableOpacity,Modal, } from 'react-native';
import { Button, Card, HelperText, withTheme, TextInput, Badge} from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReportScreenStyles from '../../../assets/styles/MoreScreensStyles/ReportScreensStyles/ReportScreenStyles';
import colors from '../../../assets/colors/colors';

const SummarySprintDetails = () => {
return(
    <View>
    <View style={{margin:15}}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={ReportScreenStyles.ScriptCardHeadings}>
                Sprint Name : {''}
            </Text>
            <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
                Loading_001
            </Text>
            <Badge style={ReportScreenStyles.sprintDetailsBadgeBlue}>12</Badge>
            {/* <Badge style={ReportScreenStyles.sprintDetailsBadgeGreen}>12</Badge>
            <Badge style={ReportScreenStyles.sprintDetailsBadgeBlue}>12</Badge> */}
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={ReportScreenStyles.ScriptCardHeadings}>
                Average : {''}
            </Text>
            <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
                104
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={ReportScreenStyles.ScriptCardHeadings}>
                Minimun & Maximum : {''}
            </Text>
            <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
                45 & 98
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={ReportScreenStyles.ScriptCardHeadings}>
                Std Dev : {''}
            </Text>
            <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
                10.5
            </Text>
        </View>
        
        <View style={{flexDirection:'row'}}>
            <Text style={ReportScreenStyles.ScriptCardHeadings}>
                Error % : {''}
            </Text>
            <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
                85%
            </Text>
        </View>
        
        <View style={{flexDirection:'row'}}>
            <Text style={ReportScreenStyles.ScriptCardHeadings}>
                Throughput : {''}
            </Text>
            <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
                2.9
            </Text>
        </View>
        
        <View style={{flexDirection:'row'}}>
            <Text style={ReportScreenStyles.ScriptCardHeadings}>
                KB/sec : {''}
            </Text>
            <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
                1.54
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={ReportScreenStyles.ScriptCardHeadings}>
                Avg Bytes : {''}
            </Text>
            <Text style={ReportScreenStyles.ScriptCardDiscriptions}>
                521.2
            </Text>
        </View>
    </View>
            <View style={{
                borderColor:'grey',
                    borderWidth:0.5,
                    borderStyle:'dashed',
                    borderRadius:1,
                }}>
                </View>
    </View>
)
}
export default withTheme(withNavigation(SummarySprintDetails));