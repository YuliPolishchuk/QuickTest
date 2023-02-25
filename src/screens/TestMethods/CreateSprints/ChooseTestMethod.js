import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TestMethod from '../../../assets/styles/TestMethodStyle/TestMethod';
import {Card, Paragraph, Title} from 'react-native-paper';
// import {colors} from '../../../assets/colors/colors';
import DashboardNavbar from '../../../components/Navbars/DashboardNavbar';
import AppContext from '../../../context/AppContext';
import ContainerStyle from '../../../assets/styles/ContainerStyle';
import colors from '../../../assets/colors/colors';

const ChooseTestMethod = ({status, navigation}) => {
  const schedule = navigation.state.params.schedule;
  const load = navigation.state.params.load;
  const auto = navigation.state.params.auto;
  const {storeSelectedTestType} = useContext(AppContext);

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
        <DashboardNavbar title="Create Sprints" />
        <Title style={[TestMethod.label1Bold]}>Choose a Test Method</Title>
        {schedule ? (
          <TouchableOpacity
            onPress={() => {
              storeSelectedTestType('Scheduled Testing');
              navigation.navigate('CreatScheduleTesting');
            }}>
            <Card style={[TestMethod.textCardView]}>
              <Title style={[TestMethod.label2Bold]}>Scheduled Testing</Title>
              <Paragraph style={[TestMethod.label]}>
                You provide all the details related to channels, number of call
                agent call type etc and set a start date. The tests will start
                automatically on the day
              </Paragraph>
            </Card>
          </TouchableOpacity>
        ) : null}
        {load ? (
          <TouchableOpacity
            onPress={() => {
              storeSelectedTestType('Load Testing');
              navigation.navigate('CreateLoadSprint');
            }}>
            <Card style={[TestMethod.textCardView]}>
              <Title style={[TestMethod.label2Bold]}>Load Testing</Title>
              <Paragraph style={[TestMethod.label]}>
                You provide all the details related to channels, number of call
                agent call type etc
              </Paragraph>
            </Card>
          </TouchableOpacity>
        ) : null}
        {auto ? (
          <TouchableOpacity
            onPress={() => {
              storeSelectedTestType('Automatic Testing');
              navigation.navigate('CreateAutomaticTesting');
            }}>
            <Card style={[TestMethod.textCardView]}>
              <Title style={[TestMethod.label2Bold]}>Automated Testing</Title>
              <Paragraph style={[TestMethod.label]}>
                You select channels and test case and perform the testing
                automatically. Get the results.
              </Paragraph>
            </Card>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default withNavigation(ChooseTestMethod);
