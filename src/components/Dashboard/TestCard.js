import React, {useState} from 'react';
import {Image, Text, View,ScrollView, ImageBackground, TouchableOpacity,Modal, Alert} from 'react-native';
import { Card, HelperText, withTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import colors from '../../assets/colors/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardStyles from '../../assets/styles/DashboardStyles/DashboardStyles';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';

const TestCard = () =>{
    return(
<Card style={{
                             borderRadius:10,
                             backgroundColor:'#9E5CE1',
                             paddingVertical:5,
                             paddingHorizontal:15,
                             marginTop:5
            }}>
                <Text style={{
                    fontSize:14,
                    fontFamily:'Poppins-Medium',
                    color:colors.white
                }}>
                    Testing_057
                </Text>
                <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                <MaterialCommunityIcons name='clock-outline' color={colors.white} size={18}/>
                <Text style={{
                    fontSize:12,
                    fontFamily:'Poppins-Regular',
                    color:colors.white,
                    marginLeft:5,
                    flex:1
                }}>
                    01/28/2021 11:52:55
                </Text>
                <Image source={require('../../assets/images/grid.png')} style={DashboardStyles.gridIcon}/>
                <Text style={{
                    fontSize:14,
                    fontFamily:'Poppins-Regular',
                    color:colors.white,
                    marginLeft:5,
                }}>
                    CHAT
                </Text>
                </View>
            </Card>
    )
}
export default withTheme(withNavigation(TestCard));