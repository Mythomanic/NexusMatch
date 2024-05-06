import React, { useState, useCallback } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel'
import Collapsible from 'react-native-collapsible';

function JobList({ navigation }) {

    const [showPassword, setShowPassword] = useState(true);


    const screenWidth = Dimensions.get('window').width;

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

    function ListCategoryContainer() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#3F51B5dd", "#03A9F4bb"]} style={styles.CategoryListItemContainer}>

                <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center", }}>

                    <Image
                        resizeMode='cover'
                        style={{ width: "100%", flex: 1, height: "100%", maxHeight: 65, alignItems: "center", justifyContent: "center", borderRadius: 10 }}
                        source={{
                            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAk1BMVEUAAAD////6+/oMDAz29vbx8vGys7KRk5Cmp6WhoaHq6upTVFPe397Oz80xNDHIyciHiIYoKSfU1dRNT0x8fXtZW1gkJSRnZ2TAv76LhoUxMDEACA+WmZs4OzhSVlFzdnNCREIACAEUFRMWGhQwLSQaGBI5NzIvKiopIyEZFBROSUpzcG8MAABDQESUkZQsLykjKy3486KgAAAEWUlEQVR4nO2c7VbiMBCGaZp+hdRCaW1xwSLquoqr3v/VLQUUaAse2ilvcef55zHnOK+ZmWQmSXs9hmEYhmEYhmEYhmEYhmEYhmEYhmEYCqaR00fbQMOtrZUlJ2gzKIi0NHJctCHNyZSx4eLF9H3D+CFirgdyq8Xw0OY04srekWIIB21PE2bprhbDitAGNWAU7GkxdIy2qD5XBS1GcI02qTZ3dkGLuOBktpfHctQCbVJt+mFBixGiTapNyckMOUDbVJuFVRSj0SbVZliaGHG5i0xcmhgfbVJt5l5RizVD21SbG10Uc7nR3xsVtVzwetkbFLTYQ7RF9TH3d8tGeoW2qAFm+GPmZSlG7UixLrokW4rZrjLSv+AiZsWXGBle0rQMR4tosCRKRjuBYa6WGakD56scu5vG2XKkM4iyfifTwXXmpaGSYolUYepFs80vTDcMUteJ7zc/z2PHDrQlxXKLJq0wdaN3kMmHmHr+bpznoR7a0XoqpqPZtkQeeYEW+yOV745Qdlcwd4sGrvVoO9kbdx+llQOFtjvjbZmqsvBTz2ITP8NFqkrb5+30dGS/lh6Usv63S6VDPw+n48PCDoROrI7aeAJWBpZiDg57zskIz0RqmTvFFlIzNS6wM0isZYk7h4kptfaaA/O0jDBePkGddEzJ8tgOFmi98b837WTSGBM0Dr0U4YGy2QN98OMO0+idTMF2AAl5JgMeDKTfW3ciuNbgbanl2pQApqXnUYe/9QDT8kjuZcDaLKH2Mv2IE0O+W06+/5ut4RJrUVOclt/UIeMAS8yYOGQE0suoCxmNbAIWz8KaYt8AxVDv/j1c5U8vBtrNLB3sNwN6X8OkFoNsZbKYY2J+kptBEwC5GORuhjqbGch+Ofk6EwA3zb03YjEW8mEQ9d7MQObmiLrQtIFBk1D3/yUwaMp3rpsyxol5Iu80WcAigLqhAX3nNCEXY/yBicnoTwD9Z5SYF/IMAHS0V/oTDUPAMpp7/FZPLWCngIufdGz+RH7YlCM8TBZoIWhygieEmPJjJSIQl2deW/GzHDmenl1P6ekVHersvvZCf0Pjk/TcWnq9FjYBa8TL+cUkbYmB3AhoY93M+YsQM25HC+bZ43M7Sw0gYnKo22crUHdohm1EDSRiclqIGhdWcM7I1xoFipgc6tamGL/ixNwQVwIp8kIAcaMW/GEN0yNsBggX+uRk6WiEOSCEOlkOnaOpDjyvpeo6iU58VovI0brxXY13EkdTHfl204LA0WQHAmYNwVF6R96c5jQ+fOpE8G+4bth4Aj4CrOCjkRrodZMKDs+NpVPX81w7PZT0BPSKZjVOVU7TTn8+N9fMP7K0omSQb2jLqyhd3bbs8l2FcXGQ7uoHdb2dDwNI5Va/ic/0tqsjVJfSWIFfE18ry1JKB4NfB0fFdrgapf3J4UGdYJpEg+z24/ggc5REUTI7i0EMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAM8x/wDxgoPuJUW6/wAAAAAElFTkSuQmCC"
                        }}

                    />

                </View>

                <View style={{ flex: 4.5, height: "100%", justifyContent: "space-around" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>Senior Software Engineer</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                        <View style={{ flexDirection: "row", columnGap: 5 }}>
                            <Text style={{ fontSize: 13, color: "black" }}>Apple</Text>
                            <Text style={{ fontSize: 13, color: "black" }}>|</Text>
                            <Text style={{ fontSize: 13, color: "black" }}>Tam Zamanlı</Text>

                        </View>

                        <Text style={{ fontSize: 11, color: "red" }}>17 Gün Kaldı</Text>
                    </View>



                </View>

            </LinearGradient >
        )
    }

    function ListCategoryContainerExpanded() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#3F51B5dd", "#03A9F4bb"]} style={styles.CategoryListItemContainerExpanded}>

                <View style={{ flex: 1, justifyContent: "center", }}>

                    <View style={{ flex: 2, width: "90%", justifyContent: "center", paddingHorizontal: 10, }}>

                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: 17 }}>Senior Software Engineer</Text>
                        </View>

                        <View style={{ flexDirection: "row", columnGap: 10 }}>
                            <View>
                                <Text style={{ fontSize: 13 }}>$40-90k/year</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 13 }}>Full Time</Text>
                            </View>
                        </View>

                    </View>



                    <View style={{ flex: 2, width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, columnGap: 10 }}>

                        <Image
                            resizeMode='cover'
                            style={{ width: 55, height: 55, alignItems: "center", justifyContent: "center", borderRadius: 10 }}
                            source={{
                                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAk1BMVEUAAAD////6+/oMDAz29vbx8vGys7KRk5Cmp6WhoaHq6upTVFPe397Oz80xNDHIyciHiIYoKSfU1dRNT0x8fXtZW1gkJSRnZ2TAv76LhoUxMDEACA+WmZs4OzhSVlFzdnNCREIACAEUFRMWGhQwLSQaGBI5NzIvKiopIyEZFBROSUpzcG8MAABDQESUkZQsLykjKy3486KgAAAEWUlEQVR4nO2c7VbiMBCGaZp+hdRCaW1xwSLquoqr3v/VLQUUaAse2ilvcef55zHnOK+ZmWQmSXs9hmEYhmEYhmEYhmEYhmEYhmEYhmEYCqaR00fbQMOtrZUlJ2gzKIi0NHJctCHNyZSx4eLF9H3D+CFirgdyq8Xw0OY04srekWIIB21PE2bprhbDitAGNWAU7GkxdIy2qD5XBS1GcI02qTZ3dkGLuOBktpfHctQCbVJt+mFBixGiTapNyckMOUDbVJuFVRSj0SbVZliaGHG5i0xcmhgfbVJt5l5RizVD21SbG10Uc7nR3xsVtVzwetkbFLTYQ7RF9TH3d8tGeoW2qAFm+GPmZSlG7UixLrokW4rZrjLSv+AiZsWXGBle0rQMR4tosCRKRjuBYa6WGakD56scu5vG2XKkM4iyfifTwXXmpaGSYolUYepFs80vTDcMUteJ7zc/z2PHDrQlxXKLJq0wdaN3kMmHmHr+bpznoR7a0XoqpqPZtkQeeYEW+yOV745Qdlcwd4sGrvVoO9kbdx+llQOFtjvjbZmqsvBTz2ITP8NFqkrb5+30dGS/lh6Usv63S6VDPw+n48PCDoROrI7aeAJWBpZiDg57zskIz0RqmTvFFlIzNS6wM0isZYk7h4kptfaaA/O0jDBePkGddEzJ8tgOFmi98b837WTSGBM0Dr0U4YGy2QN98OMO0+idTMF2AAl5JgMeDKTfW3ciuNbgbanl2pQApqXnUYe/9QDT8kjuZcDaLKH2Mv2IE0O+W06+/5ut4RJrUVOclt/UIeMAS8yYOGQE0suoCxmNbAIWz8KaYt8AxVDv/j1c5U8vBtrNLB3sNwN6X8OkFoNsZbKYY2J+kptBEwC5GORuhjqbGch+Ofk6EwA3zb03YjEW8mEQ9d7MQObmiLrQtIFBk1D3/yUwaMp3rpsyxol5Iu80WcAigLqhAX3nNCEXY/yBicnoTwD9Z5SYF/IMAHS0V/oTDUPAMpp7/FZPLWCngIufdGz+RH7YlCM8TBZoIWhygieEmPJjJSIQl2deW/GzHDmenl1P6ekVHersvvZCf0Pjk/TcWnq9FjYBa8TL+cUkbYmB3AhoY93M+YsQM25HC+bZ43M7Sw0gYnKo22crUHdohm1EDSRiclqIGhdWcM7I1xoFipgc6tamGL/ixNwQVwIp8kIAcaMW/GEN0yNsBggX+uRk6WiEOSCEOlkOnaOpDjyvpeo6iU58VovI0brxXY13EkdTHfl204LA0WQHAmYNwVF6R96c5jQ+fOpE8G+4bth4Aj4CrOCjkRrodZMKDs+NpVPX81w7PZT0BPSKZjVOVU7TTn8+N9fMP7K0omSQb2jLqyhd3bbs8l2FcXGQ7uoHdb2dDwNI5Va/ic/0tqsjVJfSWIFfE18ry1JKB4NfB0fFdrgapf3J4UGdYJpEg+z24/ggc5REUTI7i0EMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAM8x/wDxgoPuJUW6/wAAAAAElFTkSuQmCC"
                            }}
                        />

                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 13 }}>Apple Inc.</Text>
                            <Text style={{ fontSize: 13 }}>California</Text>
                        </View>

                        <View style={{ flex: 2, columnGap: 5, alignItems: "center", flexDirection: "row", }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 12, color: "red" }}>17 Gün Kaldı</Text>
                            </View>

                            <TouchableOpacity style={{ flex: 2, padding: 10, alignItems: "center", justifyContent: "center", borderRadius: 10, borderWidth: 1 }}>
                                <Text style={{ fontSize: 14, textAlign: "center" }}>Detayları Gör</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </LinearGradient>
        )
    }

    function JobListItem() {

        const [isCollapsed, setisCollapsed] = useState(true);
        const [chevronDown, setChevronDown] = useState("chevron-down")

        function setChevron() {
            setChevronDown(chevronDown == "chevron-down" ? "chevron-up" : "chevron-down")
        }

        return (
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => { [setisCollapsed(!isCollapsed), setChevron()] }} style={{ position: "absolute", right: 15, top: 15, zIndex: 50, alignItems: "center", justifyContent: "center" }} >
                    <Entypo size={25} name={chevronDown}></Entypo>
                </TouchableOpacity>

                <Collapsible style={{ borderRadius: 10, }} collapsedHeight={80} collapsed={isCollapsed}>
                    {isCollapsed ? <ListCategoryContainer /> : <ListCategoryContainerExpanded />}
                </Collapsible>
            </View>
        )

    }




    return (

        <SafeAreaView style={styles.SafeAreaView}>

            <TopBar title={"İş Fırsatları"} titleFont={"Montserrat-SemiBold"} navigation={navigation} backColor={"#3F51B5"}></TopBar>

            <View style={{ width: "100%", flex: 1, alignItems: "center", }}>

                <View style={styles.SearchBarHomepage}>
                    <View style={{ position: "absolute", width: 35, alignItems: "center", justifyContent: "center", top: 0, bottom: 0, left: 0, zIndex: 2, marginHorizontal: 15 }}>
                        <Fontisto size={20} name={"search"} />
                    </View>

                    <TextInput placeholderTextColor={"black"} style={{ width: "100%", borderRadius: 100, backgroundColor: "#9f9f9faa", fontSize: 11, minHeight: 35, paddingHorizontal: 35 }} placeholder='Arama Yapın...' />
                </View>

                <View style={{ flex: 1, width: "100%", backgroundColor: "azure", flexGrow: 1 }}>

                    <ScrollView contentContainerStyle={{ justifyContent: "center", width: "100%" }} showsVerticalScrollIndicator={false}>
                        <JobListItem />
                        <JobListItem />
                        <JobListItem />
                        <JobListItem />
                        <JobListItem />
                        <JobListItem />
                    </ScrollView>




                </View>


            </View>



        </SafeAreaView>



    )

}

export default JobList