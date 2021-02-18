import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../../constants';

export default function Header(props){
    const { initialCurrentLocation } = props
    return(
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerImgContainer}>
                <Image source={icons.nearby} resizeMode="contain" style={styles.headerImg} />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
                <View style={styles.headerTitle}>
                    <Text style={{...FONTS.h3}}>{initialCurrentLocation.streetName}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.headerImgRight}>
                <Image source={icons.basket} resizeMode="contain" style={styles.headerImg} />
            </TouchableOpacity>

        </View>
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

});