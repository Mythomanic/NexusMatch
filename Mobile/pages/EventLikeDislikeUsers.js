import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, FlatList, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-deck-swiper';
import styles from '../App.styles';

const JobLikeDislikeUsers = ({ route, navigation }) => {
    const { eventId } = route.params;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [swipedCount, setSwipedCount] = useState(0);

    const getJobDetail = async () => {
        try {
            const userTokenValue = await AsyncStorage.getItem('usertoken');
            if (userTokenValue) {
                setLoading(true);
                const response = await axios.get(`https://nexusmain.onrender.com/api/date/${eventId}/likes`, {
                    headers: {
                        Authorization: `Bearer ${userTokenValue}`,
                    },
                });
                if (response.data.status) {
                    setUsers(response.data.likedUsers);
                } else {
                    setError(response.data.message);
                }
            } else {
                setError('User token not found');
            }
        } catch (e) {
            setError('Error fetching job details');
            console.error('Error fetching job details', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJobDetail();
    }, []);

    const handleSwipeRight = async (cardIndex) => {
        const userId = users[cardIndex].id;
        try {
            const userTokenValue = await AsyncStorage.getItem('usertoken');
            if (userTokenValue) {
                const response = await axios.post(`https://nexusmain.onrender.com/api/chats`, { user2_id: userId }, {
                    headers: {
                        Authorization: `Bearer ${userTokenValue}`,
                    },
                });

                if (response.data.status) {
                    navigation.navigate('Jobs', { userId });
                } else {
                    Alert.alert('Error', response.data.message);
                }
            }
        } catch (error) {
            console.error('Error creating chat', error);
        }
    };

    const handleSwipeLeft = async (cardIndex) => {
        const userId = users[cardIndex].id;
        try {
            const userTokenValue = await AsyncStorage.getItem('usertoken');
            if (userTokenValue) {
                await axios.post(`https://nexusmain.onrender.com/api/jobs/${eventId}/move-user/${userId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${userTokenValue}`,
                    },
                });
            }
        } catch (error) {
            console.error('Error moving user from likes to dislikes', error);
        }
    };


    const ProfileTags = ({ tags = [] }) => {
        const renderItem = ({ item }) => (
            <View
                style={{
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "lightgrey",
                    borderRadius: 10,
                    margin: 5,
                    flexGrow: 1,
                    borderWidth: 1,
                    borderColor: "grey",
                }}
            >
                <Text style={{ fontSize: 11 }}>{item}</Text>
            </View>
        );
        return (
            <View style={{ minHeight: 70, alignItems: "center", width: "100%", marginTop: 15 }}>
                <FlatList
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

    if (users.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>No users found</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Swiper
                cards={users}
                renderCard={(user) => (
                    <View style={styles.cardContainer}>
                        <View style={{ height: 70, alignItems: "center", justifyContent: "center", width: "100%", marginVertical: 3, borderRadius: 100, }}>
                            <Image source={{ /* uri: "https://nexusmain.onrender.com/storage/avatars/" + user.avatarJob */
                                uri: user.avatarJob === "defaultpp" || null || undefined
                                    ? "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png"
                                    : `https://nexusmain.onrender.com/storage/avatars/${user.avatarJob}`
                            }} style={{ width: 70, height: "100%", borderRadius: 100, }} />
                        </View>

                        <Text style={styles.name}>{user.name}</Text>
                        <ProfileTags tags={user.tagsJob}></ProfileTags>

                        <TouchableOpacity onPress={() => { console.log(user); }}>
                            <Text fontSize="xs">HEREHERE</Text>

                        </TouchableOpacity>

                        <Text style={styles.description}>{user.descriptionJob}</Text>
                    </View>
                )}
                onSwipedRight={handleSwipeRight}
                onSwipedLeft={handleSwipeLeft}
                onSwiped={(cardIndex) => setSwipedCount(swipedCount + 1)}
                infinite={false}
                cardIndex={0}
                verticalSwipe={false}
                backgroundColor={'white'}
            />
        </View>
    );
};

export default JobLikeDislikeUsers;