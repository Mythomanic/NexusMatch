import React, { useState, useCallback, useEffect } from 'react'
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
import { CollapsibleCard } from "react-native-btr";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import { tagRefreshAtom } from '../JotaiAtoms';

function ProfileSettings({ navigation }) {

    const [createCategory, setcreateCategory] = useState(0)

    const [showPassword, setShowPassword] = useState(true);

    const screenWidth = Dimensions.get('window').width;

    const insets = useSafeAreaInsets();


    const API_URL = 'https://nexusmain.onrender.com/update-profile';

    // API_PROFILE_DETAILS_URL LINK IS SUBJECT TO CHANGE 
    const API_PROFILE_DETAILS_URL = 'https://nexusmain.onrender.com/api/user';
    const [userToken, setUserToken] = useState()
    const [userId, setUserId] = useState()
    const [loggedInUserJobInfo, setloggedInUserJobInfo] = useState({})
    const [loggedInUserJobTags, setloggedInUserJobTags] = useState([])
    const [newTag, setNewTag] = useState("");
    const [tagRefreshKey, setTagRefreshKey] = useAtom(tagRefreshAtom);

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
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                if (!response.ok) {
                    console.error(response);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.status) {
                    setloggedInUserJobInfo(data.jobProfile);
                    setloggedInUserJobTags(data.jobProfile.tagsJob || []);
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

    /* useEffect(() => {
        if (userId && userToken) {
            setloggedInUserJobTags(loggedInUserJobInfo.tagsJob);
        }
    }, [userToken, userId]);
 */

    const handleAddTag = async () => {
        try {
            const response = await fetch(`https://nexusmain.onrender.com/api/user/${userId}/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({ tagJob: newTag })
            });
            const data = await response.json();
            if (data.status) {
                setloggedInUserJobTags(data.tagsJob);
                setNewTag("");
                setTagRefreshKey((prevKey)=>(prevKey+1))
            }
        } catch (error) {
            console.error("Failed to add tag", error);
        }
    };

    const handleRemoveTag = async (tagToRemove) => {
        try {
            const response = await fetch(`https://nexusmain.onrender.com/api/user/${userId}/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({ removeTagJob: tagToRemove })
            });
            const data = await response.json();
            if (data.status) {
                setloggedInUserJobTags(data.tagsJob);
                setTagRefreshKey((prevKey)=>(prevKey+1))
            }
        } catch (error) {
            console.error("Failed to remove tag", error);
        }
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

            <TopBar title={"Düzenle"} titleFont={"Montserrat-SemiBold"} navigation={navigation} backColor={"#3F51B5"}></TopBar>

            <View style={{ width: "100%", flex: 1, alignItems: "center", }}>

                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", margin: 10 }}>
                    <Text >Değiştirmek istediğiniz profilinizi seçiniz:</Text>
                </View>

                <View style={{ minHeight: 30, width: "100%", alignItems: "center", justifyContent: "space-evenly", flexDirection: "row", columnGap: 20, margin: 10, paddingHorizontal: 15, }}>
                    <TouchableOpacity onPress={() => { setcreateCategory(0) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, minHeight: 30 }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#3F51B5dd", "#03A9F4bb"]} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, minHeight: 30 }}>
                            <Text style={{ fontSize: 13, color: "black" }}>İş</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setcreateCategory(1) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, minHeight: 30 }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#FF6B6B", "#FFD166"]} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, minHeight: 30 }}>
                            <Text style={{ fontSize: 13, color: "black" }}>İlişki</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setcreateCategory(2) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, minHeight: 30 }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#4CAF50", "#8BC34A"]} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, minHeight: 30 }}>
                            <Text style={{ fontSize: 13, color: "black" }}>Etkinlik</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {createCategory == 0 ? (

                    <View style={{ flex: 1, width: "100%", margin: 10 }}>

                        <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", padding: 10, rowGap: 15, }} showsVerticalScrollIndicator={false}>

                            <View style={styles.CreateContentContainer}>
                                <TextInput value={loggedInUserJobInfo.name} style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='İsim'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput value={loggedInUserJobInfo.userJob} style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Meslek'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput value={loggedInUserJobInfo.descriptionJob} style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Açıklama'></TextInput>
                            </View>

                            <View style={[styles.CreateContentContainer,{minHeight:40}]}>
                                {loggedInUserJobTags.map((tag, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{tag}</Text>
                                        <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                                            <Text style={{ color: 'red', marginLeft: 5 }}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput
                                    style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }}
                                    placeholder='Yeni Tag'
                                    value={newTag}
                                    onChangeText={setNewTag}
                                />
                            </View>

                            <TouchableOpacity onPress={handleAddTag} style={{ padding: 10, paddingHorizontal: 25, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#03A9F4bb" }}>
                                <Text style={{ color: "#03A9F4bb", fontWeight: "bold" }} fontSize="xs">Kaydet</Text>
                            </TouchableOpacity>

                        </ScrollView>



                    </View>

                ) : createCategory == 1 ? (

                    <View style={{ flex: 1, width: "100%", margin: 10 }}>

                        <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", padding: 10, rowGap: 15, }} showsVerticalScrollIndicator={false}>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Şirket adı'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aday iş pozisyonu adı (Örn: Yazılımcı)'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aranılan yetenekler'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aranılan Deneyim'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Maaş aralığı'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Çalışma stili (Ofis / Hibrit / Remote)'></TextInput>
                            </View>

                            <TouchableOpacity onPress={() => { }} style={{ padding: 10, paddingHorizontal: 25, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#FF6B6Bbb" }}>
                                <Text style={{ color: "#FF6B6Bbb", fontWeight: "bold" }} fontSize="xs">Oluştur</Text>
                            </TouchableOpacity>

                        </ScrollView>



                    </View>

                ) : (
                    <View style={{ flex: 1, width: "100%", margin: 10 }}>

                        <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", padding: 10, rowGap: 15, }} showsVerticalScrollIndicator={false}>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Şirket adı'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aday iş pozisyonu adı (Örn: Yazılımcı)'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aranılan yetenekler'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aranılan Deneyim'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Maaş aralığı'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Çalışma stili (Ofis / Hibrit / Remote)'></TextInput>
                            </View>

                            <TouchableOpacity onPress={() => { }} style={{ padding: 10, paddingHorizontal: 25, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#4CAF50bb" }}>
                                <Text style={{ color: "#4CAF50bb", fontWeight: "bold" }} fontSize="xs">Oluştur</Text>
                            </TouchableOpacity>

                        </ScrollView>



                    </View>
                )
                }



            </View>


            <BottomBar selectMenu={12} navigation={navigation} ></BottomBar>
        </SafeAreaView>

    )
}

export default ProfileSettings