import React, { useState, useCallback, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Image, ImageBackground, Text, ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import Axios from 'axios';


function Register({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);
    const [jsonplaceholder, setjsonplaceholder] = useState({});

    /* useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
                const jsonData = await response.json();
                console.log(jsonData);
                setjsonplaceholder(jsonData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Fetch data when the component mounts
    }, []); // The empty array [] as the second argument ensures the effect runs once
 */


    /* useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('https://jsonplaceholder.typicode.com/users/1');
                const jsonData = response.data;
                console.log(jsonData);
                setjsonplaceholder(jsonData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Fetch data when the component mounts
    }, []); */

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



    return (

        <SafeAreaView style={styles.SafeAreaView}>

            
            <View style={{ width: "100%", padding: 10, alignItems: "center", flex: 1, }}>


            </View>




        </SafeAreaView>
    )
}
export default Register;