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

  function Tab1Stack({ navigation }) {
    return (
      <>
        <SafeAreaView>
          <View style={styles.HizmetTipiStateBar}>

            <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 5, padding: 7.5, backgroundColor: "#0386d0", flexDirection: "row", columnGap: 5 }} onPress={() => { navigation.navigate("Requester") }}>
              <Ionicons name="contract" color={"white"} size={20} />
              <Text style={{ color: "white" /* requestType === 1 ? "white" : "#003366" */, fontSize: 13 }}>Başvuran</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 5, padding: 7.5, flexDirection: "row", columnGap: 5 }} onPress={() => { navigation.navigate("Creator") }}>
              <Ionicons name="create-outline" color={"#a6026b"} size={20} />
              <Text style={{ color: "#a6026b"/* requestType === 2 ? "white" : "#003366" */, fontSize: 13 }}>Oluşturan</Text>
            </TouchableOpacity>

          </View>
        </SafeAreaView >

        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen name="İş" component={Jobs} />
          <Tab.Screen name="İlişki" component={Date} />
          <Tab.Screen name="Etkinlik" component={Event} />
        </Tab.Navigator>

      </>

    );
  }

  function Tab2Stack({ navigation }) {
    return (
      <>
        <SafeAreaView>
          <View style={styles.HizmetTipiStateBar}>

            <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 5, padding: 7.5, flexDirection: "row", columnGap: 5 }} onPress={() => { navigation.navigate("Requester") }}>
              <Ionicons name="contract" color={"#0386d0"} size={20} />
              <Text style={{ color: "#0386d0" /* requestType === 1 ? "white" : "#003366" */, fontSize: 13 }}>Başvuran</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 5, padding: 7.5, backgroundColor: "#a6026b", flexDirection: "row", columnGap: 5 }} onPress={() => { navigation.navigate("Creator") }}>
              <Ionicons name="create-outline" color={"white"} size={20} />
              <Text style={{ color: "white"/* requestType === 2 ? "white" : "#003366" */, fontSize: 13 }}>Oluşturan</Text>
            </TouchableOpacity>

          </View>
        </SafeAreaView>

        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen name="İş" component={Jobs} />
          <Tab.Screen name="İlişki" component={Date} />
          <Tab.Screen name="Etkinlik" component={Event} />
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
        <Tab.Screen name='TabCreator' component={Tab2Stack}></Tab.Screen>
      </Tab.Navigator>
    )
  }

  return (
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
            <Stack.Screen name="Requester" component={Tab1Stack} />
            <Stack.Screen name="Creator" component={Tab2Stack} />
            <Stack.Screen name="Matches" component={Matches} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Search" component={TabSearchStack} />

          </Stack.Navigator>



        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>


  )

}
