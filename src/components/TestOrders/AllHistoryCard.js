import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
} from 'react-native';
import {NavigationActions, withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Iconn from 'react-native-vector-icons/MaterialIcons';
import TestMethod from '../../assets/styles/TestMethodStyle/TestMethod';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import GeneralProperties from '../../assets/styles/GeneralProperties';
import colors from '../../assets/colors/colors';
import {Card} from 'react-native-paper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AppContext from '../../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
const AllHistoryCard = ({status,item,navigation}) => {
  const {baseUrl,token} = useContext(AppContext);
  

  useEffect(()=>{
    console.log(item.id);
  },[])
  return (
    <TouchableOpacity 
      onPress={() => {
        navigation.navigate('TestingHistoryDetail', 
        {sprintName: item.sprintName, sprintId: item.sprintId, clientId:item.clientId}
        )
      }}>
    <Card style={[TestMethod.textCardView]}>
      <View style={TestMethod.testCardView}>
        <Text style={[TestMethod.testCard]}>Test type : </Text>
        <Text style={[TestMethod.testDetail]}>{item.testType}</Text>
      </View>
      <View style={TestMethod.testCardView}>
        <Text style={[TestMethod.testCard]}>Executed On : </Text>
        <Text style={[TestMethod.testDetail]}>{item.executedOn}</Text>
      </View>
      <View style={TestMethod.testCardView}>
        <Text style={[TestMethod.testCard]}>Channel : </Text>
        <Text style={[TestMethod.testDetail]}>{item.channelName}</Text>
      </View>
      {item.result == 'failure' ? (
        <View style={TestMethod.testCardView}>
          <Text style={[TestMethod.testCard]}>Result : </Text>
          <Iconn
            style={[GeneralProperties.mh1]}
            name="highlight-remove"
            size={20}
            color={colors.red}
          />
          <Text style={[TestMethod.textCardRed]}>{item.result}</Text>
        </View>
      ) : (
        <View style={[TestMethod.testCardView]}>
          <Text style={[TestMethod.testCard]}>Result : </Text>
          {item.result == null ? <Text></Text> : <Icon
            style={[GeneralProperties.mh1]}
            name="check-bold"
            size={20}
            color={colors.yellow}
          />
          }
          
          <Text style={[TestMethod.textCardYellow]}>{item.result == null ? <Text></Text>: item.result}</Text>
        </View>
      )}
    </Card>
    </TouchableOpacity>
  );
};

export default withNavigation(AllHistoryCard);
