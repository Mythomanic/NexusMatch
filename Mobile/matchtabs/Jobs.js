import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList, SafeAreaView, Image, StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../App.styles';
import BottomBar from '../pages/BottomBar';

const Jobs = ({ route, navigation }) => {
    const userId = route?.params?.userId;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");


    const fetchChats = async () => {
        try {
            const userTokenValue = await AsyncStorage.getItem('usertoken');
            if (userTokenValue) {
                const response = await axios.get(`https://nexusmain.onrender.com/api/chats`, {
                    headers: {
                        Authorization: `Bearer ${userTokenValue}`,
                    },
                });

                if (response.data.status) {
                    setChats(response.data.chats);
                } else {
                    setError(response.data.message);
                }
            } else {
                setError('User token not found');
            }
        } catch (e) {
            setError('Error fetching chats');
            console.error('Error fetching chats', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [userId]);

    const handlePressChat = (chatId) => {
        navigation.navigate('MessageScreen', { chatId });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{error}</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{
            width: "100%", flex: 1, alignItems: "center",
            justifyContent: "center",
            borderTopWidth: 1, borderBottomWidth: 1,
            backgroundColor: "skyblue", padding: 15,
            marginVertical: 8,
            borderTopColor: "lightblue",
            borderBottomColor: "lightblue"
        }} onPress={() => handlePressChat(item.id)}>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", columnGap: 10 }}>
                <View style={{ width: 50, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                    <Image source={{
                        uri: item.user2.avatarJob === "defaultpp"
                            ? "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png"
                            : `https://nexusmain.onrender.com/storage/avatars/${item.user2.avatarJob}`
                    }} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                </View>

                <Text style={{ textAlign: "justify" }}>Chat with {item.user2.name}</Text>
            </View>


        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.SafeAreaView, { backgroundColor: "#8bcce833" }]}>
            <StatusBar></StatusBar>
            <FlatList
                data={chats}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />

            <BottomBar selectMenu={1} navigation={navigation} />
        </SafeAreaView >
    );
};

export default Jobs;