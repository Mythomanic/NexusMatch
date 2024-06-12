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
import { useAtom } from 'jotai';
import { tagRefreshAtom } from '../JotaiAtoms';

function Profile({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);
    const [profileType, setProfileType] = useState(0);
    const [galleryModalVisible, setGalleryModalVisible] = useState(false);
    const [galleryModalVisible2, setGalleryModalVisible2] = useState(false);
    const [galleryModalVisible3, setGalleryModalVisible3] = useState(false);
    const [tagRefreshKey, setTagRefreshKey] = useAtom(tagRefreshAtom);
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
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedImageDate, setSelectedImageDate] = useState("");
    const [selectedImageEvent, setSelectedImageEvent] = useState("");


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
                    setSelectedImage("https://nexusmain.onrender.com/storage/avatars/" + data.jobProfile.avatarJob);
                    //setSelectedImageDate("https://nexusmain.onrender.com/storage/avatars/" + data.dateProfile.avatarDate);
                    //setSelectedImageEvent("https://nexusmain.onrender.com/storage/avatars/" + data.eventProfile.avatarEvent);
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

    const handleImagePickAndUpload = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri;
                const newImageUri = "file:///" + imageUri.split("file:/").join("");

                setSelectedImage(newImageUri);

                const formData = new FormData();
                formData.append('avatarJob', {
                    uri: newImageUri,
                    type: mime.getType(newImageUri),
                    name: newImageUri.split("/").pop(),
                });

                const response = await axios.post(`https://nexusmain.onrender.com/api/user/${userId}/update-avatar-job`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${userToken}`
                    },
                });

                if (!response.data.status) {
                    Alert.alert('Error', 'Failed to update profile.');
                    console.log(response.data.status);
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again later.');
        }
    };

    const handleImagePickAndUploadDate = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri;
                const newImageUri = "file:///" + imageUri.split("file:/").join("");

                setSelectedImage(newImageUri);

                const formData = new FormData();
                formData.append('avatarJob', {
                    uri: newImageUri,
                    type: mime.getType(newImageUri),
                    name: newImageUri.split("/").pop(),
                });


                const response = await axios.post(`https://nexusmain.onrender.com/api/user/${userId}/update-avatar-job`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${userToken}`
                    },
                });

                if (!response.data.status) {
                    Alert.alert('Error', 'Failed to update profile.');
                    console.log(response.data.status);
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again later.');
        }
    };

    const handleImagePickAndUploadEvent = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });


            if (!result.canceled && result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri;
                const newImageUri = "file:///" + imageUri.split("file:/").join("");

                setSelectedImage(newImageUri);

                const formData = new FormData();
                formData.append('avatarJob', {
                    uri: newImageUri,
                    type: mime.getType(newImageUri),
                    name: newImageUri.split("/").pop(),
                });


                const response = await axios.post(`https://nexusmain.onrender.com/api/user/${userId}/update-avatar-job`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${userToken}`
                    },
                });

                if (!response.data.status) {
                    Alert.alert('Error', 'Failed to update profile.');
                    console.log(response.data.status);
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again later.');
        }
    };


    // Function to animate layout changes
    const animateLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    const ProfileTags = ({ tags = [] }) => {
        const renderItem = ({ item }) => (
            <View
                style={{
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: profileType === 0 ? "lightblue" : profileType === 1 ? "pink" : profileType === 2 ? "lightgreen" : null,
                    borderRadius: 10,
                    margin: 5,
                    flexGrow: 1,
                    borderWidth: 1,
                    borderColor: profileType === 0 ? "lightseagreen" : profileType === 1 ? "hotpink" : profileType === 2 ? "mediumaquamarine" : null
                }}
            >
                <Text style={{ fontSize: 11 }}>{item}</Text>
            </View>
        );
        return (
            <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
                <FlatList
                    key={tagRefreshKey}
                    data={tags}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{}}
                    horizontal={false}
                    numColumns={4}
                />
            </View>

        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.SafeAreaView, { backgroundColor: "white" }]}>

                <ImageBackground source={profileType === 0 ? require("../jobbgprofile.png") : profileType === 1 ? require("../lovebgprofile2.png") : require("../profilebg.png")} resizeMode='cover' style={{ width: "100%", flex: 1, alignItems: "center", }}>

                    <TouchableOpacity onPress={() => { navigation.navigate("ProfileSettings") }}
                        style={{ position: "absolute", right: 0, top: 0, alignItems: "center", justifyContent: "center", margin: 20, zIndex: 10 }}>
                        <FontAwesome name="cog" size={30} />
                    </TouchableOpacity>

                    <View style={{ flex: 4, alignItems: "center", paddingHorizontal: 20, width: "100%", }}>

                        {
                            profileType === 0 ? (

                                <View style={{ flex: 1, alignItems: "center", width: "100%", }}>

                                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                                        <TouchableOpacity onPress={handleImagePickAndUpload} style={{ width: 110, height: 110, borderRadius: 100, borderColor: "darkgrey", borderWidth: 1, alignItems: "center", justifyContent: "center" }}>
                                            {selectedImage && (
                                                <Image source={{ uri: selectedImage }} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                                            )}
                                        </TouchableOpacity>
                                    </View>

                                    {/* <BioName text={loggedInUserJobInfo.name}></BioName> */}
                                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }} fontSize="xs">{loggedInUserJobInfo.name}</Text>
                                    </View>

                                    {/* <BioJob text={loggedInUserJobInfo.userJob}></BioJob> */}
                                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                        <Text style={{ fontSize: 17, color: "slategrey" }} fontSize="xs">{loggedInUserJobInfo.userJob}</Text>
                                    </View>

                                    <ProfileTags tags={loggedInUserJobTags}></ProfileTags>

                                    <View style={{ flex: 2, alignItems: "center", width: "100%" }}>

                                        <ScrollView contentContainerStyle={{ alignItems: "center", width: "100%", }} showsVerticalScrollIndicator={false}>
                                            <View style={{ flex: 1, minWidth: "100%", alignItems: "flex-start", paddingHorizontal: 10 }}>
                                                <Text fontSize="xs">{loggedInUserJobInfo.descriptionJob}</Text>
                                            </View>
                                        </ScrollView>

                                    </View>

                                </View>

                            ) : profileType === 1 ? (

                                <View style={{ flex: 1, alignItems: "center", width: "100%", }}>

                                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                                        <TouchableOpacity onPress={handleImagePickAndUpload} style={{ width: 110, height: 110, borderRadius: 100, borderColor: "darkgrey", borderWidth: 1, alignItems: "center", justifyContent: "center" }}>
                                            {selectedImage && (
                                                <Image source={{ uri: selectedImage }} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                                            )}
                                        </TouchableOpacity>
                                    </View>

                                    {/* <BioName text={loggedInUserJobInfo.name}></BioName> */}
                                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }} fontSize="xs">Ahmet</Text>
                                    </View>

                                    {/* <BioJob text={loggedInUserJobInfo.userJob}></BioJob> */}
                                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                        <Text style={{ fontSize: 17, color: "slategrey" }} fontSize="xs">my job</Text>
                                    </View>

                                    <ProfileTags tags={loggedInUserJobTags}></ProfileTags>

                                    <View style={{ flex: 2, alignItems: "center", width: "100%", }}>

                                        <ScrollView contentContainerStyle={{ alignItems: "center", width: "100%", }} showsVerticalScrollIndicator={false}>
                                            <View style={{ flex: 1, minWidth: "100%", alignItems: "flex-start", paddingHorizontal: 10 }}>
                                                <Text fontSize="xs">{loggedInUserJobInfo.descriptionJob}</Text>
                                            </View>
                                        </ScrollView>

                                    </View>

                                </View>

                            ) : profileType === 2 ? (

                                <View style={{ flex: 1, alignItems: "center", width: "100%", }}>

                                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                                        <TouchableOpacity onPress={handleImagePickAndUpload} style={{ width: 110, height: 110, borderRadius: 100, borderColor: "darkgrey", borderWidth: 1, alignItems: "center", justifyContent: "center" }}>
                                            {selectedImage && (
                                                <Image source={{ uri: selectedImage }} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                                            )}
                                        </TouchableOpacity>
                                    </View>

                                    {/* <BioName text={loggedInUserJobInfo.name}></BioName> */}
                                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }} fontSize="xs">Ahmet</Text>
                                    </View>

                                    {/* <BioJob text={loggedInUserJobInfo.userJob}></BioJob> */}
                                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                                        <Text style={{ fontSize: 17, color: "slategrey" }} fontSize="xs">my job</Text>
                                    </View>

                                    <ProfileTags tags={loggedInUserJobTags}></ProfileTags>

                                    <View style={{ flex: 2, alignItems: "center", width: "100%" }}>

                                        <ScrollView contentContainerStyle={{ alignItems: "center", width: "100%", }} showsVerticalScrollIndicator={false}>
                                            <View style={{ flex: 1, minWidth: "100%", alignItems: "flex-start", paddingHorizontal: 10 }}>
                                                <Text fontSize="xs">{loggedInUserJobInfo.descriptionJob}</Text>
                                            </View>
                                        </ScrollView>

                                    </View>

                                </View>
                            ) : null
                        }

                    </View>

                    <View style={{ flex: 1, width: "100%", flexDirection: "row", paddingVertical: 10, paddingHorizontal: 20, zIndex: 1 }}>

                        <TouchableOpacity onPress={() => { setProfileType(0); animateLayout(); }} style={{ width: profileType === 0 ? "65%" : "17.5%", }}>
                            <Image style={{ width: "100%", height: "100%", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} source={require("../jobwork.jpg")}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { setProfileType(1); animateLayout(); }} style={{ width: profileType === 1 ? "65%" : "17.5%", }}>
                            <Image style={{ width: "100%", height: "100%", }} source={require("../heart.jpg")}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { setProfileType(2); animateLayout(); }} style={{ width: profileType === 2 ? "65%" : "17.5%", }}>
                            <Image style={{ width: "100%", height: "100%", borderTopRightRadius: 15, borderBottomRightRadius: 15 }} source={require("../event.jpg")}></Image>
                        </TouchableOpacity>

                    </View>



                </ImageBackground>

                <BottomBar selectMenu={4} navigation={navigation} topbarColor={profileType === 1 ? "#de6b93" : profileType === 2 ? "#7addc5" : null}></BottomBar>



            </SafeAreaView >
        </SafeAreaProvider >



    )
}

export default Profile;
