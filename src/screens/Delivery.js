import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
const Delivery = ({route}) => {
    
    const [ restaurant, setRestaurant ] = useState(null);
    const [ calle, setCalle] = useState("");
    const [ desdeLocation, setDesdeLocation] = useState(null);
    const [ hastaLocation, setHastaLocation] = useState(null);
    const [ region, setRegion] = useState(null)

    useEffect( () => {

        let { restaurant, location } = route.params; 


        let fromLoc = location.gps
        let toLoc = restaurant.location
        let calle = location.streetName

        let mapaRegion = {
            latitude: ( fromLoc.latitude + toLoc.latitude) / 2,
            longitude: ( fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2

        }
        
        setRestaurant(restaurant)
        setCalle(calle)
        setDesdeLocation(fromLoc)
        setHastaLocation(toLoc)
        setRegion(mapaRegion)

    }, []);



    return(
        <View style={{ flex: 1}}>
            <MapView 
                style={{ flex: 1}}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                


            >
            </MapView>
        </View>
    )

}

export default Delivery;