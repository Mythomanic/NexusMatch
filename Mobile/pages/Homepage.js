import React, { useState, useCallback } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native'
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

    const handleLogout = () => {
        Alert.alert(
            'Logout Confirmation',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => navigation.navigate("Login"),
                },
            ],
            { cancelable: true }
        );
    };

    return (

        <SafeAreaView style={[styles.SafeAreaView]}>

            {/* <TopBar title={"NexusMatch"} titleFont={"Montserrat-SemiBold"} navigation={navigation} backColor={"#3F51B5"}></TopBar> */}
            <View style={[styles.HomepageTopbar, { backgroundColor: "#3F51B5" }]}>

                <TouchableOpacity style={{ position: "absolute", left: 0, paddingLeft: 20 }} onPress={handleLogout}>
                    <Ionicons name="arrow-back-circle-outline" color={"white"} size={37} />
                </TouchableOpacity>

                <View style={{}}>
                    <Text style={{ color: "white", fontSize: 17, fontFamily: "Montserrat-SemiBold" }} fontSize="xs">NexusMatch</Text>
                </View>



            </View>

            <View style={{ width: "100%", flex: 1, alignItems: "center" }}>



                {/*   <View style={styles.ScrollHolderViewHomepage}>

                   
                </View> */}
                {/* 
                <TouchableOpacity onPress={getData}><Text fontSize="xs">TESTTOKENBUTON</Text>
                </TouchableOpacity> */}

                <View style={styles.MainCategoriesContainer}>

                    <TouchableOpacity onPress={() => { navigation.navigate("UserCreations") }} activeOpacity={0.65} style={styles.TouchableMainCategory}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#03A9F477", "#8BC34A44"]} style={styles.MainCategories}>

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", rowGap: 5 }}>
                                <FontAwesome5 name="link" size={28} color={"white"}></FontAwesome5>

                                <Text style={{ fontFamily: "Montserrat-BoldItalic", color: "white", fontSize: 17, textAlign: "center", }} fontSize="xs">OLUŞTURDUĞUM AKTİVİTELER</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Image source={require("../connections.jpg")} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                            </View>

                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("JobList") }} activeOpacity={0.65} style={styles.TouchableMainCategory}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#3F51B5dd", "#03A9F4bb"]} style={styles.MainCategories}>

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Image source={require("../jobwork.jpg")} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                            </View>

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", rowGap: 5 }}>
                                <MaterialIcons name="business-center" size={28} color={"white"}></MaterialIcons>

                                <Text style={{ fontFamily: "Montserrat-BoldItalic", color: "white", fontSize: 17, textAlign: "center" }} fontSize="xs">İŞ FIRSATLARI</Text>
                            </View>



                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("DateList") }} activeOpacity={0.65} style={styles.TouchableMainCategory}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#FF6B6B", "#FFD166"]} style={styles.MainCategories}>

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", rowGap: 5 }}>
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

                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", rowGap: 5 }}>
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