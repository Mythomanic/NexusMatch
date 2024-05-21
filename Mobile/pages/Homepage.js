import React, { useState, useCallback } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Homepage({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);

    const screenWidth = Dimensions.get('window').width;

    const [fontsLoaded] = useFonts({
        'Kaushan': require('../assets/fonts/KaushanScript-Regular.ttf'),
        "Allura": require('../assets/fonts/Allura-Regular.ttf'),
        "Montserrat-Black": require('../assets/fonts/Montserrat-Black.ttf'),
        "Montserrat-BlackItalic": require('../assets/fonts/Montserrat-BlackItalic.ttf'),
        "Montserrat-Bold": require('../assets/fonts/Montserrat-Bold.ttf'),
        "Montserrat-BoldItalic": require('../assets/fonts/Montserrat-BoldItalic.ttf'),
        "Montserrat-Italic": require('../assets/fonts/Montserrat-Italic.ttf'),
        "Montserrat-Light": require('../assets/fonts/Montserrat-Light.ttf'),
        "Montserrat-LightItalic": require('../assets/fonts/Montserrat-LightItalic.ttf'),
        "Montserrat-Medium": require('../assets/fonts/Montserrat-Medium.ttf'),
        "Montserrat-MediumItalic": require('../assets/fonts/Montserrat-MediumItalic.ttf'),
        "Montserrat-Regular": require('../assets/fonts/Montserrat-Regular.ttf'),
        "Montserrat-Thin": require('../assets/fonts/Montserrat-Thin.ttf'),
        "Montserrat-SemiBold": require('../assets/fonts/Montserrat-SemiBold.ttf'),
        "Montserrat-SemiBoldItalic": require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
        "Montserrat-ThinItalic": require('../assets/fonts/Montserrat-ThinItalic.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    const data = [0, 1, 2];

    /*   const imageLinkArray = [
          {
              link: require("../img/kız.jpg")
          },
          {
              link: require("../img/coworkimg.jpg")
          },
          {
              link: require("../img/nexuslogo.png")
          }
      ]
  
      const imageLinkArray = [
          {
              link: require("img/coworkimg.png")
          },
          {
              link: require("img/kız.jpg")
          },
          {
              link: require("img/nexuslogo.png")
          }
      ] */

    const renderCarouselItem = ({ item, index, imagelink }) => {
        return (
            <>

                <TouchableOpacity activeOpacity={0.5} style={[styles.childView, { width: screenWidth }]}>

                    <View style={{ flex: 3, alignItems: "center", justifyContent: "center", height: "100%", borderRadius: 10, paddingVertical: 10 }}>
                        {/* <Image
                            source={require("../img/kız.jpg")}
                            style={{ width: "100%", height: "100%", borderRadius: 10, alignItems: "center", justifyContent: "center" }}
                        /> */}
                        <View style={{ width: "100%", height: "100%", borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>

                        </View>


                    </View>

                    <View style={{ flex: 3, alignItems: "center", justifyContent: "center", height: "100%", }}>
                        <Text style={[styles.text, { fontFamily: "Montserrat-Bold", textAlign: 'center' }]}>Recommended Event </Text>
                        <Text numberOfLines={5} style={{ fontSize: 12, textAlign: 'center', color: "#3f3f3f" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Duis finibus velit in orci fringilla aliquet.
                            Ut aliquet semper efficitur. In viverra varius. </Text>
                    </View>

                </TouchableOpacity>

            </>

        );
    };

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('usertoken');
          if (value !== null) {
            // value previously stored
            console.log(value)
          }
        } catch (e) {
          // error reading value
        }
      };

    return (

        <SafeAreaView style={styles.SafeAreaView}>

            <TopBar title={"NexusMatch"} titleFont={"Montserrat-SemiBold"} navigation={navigation} backColor={"#3F51B5"}></TopBar>

            <View style={{ width: "100%", flex: 1, alignItems: "center" }}>

                <View style={styles.SearchBarHomepage}>
                    <View style={{ position: "absolute", width: 35, alignItems: "center", justifyContent: "center", top: 0, bottom: 0, left: 0, zIndex: 2, marginHorizontal: 15 }}>
                        <Fontisto size={20} name={"search"} />
                    </View>

                    <TextInput placeholderTextColor={"black"} style={{ width: "100%", borderRadius: 100, backgroundColor: "#9f9f9faa", fontSize: 11, minHeight: 35, paddingHorizontal: 35 }} placeholder='Arama Yapın...' />
                </View>


                <View style={styles.ScrollHolderViewHomepage}>

                    <Carousel
                        data={data}
                        renderItem={renderCarouselItem}
                        itemWidth={screenWidth}
                        autoplay
                        autoplayDelay={4500}
                    />
                </View>
{/* 
                <TouchableOpacity onPress={getData}><Text fontSize="xs">TESTTOKENBUTON</Text>
                </TouchableOpacity> */}

                <View style={styles.MainCategoriesContainer}>

                    <TouchableOpacity onPress={() => { navigation.navigate("JobList") }} activeOpacity={0.65} style={styles.TouchableMainCategory}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#3F51B5dd", "#03A9F4bb"]} style={styles.MainCategories}>

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Image source={require("../jobwork.jpg")} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                            </View>

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", rowGap: 10 }}>
                                <MaterialIcons name="business-center" size={28} color={"white"}></MaterialIcons>

                                <Text style={{ fontFamily: "Montserrat-BoldItalic", color: "white", fontSize: 17, textAlign: "center" }} fontSize="xs">İŞ FIRSATLARI</Text>
                            </View>



                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("DateList") }} activeOpacity={0.65} style={styles.TouchableMainCategory}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#FF6B6B", "#FFD166"]} style={styles.MainCategories}>

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", rowGap: 10 }}>
                                <AntDesign name="heart" size={28} color={"white"}></AntDesign>

                                <Text style={{ fontFamily: "Montserrat-BoldItalic", color: "white", fontSize: 17, }} fontSize="xs">İLİŞKİLER</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Image source={require("../heart.jpg")} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                            </View>

                        </LinearGradient>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => { navigation.navigate("EventList") }} activeOpacity={0.65} style={styles.TouchableMainCategory}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#4CAF50", "#8BC34A"]} style={styles.MainCategories}>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Image source={require("../event.jpg")} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                            </View>

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", rowGap: 10 }}>
                                <FontAwesome5 name="calendar-alt" size={28} color={"white"}></FontAwesome5>

                                <Text style={{ fontFamily: "Montserrat-BoldItalic", color: "white", fontSize: 17, }} fontSize="xs">ETKİNLİKLER</Text>
                            </View>

                        </LinearGradient>
                    </TouchableOpacity>

                </View>




            </View>





            <BottomBar selectMenu={0} navigation={navigation}></BottomBar>
        </SafeAreaView >
    )
};
export default Homepage;