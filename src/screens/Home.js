import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Touchable, FlatList } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../constants';
import {restaurantData, initialCurrentLocation, categoryData }  from '../data/data';
import Header from '../components/Home/Header';
import Main from '../components/Home/Main';
import Restaurant from '../components/Home/Restaurant';

const Home = ({navigation}) => {

    const [categorias, setCategorias] = useState(categoryData);
    const [selectedCategory, setSelectedCategory ] = useState();
    const [resturant , setRestaurant] = useState(restaurantData);
    console.log(categorias)

    return(
        <SafeAreaView style={styles.container}>
            <Header initialCurrentLocation={initialCurrentLocation} />
            <Main setRestaurant={setRestaurant} setSelectedCategory={setSelectedCategory} categorias={categorias} selectedCategory={selectedCategory} />
            <Restaurant restaurant={resturant } categorias={categorias} navigation={navigation} initialCurrentLocation={initialCurrentLocation} />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        height: 50
    },  
    headerImgContainer:{
        width: 50,
        justifyContent: 'center',
        padding: SIZES.padding * 2,
    },
    headerImgRight:{
        width: 50,
        justifyContent: 'center',
        paddingRight: SIZES.padding * 2,
    },
    headerImg:{
        width: 30,
        height: 30
    },
    headerCenter:{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },  
    headerTitle:{
        width: '70%',
        height: '100%',
        backgroundColor: COLORS.lightGray3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius
    },
    container:{
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1
    },
    mainContent:{
        padding: SIZES.padding * 2,

    }

});

export default Home;

