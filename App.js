import React, {useState, useEffect} from 'react';
import {Image, View, Text, Modal} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {
  configureFonts,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginRegister from './src/screens/Auth/LoginRegister';
import GettingStarted from './src/screens/GettingStarted/GettingStarted';
import Services from './src/screens/Services/Services';
import Dashboard from './src/screens/Dashboard/Dashboard';
import TestMethods from './src/screens/TestMethods/TestMethods';
import CreateLoadSprint from './src/screens/TestMethods/CreateSprints/CreateLoadSprint';
import ChooseTestMethod from './src/screens/TestMethods/CreateSprints/ChooseTestMethod';
import CreatScheduleTesting from './src/screens/TestMethods/CreateSprints/CreatScheduleTesting';
import CreateScript from './src/screens/More/Scripts/CreateScript';
import Verification from './src/screens/Auth/Verification';
import DashboardStyles from './src/assets/styles/DashboardStyles/DashboardStyles';
import ScriptListScreen from './src/screens/More/Scripts/ScriptListScreen';
import Reports from './src/screens/More/Reports/Reports';
import ServiceName from './src/screens/Services/CreateService/ServiceName';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import CustomDrawerComponent from './src/components/CustomDrawerComponent';
import UserProfile from './src/screens/Profile/UserProfile';
import Membership from './src/screens/Membership/Membership';
import ChangePassword from './src/screens/ChangePassword/ChangePassword';
import OrderHistory from './src/screens/OrderHistory/OrderHistory';
import TestMethod from './src/assets/styles/TestMethodStyle/TestMethod';
import { MenuProvider } from 'react-native-popup-menu';
import NotificationScreen from './src/screens/Notifications/NotificationScreen';
import AppContext, { AppProvider } from './src/context/AppContext';
import ServiceNameEdit from './src/screens/Services/CreateService/ServiceNameEdit';
import StartTesting from './src/screens/TestMethods/CreateSprints/StartTesting';
import EditScript from './src/screens/More/Scripts/EditScript';
import FakeSplashScreen from './src/screens/Auth/SplashScreen';
import SplashScreen from 'react-native-splash-screen';
import RecoveryEmail from './src/screens/RecoveryPassword/RecoveryEmail';
import ResetPassword from './src/screens/RecoveryPassword/ResetPassword';
import TestMethodHistory from './src/screens/TestMethods/TestMethodHistory';
import TestingHistoryDetail from './src/screens/TestMethods/CreateSprints/TestingHistoryDetail';
import EditScheduleTesting from './src/screens/TestMethods/CreateSprints/EditScheduleTesting';
import MembershipPaymentScreen from './src/screens/Payment/MembershipPaymentScreen';
import CallDialing from './src/screens/Callings/CallDialing';
import RNCallKeep from 'react-native-callkeep';
import EditLoadTesting from './src/screens/TestMethods/CreateSprints/EditLoadTesting';
import StartLoadTesting from './src/screens/TestMethods/CreateSprints/StartLoadTesting';
import CreateAutomaticTesting from './src/screens/TestMethods/CreateSprints/CreateAutomaticTesting';
import EditAutomaticTesting from './src/screens/TestMethods/CreateSprints/EditAutomaticTesting';

const options = {
  ios: {
    appName: 'Quicktest',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'Quicktest needs to access your phone',
    cancelButton: 'Cancel',
    okButton: 'ok',
    // Required to get audio in background when using Android 11
    // foregroundService: {
    //   channelId: 'com.quicktest',
    //   channelName: 'Foreground service for my app',
    //   notificationTitle: 'Quicktest call is ongoing.',
    // }, 
  }
};




const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const TestMethodStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      headerShown: false,
    },
  },
  TestMethod: {
    screen: TestMethods,
    navigationOptions: {
      headerShown: false,
    },
  },
  CreateLoadSprint: {
    screen: CreateLoadSprint,
    navigationOptions: {
      headerShown: false,
    },
  },
  
  CreatScheduleTesting: {
    screen: CreatScheduleTesting,
    navigationOptions: {
      headerShown: false,
    },
  },
  CreateAutomaticTesting: {
    screen: CreateAutomaticTesting,
    navigationOptions: {
      headerShown: false,
    },
  },
  EditAutomaticTesting: {
    screen: EditAutomaticTesting,
    navigationOptions: {
      headerShown: false,
    },
  },



  EditScheduleTesting: {
    screen: EditScheduleTesting,
    navigationOptions: {
      headerShown: false,
    },
  },

  EditLoadTesting: {
    screen: EditLoadTesting,
    navigationOptions: {
      headerShown: false,
    },
  },

  StartTesting: {
    screen: StartTesting,
    navigationOptions: {
      headerShown: false,
    },
  },

  StartLoadTesting: {
    screen: StartLoadTesting,
    navigationOptions: {
      headerShown: false,
    },
  },

  TestMethodHistory: {
    screen: TestMethodHistory,
    navigationOptions: {
      headerShown: false,
    },
  },
  TestingHistoryDetail: {
    screen: TestingHistoryDetail,
    navigationOptions: {
      headerShown: false,
    },
  },
  

  ChooseTestMethod: {
    screen: ChooseTestMethod,
    navigationOptions: {
      headerShown: false,
    },
  },
  NotificationScreen:{
    screen: NotificationScreen,
    navigationOptions: {
      headerShown: false,
    },
  }
});
const ServiceStack = createStackNavigator({
  Service: {
    screen: Services,
    navigationOptions: {
      headerShown: false,
    },
  },
  ServiceName: {
    screen: ServiceName,
    navigationOptions: {
      headerShown: false,
    },
  },
  ServiceNameEdit: {
    screen: ServiceNameEdit,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const ScriptStack = createStackNavigator({
  ScriptsList: {
    screen: ScriptListScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
   
  CreateScript: {
    screen: CreateScript,
    navigationOptions: {
      headerShown: false,
    },
  },
  EditScript: {
    screen: EditScript,
    navigationOptions: {
      headerShown: false,
    },
  },

});
const ReportStack = createStackNavigator({

  Report: {
    screen: Reports,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardStack,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name="view-dashboard-outline"
            color={tintColor}
            size={25}
          />
        ),
        tabBarOnPress: (scene, jumpToIndex) => {
          navigation.replace('Dashboard');
        },
      }),
    },
    TestMethod: {
      screen: TestMethodStack,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Test Method',
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('./src/assets/images/testmethod.png')}
            style={{tintColor: tintColor, height: 23, width: 27}}
          />
        ),

        tabBarOnPress: (scene, jumpToIndex) => {
          navigation.replace('TestMethod');
        },
      }),
    },
    Service: {
      screen: ServiceStack,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Services',
        tabBarIcon: ({tintColor}) => (
          <Ionicons name="settings-outline" color={tintColor} size={25} />
        ),
        tabBarOnPress: (scene, jumpToIndex) => {
          navigation.replace('Service');
        },
      }),
    },
    Script: {
      screen: ScriptStack,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Script',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons name="script-text-outline" color={tintColor} size={25} />
        ),
        tabBarOnPress: (scene, jumpToIndex) => {
          navigation.replace('ScriptsList');
        },
      }),
    },
    Report: {
      screen: ReportStack,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Report',
        tabBarIcon: ({tintColor}) => (
          <MaterialIcons
            name="description"
            color={tintColor}
            size={25}
          />
        ),
        tabBarOnPress: (scene, jumpToIndex) => {
          navigation.replace('Report');
        },
      }),
    },
  },
  {
    headerShown: false,
    tabBarOptions: {
      style: {
        backgroundColor: '#FFFFFF',
        borderTopColor: '#FFFFFF',
      },
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#c8cbcd',
      showLabel: true,
      activeBackgroundColor: '#BC3664',
    },
  },
);

