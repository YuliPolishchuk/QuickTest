import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import {convertUtcToLocalTime} from '../../Helpers/UtcToLocalConverter';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';

const CardForEditSceduleTimeSlots = ({
  item,
  index,
  deleteFromScheduleDateTime,
}) => {
  return (
    <Card
      style={{
        width: wp('80%'),
        height: 130,
        margin: 10,
        elevation: 4,
      }}>
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[TestMethod.label, {textAlign: 'right'}]}>Date</Text>
          <Text style={[TestMethod.labelForDateTimeScheduleCard]}>
            : {item.date}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={[TestMethod.label, {textAlign: 'right'}]}>Time</Text>
          <Text style={[TestMethod.labelForDateTimeScheduleCard]}>
            : {item.time}
          </Text>
        </View>
        {item.repeat == '' || item.repeat == null ? null : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={[TestMethod.label, {textAlign: 'right'}]}>Repeat</Text>
            <Text style={[TestMethod.labelForDateTimeScheduleCard]}>
              : {item.repeat}
            </Text>
          </View>
        )}

        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              deleteFromScheduleDateTime(index);
            }}>
            <MaterialCommunityIcons
              name="delete"
              color={colors.purple}
              size={wp('6%')}
            />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CardForEditSceduleTimeSlots;
