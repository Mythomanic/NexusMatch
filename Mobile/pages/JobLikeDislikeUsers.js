import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-deck-swiper';
import styles from '../App.styles';

const JobLikeDislikeUsers = ({ route, navigation }) => {
    const { jobId } = route.params;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [swipedCount, setSwipedCount] = useState(0);

    const getJobDetail = async () => {
        try {
            const userTokenValue = await AsyncStorage.getItem('usertoken');
            if (userTokenValue) {
                setLoading(true);
                const response = await axios.get(`https://nexusmain.onrender.com/api/job/${jobId}/likes`, {
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
                await axios.post(`https://nexusmain.onrender.com/api/jobs/${jobId}/move-user/${userId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${userTokenValue}`,
                    },
                });
            }
        } catch (error) {
            console.error('Error moving user from likes to dislikes', error);
        }
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
                        <Text style={styles.name}>{user.name}</Text>
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