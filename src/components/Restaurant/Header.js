import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../../constants';

export default function Header(props){
    const { navigation, restaurant } = props
    console.log(restaurant?.name)
    return(

        <View style={styles.container }>
            <TouchableOpacity 
                style={styles.containerImg}
                onPress={ () => navigation.goBack() }
            >
            <Image 
                source={icons.back}
                style={styles.imgBack}
                resizeMode="contain"
                
            />

            </TouchableOpacity>

            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    height: 50,
                    backgroundColor: COLORS.lightGray3,
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: SIZES.padding * 3

                }}>
                <Text style={{ fontSize: SIZES.h3, lineHeight: 22 }}> { restaurant?.name} </Text>
                </View>

            </View>

            <TouchableOpacity
                style={{
                    width: 50,
                    paddingRight: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
            >
                <Image 
                    source={icons.list}
                    style={{
                        width: 30,
                        height:30,

                    }}
                    resizeMode='contain'
                
                />
            </TouchableOpacity>



        </View>

    )

}


const styles = StyleSheet.create({

    container:{
        flexDirection: 'row'
    },
    containerImg:{
        width: 50,
        paddingLeft: SIZES.padding * 2,
        justifyContent: 'center'
    },
    imgBack:{
        width: 30,
        height: 30
    }


});