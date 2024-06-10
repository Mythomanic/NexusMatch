import React, { useState, useCallback, useEffect } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions, Button, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel'
import Collapsible from 'react-native-collapsible';
import Swiper from 'react-native-deck-swiper';
import { useAtom } from 'jotai';
import { refreshAtom } from '../JotaiAtoms';
import axios from 'axios';
import jobService from '../services/jobService';
import AsyncStorage from '@react-native-async-storage/async-storage';


function JobListItem({ navigation }) {
    const [refreshKey] = useAtom(refreshAtom);
    const [jobs, setJobs] = useState([]);
    const [swipedCount, setSwipedCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const API_URL = 'https://nexusmain.onrender.com/api/'

    const API_PROFILE_DETAILS_URL = 'https://nexusmain.onrender.com/api/user';
    const [userToken, setUserToken] = useState()
    const [userId, setUserId] = useState()
    const [loggedInUserJobInfo, setloggedInUserJobInfo] = useState({})
    const [loggedInUserJobTags, setloggedInUserJobTags] = useState([])

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

    useEffect(() => {
        const initialize = async () => {
            await getData();

        };
        initialize();
    }, []);


    useEffect(() => {
        if (userToken && userId) {
            getLoggedInUser();
        }
    }, [userToken, userId]);

    useEffect(() => {
        const fetchJobs = async () => {
            if (userToken && userId) {
                setLoading(true); // Set loading to true before fetching data
                try {
                    const response = await fetch(`https://nexusmain.onrender.com/api/user/${userId}/jobOpportunities`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    setJobs(data); // Store data in state
                    console.log("Job Data: ", JSON.stringify(data, null, 2)); // Properly format the job data
                } catch (error) {
                    console.error("Error fetching jobs:", error);
                    Alert.alert('Error', 'Failed to fetch jobs');
                } finally {
                    setLoading(false); // Set loading to false after fetching data
                }
            }
        };

        fetchJobs();
    }, [userToken, userId, swipedCount]); // Trigger fetch when userToken, userId, or swipedCount changes


    const handleSwipe = async (jobId, direction) => {
        if (userToken && userId) {
            try {
                const response = await fetch(`https://nexusmain.onrender.com/api/user/${userId}/jobs/${jobId}/swipe`, {
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
                console.log("Swipe Response: ", JSON.stringify(data, null, 2)); // Properly format the swipe response

            } catch (error) {
                console.error("Error swiping job:", error);
                Alert.alert('Error', 'Failed to swipe job');
            }
        }
    };

    return (
        <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "flex-start" }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Swiper
                    cards={jobs}
                    renderCard={(job, index) => (
                        job ? (
                            <View style={[styles.cardContainer]}>
                                <Text style={styles.companyName}>{job.title}</Text>
                                <View>
                                    <Text numberOfLines={22} style={styles.companyDescription}>{job.description}</Text>
                                </View>
                                <View style={{ width: "100%", alignSelf: "center", alignItems: "center", justifyContent: "center", padding: 10, margin: 5 }}>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderColor: "grey", borderRadius: 20, alignItems: "center", justifyContent: "center", padding: 12.5 }}
                                        onPress={() => navigation.navigate('JobDetails', { jobId: job.id })}
                                    >
                                        <Text style={{ fontSize: 12 }} fontSize="xs">Detayları Gör</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null
                    )}
                    infinite={false}
                    onSwipedLeft={(cardIndex) => {
                        setSwipedCount(swipedCount + 1);
                        console.log(cardIndex + " Swiped Left");
                        if (jobs[cardIndex]) {
                            handleSwipe(jobs[cardIndex].id, 'dislike');
                        }
                    }}
                    onSwipedRight={(cardIndex) => {
                        setSwipedCount(swipedCount + 1);
                        console.log(cardIndex + " Swiped Right");
                        if (jobs[cardIndex]) {
                            handleSwipe(jobs[cardIndex].id, 'like');
                        }
                    }}
                    onSwipedAll={() => { console.log('onSwipedAll'); }}
                    cardIndex={0}
                    backgroundColor={'white'}
                    verticalSwipe={false}
                    cardVerticalMargin={0}
                />
            )}
        </View>
    );
}

export default JobListItem;