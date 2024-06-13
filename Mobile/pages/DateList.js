import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../App.styles';
import DateListItem from './DateListItemComponent'; // Assuming you have a DateListItemComponent similar to JobListItemComponent
import { useAtom } from 'jotai';
import { refreshAtom } from '../JotaiAtoms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBar from './TopBar';
import { Ionicons } from "react-native-vector-icons";

function DateList({ navigation }) {
    const [showPassword, setShowPassword] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const [refreshKey, setRefreshKey] = useAtom(refreshAtom); // State to manage the refresh key
    const [isModalVisible, setModalVisible] = useState(false);
    const [filterDate, setFilterDate] = useState('');
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState();
    const [userId, setUserId] = useState();

    const API_URL = 'https://nexusmain.onrender.com/api';

    const getData = async () => {
        try {
            const userTokenValue = await AsyncStorage.getItem('usertoken');
            const userIdValue = await AsyncStorage.getItem('userid');
            if (userTokenValue !== null && userIdValue !== null) {
                setUserToken(userTokenValue);
                setUserId(userIdValue);
            }
        } catch (e) {
            // error reading value
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
            fetchDates(filterDate); // Call fetchDates with filterDate
        }
    }, [userToken, userId, refreshKey, filterDate]); // Also depend on filterDate

    const fetchDates = async (ownGender = '') => {
        if (userToken && userId) {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/user/${userId}/dates/filterDate?ownGender=${encodeURIComponent(ownGender)}`, {
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
                setDates(data);
                console.log("Date Data: ", JSON.stringify(data, null, 2));
            } catch (error) {
                console.error("Error fetching dates:", error);
                Alert.alert('Error', 'Failed to fetch dates');
            } finally {
                setLoading(false);
            }
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const applyFilter = () => {
        fetchDates(filterDate); // Fetch dates with the new filter
        toggleModal();
    };

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <TopBar title={"Tarihler"} titleFont={"Montserrat-SemiBold"} navigation={navigation} backColor={"#3F51B5"} />
            <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
                <View style={styles.SearchBarCategories}>
                    <TouchableOpacity onPress={toggleModal} style={{ width: 35, alignItems: "center", justifyContent: "center", flexDirection: "row", columnGap: 7 }}>
                        <Ionicons size={21} name={"filter"} />
                        <Text style={{ fontSize: 13 }}>Filter</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, width: "100%" }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <DateListItem navigation={navigation} dates={dates} setRefreshKey={setRefreshKey} />
                    )}
                </View>
            </View>

            {isModalVisible &&
                <Modal animationType='slide' transparent={true} >
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', }}>
                        <TouchableOpacity onPress={toggleModal} style={{ width: "100%", flex: 1 }}></TouchableOpacity>
                        <View style={{ flex: 1, width: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: "lightblue", borderTopLeftRadius: 75, borderTopRightRadius: 75, borderWidth: 1, borderColor: "skyblue" }}>
                            <Text style={{ marginBottom: 10 }}>Filter by Date</Text>
                            <TextInput
                                style={{ height: 40, borderColor: '#6eb9c2', borderWidth: 1, marginBottom: 20, paddingLeft: 10, width: '80%', borderRadius: 10 }}
                                placeholder="Enter date"
                                onChangeText={text => setFilterDate(text)}
                                value={filterDate}
                            />
                            <TouchableOpacity style={{ marginVertical: 5, padding: 10, borderWidth: 1, borderColor: "#6eb9c2", borderRadius: 15, alignItems: "center", justifyContent: "center" }} onPress={applyFilter}>
                                <Text fontSize="xs">Apply Filter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: "#6eb9c2", borderRadius: 15, alignItems: "center", justifyContent: "center" }} onPress={toggleModal}>
                                <Text fontSize="xs">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            }
        </SafeAreaView>
    );
}

export default DateList;
