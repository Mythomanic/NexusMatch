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
import Collapsible from 'react-native-collapsible';
import JobListItem from './JobListItemComponent';
import { Swiper } from 'react-native-deck-swiper';

import { useAtom } from 'jotai';
import { refreshAtom } from '../JotaiAtoms';
import DateListItem from './DateListItemComponent';
import EventListItem from './EventListItemComponent';

function DateList({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);

    const screenWidth = Dimensions.get('window').width;

    const [refreshKey, setRefreshKey] = useAtom(refreshAtom); // State to manage the refresh key

    const handleRefresh = () => {
        // Update the refresh key to trigger a re-render of the Swiper component
        setRefreshKey(prevKey => prevKey + 1);
    };


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

        <SafeAreaView style={styles.SafeAreaView}>

            <TopBar title={"Etkinlikler"} titleFont={"Montserrat-SemiBold"} navigation={navigation} backColor={"#4CAF50"}></TopBar>

            <View style={{ width: "100%", flex: 1, alignItems: "center", }}>

                <View style={styles.SearchBarCategories}>
                    <TouchableOpacity style={{ width: 35, alignItems: "center", justifyContent: "center", flexDirection: "row", columnGap: 7 }}>
                        <Ionicons size={21} name={"filter"} />
                        <Text style={{ fontSize: 13}}>Filter</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", columnGap: 7 }} onPress={handleRefresh}>
                        <Text style={{ fontSize: 13}}>Refresh</Text>
                        <FontAwesome size={18} name="refresh"></FontAwesome>

                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, width: "100%", }}>

                    <EventListItem navigation={navigation} />
                </View>

            </View>

        </SafeAreaView>

    )

}

export default DateList