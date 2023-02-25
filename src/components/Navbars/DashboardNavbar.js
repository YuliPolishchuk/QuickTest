import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Card, HelperText, withTheme, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import NavbarStyles from '../../assets/styles/NavbarStyles/NavbarStyles';
import ScriptListScreenStyles from '../../assets/styles/MoreScreensStyles/ScriptScreensStyles/ScriptListScreenStyles';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import Iconn from 'react-native-vector-icons/Ionicons';

const DrawerNavbar = ({navigation, theme, title}) => {
  const [onMenuPress, setOnMenuPress] = useState(false);

  return (
    <View style={ScriptListScreenStyles.headerView}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}>
        <Iconn name="ios-arrow-back" size={wp('8%')} color={colors.white} />
      </TouchableOpacity>
      <Text style={ScriptListScreenStyles.dashboardHeading}>{title}</Text>

      <View>
        <Menu>
          <MenuTrigger>
            <Icon
              style={TestMethod.flexEnd}
              name="bell"
              size={25}
              color={colors.white}
            />
          </MenuTrigger>

          <MenuOptions
            style={TestMethod.menuOptionStyling}>
            <MenuOption
              onSelect={() => navigation.navigate('NotificationScreen')}>
              <View style={TestMethod.flexRow}>
                <View style={TestMethod.viewBorderLeftGreen}></View>
                <Text style={TestMethod.labelHeight}>
                  Automated Testing Automated_5 is ready. you can check the
                  report
                </Text>
              </View>
              <Text style={TestMethod.label1}>just Know</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => navigation.navigate('NotificationScreen')}>
              <View style={TestMethod.flexRow}>
                <View style={TestMethod.viewBorderLeftGreen}></View>
                <Text style={TestMethod.labelHeight}>
                  Automated Testing Automated_5 is ready. you can check the
                  report
                </Text>
              </View>
              <Text style={TestMethod.label1}>just Know</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => navigation.navigate('NotificationScreen')}>
              <Text style={[NavbarStyles.Button1]}>View All</Text>
              <View style={NavbarStyles.viewBorder}></View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyles: {
    backgroundColor: '#1fc157',
    color: '#FFFFFF',
  },
  titleStyle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default withNavigation(DrawerNavbar);
