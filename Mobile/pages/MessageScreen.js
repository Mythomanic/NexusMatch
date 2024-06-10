import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
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
    const [sentMessageIds, setSentMessageIds] = useState([]);


    const chatId = 2;
    const initialLoad = useRef(true);

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

            const data = await response.json();

            if (data.messages) {
                const loadedMessages = data.messages.map((msg) => ({
                    _id: msg.id,
                    text: msg.message,
                    createdAt: new Date(msg.created_at),
                    user: {
                        _id: msg.user_id,
                        name: msg.user.name,
                        avatar: msg.user.avatar,
                    },
                }));
                setMessages(loadedMessages.map((message) => ({
                    ...message,
                    user: {
                        ...message.user,
                        _id: message.user._id == userId ? userId : 900,
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
        if (userToken && userId && chatId) {

            if (initialLoad.current) {
                fetchMessages();
                initialLoad.current = false;
            }

            console.log("Initializing Pusher...");

            // Enable Pusher logging
            Pusher.logToConsole = true;

            // Initialize Pusher
            const pusher = new Pusher('052e95b6508db9070fc0', {
                cluster: 'eu',
                authEndpoint: 'https://nexusmain.onrender.com/api/broadcasting/auth',
                auth: {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                },
            });

            // Subscribe to the chat channel
            const channel = pusher.subscribe('chat.' + chatId);

            // Log subscription status
            channel.bind('pusher:subscription_succeeded', () => {
                console.log('Subscription to channel succeeded');
            });

            channel.bind('pusher:subscription_error', (status) => {
                console.log('Subscription to channel failed:', status);
            });

            // Event handler for new messages
            const handleNewMessage = (data) => {
                console.log("New message received:", data);

                // Check if the message is already in the chat
                setMessages((previousMessages) => {
                    if (data.message.user_id === userId || sentMessageIds.includes(data.message.id) || previousMessages.some(message => message._id === data.message.id)) {
                        return previousMessages;
                    }

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
                    console.log("Formatted new message:", newMessage);
                    return [...previousMessages, newMessage];
                });
            };

            // Bind the event handler to the MessageSent event
            channel.bind('App\\Events\\MessageSent', handleNewMessage);

            // Cleanup function to unbind the event handler and unsubscribe from the channel
            return () => {
                console.log("Cleaning up Pusher...");
                channel.unbind('App\\Events\\MessageSent', handleNewMessage);
                pusher.unsubscribe('chat.' + chatId);
            };
        }
    }, [userToken, userId, chatId, sentMessageIds]); // Dependency array


    //ÖNEMLİ USE EFFECT ÇOK ÖNEMLİ
    /*  useEffect(() => {
         if (userToken && userId && chatId) {
 
             if (initialLoad.current) {
                 fetchMessages();
                 initialLoad.current = false;
             }
 
             console.log("Initializing Pusher...");
 
             // Enable Pusher logging
             Pusher.logToConsole = true;
 
             // Initialize Pusher
             const pusher = new Pusher('052e95b6508db9070fc0', {
                 cluster: 'eu',
                 authEndpoint: 'https://nexusmain.onrender.com/api/broadcasting/auth',
                 auth: {
                     headers: {
                         'Authorization': `Bearer ${userToken}`,
                     },
                 },
             });
 
             // Subscribe to the chat channel
             const channel = pusher.subscribe('chat.' + chatId);
 
             // Log subscription status
             channel.bind('pusher:subscription_succeeded', () => {
                 console.log('Subscription to channel succeeded');
             });
 
             channel.bind('pusher:subscription_error', (status) => {
                 console.log('Subscription to channel failed:', status);
             });
 
             // Event handler for new messages
             const handleNewMessage = (data) => {
                 console.log("New message received:", data);
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
                 console.log("Formatted new message:", newMessage);
                 // Append the new message to the existing messages
                 setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
             };
 
 
             // Bind the event handler to the MessageSent event
             channel.bind('App\\Events\\MessageSent', handleNewMessage);
 
             // Cleanup function to unbind the event handler and unsubscribe from the channel
             return () => {
                 console.log("Cleaning up Pusher...");
                 channel.unbind('App\\Events\\MessageSent', handleNewMessage);
                 pusher.unsubscribe('chat.' + chatId);
             };
         }
     }, [userToken, userId, chatId]); // Dependency array */

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
        const message = messages[0];
        const newMessage = {
            _id: message._id,
            text: message.text,
            createdAt: new Date(),
            user: {
                _id: userId,
                name: 'Your Name', // Replace with actual user's name if available
                avatar: 'your-avatar-url' // Replace with actual user's avatar if available
            }
        };

        // Add the new message to the bottom of the array
        setMessages(previousMessages => [...previousMessages, newMessage]);

        // Add the message ID to the sent messages list
        setSentMessageIds(prevIds => [...prevIds, message._id]);

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
    }, [userToken, chatId, userId]);

   

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
                        ref={chatRef}
                        alwaysShowSend
                        messages={messages}
                        onSend={newMessages => onSend(newMessages)}
                        scrollToBottom
                        inverted={false}
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