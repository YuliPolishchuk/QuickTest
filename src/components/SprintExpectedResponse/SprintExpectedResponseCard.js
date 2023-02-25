import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Card, Paragraph, Title} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import StartTestingStyle from '../../assets/styles/TestMethodStyle/StartTestingStyle';

const SprintExpectedResponseCard = ({navigation, item}) => {

  const compareArrays = (str1,str2) =>{
    var arr1 = str1.split(" ");
    var arr2 = str2.split(" ");
    let iterate = 0;
    return ( 
      <Text>
        {arr1.map((item)=>(
            iterate++,
            item == arr2[iterate-1] ? <View style={{flexDirection:'row'}}><Text style={[StartTestingStyle.expectedText,{color:"green"}]}>{' '}{item}</Text></View> :<View style={{flexDirection: 'row'}}><Text style={[StartTestingStyle.expectedText,{color:"red"}]}>{' '}{item}</Text><Text style={[StartTestingStyle.expectedText,{color:"green"}]}>{' '}{arr2[iterate-1]}</Text></View>       
            ))
          }
      </Text>
    )
  }

  useEffect(()=>{
    
  }, [])

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Card style={StartTestingStyle.expectedCardSmall}>
          <Card.Content>
            <Text style={StartTestingStyle.expectedHeadingText}>
              Expected Text
            </Text>
            <Text style={StartTestingStyle.expectedText}>{item.expected}</Text>
          </Card.Content>
        </Card>
        <Card style={StartTestingStyle.expectedCardSmall}>
          <Card.Content>
            <Text style={StartTestingStyle.expectedHeadingText}>
              Auto Pilot Recognition
            </Text>
            <Text style={StartTestingStyle.expectedText}>
              {item.ivr_message}
            </Text>
          </Card.Content>
        </Card>
        <Card style={StartTestingStyle.expectedCardSmall}>
          <Card.Content>
            <Text style={StartTestingStyle.expectedHeadingText}>
              Auto Pilot Response
            </Text>
            <Text style={StartTestingStyle.expectedText}>
              {item.ai_message}
            </Text>
          </Card.Content>
        </Card>
        <Card style={StartTestingStyle.expectedCardSmall}>
          <Card.Content>
            <Text style={StartTestingStyle.expectedHeadingText}>
              Difference
            </Text>
              {compareArrays(item.expected, item.ivr_message)}            
          </Card.Content>
        </Card>
      </ScrollView>
      <View style={StartTestingStyle.confidenceView}>
        <Text style={StartTestingStyle.headingText}>
          Confidence {item.confidence}
        </Text>
      </View>
    </View> 
  );
};

export default withNavigation(SprintExpectedResponseCard);
