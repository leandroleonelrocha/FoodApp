import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../../constants';


export default function Restaurant(props){
    const { restaurant, categorias, navigation, initialCurrentLocation } = props;
    
    return(
        <FlatList 
            data={restaurant}
            keyExtractor={ item => `${item.id}` }
            renderItem={renderItem}
            contentContainerStyle={styles.container}
            
        />
    )

    function obtenerCategoria(idCategoria){
        let categoria = categorias.filter( a => a.id == idCategoria)
    
        if(categoria.length > 0)
            return categoria[0].name
    
    }

    function renderItem(props){
        const { item } = props

        
        return(
            <TouchableOpacity 
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={ () => navigation.navigate('Restaurant', {
                    item: item, location: initialCurrentLocation
                })}
            >
    
                <View style={{padding: SIZES.padding}}>
                    <Image 
                        source={item.photo}
                        resizeMode="cover"
                        style={{
                            width: '100%',
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />
        
                    <View style={styles.label}>
                        <Text style={styles.labelText}>{item.duration}</Text>
                    </View>
        
                </View>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: SIZES.padding }}>
                        <Image 
                            source={icons.star}
                            style={styles.startImg}
                        />
                        <Text style={{ fontSize: SIZES.body3, lineHeight: 22 }}>{item.rating}</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        {
                            item.categories.map((categoryId) => {
                                return(
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{fontSize: SIZES.h4, lineHeight: 20, marginLeft: 5}} >{obtenerCategoria(categoryId)}</Text>
                                    </View>
                                )
                            })
                        }

                        {

                            [1,2,3].map((precio) => (

                                <Text 
                                    style={{ fontSize: SIZES.h4, lineHeight: 22,
                                    color:(precio <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}

                                >$</Text>

                            ))
                            
                        }
                        </View>
                        
                    </View>
                    
            </TouchableOpacity>
    
    
        )
    }



}




const styles = StyleSheet.create({

    container:{
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30
    },
    label:{
        position:'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: COLORS.white,
        height: 50,
        width: SIZES.width * 0.3,
        borderTopRightRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

    },
    title:{
        fontSize: SIZES.body2, lineHeight: 30
    },
    startImg:{
        width: 20,
        height: 20,
        tintColor: COLORS.primary,
        marginRight: 10
    }

})