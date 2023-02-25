import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Iconn from 'react-native-vector-icons/Ionicons';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import {
  HelperText,
  withTheme,
  Button,
  Card,
  Title,
  RadioButton,
} from 'react-native-paper';
import colors from '../../assets/colors/colors';

const RadioGroupLoading = ({navigation, theme, title}) => {
  const [value, setValue] = useState('first');

  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <RadioButton color={colors.grey1} value="first" />
          <Text
            style={{
              color: colors.grey2,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Loading001
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <RadioButton color={colors.grey1} value="Second" />
          <Text
            style={{
              color: colors.grey2,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Loading002
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <RadioButton color={colors.grey1} value="Third" />
          <Text
            style={{
              color: colors.grey2,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Loading003
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <RadioButton color={colors.grey1} value="Forth" />
          <Text
            style={{
              color: colors.grey2,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Loading004
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <RadioButton color={colors.grey1} value="Fifth" />
          <Text
            style={{
              color: colors.grey2,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Loading005
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <RadioButton color={colors.grey1} value="Sixth" />
          <Text
            style={{
              color: colors.grey2,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Loading006
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <RadioButton color={colors.grey1} value="Seventh" />
          <Text
            style={{
              color: colors.grey2,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Loading007
          </Text>
        </View>
      </RadioButton.Group>
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

export default withNavigation(RadioGroupLoading);
