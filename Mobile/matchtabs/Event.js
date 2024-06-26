import React, { useState, useCallback } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import BottomBar from '../pages/BottomBar';
import TopBar from '../pages/TopBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel'
import MessageComponent from '../MessageComponent';

function Event({ navigation }) {

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

    

    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.SafeAreaView}>

                <TopBar navigation={navigation} backColor={"#4CAF50"} title={"Etkinliklerim"}></TopBar>

                <View style={{ width: "100%", flex: 1, alignItems: "center", }}>

                    <ScrollView contentContainerStyle={{ alignItems: "center", }} style={{ flex: 1, width: "100%", padding: 5 }} showsVerticalScrollIndicator={false}>

                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>
                        <MessageComponent navigation={navigation} personName={"Necati"} messageDate={"20.02.2024"} backColor={"#4CAF5011"}></MessageComponent>

                    </ScrollView>


                </View>

                <BottomBar selectMenu={1} navigation={navigation}></BottomBar>


            </SafeAreaView >
        </SafeAreaProvider>

    )
};
export default Event;