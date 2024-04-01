import React, { useState, useCallback } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import BottomBar from '../pages/BottomBar';
import TopBar from '../pages/TopBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel'
import MessageComponent from '../MessageComponent';


function SearchBarComponent({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);

    const screenWidth = Dimensions.get('window').width;

    return (

        <View style={styles.SearchBarComponent}>
            <View style={{ position: "absolute", width: 35, alignItems: "center", justifyContent: "center", top: 0, bottom: 0, left: 0, zIndex: 2, marginHorizontal: 15 }}>
                <Fontisto size={20} name={"search"} />
            </View>

            <TextInput placeholderTextColor={"black"} style={{ width: "100%", borderRadius: 100, backgroundColor: "#9f9f9faa", fontSize: 11, minHeight: 35, paddingHorizontal: 35 }} placeholder='Arama Yapın...' />
        </View>

    )
}
export default SearchBarComponent