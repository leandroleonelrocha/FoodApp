import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../../constants';
import {restaurantData, initialCurrentLocation, categoryData }  from '../../data/data';

export default function Main(props){

    const {setRestaurant, setSelectedCategory, categorias, selectedCategory } = props

    const seleccionarOpcion = (item) => {

        //filtro de restaurant
        let resturantList = restaurantData.filter( a => a.categories.includes(item.id) );

        setRestaurant(resturantList);
        setSelectedCategory(item)
        console.log(resturantList)

    }

    const renderItem = ({item}) => {

        return(
            <TouchableOpacity
                style={{
                    padding: SIZES.padding, 
                    paddingBottom: SIZES.padding * 2,
                    backgroundColor: (selectedCategory?.id == item.id ) ? COLORS.primary : COLORS.white,
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: SIZES.padding,
                    ...styles.shadow

                }}
                onPress={ () => seleccionarOpcion(item)}
            >

            <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: (selectedCategory?.id == item.id ) ? COLORS.white : COLORS.lightGray,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Image 
                source={item.icon}
                style={{width:30, height: 30}}
                resizeMode='contain'
            />
            </View>
            <Text
                style={{
                    color: (selectedCategory?.id == item.id ) ? COLORS.white : COLORS.black ,
                    marginTop: SIZES.padding,
                
                }}

            >{item.name}</Text>

            </TouchableOpacity>
        )

    }


    return(
        <View style={styles.mainContent}>
            <Text style={{ fontWeight:'bold', fontSize: 24 }}>Main</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Categories</Text>
            <FlatList 
                data={categorias}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={ item => `${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: 20 }}
            />
        </View>
    )

}

const styles = StyleSheet.create({
   
    mainContent:{
        padding: SIZES.padding * 2,

    }

});