import React, { useState, useCallback } from 'react'
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
import { CollapsibleCard } from "react-native-btr";


function EditProfile({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);

    const screenWidth = Dimensions.get('window').width;

    const insets = useSafeAreaInsets();

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
        <SafeAreaProvider>

            <SafeAreaView style={[styles.SafeAreaView, { backgroundColor: "white" }]}>

                {/* <TopBar navigation={navigation} backColor={"#3F51B5"} title={"İşlerim"}></TopBar> */}

                <ImageBackground source={require("../profilebg.png")} resizeMode='cover' style={{ width: "100%", flex: 1, alignItems: "center", }}>


                    <View style={{ width: "100%", minHeight: 135, borderBottomLeftRadius: 100, borderBottomRightRadius: 100, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>

                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: "absolute", left: "10%", top: "10%", alignItems: "center", justifyContent: "center" }}>
                            <Ionicons size={40} name="chevron-back-circle-outline" />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: 110, height: 110, borderRadius: 100, borderColor: "darkgrey", backgroundColor: "white", borderWidth: 1, alignItems: "center", justifyContent: "center" }}>
                            
                        </TouchableOpacity>

                    </View>

                    <View style={styles.ProfileOptionsContainerEdit}>

                        <TouchableOpacity style={[styles.EditProfileOptions, { borderWidth: 1 }]}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center", justifyContent: "center", minWidth: 25 }}>
                                    <FontAwesome size={18} name="edit" />
                                </View>
                                <Text fontSize="xs">Profili Düzenle</Text>
                            </View>

                            <View style={{}}>
                                <Entypo size={20} name="chevron-right" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.EditProfileOptions, { borderWidth: 1 }]}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center", justifyContent: "center", minWidth: 25 }}>
                                    <FontAwesome size={18} name="photo" />
                                </View>
                                <Text fontSize="xs">Galeriyi Düzenle</Text>
                            </View>

                            <View style={{}}>
                                <Entypo size={20} name="chevron-right" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.EditProfileOptions, { borderWidth: 1 }]}>

                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center", justifyContent: "center", minWidth: 25 }}>
                                    <FontAwesome size={20} name="lock" />
                                </View>
                                <Text fontSize="xs">Şifre Değiştir</Text>
                            </View>

                            <View style={{}}>
                                <Entypo size={20} name="chevron-right" />
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.EditProfileOptions, { borderWidth: 1 }]}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center", justifyContent: "center", minWidth: 25 }}>
                                    <Ionicons size={20} name="notifications" />
                                </View>
                                <Text fontSize="xs">Bildirim Ayarları</Text>
                            </View>

                            <View style={{}}>
                                <Entypo size={20} name="chevron-right" />
                            </View>
                        </TouchableOpacity>




                    </View>


                    <View style={styles.DeleteAccountContainer}>
                        <TouchableOpacity style={styles.ProfileOptionsDelete}>
                            <View style={{ alignItems: "center", justifyContent: "center", minWidth: 25 }}>
                                <FontAwesome color={"red"} size={18} name="close" />
                            </View>
                            <Text style={{ color: "red" }} fontSize="xs">Hesabı Sil</Text>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>

            </SafeAreaView>
        </SafeAreaProvider>

    )
}
export default EditProfile;
