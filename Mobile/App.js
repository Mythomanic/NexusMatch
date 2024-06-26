import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignUp';
import Matches from './pages/Matches';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Jobs from './matchtabs/Jobs';
import Event from './matchtabs/Event';
import Date from './matchtabs/Date';
import Creator from './matchtabs/Creator';
import Requester from './matchtabs/Requester';
import styles from './App.styles';
import { useState } from 'react';
import { StatusBar, Platform, View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import { PaperProvider } from 'react-native-paper';
import SearchJobs from './searchtabs/SearchJobs';
import SearchEvent from './searchtabs/SearchEvent';
import SearchDate from './searchtabs/SearchDate';
import Search from './pages/Search';
import Joblist from './pages/JobList';
import DateList from './pages/DateList';
import EventList from './pages/EventList';
import JobList from './pages/JobList';
import JobsRequester from './matchtabs/JobsRequester';
import DateRequester from './matchtabs/DateRequester';
import EventRequester from './matchtabs/EventRequester';
import MessageScreen from './pages/MessageScreen';
import Create from './pages/Create';
import { Provider } from 'jotai';
import ProfileSettings from './pages/ProfileSettings';
import UserCreations from './pages/UserCreations';
import UserCreatedJobs from './pages/UserCreatedJobs';
import JobLikeDislikeUsers from './pages/JobLikeDislikeUsers';

export default function App({ navigation }) {

  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();
  const StatusBarHeight = StatusBar.currentHeight;
  const PlatformType = Platform.OS

  const [requestType, setRequestType] = useState(1);

  const MyTabBar = ({ navigation, state }) => {

    const tabColors = ['#3F51B5', '#FF6B6B', '#4CAF50'];

    /* #3F51B5dd", "#03A9F4bb #FF6B6B", "#FFD166 #4CAF50", "#8BC34A */

    return (
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", columnGap: 5, margin: 5 }}>
        {state.routes.map((route, index) => (
          <TouchableOpacity key={route.key} onPress={() => navigation.navigate(route.name)}
            style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 5, backgroundColor: tabColors[index], borderRadius: 5 }}>
            <Text style={{ color: "white" }}>{route.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const MyTabBarSearch = ({ navigation, state }) => {

    const tabColors = ['#3F51B5', '#FF6B6B', '#4CAF50'];

    /* #3F51B5dd", "#03A9F4bb #FF6B6B", "#FFD166 #4CAF50", "#8BC34A */

    return (
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", columnGap: 5, margin: 5 }}>
        {state.routes.map((route, index) => (
          <TouchableOpacity key={route.key} onPress={() => navigation.navigate(route.name)}
            style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 5, backgroundColor: tabColors[index], borderRadius: 5 }}>
            <Text style={{ color: "white" }}>{route.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

 /*  function Tab1Stack({ navigation }) {
    return (
      <>
        <StatusBar></StatusBar>

        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen name="İş" component={Jobs} />
          <Tab.Screen name="İlişki" component={Date} />
          <Tab.Screen name="Etkinlik" component={Event} />
        </Tab.Navigator>

      </>

    );
  } */

  function Tab2StackActivities({ navigation }) {
    return (
      <>
        <StatusBar></StatusBar>

        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen name="İş" component={JobsRequester} />
          <Tab.Screen name="İlişki" component={DateRequester} />
          <Tab.Screen name="Etkinlik" component={EventRequester} />
        </Tab.Navigator>
      </>
    );
  }


  function TabSearchStack({ navigation }) {
    return (
      <>
        <StatusBar></StatusBar>
        <Tab.Navigator tabBar={props => <MyTabBarSearch {...props} />}>
          <Tab.Screen name="İş" component={SearchJobs} />
          <Tab.Screen name="İlişki" component={SearchDate} />
          <Tab.Screen name="Etkinlik" component={SearchEvent} />
        </Tab.Navigator>

      </>
    );
  }

  function TabMerger() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='TabRequester' component={Tab1Stack}></Tab.Screen>
      </Tab.Navigator>
    )
  }

  return (
    <Provider>
      <PaperProvider>
        <SafeAreaProvider>

          <NavigationContainer>
            <Stack.Navigator screenOptions={
              {
                headerShown: false,
                cardStyle: {} // Set the background color here
              }
            } initialRouteName='SplashScreen'>

              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Homepage" component={Homepage} />
              {/* <Stack.Screen name="Requester" component={Tab1Stack} /> */}
              <Stack.Screen name="Matches" component={Matches} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="Search" component={TabSearchStack} />
              <Stack.Screen name="JobList" component={JobList} />
              <Stack.Screen name="DateList" component={DateList} />
              <Stack.Screen name="EventList" component={EventList} />
              <Stack.Screen name="MessageScreen" component={MessageScreen} />
              <Stack.Screen name="Create" component={Create} />
              <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
              <Stack.Screen name="UserCreations" component={Tab2StackActivities} />
              <Stack.Screen name="UserCreatedJobs" component={UserCreatedJobs} />
              <Stack.Screen name="JobLikeDislikeUsers" component={JobLikeDislikeUsers} />
              <Stack.Screen name="Jobs" component={Jobs} />

            </Stack.Navigator>



          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>


  )

}
