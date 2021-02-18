import React,{useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { COLORS, icons, SIZES, FONTS } from '../../../constants';

export default function InfoRestaurant(props){
    const { restaurant, navigation, location } = props
    const screllX = new Animated.Value(0);
    const [ordenesItems, setOrdenesItems] = useState([]);

    function editOrden(action, menuId, precio){

        let ordenLista = ordenesItems.slice();
        let item = ordenLista.filter(a => a.menuId == menuId)
        
        if(action == '+'){

            if (item.length > 0) {
                let newQty = item[0].qty + 1;
                item[0].qty = newQty
                item[0].total = item[0].qty * precio
            }else{
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: precio,
                    total: precio
                }
                ordenLista.push(newItem)
            }

            setOrdenesItems(ordenLista)


        }else{

            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * precio
                }
            }

            setOrdenesItems(ordenLista)
        }

        console.log(ordenesItems)

    }

    function getOrderQty(menuId) {
        let orderItem = ordenesItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getItems(){
        let itemCount = ordenesItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function getSuma(){
        let itemCount = ordenesItems.reduce((a, b) => a + (b.total || 0), 0)

        return itemCount.toFixed(2)
    }


    function renderDots(){
        
        const dotPosition = Animated.divide(screllX, SIZES.width)
        
        return(
            <View style={{ height: 30 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', height: SIZES.padding }}>
                    {
                        restaurant?.menu.map((item, index) => {
                          
                            const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                            })

                            const dotSize = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                                extrapolate: "clamp"
                            })

                            const dotColor = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                                extrapolate: "clamp"
                            })
                            

                            return(
                                <Animated.View
                                    key={`dot-${index}`}
                                    opacity={opacity}
                                    style={{
                                        borderRadius: SIZES.radius,
                                        marginHorizontal: 6,
                                        width: dotSize,
                                        height: dotSize,
                                        backgroundColor: dotColor
                                    }}
                                />                            
                            )
                       })
                    }
                </View>
            </View>
        )
    }


    return(
        <>
        <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: screllX } } }
                ], { useNativeDriver: false })}
        >

        { restaurant?.menu.map( (item, index) => ( 
            <View
                key={`menu-${index}`}
                style={{
                    alignItems: 'center'
                }}
            >
                <View style={{
                    height:SIZES.height * 0.35
                }}>

                    <Image 
                        source={item.photo}
                        resizeMode="cover"
                        style={{
                            width: SIZES.width,
                            height: "100%"
                        }}
                    />

                    <View style={{
                        position: 'absolute',
                        bottom: -20,
                        width: SIZES.width,
                        height: 50,
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>

                        <TouchableOpacity style={{
                            width: 50,
                            backgroundColor: COLORS.white,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25
                            }}
                            onPress={ () => editOrden('-', item.menuId, item.price) }
                        >
                        <Text style={{fontSize: SIZES.h3, lineHeight: 22 }}>-</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                width: 50,
                                backgroundColor: COLORS.white,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{fontSize: SIZES.h3, lineHeight: 22 }}> {getOrderQty(item.menuId)}</Text>
                        </View>
                        <TouchableOpacity style={{
                            width: 50,
                            backgroundColor: COLORS.white,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopRightRadius: 25,
                            borderBottomRightRadius: 25
                            }}
                            onPress={ () => editOrden('+', item.menuId, item.price) }
                        >
                        <Text style={{fontSize: SIZES.h3, lineHeight: 22 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    width: SIZES.width,
                    alignItems: 'center',
                    marginTop: 30,
                    paddingHorizontal: SIZES.padding * 2
                }}>
                    <Text style={{ marginVertical:10, fontSize: SIZES.h3, lineHeight: 22, textAlign:'center'}}>{item.name} - {item.price.toFixed(2)}</Text>
                    <Text>{item.description}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10}}>
                    <Image 
                        source={icons.fire}
                        style={{
                            width: 20,
                            height: 20,
                            marginRight: 10
                        }}
                    />
                    <Text style={{fontSize: SIZES.body3, lineHeight: 22}}>{item.calories.toFixed(2)} cal</Text>

                </View>

            </View>
            

        ))
        
        
        
        }



        </Animated.ScrollView>

        { renderDots() }

        <View style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40
        }}>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SIZES.padding * 2, paddingHorizontal: SIZES.padding * 3, borderBottomColor: COLORS.lightGray2, borderBottomWidth: 1 }}>
                <Text style={{fontSize: SIZES.body3, lineHeight: 22, fontWeight: 'bold'}}> {getItems()} Items in Cart</Text>
                <Text style={{fontSize: SIZES.body3, lineHeight: 22, fontWeight: 'bold'}}>$ {getSuma()} </Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: SIZES.padding * 2,
                    paddingHorizontal: SIZES.padding * 3
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={icons.pin}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.darkgray
                        }}
                    />
                    <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>Location</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={icons.master_card}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.darkgray
                        }}
                    />
                    <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
                </View>
            </View>

            <View style={{ padding: SIZES.padding * 2, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{
                        width: SIZES.width * 0.9,
                        padding: SIZES.padding,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        borderRadius: SIZES.radius
                    }}

                    onPress={ () => navigation.navigate("Delivery", {
                        location,
                        restaurant

                    }) }
                >
                <Text style={{ color: COLORS.white, lineHeight: 22, fontWeight: 'bold'}}>Order</Text>
                    
                </TouchableOpacity>
            </View>

        </View>
        
        </>
    )

}