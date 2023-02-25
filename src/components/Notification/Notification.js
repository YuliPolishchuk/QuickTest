import React, {useState} from 'react';
import {Alert, Modal, Text, View} from 'react-native';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import DashboardNavbar from '../Navbars/DashboardNavbar';

const Notification = ({title, time,color}) => {
  return (
    <View style={TestMethod.ViewNotification}>
        {
          (time == 'Just Know' ? (
            <View style={TestMethod.flexRow}>
            <View style={TestMethod.viewBorderLeftGreen}></View>
              <Text style={TestMethod.label3}>{title}</Text>
            </View>
          ) : (
            <View style={TestMethod.flexRow}>
            <View style={TestMethod.viewBorderLeftYellow}></View>
              <Text style={TestMethod.label3}>{title}</Text>
            </View>
          ))
        }
      <Text style={TestMethod.label1}>{time}</Text>
    </View>
  );
};
export default Notification;
