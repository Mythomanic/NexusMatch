import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "react-native-vector-icons";
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../App.styles';
import Swiper from 'react-native-deck-swiper';
import { useAtom } from 'jotai';
import { refreshAtom } from '../JotaiAtoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DateListItem({ navigation, dates, setRefreshKey }) {
    const [swipedCount, setSwipedCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const API_URL = 'https://nexusmain.onrender.com/api';

    useEffect(() => {
        const getData = async () => {
            try {
                const userTokenValue = await AsyncStorage.getItem('usertoken');
                const userIdValue = await AsyncStorage.getItem('userid');
                if (userTokenValue !== null && userIdValue !== null) {
                    setUserToken(userTokenValue);
                    setUserId(userIdValue);
                }
            } catch (e) {
                console.error("Error reading token or user ID from AsyncStorage", e);
            }
        };
        getData();
    }, []);

    const handleSwipe = async (dateId, direction) => {
        if (userToken && userId) {
            try {
                const response = await fetch(`${API_URL}/user/${userId}/dates/${dateId}/swipeDate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: JSON.stringify({ direction })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Swipe Response: ", JSON.stringify(data, null, 2));

            } catch (error) {
                console.error("Error swiping date:", error);
                Alert.alert('Error', 'Failed to swipe date');
            }
        }
    };

    return (
        <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "flex-start" }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Swiper
                    cards={dates}
                    renderCard={(date, index) => (
                        date ? (
                            <View style={[styles.cardContainer]}>
                                <Text style={styles.companyName}>{date.title}</Text>

                                <View>
                                    <Text numberOfLines={22} style={styles.companyDescription}>{date.description}</Text>
                                </View>
                                <View>
                                    <Text numberOfLines={22} style={styles.companyDescription}>{date.date}</Text>
                                </View>
                            </View>
                        ) : null
                    )}
                    infinite={false}
                    onSwipedLeft={(cardIndex) => {
                        setSwipedCount(swipedCount + 1);
                        console.log(cardIndex + " Swiped Left");
                        if (dates[cardIndex]) {
                            handleSwipe(dates[cardIndex].id, 'dislike');
                        }
                    }}
                    onSwipedRight={(cardIndex) => {
                        setSwipedCount(swipedCount + 1);
                        console.log(cardIndex + " Swiped Right");
                        if (dates[cardIndex]) {
                            handleSwipe(dates[cardIndex].id, 'like');
                        }
                    }}
                    onSwipedAll={() => { console.log('onSwipedAll'); }}
                    cardIndex={0}
                    backgroundColor={'white'}
                    verticalSwipe={false}
                    cardVerticalMargin={0}
                    stackSize={2}
                />
            )}
        </View>
    );
}

export default DateListItem;
