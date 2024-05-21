import React, { useState, useCallback } from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Image, ImageBackground, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import { signup } from './apiService';


function SignUp({ navigation, route }) {

    const BASE_URL = 'https://nexusmain.onrender.com/api';


    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const [message, setMessage] = useState();

    const handleSignup = async () => {
        const response = await signup(name, email, password, passwordConfirmation);
        if (response.status == 200) {
            setMessage('User Created Successfully');
            // Handle successful signup (e.g., navigate to another screen)
            console.log('User Created Successfully');
            navigation.navigate("Login");
        } else {
            setMessage(response.message);
            console.log(response.message);
        }
    };

    /*  <View>
     <TextInput
       placeholder="Name"
       value={name}
       onChangeText={setName}
     />
     <TextInput
       placeholder="Email"
       value={email}
       onChangeText={setEmail}
     />
     <TextInput
       placeholder="Password"
       value={password}
       onChangeText={setPassword}
       secureTextEntry */

    const [rememberCheckbox, setRememberCheckbox] = useState(false);
    const { requestType } = route.params;

    const EyeNoEye = ({ placeholder, id, onChangeTextFunction, value }) => {
        const [showPassword, setShowPassword] = useState(true);
        return (
            <>
                <TextInput value={value} onChangeText={() => { onChangeTextFunction }} multiline={false} id={id} secureTextEntry={showPassword} keyboardType='default' placeholder={placeholder} placeholderTextColor={requestType === 1 ? "#1161a8" : "#a6026b"} style={{ width: "75%" }} />

                <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }} style={{ position: "absolute", width: 25, height: 25, alignItems: "center", justifyContent: "center", right: 0, }}>
                    <Entypo style={{ fontSize: 20, color: requestType === 1 ? "#1161a8" : "#a6026b" }} name={showPassword === true ? "eye-with-line" : "eye"} />
                </TouchableOpacity>

            </>
        )
    }

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

        <SafeAreaView style={[styles.SafeAreaView, { backgroundColor: requestType === 1 ? "#1161a8" : "#7c0150", padding: 17.5 }]}>
            <View style={{ width: "100%", padding: 10, alignItems: "center", flex: 1, backgroundColor: "white", borderRadius: 20 }}>

                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.GoBackBar}>
                    <Ionicons name="arrow-back-circle-outline" size={34} color={requestType === 1 ? "#1161a8" : "#a6026b"} />
                </TouchableOpacity>

                <View style={styles.SignUpBar}>
                    <Text style={{ fontSize: 27, fontFamily: "Montserrat-SemiBoldItalic", color: requestType === 1 ? "#1161a8" : "#a6026b" }}>Kayıt Ol</Text>
                </View>

                <View style={styles.SozlesmeBar}>
                    <Text style={{ fontSize: 12, color: requestType === 1 ? "#1161a8" : "#a6026b", fontFamily: "Montserrat-MediumItalic" }}>Kayıt olarak </Text>
                    <TouchableOpacity><Text style={{ fontSize: 12, color: "#003366", fontFamily: "Montserrat-MediumItalic", textDecorationLine: "underline" }}>Kullanıcı Sözleşmesi </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, color: requestType === 1 ? "#1161a8" : "#a6026b", fontFamily: "Montserrat-MediumItalic" }}> ve </Text>
                    <TouchableOpacity><Text style={{ fontSize: 12, color: "#003366", fontFamily: "Montserrat-MediumItalic", textDecorationLine: "underline" }}>Gizlilik Politikası</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, color: requestType === 1 ? "#1161a8" : "#a6026b", fontFamily: "Montserrat-MediumItalic" }}>'nı kabul edersiniz.</Text>
                </View>

                <View style={styles.EmailPasswordContainerSignUp}>

                    <View style={styles.SignupInputContainer}>
                        <Feather name="mail" style={{ fontSize: 20, color: requestType === 1 ? "#1161a8" : "#a6026b" }} />
                        <TextInput value={email} onChangeText={() => { setEmail }} id='kayitemail' keyboardType='email-address' placeholder='E-posta' placeholderTextColor={requestType === 1 ? "#1161a8" : "#a6026b"} style={{ width: "100%" }} />
                    </View>

                    <View style={styles.SignupInputContainer}>
                        <Feather name="user" style={{ fontSize: 20, color: requestType === 1 ? "#1161a8" : "#a6026b" }} />
                        <TextInput value={name} onChangeText={() => { setName }} id='kayitnick' keyboardType='default' placeholder='Kullanıcı Adı' placeholderTextColor={requestType === 1 ? "#1161a8" : "#a6026b"} style={{ width: "100%" }} />
                    </View>

                    <View style={styles.SignupInputContainer}>
                        <Feather name="lock" style={{ fontSize: 20, color: requestType === 1 ? "#1161a8" : "#a6026b" }} />


                        <EyeNoEye value={password} onChangeTextFunction={setPassword} placeholder={"Şifre"} id={"kayitsifre"} />

                        {/* <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }} style={{ position: "absolute", width: 25, height: 25, alignItems: "center", justifyContent: "center", right: 0, }}>
                            <Entypo style={{ fontSize: 20, color: requestType === 1 ? "#1161a8" : "#a6026b" }} name={showPassword === true ? "eye-with-line" : "eye"} />
                        </TouchableOpacity> */}
                    </View>

                    <View style={styles.SignupInputContainer}>
                        <Feather name="lock" style={{ fontSize: 20, color: requestType === 1 ? "#1161a8" : "#a6026b" }} />

                        {/*                         <TextInput id='kayitsifretekrar' secureTextEntry={showPassword} keyboardType='default' placeholder='Şifre Tekrar' placeholderTextColor={requestType === 1 ? "#1161a8" : "#a6026b"} style={{ width: "100%" }} />
 */}
                        <EyeNoEye value={passwordConfirmation} onChangeTextFunction={setPasswordConfirmation} placeholder={"Şifre Tekrar"} id={"kayitsifretekrar"} />

                        {/* <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }} style={{ position: "absolute", width: 25, height: 25, alignItems: "center", justifyContent: "center", right: 0, }}>
                            <Entypo style={{ fontSize: 20, color: requestType === 1 ? "#1161a8" : "#a6026b" }} name={showPassword === true ? "eye-with-line" : "eye"} />
                        </TouchableOpacity> */}
                    </View>

                </View>

                <View style={styles.SignUpButtonContainer}>
                    <TouchableOpacity onPress={() => { handleSignup() }} style={[styles.LoginButton, { backgroundColor: requestType === 1 ? "#0386d0" : "#7c0150" }]}>
                        <Text style={{ color: "white", fontSize: 16, fontFamily: "Montserrat-Medium" }}>Kayıt Ol</Text>
                    </TouchableOpacity>

                    {/* <View>
                        <Text style={{ fontSize: 12, color: "grey" }}>veya</Text>
                    </View>

                    <TouchableOpacity onPress={() => { navigation.navigate("Login") }} style={[styles.RegisterButton, { borderColor: requestType === 1 ? "#1161a8" : "#a6026b" }]}>
                        <Text style={{ color: requestType === 1 ? "#1161a8" : "#a6026b", fontSize: 16, fontFamily: "Montserrat-Medium" }}>Giriş Yap</Text>
                    </TouchableOpacity> */}
                </View>





            </View>

        </SafeAreaView>
    )
};
export default SignUp