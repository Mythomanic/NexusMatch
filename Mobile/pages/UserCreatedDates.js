import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../App.styles';
import TopBar from '../pages/TopBar';
import axios from 'axios';

const UserCreatedJobs = ({ navigation }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const API_PROFILE_DETAILS_URL = 'https://nexusmain.onrender.com/api/user';


    const getJobs = async () => {
        try {
            const userTokenValue = await AsyncStorage.getItem('usertoken');
            const userIdValue = await AsyncStorage.getItem('userid');
            if (userTokenValue && userIdValue) {
                const response = await axios.get(`${API_PROFILE_DETAILS_URL}/${userIdValue}/dates`, {
                    headers: {
                        Authorization: `Bearer ${userTokenValue}`,
                    },
                });
                if (response.data.status) {
                    setJobs(response.data.jobs);
                } else {
                    setError(response.data.message);
                }
            } else {
                setError('User token or ID not found');
            }
        } catch (e) {
            setError('Error fetching jobs');
            console.error('Error fetching jobs', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.SafeAreaView, {}]}>
                <TopBar navigation={navigation} backColor={"#3F51B5"} title={"İşlerim"} />

                <FlatList
                    data={jobs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DateLikeDislikeUsers', { dateId: item.id })}
                            style={{
                                width: "90%", flex: 1, alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "skyblue", padding: 15,
                                marginVertical: 8,
                                borderWidth: 1, borderColor: "lightblue", borderRadius: 15,
                                alignSelf: "center"
                            }}
                        >
                            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", columnGap: 10, }}>
                                <Text style={styles.jobTitle}>{item.title}</Text>
                                <Text>{item.description}</Text>
                            </View>


                        </TouchableOpacity>
                    )}
                />

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default UserCreatedJobs;