const DrawerNavigatorForDashBoard = createDrawerNavigator(
  {
    Dashboard: {
      screen: TabNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        headerShown: false,
      },
    },
    CallDialing: {
      screen: CallDialing,
      navigationOptions: {
        headerShown: false,
      },
    },
    Membership: {
      screen: Membership,
      navigationOptions: {
        headerShown: false,
      },
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
        headerShown: false,
      },
    },
    Service: {
      screen: Services,
      navigationOptions: {
        headerShown: false,
      },
    },
    OrderHistory: {
      screen: OrderHistory,
      navigationOptions: {
        headerShown: false,
      },
    },
    ServiceName: {
      screen: ServiceName,
      navigationOptions: {
        headerShown: false,
      },
    },
    MembershipPaymentScreen: {
      screen: MembershipPaymentScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    contentComponent: CustomDrawerComponent,
    // initialRouteName: 'Service',
    contentOptions: {
      activeTintColor: 'red',
    },
  },
);




const AppNavigator = createStackNavigator(
  {
    FakeSplashScreen: {
      screen: FakeSplashScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    GettingStarted: {
      screen: GettingStarted,
      navigationOptions: {
        headerShown: false,
      },
    },
    LoginRegister: {
      screen: LoginRegister,
      navigationOptions: {
        headerShown: false,
      },
    },

    RecoveryEmail: {
      screen: RecoveryEmail,
      navigationOptions: {
        headerShown: false,
      }
    },

    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        headerShown: false,
      }
    },
    Membership: {
      screen: Membership,
      navigationOptions: {
        headerShown: false,
      },
    },

    Dashboard: {
      screen: DrawerNavigatorForDashBoard,
      navigationOptions: {
        headerShown: false,
      },
    },
    Verification: {
      screen: Verification,
      navigationOptions: {
        headerShown: false,
      },
    },

    TestMethod: {
      screen: TestMethods,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    headerShown: false,
    // initialRouteName: 'Dashboard',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Poppins-Regular',
      },
      bold: {
        fontFamily: 'Poppins-Bold',
      },
      medium: {
        fontFamily: 'Poppins-Medium',
      },
      semibold: {
        fontFamily: 'Poppins-SemiBold',
      },
      light: {
        fontFamily: 'Poppins-Light',
      },
    },
  };
  const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
    mode:'adaptive',
  };

  

  useEffect(()=>{
    SplashScreen.hide();
    RNCallKeep.setup(options).then(accepted => {
      console.log("Call keep is setup.")
    });
  },[]);

  return (
    <AppProvider>
    <MenuProvider>
    <PaperProvider
      settings={{
        icon: (props) => <FontAwesome {...props} />,
      }}
      theme={theme}
      >
      <AppContainer />
    </PaperProvider>
    </MenuProvider>
    </AppProvider>
  );
};

export default App;
