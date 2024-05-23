import React, { useState, useCallback, Component, useEffect } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions, LayoutAnimation } from 'react-native'
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

function Profile({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);
    const [profileType, setProfileType] = useState(0);
    const [galleryModalVisible, setGalleryModalVisible] = useState(false);
    const [galleryModalVisible2, setGalleryModalVisible2] = useState(false);
    const [galleryModalVisible3, setGalleryModalVisible3] = useState(false);

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
                        'Authorization': `${userToken}` // Corrected Authorization header
                    }
                });

                if (!response.ok) {
                    console.log(response);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.status) {
                    setloggedInUserJobInfo(data.jobProfile);
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
            console.log(userToken);
            console.log(userId);
        }
    }, [userToken, userId]);



    const fetchJobUser = async () => {
        try {
            const response = await fetch(`${API_PROFILE_DETAILS_URL}/job-profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Users fetched successfully', data);
                return data; // Return the fetched data
            } else {
                console.log('Error fetching users', data);
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const updateName = async (userId, newName) => {
        try {
            const response = await fetch(`${API_URL}/edit-name/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                },
                body: JSON.stringify({ name: newName })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Name updated successfully', data);
            } else {
                console.log('Error updating name', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateEmail = async (userId, newEmail) => {
        try {
            const response = await fetch(`${API_URL}/edit-email/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                },
                body: JSON.stringify({ email: newEmail })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Email updated successfully', data);
            } else {
                console.log('Error updating email', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updatePassword = async (userId, newPassword, passwordConfirmation) => {
        try {
            const response = await fetch(`${API_URL}/edit-password/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                },
                body: JSON.stringify({
                    password: newPassword,
                    password_confirmation: passwordConfirmation
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Password updated successfully', data);
            } else {
                console.log('Error updating password', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addTag = async (userId, newTag) => {
        try {
            const response = await fetch(`${API_URL}/add-tag/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                },
                body: JSON.stringify({ tag: newTag })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Tag added successfully', data);
            } else {
                console.log('Error adding tag', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    function TagComponent({ TagText, JobDateEventUrl }) {

        return (
            <View style={{ padding: 10, alignItems: "center", justifyContent: "center", backgroundColor: profileType === 0 ? "lightblue" : profileType === 1 ? "pink" : profileType === 2 ? "lightgreen" : null, borderRadius: 10, flexGrow: 1, margin: 5, borderWidth: 1, borderColor: profileType === 0 ? "lightseagreen" : profileType === 1 ? "hotpink" : profileType === 2 ? "mediumaquamarine" : null }}>
                <Text style={{ fontSize: 12 }} fontSize="xs">{TagText}</Text>
            </View>
        )
    }

    function BioName({ name }) {
        return (
            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }} fontSize="xs">{name}</Text>
            </View>
        )
    }

    function BioText({ text }) {
        return (
            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                <Text style={{ fontSize: 13.5, color: "black", textAlign: "justify" }} fontSize="xs">{text}</Text>
            </View>
        )
    }

    function BioTitle({ title }) {
        return (
            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", }}>
                <Text numberOfLines={1} style={{ fontSize: 15, color: "darkslategrey", }} fontSize="xs">{title}</Text>
            </View>
        )
    }

    function GalleryComponent({ imageLink }) {
        return (
            <View style={{ width: "47%", alignItems: "center", justifyContent: "center", height: 150, borderRadius: 10, borderWidth: 1, borderColor: "#afafaf" }}>

            </View>
        )
    }

    const BioTextArray = [
        {
            id: 0,
            text: "I'm deeply passionate about web development, particularly with Angular and Laravel, where I can seamlessly blend JavaScript, HTML, and CSS to craft immersive digital experiences. There's something profoundly satisfying about translating ideas into dynamic, interactive web applications. With Angular's robust framework and Laravel's elegant backend structure, I find myself at home, orchestrating the intricacies of front-end and back-end development. Whether it's creating responsive layouts with HTML and CSS or implementing complex functionality with JavaScript, the process of bringing designs to life exhilarates me. I love discussing the latest trends and techniques in web development, exchanging insights with fellow enthusiasts, and continuously pushing the boundaries of what's possible on the web. For me, web development isn't just a job; it's a journey of exploration and creativity that I'm thrilled to embark on every day."
        },
    ]


    // Function to animate layout changes
    const animateLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };


    return (
        <SafeAreaProvider>

            <SafeAreaView style={[styles.SafeAreaView, { backgroundColor: "white" }]}>

                {/* <TopBar navigation={navigation} backColor={"#3F51B5"} title={"İşlerim"}></TopBar> */}

                <ImageBackground source={profileType === 0 ? require("../jobbgprofile.png") : profileType === 1 ? require("../lovebgprofile2.png") : require("../profilebg.png")} resizeMode='cover' style={{ width: "100%", flex: 1, alignItems: "center", }}>

                    <View style={{ width: "100%", flex: 1, borderBottomLeftRadius: 100, borderBottomRightRadius: 100, alignItems: "center", justifyContent: "center", paddingHorizontal: 20, }}>

                        <TouchableOpacity style={{ width: 110, height: 110, borderRadius: 100, borderColor: "darkgrey", borderWidth: 1, alignItems: "center", justifyContent: "center" }}>

                            <Image
                                style={{ width: "100%", height: "100%", borderRadius: 100 }}
                                source={{
                                    uri: "https://wallpaperaccess.com/full/317501.jpg"
                                }}

                            />

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }}
                            style={{ position: "absolute", right: 0, top: 0, alignItems: "center", justifyContent: "center", margin: 20 }}>
                            <FontAwesome name="cog" size={30} />
                        </TouchableOpacity>


                    </View>

                    <View style={{ flex: 3, alignItems: "center", paddingHorizontal: 20 }}>

                        {
                            profileType === 0 ? (
                                <>
                                    <BioName name={"Necati Doğrul"} />
                                    <BioTitle title={"Software Developer"} />

                                    <View style={{ alignItems: "center", flexDirection: "row", flexWrap: "wrap", }}>
                                        <TagComponent TagText={"Angular"} />
                                        <TagComponent TagText={"Javascript"} />
                                        <TagComponent TagText={"Java"} />
                                        <TagComponent TagText={"HTML"} />
                                        <TagComponent TagText={"CSS"} />
                                        <TagComponent TagText={"Kotlin"} />
                                        <TagComponent TagText={"React Native"} />
                                        <TagComponent TagText={"Laravel"} />
                                        {/* <Text fontSize="xs">{loggedInUserJobInfo.name}</Text>
 */}
                                    </View>

                                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", }}>
                                        <BioText text={BioTextArray[0].text} />


                                    </ScrollView>
                                </>

                            ) : profileType === 1 ? (
                                <>
                                    <BioName name={"Necati Doğrul"} />
                                    <BioTitle title={"Software Developer"} />

                                    <View style={{ alignItems: "center", flexDirection: "row", flexWrap: "wrap", }}>
                                        <TagComponent TagText={"Gezmek"} />
                                        <TagComponent TagText={"Oyun oynamak"} />
                                        <TagComponent TagText={"1.85 Boy"} />
                                        <TagComponent TagText={"80 Kilo"} />
                                        <TagComponent TagText={"Sarışın"} />
                                        <TagComponent TagText={"Yayla"} />
                                    </View>

                                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", }}>
                                        <BioText text={"Ciddi ilişki arıyorum."} />
                                    </ScrollView>
                                </>

                            ) : profileType === 2 ? (
                                <>
                                    <BioName name={"Necati Doğrul"} />
                                    <BioTitle title={"Software Developer"} />

                                    <View style={{ alignItems: "center", flexDirection: "row", flexWrap: "wrap", }}>
                                        <TagComponent TagText={"Futbol"} />
                                        <TagComponent TagText={"Parti"} />
                                        <TagComponent TagText={"Motosiklet"} />
                                        <TagComponent TagText={"Yayla"} />
                                        <TagComponent TagText={"Gezi"} />
                                        <TagComponent TagText={"Dalış"} />
                                    </View>
                                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", }}>

                                        <BioText text={"Futbol oynamayı severim halısahaya gelirim."} />
                                    </ScrollView>
                                </>
                            ) : null
                        }

                    </View>

                    {/* <View style={styles.ProfileOptionsContainer}>
                        <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }} style={[styles.ProfileOptions, { backgroundColor: profileType === 0 ? "lightblue" : profileType === 1 ? "pink" : profileType === 2 ? "lightgreen" : null, borderColor: profileType === 0 ? "lightseagreen" : profileType === 1 ? "hotpink" : profileType === 2 ? "mediumaquamarine" : null, borderWidth: 1 }]}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center", justifyContent: "center", minWidth: 25 }}>
                                    <FontAwesome5 size={16} name="user-alt" />
                                </View>
                                <Text fontSize="xs">Profili Düzenle</Text>
                            </View>

                            <View style={{}}>
                                <Entypo size={20} name="chevron-right" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { navigation.navigate("Login") }} style={[styles.ProfileOptions, { backgroundColor: profileType === 0 ? "lightblue" : profileType === 1 ? "pink" : profileType === 2 ? "lightgreen" : null, borderColor: profileType === 0 ? "lightseagreen" : profileType === 1 ? "hotpink" : profileType === 2 ? "mediumaquamarine" : null, borderWidth: 1 }]}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center", justifyContent: "center", minWidth: 25 }}>
                                    <Entypo size={18} name="log-out" />
                                </View>
                                <Text fontSize="xs">Çıkış Yap</Text>
                            </View>

                            <View style={{}}>
                                <Entypo size={20} name="chevron-right" />
                            </View>
                        </TouchableOpacity>

                    </View> */}

                    <View style={{ width: "100%", paddingHorizontal: 20, alignItems: "center", marginVertical: 5 }}>
                        <TouchableOpacity onPress={() => { setGalleryModalVisible(true) }} style={[styles.ProfileOptions, { backgroundColor: profileType === 0 ? "lightblue" : profileType === 1 ? "pink" : profileType === 2 ? "lightgreen" : null, borderColor: profileType === 0 ? "lightseagreen" : profileType === 1 ? "hotpink" : profileType === 2 ? "mediumaquamarine" : null, borderWidth: 1 }]}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center", justifyContent: "center", minWidth: 25 }}>
                                    <FontAwesome size={16} name="photo" />
                                </View>
                                <Text fontSize="xs">Galeri</Text>
                            </View>

                            <View style={{}}>
                                <Entypo size={20} name="chevron-right" />
                            </View>
                        </TouchableOpacity>
                    </View>






                    <View style={{ flex: 1.25, width: "100%", flexDirection: "row", paddingVertical: 10, paddingHorizontal: 20, zIndex: 1 }}>

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

                    {profileType == 0 ? (
                        <Modal style={{ alignItems: "center", justifyContent: "flex-end", margin: 0, }}
                            onBackButtonPress={() => { setGalleryModalVisible(false) }} onBackdropPress={() => { setGalleryModalVisible(false) }} isVisible={galleryModalVisible} onDismiss={() => { setGalleryModalVisible(false) }} >

                            <View style={{ width: "100%", minHeight: 500, backgroundColor: "white", borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomWidth: 1, padding: 20, rowGap: 5, backgroundColor: "lightblue" }}>

                                {/* 1 */}
                                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }} >
                                        <Text style={{ fontSize: 15, fontFamily: "Montserrat-SemiBold", }}>Galeri</Text>
                                        <FontAwesome name="photo" size={17} />
                                    </View>
                                    <TouchableOpacity style={{ position: "absolute", right: 0 }} onPress={() => { setGalleryModalVisible(false) }}>
                                        <AntDesign style={{ fontSize: 28 }} name="closecircleo" />
                                    </TouchableOpacity>
                                </View>

                                {/* 2 */}
                                <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
                                    <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", flexWrap: "wrap", flexDirection: "row", columnGap: 10, rowGap: 10, paddingVertical: 10 }} showsVerticalScrollIndicator={false}>

                                        {/* FlashList ya da Flatlist kullan apiden veri çekerken resimler için */}

                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />

                                    </ScrollView>

                                </View>


                            </View>

                        </Modal>
                    ) : profileType == 1 ? (
                        <Modal style={{ alignItems: "center", justifyContent: "flex-end", margin: 0, }}
                            onBackButtonPress={() => { setGalleryModalVisible(false) }} onBackdropPress={() => { setGalleryModalVisible(false) }} isVisible={galleryModalVisible} onDismiss={() => { setGalleryModalVisible(false) }} >

                            <View style={{ width: "100%", minHeight: 500, backgroundColor: "white", borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomWidth: 1, padding: 20, rowGap: 5, backgroundColor: "pink" }}>

                                {/* 1 */}
                                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }} >
                                        <Text style={{ fontSize: 15, fontFamily: "Montserrat-SemiBold", }}>Galeri</Text>
                                        <FontAwesome name="photo" size={17} />
                                    </View>
                                    <TouchableOpacity style={{ position: "absolute", right: 0 }} onPress={() => { setGalleryModalVisible(false) }}>
                                        <AntDesign style={{ fontSize: 28 }} name="closecircleo" />
                                    </TouchableOpacity>
                                </View>

                                {/* 2 */}
                                <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
                                    <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", flexWrap: "wrap", flexDirection: "row", columnGap: 10, rowGap: 10, paddingVertical: 10 }} showsVerticalScrollIndicator={false}>

                                        {/* FlashList ya da Flatlist kullan apiden veri çekerken resimler için */}

                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />


                                    </ScrollView>

                                </View>


                            </View>

                        </Modal>
                    ) : (
                        <Modal style={{ alignItems: "center", justifyContent: "flex-end", margin: 0, }}
                            onBackButtonPress={() => { setGalleryModalVisible(false) }} onBackdropPress={() => { setGalleryModalVisible(false) }} isVisible={galleryModalVisible} onDismiss={() => { setGalleryModalVisible(false) }} >

                            <View style={{ width: "100%", minHeight: 500, backgroundColor: "white", borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomWidth: 1, padding: 20, rowGap: 5, backgroundColor: "lightgreen" }}>

                                {/* 1 */}
                                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }} >
                                        <Text style={{ fontSize: 15, fontFamily: "Montserrat-SemiBold", }}>Galeri</Text>
                                        <FontAwesome name="photo" size={17} />
                                    </View>
                                    <TouchableOpacity style={{ position: "absolute", right: 0 }} onPress={() => { setGalleryModalVisible(false) }}>
                                        <AntDesign style={{ fontSize: 28 }} name="closecircleo" />
                                    </TouchableOpacity>
                                </View>

                                {/* 2 */}
                                <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
                                    <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", flexWrap: "wrap", flexDirection: "row", columnGap: 10, rowGap: 10, paddingVertical: 10 }} showsVerticalScrollIndicator={false}>

                                        {/* FlashList ya da Flatlist kullan apiden veri çekerken resimler için */}

                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />
                                        <GalleryComponent imageLink={{}} />

                                    </ScrollView>

                                </View>


                            </View>

                        </Modal>
                    )}


                </ImageBackground>

                <BottomBar selectMenu={4} navigation={navigation} topbarColor={profileType === 1 ? "#de6b93" : profileType === 2 ? "#7addc5" : null}></BottomBar>



            </SafeAreaView>
        </SafeAreaProvider >



    )
}

export default Profile;
