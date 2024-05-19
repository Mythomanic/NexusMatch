import React, { useState, useCallback, useEffect } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, Dimensions, Button } from 'react-native'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../App.styles';
import { TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5, Entypo, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, AntDesign } from "react-native-vector-icons"
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel'
import Collapsible from 'react-native-collapsible';
import Swiper from 'react-native-deck-swiper';
import { useAtom } from 'jotai';
import { refreshAtom } from '../JotaiAtoms';
import axios from 'axios';

function JobListItem({ navigation }) {

    const [refreshKey] = useAtom(refreshAtom);
    const [myCardIndex, setMyCardIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);
    const [swipedCount, setSwipedCount] = useState(0)

    useEffect(() => {
        // Fetch random image URLs from the API
        const fetchImageUrls = async () => {
            const response = await fetch('https://picsum.photos/200');
            const imageUrl = response.url;
            setImageUrls(Array.from({ length: 5 }, () => imageUrl)); // Generate 5 random image URLs
        };
        fetchImageUrls();
    }, [swipedCount]); // Trigger fetch on component mount and when refreshKey changes


    return (
        <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "flex-start", }}>
            <Swiper
                key={refreshKey} // Set key to trigger re-render when refreshKey changes
                cards={['Company A', 'Company B', 'Company C', 'Company D', 'Company E']}
                renderCard={(card, index) => {
                    return (
                        <View style={[styles.cardContainer]}>
                            <Image source={{ uri: imageUrls[index] }} style={styles.companyLogo} />
                            <Text style={styles.companyName}>{card}</Text>

                            <View>
                                <Text numberOfLines={22} style={styles.companyDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed malesuada ligula, vel vehicula dolor. Integer ac lorem vestibulum, pharetra felis non, convallis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed malesuada ligula, vel vehicula dolor. Integer ac lorem vestibulum, pharetra felis non, convallis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed malesuada ligula, vel vehicula dolor. Integer ac lorem vestibulum, pharetra felis non, convallis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed malesuada ligula, vel vehicula dolor. Integer ac lorem vestibulum, pharetra felis non, convallis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed malesuada ligula, vel vehicula dolor. Integer ac lorem vestibulum, pharetra felis non, convallis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed malesuada ligula, vel vehicula dolor. Integer ac lorem vestibulum, pharetra felis non, convallis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed malesuada ligula, vel vehicula dolor. Integer ac lorem vestibulum, pharetra felis non, convallis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed malesuada ligula, vel vehicula dolor. Integer ac lorem vestibulum, pharetra felis non, convallis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed malesuada ligula, vel vehicula dolor. Integer ac lorem vestibulum, pharetra felis non, convallis nisl.  </Text>
                            </View>

                            <View style={{ width: "100%", alignSelf: "center", alignItems: "center", justifyContent: "center", padding: 10, margin: 5 }}>
                                <TouchableOpacity style={{ borderWidth: 1, borderColor: "grey", borderRadius: 20, alignItems: "center", justifyContent: "center", padding: 12.5 }}>
                                    <Text style={{ fontSize: 12 }} fontSize="xs">Detayları Gör</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )
                }}
                infinite={true}
                onSwipedLeft={(cardIndex) => { [console.log(cardIndex + " Swiped Left"), setSwipedCount((swipeCount) => (swipeCount + 1))] }}
                onSwipedRight={(cardIndex) => { [console.log(cardIndex + " Swiped Right"), setSwipedCount((swipeCount) => (swipeCount + 1))] }}
                onSwipedAll={() => { console.log('onSwipedAll') }}
                cardIndex={0}
                backgroundColor={'white'}
                stackSize={3}
                verticalSwipe={false}
                cardVerticalMargin={0}
            ></Swiper>

        </View>

    )

}

export default JobListItem