import React, { useState, useCallback, Component, useEffect } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
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

function Create({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const [userToken, setUserToken] = useState()
    const [userId, setUserId] = useState()
    const API_PROFILE_DETAILS_URL = 'https://nexusmain.onrender.com/api/user';
    const [createCategory, setcreateCategory] = useState(0)
    const [loggedInUserJobInfo, setloggedInUserJobInfo] = useState({})
    const [loggedInUserJobTags, setloggedInUserJobTags] = useState([])
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedImageDate, setSelectedImageDate] = useState("");
    const [selectedImageEvent, setSelectedImageEvent] = useState("");

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


    //İş Stateleri
    const JOB_CREATE_URL = "https://nexusmain.onrender.com/api/jobs"
    const DATE_CREATE_URL = "https://nexusmain.onrender.com/api/dates"
    const EVENT_CREATE_URL = "https://nexusmain.onrender.com/api/events"

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [position, setPosition] = useState('');
    const [requirements, setRequirements] = useState('');
    const [salary, setSalary] = useState('');
    const [description, setDescription] = useState('');

    const [ownGender, setownGender] = useState('');
    const [desiredGender, setdesiredGender] = useState('');



    const createJob = async () => {
        const jobData = {
            title,
            location,
            position,
            requirements,
            salary: parseFloat(salary), // Ensure salary is sent as a numeric value
            description,
        };

        console.log('Sending job data:', jobData);

        try {
            const response = await fetch(JOB_CREATE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(jobData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Job created successfully:', jsonResponse);
                // Clear the input fields or navigate to another screen if necessary
                setTitle('');
                setLocation('');
                setPosition('');
                setRequirements('');
                setSalary('');
                setDescription('');
            } else {
                const errorResponse = await response.text();
                console.error('Failed to create job:', errorResponse);
            }
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    const createDate = async () => {
        const dateData = {
            title,
            ownGender,
            desiredGender,
            description,
            location,
        };

        console.log('Sending date data:', dateData);

        try {
            const response = await fetch(DATE_CREATE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(dateData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Date created successfully:', jsonResponse);
                // Clear the input fields or navigate to another screen if necessary
                setTitle['']
                setownGender['']
                setdesiredGender['']
                setDescription['']
                setLocation['']
            } else {
                const errorResponse = await response.text();
                console.error('Failed to create date:', errorResponse);
            }
        } catch (error) {
            console.error('Error creating date:', error);
        }
    };

    const createEvent = async () => {
        const eventData = {
            title,
            location,
            requirements,
            description,
        };

        console.log('Sending event data:', eventData);

        try {
            const response = await fetch(EVENT_CREATE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Event created successfully:', jsonResponse);
                // Clear the input fields or navigate to another screen if necessary
                setTitle('');
                setDescription('');
                setLocation('');
                setRequirements('');
            } else {
                const errorResponse = await response.text();
                console.error('Failed to create event:', errorResponse);
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (

        <SafeAreaView style={styles.SafeAreaView}>

            <TopBar title={"Oluştur"} titleFont={"Montserrat-SemiBold"} navigation={navigation} backColor={"#3F51B5"}></TopBar>

            <View style={{ width: "100%", flex: 1, alignItems: "center", }}>

                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", margin: 10 }}>
                    <Text >Oluşturmak istediğiniz kategoriyi seçiniz:</Text>
                </View>

                <View style={{ minHeight: 30, width: "100%", alignItems: "center", justifyContent: "space-evenly", flexDirection: "row", columnGap: 20, margin: 10, paddingHorizontal: 15, }}>
                    <TouchableOpacity onPress={() => { setcreateCategory(0) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#3F51B5dd", "#03A9F4bb"]} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                            <Text style={{ fontSize: 13, color: "black" }}>İş</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setcreateCategory(1) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#FF6B6B", "#FFD166"]} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                            <Text style={{ fontSize: 13, color: "black" }}>İlişki</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setcreateCategory(2) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#4CAF50", "#8BC34A"]} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                            <Text style={{ fontSize: 13, color: "black" }}>Etkinlik</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {createCategory == 0 ? (

                    <View style={{ flex: 1, width: "100%", margin: 10 }}>

                        <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", padding: 10, rowGap: 15, }} showsVerticalScrollIndicator={false}>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={title}
                                    onChangeText={setTitle}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Şirket adı'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={location}
                                    onChangeText={setLocation}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Şirket konumu'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={position}
                                    onChangeText={setPosition}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Aday iş pozisyonu adı (Örn: Yazılımcı)'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={requirements}
                                    onChangeText={setRequirements}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Aranılan yetenekler ve deneyim'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={salary}
                                    onChangeText={setSalary}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Maaş'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='İş açıklaması'
                                />
                            </View>

                            <TouchableOpacity onPress={createJob} style={{ padding: 10, paddingHorizontal: 25, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#03A9F4bb" }}>
                                <Text style={{ color: "#03A9F4bb", fontWeight: "bold" }} fontSize="xs">Oluştur</Text>
                            </TouchableOpacity>

                        </ScrollView>



                    </View>

                ) : createCategory == 1 ? (

                    <View style={{ flex: 1, width: "100%", margin: 10 }}>

                        <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", padding: 10, rowGap: 15, }} showsVerticalScrollIndicator={false}>
                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={title}
                                    onChangeText={setTitle}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Adınız'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={ownGender}
                                    onChangeText={setownGender}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Cinsiyetiniz'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={desiredGender}
                                    onChangeText={setdesiredGender}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Eşleşmek istediğiniz cinsiyet'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Açıklama'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={location}
                                    onChangeText={setLocation}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Konum'
                                />
                            </View>

                            <TouchableOpacity onPress={createDate} style={{ padding: 10, paddingHorizontal: 25, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#FFD166" }}>
                                <Text style={{ color: "#FFD166", fontWeight: "bold" }} fontSize="xs">Oluştur</Text>
                            </TouchableOpacity>

                        </ScrollView>



                    </View>

                ) : createCategory == 2 ? (
                    <View style={{ flex: 1, width: "100%", margin: 10 }}>

                        <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", padding: 10, rowGap: 15, }} showsVerticalScrollIndicator={false}>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={title}
                                    onChangeText={setTitle}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Etkinlik Başlığı'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Açıklama'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={location}
                                    onChangeText={setLocation}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Etkinlik Konumu'
                                />
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    value={requirements}
                                    onChangeText={setRequirements}
                                    multiline={true}
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 12 }}
                                    placeholder='Etkinlik şartları/aranan özellikler'
                                />
                            </View>

                            <TouchableOpacity onPress={createEvent} style={{ padding: 10, paddingHorizontal: 25, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#8BC34A" }}>
                                <Text style={{ color: "#8BC34A", fontWeight: "bold" }} fontSize="xs">Oluştur</Text>
                            </TouchableOpacity>

                        </ScrollView>



                    </View>
                ) : null
                }



            </View>


            <BottomBar selectMenu={2} navigation={navigation} ></BottomBar>
        </SafeAreaView>

    )
}

export default Create;