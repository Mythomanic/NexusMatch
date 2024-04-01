import React, { useState, useCallback } from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Image, ImageBackground, Text, ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign, Fontisto, Octicons } from "react-native-vector-icons"

function BottomBar({ navigation, selectMenu, topbarColor }) {

    const defaultTopbarColor = "#1161a8";

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

        <View style={{ width: "100%", height: 55, borderTopColor: topbarColor ? topbarColor : defaultTopbarColor, borderTopWidth: 2, flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>

            <View style={{ width: "100%", height: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-around", padding: 5 }}>

                <TouchableOpacity onPress={() => { navigation.navigate("Homepage") }} style={{ alignItems: "center", justifyContent: "center", flex: 1, }}>

                    {selectMenu === 0 ? (
                        <>
                            <View style={{ width: 30, height: 30, alignItems: "center", justifyContent: "center", }}>
                                <FontAwesome5 style={{ color: "#1161a8", fontSize: 23 }} name="home"></FontAwesome5>

                            </View>
                            <Text style={{ color: "#1161a8", fontSize: 10 }}>Anasayfa</Text>
                        </>
                    ) : (
                        <>
                            <View style={{}}>
                                <FontAwesome5 style={{ color: "#9f9f9f", fontSize: 23 }} name="home"></FontAwesome5>
                            </View>
                            <Text style={{ color: "#9f9f9f", fontSize: 10 }}>Anasayfa</Text>
                        </>
                    )
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate("Requester") }} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>

                    {selectMenu === 1 ? (
                        <>
                            <View style={{ width: 30, height: 30, alignItems: "center", justifyContent: "center", }}>
                                <MaterialCommunityIcons style={{ color: "#1161a8", fontSize: 23 }} name="puzzle"></MaterialCommunityIcons>
                            </View>
                            <Text style={{ color: "#1161a8", fontSize: 10 }}>Eşleşmelerim</Text>
                        </>
                    ) : (
                        <>
                            <MaterialCommunityIcons style={{ color: "#9f9f9f", fontSize: 23 }} name="puzzle"></MaterialCommunityIcons>
                            <Text style={{ color: "#9f9f9f", fontSize: 10 }}>Eşleşmelerim</Text>
                        </>
                    )
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>

                    {selectMenu === 2 ? (
                        <>
                            <View style={{ width: 30, height: 30, alignItems: "center", justifyContent: "center", }}>
                                <AntDesign style={{ color: "#a6026b", fontSize: 27 }} name="pluscircleo"></AntDesign>
                            </View>
                            <Text style={{ color: "#a6026b", fontSize: 11 }}>Oluştur</Text>
                        </>
                    ) : (
                        <>
                            <AntDesign style={{ color: "#a6026b", fontSize: 28 }} name="pluscircleo"></AntDesign>
                            <Text style={{ color: "#a6026b", fontSize: 11 }}>Oluştur</Text>
                        </>
                    )
                    }
                </TouchableOpacity>



                <TouchableOpacity onPress={() => { navigation.navigate("Search") }} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>

                    {selectMenu === 3 ? (
                        <>
                            <View style={{ width: 30, height: 30, alignItems: "center", justifyContent: "center", }}>
                                <FontAwesome5 style={{ color: "#1161a8", fontSize: 20 }} name="search"></FontAwesome5>

                            </View>
                            <Text style={{ color: "#1161a8", fontSize: 10 }}>Arama</Text>
                        </>
                    ) : (
                        <>
                            <FontAwesome5 style={{ color: "#9f9f9f", fontSize: 20 }} name="search"></FontAwesome5>
                            <Text style={{ color: "#9f9f9f", fontSize: 10 }}>Arama</Text>
                        </>
                    )
                    }

                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate("Profile") }} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>

                    {selectMenu === 4 ? (
                        <>
                            <View style={{ width: 30, height: 30, alignItems: "center", justifyContent: "center", }}>
                                <FontAwesome5 style={{ color: "#1161a8", fontSize: 20 }} name="user-alt"></FontAwesome5>

                            </View>
                            <Text style={{ color: "#1161a8", fontSize: 10 }}>Profil</Text>
                        </>
                    ) : (
                        <>
                            <FontAwesome5 style={{ color: "#9f9f9f", fontSize: 20 }} name="user-alt"></FontAwesome5>
                            <Text style={{ color: "#9f9f9f", fontSize: 10 }}>Profil</Text>
                        </>
                    )
                    }

                </TouchableOpacity>

            </View>


        </View>

    )
}
export default BottomBar;

