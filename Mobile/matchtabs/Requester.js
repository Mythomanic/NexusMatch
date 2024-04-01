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

function Requester({ navigation }) {

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

                <TopBar navigation={navigation}></TopBar>

                <View style={styles.HizmetTipiStateBar}>

                   {/*  <TouchableOpacity style={{ width: "35%", alignItems: "center", justifyContent: "center", borderRadius: 5, backgroundColor: requestType === 1 ? "#0386d0" : "white", padding: 2 }} onPress={() => { [setRequestType(1), console.log(requestType)] }}>
                        <Text style={{ color: requestType === 1 ? "white" : "#003366", fontSize: 13 }}>İstek Atan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: "35%", alignItems: "center", justifyContent: "center", borderRadius: 5, backgroundColor: requestType === 2 ? "#a6026b" : "white", padding: 2 }} onPress={() => { [setRequestType(2), console.log(requestType)] }}>
                        <Text style={{ color: requestType === 2 ? "white" : "#003366", fontSize: 13 }}>İstek Açan</Text>
                    </TouchableOpacity>
 */}
                </View>

                <BottomBar selectMenu={1} navigation={navigation}></BottomBar>


            </SafeAreaView >
        </SafeAreaProvider>


    )
};
export default Requester;