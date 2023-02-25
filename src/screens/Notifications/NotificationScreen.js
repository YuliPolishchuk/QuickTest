import React, {useState} from 'react';
import {Alert, Modal, Platform, ScrollView, StatusBar, Text, View,SafeAreaView} from 'react-native';
import colors from '../../assets/colors/colors';
import ContainerStyle from '../../assets/styles/ContainerStyle';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import DashboardNavbar from '../../components/Navbars/DashboardNavbar';
import Notification from '../../components/Notification/Notification';

const NotificationScreen = () => {
  return (
    <SafeAreaView style={ContainerStyle.safeAreaContainer}>
      {Platform.OS == 'ios' ? null : (
        <StatusBar
          hidden={false}
          backgroundColor={colors.purple}
          barStyle="light-content"
        />
      )}
      <View style={TestMethod.container}>
        <DashboardNavbar title="Notifications" />
        <ScrollView>
        <Notification
          title="Automated Testing Automated_5 is complete. you can check the report"
          time="Just Know"
        />
        <Notification
          title="Automated Testing Automated_5 is complete. you can check the report"
          time="4:30pm Yesterday"
        />
        <Notification
          title="Automated Testing Automated_5 is complete. you can check the report"
          time="6:00pm Yesterday"
        />
        <Notification
          title="Automated Testing Automated_5 is complete. you can check the report"
          time="2:00pm Yesterday"
        />
        <Notification
          title="Automated Testing Automated_5 is complete. you can check the report"
          time="4:00pm Yesterday"
        />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default NotificationScreen;
