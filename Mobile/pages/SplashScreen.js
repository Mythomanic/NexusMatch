import React from 'react'
import { StatusBar, TouchableOpacity } from 'react-native';
import { View, Image, ImageBackground, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

function SplashScreen({ navigation }) {


    return (
        <>
            <StatusBar></StatusBar>
            <LinearGradient
                colors={["#56CCF2", "#1161a8",]}
                style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", }
                }
                start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 1 }}>
                <TouchableOpacity onPress={() => { navigation.navigate("Login") }} style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center", }}>
                    <Image
                        resizeMode='contain'
                        style={{ width: "65%", height: "30%" }}
                        source={require("../img/nexuslogo.png")}>
                    </Image>
                </TouchableOpacity>
            </LinearGradient >

        </>

    )

}

export default SplashScreen;