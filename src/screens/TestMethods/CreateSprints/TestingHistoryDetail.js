import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TestMethod from '../../../assets/styles/TestMethodStyle/TestMethod';
import {Card, Paragraph, Title} from 'react-native-paper';
// import {colors} from '../../../assets/colors/colors';
import DashboardNavbar from '../../../components/Navbars/DashboardNavbar';
import AppContext from '../../../context/AppContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import StartTestingStyle from '../../../assets/styles/TestMethodStyle/StartTestingStyle';
import MembershipStyle from '../../../assets/styles/MembershipStyle/MembershipStyle';
import RNFetchBlob from 'react-native-fetch-blob';
import SprintExpectedResponseCard from '../../../components/SprintExpectedResponse/SprintExpectedResponseCard';
import ContainerStyle from '../../../assets/styles/ContainerStyle';

const TestingHistoryDetail = ({navigation}) => {
  const sprintName = navigation.state.params.sprintName;
  const sprintId = navigation.state.params.sprintId;
  const clientId = navigation.state.params.clientId;

  const [stopTestLoading, setStopTestLoading] = useState(false);
  const [startTestLoading, setStartTestLoading] = useState(false);
  const [showStopButton, setShowStopButton] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [sprintStopped, setSprintStopped] = useState(false);
  const [clientIdForSprintTest, setClientIdForSprintTest] = useState('');
  const [startButtonText, setStartButtonText] = useState('Start');
  const [testStartedText, setTestStartedText] = useState('Testing Started');
  const [testStarted, setTestStarted] = useState(false);
  const {baseUrl, token, storeClientIdForSprintTesting} = useContext(
    AppContext,
  );
  const refContainer = useRef(null);

  const [messageList, setMessageList] = useState([]);

  const [totalPlanned, setTotalPlanned] = useState(0);
  const [inProgess, setInProgess] = useState(0);
  const [failedError, setFailedError] = useState(0);
  const [totalComplete, setTotalComplete] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [matchedText, setMatchedText] = useState(false);
  const [matchedString, setMatchedString] = useState('');
  const [loadedJSX, setLoadedJSX] = useState('');


  const getListMessageDataOfTesting = () => {
    // console.log(sprintStopped);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        `${baseUrl}/autopilotMessage/listMessageData?customerId=${clientId}`,
        {Authorization: `${token}`,tokenType:'aws'},
      )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setMessageList(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshSprintTesting = () => {
    console.log(sprintId);
    console.log(clientId);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        `${baseUrl}/sprint/refreshSprintClientResponse?sprintId=${sprintId}&clientId=${clientId}`,
        {Authorization: `${token}`,tokenType:'aws'},
      )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setTotalPlanned(resp.TotalPlanned);
        setInProgess(resp.Active);
        setFailedError(0);
        setTotalComplete(resp.Finished);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    refreshSprintTesting();
    getListMessageDataOfTesting();
  }, []);

  return (
    <SafeAreaView style={ContainerStyle.safeAreaContainer}>
      {Platform.OS == 'ios' ? null : (
        <StatusBar
          hidden={false}
          backgroundColor={colors.purple}
          barStyle="light-content"
        />
      )}
    <View style={[TestMethod.container]}>
      <DashboardNavbar title="History Details" />
      <ScrollView
        ref={refContainer}
        onContentSizeChange={() => {
          refContainer != null ? refContainer.current.scrollToEnd() : null;
        }}>
        <View style={StartTestingStyle.container}>

        <Card style={StartTestingStyle.actualResultCard}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Card style={StartTestingStyle.actualCardSmall}>
                  <Text
                    style={[
                      StartTestingStyle.headingText,
                      {fontSize: wp('3.5%')},
                    ]}>
                    Total Interactions Planned
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: wp('5%')}}>
                    {totalPlanned}
                  </Text>
                </Card>
                <Card style={StartTestingStyle.actualCardSmall}>
                  <Text style={StartTestingStyle.headingText}>In Progress</Text>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: wp('5%')}}>
                    {inProgess}
                  </Text>
                </Card>
                <Card style={StartTestingStyle.actualCardSmall}>
                  <Text style={StartTestingStyle.headingText}>Failed Error</Text>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: wp('5%')}}>
                    {failedError}
                  </Text>
                </Card>
                <Card style={StartTestingStyle.actualCardSmall}>
                  <Text style={StartTestingStyle.headingText}>
                    Total Complete
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: wp('5%')}}>
                    {totalComplete}
                  </Text>
                </Card>
                
            </ScrollView>
        </Card>
        <Card style={StartTestingStyle.expectedCard}>
            <FlatList
              style={{marginVertical: 20}}
              data={messageList}
              renderItem={({item}) => {
                return <SprintExpectedResponseCard item={item} />;
              }}
            />
        </Card>


          
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default withNavigation(TestingHistoryDetail);
