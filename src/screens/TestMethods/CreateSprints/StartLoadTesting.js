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

const StartLoadTesting = ({navigation}) => {
  const sprintName = navigation.state.params.sprintName;
  const sprintId = navigation.state.params.sprintId;
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

  const startSprintTesting = (sprintId) => {
    setTestStartedText('');
    setStartTestLoading(true);
    setTestStartedText('Testing Started');
    // console.log(sprintId);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/sprint/runLoadSprint?sprintId=${sprintId}`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setClientIdForSprintTest(resp.result);
        storeClientIdForSprintTesting(resp.result);
        setTestStarted(true);
        setTestStartedText('Testing Started');
        setTimeout(() => {
          getSprintStatusForTesting(resp.result);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSprintStatusForTesting = (cId) => {
    // console.log(sprintId);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/sprint/getLoadTestStatus?loadstartsprintId=${cId}`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setTotalPlanned(resp.response.total);
        setInProgess(resp.response.inprogress);
        setFailedError(resp.response.error);
        setTotalComplete(resp.response.completed);
        setOverallProgress(((resp.response.completed/resp.response.total) * 100).toFixed(2));
        setTimeout(() => {
          getSprintStatusForTesting(cId);
        }, 3000);  
        // if (resp.result == 'completed') {
        //   setShowStopButton(false);
        //   setShowStartButton(true);
        //   setStartButtonText('Start Again');
        //   setStartTestLoading(false);
        //   setTestStartedText('Testing Completed');
        //   setOverallProgress(100);
        // } else {
        //   setTimeout(() => {
        //     getSprintStatusForTesting(cId);
        //   }, 3000);  
        // }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const [tunes, setTunes] = useState([]); 
  // const [token, setToken] = useState(''); 
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);


  useEffect(() => {
    
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
      <DashboardNavbar title={sprintName} />
      <ScrollView
        ref={refContainer}
        onContentSizeChange={() => {
          refContainer != null ? refContainer.current.scrollToEnd() : null;
        }}>
        <View style={StartTestingStyle.container}>
          <TouchableOpacity 
            onPress={() =>{
                navigation.navigate("TestMethodHistory",{
                  sprintId:sprintId
                });
            }}
          >
            <Text
              style={[
                StartTestingStyle.headingHistoryText,
                {fontSize: wp('3.5%')},
              ]}>
              View History
            </Text>
        </TouchableOpacity>

        <Card style={StartTestingStyle.actualResultCard}>
            
                <Card style={StartTestingStyle.actualCardSmallLoadTest}>
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
                <Card style={StartTestingStyle.actualCardSmallLoadTest}>
                  <Text style={StartTestingStyle.headingText}>In Progress</Text>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: wp('5%')}}>
                    {inProgess}
                  </Text>
                </Card>
                <Card style={StartTestingStyle.actualCardSmallLoadTest}>
                  <Text style={StartTestingStyle.headingText}>Failed Error</Text>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: wp('5%')}}>
                    {failedError}
                  </Text>
                </Card>
                <Card style={StartTestingStyle.actualCardSmallLoadTest}>
                  <Text style={StartTestingStyle.headingText}>
                    Total Complete
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: wp('5%')}}>
                    {totalComplete}
                  </Text>
                </Card>
                <Card style={StartTestingStyle.actualCardSmallLoadTest}>
                <Text style={StartTestingStyle.headingText}>
                  Overall Progress
                </Text>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: wp('5%')}}>
                  {overallProgress}%
                </Text>
              </Card>
        </Card>
        

          {testStarted ? (
          startTestLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',marginTop:50
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: wp('3.5%'),
                  color: colors.red,
                }}>
                {testStartedText}
              </Text>
              <ActivityIndicator color={colors.red} style={{marginLeft: 5}} />
            </View>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: wp('3.5%'),
                  color: colors.orange,
                  marginTop:50
                }}>
                {testStartedText}
              </Text>
            </View>
          )
        ) : null}
          {showStopButton ? (
          null
        ) : (
          <View style={[StartTestingStyle.buttonContainer]}>
            <TouchableOpacity
              onPress={() => {
                startSprintTesting(sprintId);
                setShowStopButton(true);
              }}
              style={StartTestingStyle.button}>
              <Text style={StartTestingStyle.buttonText}>
                {startButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default withNavigation(StartLoadTesting);
