import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import BottomBar from '../pages/BottomBar';
import TopBar from '../pages/TopBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel'
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Pusher from 'pusher-js/react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* import axios from 'axios'; */

const MessageScreen = ({ navigation }) => {
    const API_PROFILE_DETAILS_URL = 'https://nexusmain.onrender.com/api/user';
    const [userToken, setUserToken] = useState()
    const [userId, setUserId] = useState()
    const [loggedInUserJobInfo, setloggedInUserJobInfo] = useState({})
    const [messages, setMessages] = useState([]);

    const chatId = 2;

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
                }
            }
        } catch (e) {
            console.error('Error fetching profile details:', e);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch(`https://nexusmain.onrender.com/api/chats/${chatId}/messages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            console.log(response);

            const data = await response.json();

            if (data.messages) {
                const loadedMessages = [];
                data.messages.forEach((msg) => {
                    loadedMessages.push({
                        _id: msg.id,
                        text: msg.message,
                        createdAt: new Date(msg.created_at),
                        user: {
                            _id: msg.user_id,
                            name: msg.user.name,
                            avatar: msg.user.avatar, // Optional: Add avatar if available
                        },
                    });
                });
                setMessages(loadedMessages.map((message) => ({
                    ...message,
                    user: {
                        ...message.user,
                        _id: message.user._id == userId ? userId : 900, // Ensure the message user ID is correctly set
                    },
                })));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            await getData();
        };
        initialize();
    }, []);


    useEffect(() => {
        if (userToken && userId) {
            getLoggedInUser();
            const pusher = new Pusher('052e95b6508db9070fc0', {
                cluster: 'eu',
                authEndpoint: 'https://nexusmain.onrender.com/api/broadcasting/auth',
                auth: {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                }
            });

            const channel = pusher.subscribe('chat.' + chatId);
            channel.bind('MessageSent', function (data) {
                const newMessage = {
                    _id: data.message.id,
                    text: data.message.message,
                    createdAt: new Date(data.message.created_at),
                    user: {
                        _id: data.message.user_id,
                        name: data.message.user.name,
                        avatar: data.message.user.avatar,
                    },
                };
                setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
            });

            fetchMessages();

            return () => {
                pusher.unsubscribe('chat.' + chatId);
            };
        }
    }, [userToken, userId, chatId]);

    function MessageTopBar({ navigation }) {

        return (
            <View style={{ width: "100%", height: 50, alignItems: "center", justifyContent: "flex-start", backgroundColor: "#3F51B5", flexDirection: "row", columnGap: 10, zIndex: 5 }}>
                <TouchableOpacity style={{ position: "absolute", left: 0, paddingLeft: 5 }} onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back-circle-outline" color={"white"} size={35} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 100, marginLeft: 45, }}>
                    <Image

                        resizeMode='cover'
                        style={{ width: "100%", height: "100%", borderRadius: 100, alignItems: "center", justifyContent: "center" }}
                        source={{
                            uri: "https://img.freepik.com/free-photo/empty-blackboard_53876-30426.jpg?t=st=1715260895~exp=1715264495~hmac=0d5b04154fccf4450af5906b66c3b870038d093494a74f4170a6bcc783dd0652&w=1380"
                        }}
                    />
                </TouchableOpacity>

                <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                    <Text numberOfLines={1} style={{ fontWeight: "bold", fontSize: 16, color: "#FFFFFFDD" }}>Gamze</Text>
                </View>


            </View>

        )

    }

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const message = messages[0];
        fetch(`https://nexusmain.onrender.com/api/chats/${chatId}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify({
                chat_id: chatId,
                message: message.text
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Message sent successfully', data);
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }, [userToken, chatId]);





    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.SafeAreaView}>

                <MessageTopBar navigation={navigation} />

                <Image
                    style={{ position: "absolute", height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
                    source={{ uri: "https://img.freepik.com/free-photo/empty-blackboard_53876-30426.jpg?t=st=1715260895~exp=1715264495~hmac=0d5b04154fccf4450af5906b66c3b870038d093494a74f4170a6bcc783dd0652&w=1380" }}
                />


                <View style={{ flex: 1, width: "100%", }}>

                    <GiftedChat
                        alwaysShowSend
                        messages={messages}
                        onSend={newMessages => onSend(newMessages)}
                        user={{
                            _id: userId, // Ensure this is the ID of the currently logged-in user
                            name: loggedInUserJobInfo.name, // Ensure this is the name of the currently logged-in user
                        }}
                    />


                </View>

            </SafeAreaView>
        </SafeAreaProvider >

    )

}



export default MessageScreen;