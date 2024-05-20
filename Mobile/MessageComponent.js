import React, { useState, useCallback } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel'
import styles from './App.styles';
import MessageScreen from './pages/MessageScreen';


function MessageComponent({ personName, messageDate, backColor,navigation }) {

    const [showPassword, setShowPassword] = useState(true);

    const screenWidth = Dimensions.get('window').width;

    const [fontsLoaded] = useFonts({
        'Kaushan': require('./assets/fonts/KaushanScript-Regular.ttf'),
        "Allura": require('./assets/fonts/Allura-Regular.ttf'),
        "Montserrat-Black": require('./assets/fonts/Montserrat-Black.ttf'),
        "Montserrat-BlackItalic": require('./assets/fonts/Montserrat-BlackItalic.ttf'),
        "Montserrat-Bold": require('./assets/fonts/Montserrat-Bold.ttf'),
        "Montserrat-BoldItalic": require('./assets/fonts/Montserrat-BoldItalic.ttf'),
        "Montserrat-Italic": require('./assets/fonts/Montserrat-Italic.ttf'),
        "Montserrat-Light": require('./assets/fonts/Montserrat-Light.ttf'),
        "Montserrat-LightItalic": require('./assets/fonts/Montserrat-LightItalic.ttf'),
        "Montserrat-Medium": require('./assets/fonts/Montserrat-Medium.ttf'),
        "Montserrat-MediumItalic": require('./assets/fonts/Montserrat-MediumItalic.ttf'),
        "Montserrat-Regular": require('./assets/fonts/Montserrat-Regular.ttf'),
        "Montserrat-Thin": require('./assets/fonts/Montserrat-Thin.ttf'),
        "Montserrat-SemiBold": require('./assets/fonts/Montserrat-SemiBold.ttf'),
        "Montserrat-SemiBoldItalic": require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
        "Montserrat-ThinItalic": require('./assets/fonts/Montserrat-ThinItalic.ttf'),
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

        <TouchableOpacity onPress={()=>{navigation.navigate("MessageScreen")}} activeOpacity={0.60} style={[styles.MessageComponentContainer, { backgroundColor: backColor }]}>

            <View style={styles.MessageImageContainer}>
                <Image
                    source={require("./event.jpg")}
                    style={{ width: "100%", height: "100%", borderRadius: 100 }}
                    resizeMode='cover'
                />

            </View>

            <View style={{ justifyContent: "center", flex: 1, padding: 5, alignItems: "center", margin: 5, }}>


                <View style={{ width: "100%", flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                    <Text style={styles.personNameText} fontSize="xs">{personName}</Text>
                    <Text style={{ fontSize: 12, color: "grey" }} fontSize="xs">{messageDate}</Text>
                </View>

                <View style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", columnGap: 1 }}>
                    <Ionicons style={{ fontSize: 19 }} color={"grey"} name="checkmark-done" />
                    <Text numberOfLines={1} style={{ fontSize: 13, flex: 1 }}>Hello World! Hello World!</Text>
                </View>


            </View>





        </TouchableOpacity>


    )

}

export default MessageComponent;