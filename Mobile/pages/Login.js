import React, { useState, useCallback, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Image, ImageBackground, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import axios from 'axios';
import { signup } from './apiService';

function Login({ navigation }) {

   /*  const [users, setUsers] = useState([])

    const BASE_URL = 'https://nexusmain.onrender.com/api/user';

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(BASE_URL);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUser();
    }, []);
 */

    /* {users.map(user => (
        <Text key={user.id}>{user.name}</Text>
    ))} */

    const [showPassword, setShowPassword] = useState(true);
    const [rememberCheckbox, setRememberCheckbox] = useState(false);
    const [requestType, setRequestType] = useState(1);

    /*  useEffect(() => {
         console.log(requestType);
     }, [requestType]);
  */


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

        <SafeAreaView style={[styles.SafeAreaView, { backgroundColor: requestType === 1 ? "#1161a8" : "#7c0150", padding: 17.5, }]}>



            <View style={{ width: "100%", padding: 10, alignItems: "center", flex: 1, backgroundColor: "white", borderRadius: 20, }}>

                <View style={styles.LoginBar}>
                    <Text style={{ fontSize: 27, fontFamily: "Montserrat-SemiBoldItalic", color: requestType === 1 ? "#1161a8" : "#a6026b" }}>Giriş Yap</Text>

                </View>

                <View style={styles.SozlesmeBar}>
                    <Text style={{ fontSize: 12, color: requestType === 1 ? "#1161a8" : "#a6026b", fontFamily: "Montserrat-MediumItalic" }}>Giriş yaparak </Text>
                    <TouchableOpacity><Text style={{ fontSize: 12, color: "#003366", fontFamily: "Montserrat-MediumItalic", textDecorationLine: "underline" }}>Kullanıcı Sözleşmesi</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, color: requestType === 1 ? "#1161a8" : "#a6026b", fontFamily: "Montserrat-MediumItalic" }}> ve </Text>
                    <TouchableOpacity><Text style={{ fontSize: 12, color: "#003366", fontFamily: "Montserrat-MediumItalic", textDecorationLine: "underline" }}>Gizlilik Politikası</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, color: requestType === 1 ? "#1161a8" : "#a6026b", fontFamily: "Montserrat-MediumItalic" }}>'nı kabul edersiniz.</Text>
                </View>
                {/* 
                <View style={styles.HizmetTipiStateBar}>

                    <TouchableOpacity style={{ width: "35%", alignItems: "center", justifyContent: "center", borderRadius: 5, backgroundColor: requestType === 1 ? "#0386d0" : "white", padding: 2 }} onPress={() => { [setRequestType(1), console.log(requestType)] }}>
                        <Text style={{ color: requestType === 1 ? "white" : "#003366", fontSize: 13 }}>İstek Atan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: "35%", alignItems: "center", justifyContent: "center", borderRadius: 5, backgroundColor: requestType === 2 ? "#a6026b" : "white", padding: 2 }} onPress={() => { [setRequestType(2), console.log(requestType)] }}>
                        <Text style={{ color: requestType === 2 ? "white" : "#003366", fontSize: 13 }}>İstek Açan</Text>
                    </TouchableOpacity>

                </View> */}



                <View style={styles.RequesterLogin}>

                    <View style={styles.EmailPasswordContainer}>

                        <View style={styles.LoginInputContainer}>
                            <Feather name="mail" style={{ fontSize: 20, color: requestType === 1 ? "#1161a8" : "#a6026b" }} />
                            <TextInput id='girisemail' keyboardType='email-address' placeholder='E-posta' placeholderTextColor={requestType === 1 ? "#1161a8" : "#a6026b"} style={{ width: "100%" }} />

                        </View>

                        <View style={styles.LoginInputContainer}>
                            <Feather name="lock" style={{ fontSize: 20, color: requestType === 1 ? "#1161a8" : "#a6026b" }} />

                            <TextInput id='girissifre' secureTextEntry={showPassword} keyboardType='default' placeholder='Şifre' placeholderTextColor={requestType === 1 ? "#1161a8" : "#a6026b"} style={{ width: "100%" }} />

                            <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }} style={{ position: "absolute", width: 25, height: 25, alignItems: "center", justifyContent: "center", right: 0, }}>
                                <Entypo style={{ fontSize: 20, color: requestType === 1 ? "#1161a8" : "#a6026b" }} name={showPassword === true ? "eye-with-line" : "eye"} />
                            </TouchableOpacity>


                        </View>

                    </View>

                    <View style={styles.RememberForgotPasswordContainer}>

                        <TouchableOpacity onPress={() => { setRememberCheckbox(!rememberCheckbox) }} style={{ flex: 1, flexDirection: "row", columnGap: 7.5 }}>
                            <View style={{ width: 18, height: 18, borderRadius: 5, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: requestType === 1 ? "#1161a8" : "#a6026b" }}>

                                {rememberCheckbox
                                    ? null :
                                    <Entypo style={{ fontSize: 13, color: requestType === 1 ? "#1161a8" : "#a6026b" }} name="check" />
                                }

                            </View>

                            <View>
                                <Text style={{ fontSize: 12, color: requestType === 1 ? "#1161a8" : "#a6026b" }}>Beni hatırla</Text>
                            </View>

                        </TouchableOpacity>

                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 12, textDecorationLine: "underline", color: requestType === 1 ? "#1161a8" : "#a6026b" }}>Şifremi Unuttum</Text>
                            </TouchableOpacity>
                        </View>



                    </View>


                    <View style={styles.LoginButtonContainer}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Homepage") }} style={[styles.LoginButton, { backgroundColor: requestType === 1 ? "#0386d0" : "#7c0150" }]}>
                            <Text style={{ color: "white", fontSize: 16, fontFamily: "Montserrat-Medium" }}>Giriş Yap</Text>
                        </TouchableOpacity>

                        <View>
                            <Text style={{ fontSize: 12, color: "grey" }}>veya</Text>
                        </View>


                        <TouchableOpacity onPress={() => { navigation.navigate("SignUp", { requestType }) }} style={[styles.RegisterButton, { borderColor: requestType === 1 ? "#1161a8" : "#a6026b" }]}>
                            <Text style={{ color: requestType === 1 ? "#1161a8" : "#a6026b", fontSize: 16, fontFamily: "Montserrat-Medium" }}>Kayıt Ol</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: "100%", height: "100%" }}
                            source={require("../img/coworkimg.png")}

                        />

                    </View>



                </View>

            </View >

        </SafeAreaView >
    )
}
export default Login;