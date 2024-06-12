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
                const response = await axios.get(`${API_PROFILE_DETAILS_URL}/${userIdValue}/jobs`, {
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
                <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
                    <View style={{ flex: 1, width: "100%", padding: 5, alignItems: "center" }}>

                        <FlatList
                            data={jobs}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('JobLikeDislikeUsers', { jobId: item.id })}
                                    style={{ padding: 20, width: "80%", minHeight: 30, borderWidth: 1, alignSelf: "center", alignItems: "center", justifyContent: "center" }}
                                >
                                    <Text style={styles.jobTitle}>{item.title}</Text>
                                    <Text>{item.description}</Text>
                                </TouchableOpacity>
                            )}
                        />

                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default UserCreatedJobs;
