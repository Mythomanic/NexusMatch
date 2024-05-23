import React, { useState, useCallback, Component, useEffect } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import BottomBar from '../pages/BottomBar';
import TopBar from '../pages/TopBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel'
import MessageComponent from '../MessageComponent';
import Accordion from 'react-native-collapsible/Accordion';
import { Tag } from 'react-native-btr';
import { Dialog } from 'react-native-ui-lib';
import Modal from "react-native-modal";

function Create({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);
    const screenWidth = Dimensions.get('window').width;

    const [createCategory, setcreateCategory] = useState(0)

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

    //İş Stateleri

    const [companyName, setcompanyName] = useState();
    const [jobPosition, setjobPosition] = useState();
    const [skills, setskills] = useState([]);
    const [experience, setexperience] = useState();
    const [jobwage, setjobwage] = useState();
    const [workingstyle, setworkingstyle] = useState();


    return (

        <SafeAreaView style={styles.SafeAreaView}>

            <TopBar title={"Oluştur"} titleFont={"Montserrat-SemiBold"} navigation={navigation} backColor={"#3F51B5"}></TopBar>

            <View style={{ width: "100%", flex: 1, alignItems: "center", }}>

                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", margin: 10 }}>
                    <Text >Oluşturmak istediğiniz kategoriyi seçiniz:</Text>
                </View>

                <View style={{ minHeight: 30, width: "100%", alignItems: "center", justifyContent: "space-evenly", flexDirection: "row", columnGap: 20, margin: 10, paddingHorizontal: 15, }}>
                    <TouchableOpacity onPress={() => { setcreateCategory(0) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#3F51B5dd", "#03A9F4bb"]} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                            <Text style={{ fontSize: 13, color: "black" }}>İş</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setcreateCategory(1) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#FF6B6B", "#FFD166"]} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                            <Text style={{ fontSize: 13, color: "black" }}>İlişki</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setcreateCategory(2) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#4CAF50", "#8BC34A"]} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 10, }}>
                            <Text style={{ fontSize: 13, color: "black" }}>Etkinlik</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {createCategory == 0 ? (

                    <View style={{ flex: 1, width: "100%", margin: 10 }}>

                        <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", padding: 10, rowGap: 15, }} showsVerticalScrollIndicator={false}>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Şirket adı'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aday iş pozisyonu adı (Örn: Yazılımcı)'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aranılan yetenekler'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aranılan Deneyim'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Maaş aralığı'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Çalışma stili (Ofis / Hibrit / Remote)'></TextInput>
                            </View>

                            <TouchableOpacity onPress={() => { }} style={{ padding: 10, paddingHorizontal: 25, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#03A9F4bb" }}>
                                <Text style={{ color: "#03A9F4bb", fontWeight: "bold" }} fontSize="xs">Oluştur</Text>
                            </TouchableOpacity>

                        </ScrollView>



                    </View>

                ) : createCategory == 1 ? (

                    <View style={{ flex: 1, width: "100%", margin: 10 }}>

                        <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", padding: 10, rowGap: 15, }} showsVerticalScrollIndicator={false}>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Şirket adı'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aday iş pozisyonu adı (Örn: Yazılımcı)'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aranılan yetenekler'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aranılan Deneyim'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Maaş aralığı'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Çalışma stili (Ofis / Hibrit / Remote)'></TextInput>
                            </View>

                            <TouchableOpacity onPress={() => { }} style={{ padding: 10, paddingHorizontal: 25, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#FF6B6Bbb" }}>
                                <Text style={{ color: "#FF6B6Bbb", fontWeight: "bold" }} fontSize="xs">Oluştur</Text>
                            </TouchableOpacity>

                        </ScrollView>



                    </View>

                ) : (
                    <View style={{ flex: 1, width: "100%", margin: 10 }}>

                        <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", padding: 10, rowGap: 15, }} showsVerticalScrollIndicator={false}>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Şirket adı'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aday iş pozisyonu adı (Örn: Yazılımcı)'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aranılan yetenekler'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Aranılan Deneyim'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Maaş aralığı'></TextInput>
                            </View>

                            <View style={styles.CreateContentContainer}>
                                <TextInput style={{ width: "100%", paddingHorizontal: 10, fontSize: 13 }} placeholder='Çalışma stili (Ofis / Hibrit / Remote)'></TextInput>
                            </View>

                            <TouchableOpacity onPress={() => { }} style={{ padding: 10, paddingHorizontal: 25, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#4CAF50bb" }}>
                                <Text style={{ color: "#4CAF50bb", fontWeight: "bold" }} fontSize="xs">Oluştur</Text>
                            </TouchableOpacity>

                        </ScrollView>



                    </View>
                )
                }



            </View>


            <BottomBar selectMenu={2} navigation={navigation} ></BottomBar>
        </SafeAreaView>

    )
}

export default Create;