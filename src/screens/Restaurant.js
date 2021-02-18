import React, {useEffect,useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../constants';
import Header from '../components/Restaurant/Header';
import InfoRestaurant from '../components/Restaurant/InfoRestaurant';
import Orden from '../components/Restaurant/Orden';

const Restaurant = ({route, navigation}) => {
    const { item, location } = route.params
    const [ restaurant, setRestaurant ] = useState();
    const [ currentLocation, setCurrentLocation ] = useState();
    

    useEffect( () => {

        setRestaurant(item)
        setCurrentLocation(location)

    })

    return(
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} restaurant={restaurant} />
            <InfoRestaurant navigation={navigation} restaurant={restaurant} location={location} />
            
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
});

export default Restaurant;