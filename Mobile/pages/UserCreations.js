import React, { useState, useCallback, Component, useEffect } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions, LayoutAnimation, FlatList, Button, Alert } from 'react-native'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import BottomBar from '../pages/BottomBar';
import TopBar from '../pages/TopBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel'
import MessageComponent from '../MessageComponent';
import Accordion from 'react-native-collapsible/Accordion';
import { Tag } from 'react-native-btr';
import { Dialog } from 'react-native-ui-lib';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import mime from 'mime';


function UserCreations({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);
    const [profileType, setProfileType] = useState(0);
    const [galleryModalVisible, setGalleryModalVisible] = useState(false);
    const [galleryModalVisible2, setGalleryModalVisible2] = useState(false);
    const [galleryModalVisible3, setGalleryModalVisible3] = useState(false);
    /* const [avatarUrl, setAvatarUrl] = useState(null); */

    const { heightScreen, widthScreen } = Dimensions.get("window");

    const screenWidth = Dimensions.get('window').width;

    const insets = useSafeAreaInsets();
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


    const API_URL = 'https://nexusmain.onrender.com/update-profile';

    // API_PROFILE_DETAILS_URL LINK IS SUBJECT TO CHANGE 
    const API_PROFILE_DETAILS_URL = 'https://nexusmain.onrender.com/api/user';
    const [userToken, setUserToken] = useState()
    const [userId, setUserId] = useState()
    const [loggedInUserJobInfo, setloggedInUserJobInfo] = useState({})
    const [loggedInUserJobTags, setloggedInUserJobTags] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);


    const getData = async () => {
        try {
            const userTokenValue = await AsyncStorage.getItem('usertoken');
            const userIdValue = await AsyncStorage.getItem('userid');
            if (userTokenValue !== null && userIdValue !== null) {
                setUserToken(userTokenValue)
                setUserId(userIdValue)
            }
        } catch (e) {
            // error reading value
        }
    };

    const getLoggedInUser = async () => {
        try {
            if (userToken !== null && userId !== null) {
                const response = await fetch(`${API_PROFILE_DETAILS_URL}/${userId}/job-profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}` // Corrected Authorization header
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.status) {
                    setloggedInUserJobInfo(data.jobProfile);
                    setloggedInUserJobTags(data.jobProfile.tagsJob);
                    setSelectedImage(data.jobProfile.avatarJob);
                }
            }
        } catch (e) {
            console.error('Error fetching profile details:', e);
        }
    };


    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (userToken && userId) {
            getLoggedInUser();
        }

    }, [userToken, userId]);


    return (
        <SafeAreaView style={[styles.SafeAreaView]}>

            <TopBar title={"Oluşturduklarım"} titleFont={"Montserrat-SemiBold"} navigation={navigation} backColor={"#3F51B5"}></TopBar>

            <View style={{ width: "100%", flex: 1, alignItems: "center" }}>

             


            </View>

            <BottomBar selectMenu={10} navigation={navigation}></BottomBar>

        </SafeAreaView>

    )
}

export default UserCreations
