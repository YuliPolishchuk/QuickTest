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

const StartTesting = ({navigation}) => {
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
  let testingIsCompleted = false;
  const startSprintTesting = (sprintId) => {
    setTestStartedText('');
    setStartTestLoading(true);
    setTestStartedText('Testing Started');
    // console.log(sprintId);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', `${baseUrl}/sprint/runSprint?sprintId=${sprintId}`, {
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
          // refreshSprintTesting(sprintId, resp.result);
          // getListMessageDataOfTesting(resp.result);
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
      .fetch('GET', `${baseUrl}/sprint/getSprintStatus?clientId=${cId}`, {
        Authorization: `${token}`,tokenType:'aws',
      })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (resp.result == 'completed') {
          
          if(testingIsCompleted==false) {
              getSprintStatusForTesting(cId);
              refreshSprintTesting(sprintId, cId);
              getListMessageDataOfTesting(cId);
              testingIsCompleted = true;
          }
          setShowStopButton(false);
          setShowStartButton(true);
          setStartButtonText('Start Again');
          setStartTestLoading(false);
          setTestStartedText('Testing Completed');
        } else {
          setTimeout(() => {
            getSprintStatusForTesting(cId);
            refreshSprintTesting(sprintId, cId);
            getListMessageDataOfTesting(cId);
          }, 6000);  
        }
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListMessageDataOfTesting = (cId) => {
    // console.log(sprintStopped);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        `${baseUrl}/autopilotMessage/listMessageData?customerId=${cId}`,
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

  const stopSprintTesting = (sprintId, clientId) => {
    // console.log(sprintId + clientId);
    setStopTestLoading(true);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        `${baseUrl}/sprint/terminateSprint?sprintId=${sprintId}&clientId=${clientId}`,
        {Authorization: `${token}`,tokenType:'aws'},
      )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setShowStopButton(false);
        setShowStartButton(true);
        setStopTestLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshSprintTesting = (sId, cId) => {
    // console.log(sprintId, clientId);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        `${baseUrl}/sprint/refreshSprintClientResponse?sprintId=${sId}&clientId=${cId}`,
        {Authorization: `${token}`,tokenType:'aws'},
      )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setTotalPlanned(resp.TotalPlanned);
        setInProgess(resp.Active);
        setFailedError(0);
        setTotalComplete(resp.Finished);
        setOverallProgress(((resp.Finished/resp.TotalPlanned) * 100).toFixed(2));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [tunes, setTunes] = useState([]); 
  // const [token, setToken] = useState(''); 
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // const startDownload = () => {
  //   // let {url, name} = tunes[currentTrackIndex];
  //   RNFetchBlob.config({
  //     fileCache: true,
  //     appendExt: 'mp3',
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       notification: true,
  //       // title: name,
  //       path: RNFetchBlob.fs.dirs.DownloadDir + `${name}`, // Android platform
  //       description: 'Downloading the file',
  //     },
  //   })
  //     .fetch('GET', 
  //     `${baseUrl}/autopilotMessage/getAudio?customerId=${cId}`,
  //     {Authorization: `${token}`,tokenType:'aws'},
  //     )
  //     .then(res => {
  //       console.log('res', res);
  //       console.log('The file is save to ', res.path());
  //     });
  // };

  useEffect(() => {
    // startDownload();
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
                <Card style={StartTestingStyle.actualCardSmall}>
                <Text style={StartTestingStyle.headingText}>
                  Overall Progress
                </Text>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: wp('5%')}}>
                  {overallProgress}%
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

          {testStarted ? (
          startTestLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
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
                }}>
                {testStartedText}
              </Text>
            </View>
          )
        ) : null}
          {showStopButton ? (
          <View
            style={[
              StartTestingStyle.buttonContainer,
              {borderColor: colors.red},
            ]}>
            <TouchableOpacity
              // disabled={true}
              onPress={() => {
                stopSprintTesting(sprintId, clientIdForSprintTest);
              }}
              style={[StartTestingStyle.button, {backgroundColor: colors.red}]}>
              <View style={{flexDirection: 'row'}}>
                <Text style={StartTestingStyle.buttonText}>Stop Test</Text>
                {stopTestLoading ? (
                  <ActivityIndicator
                    color={colors.white}
                    style={{marginLeft: 5}}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
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

export default withNavigation(StartTesting);
