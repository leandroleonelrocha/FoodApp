import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Restaurant from './src/screens/Restaurant';
import Delivery from './src/screens/Delivery';
import Tabs from './src/navigation/tabs';
const Stack = createStackNavigator();

const App = () => {

  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"Home"}
      >
      <Stack.Screen component={Tabs} name="Home" />
      <Stack.Screen component={Delivery} name="Delivery" />
      <Stack.Screen component={Restaurant} name="Restaurant" />
          
      </Stack.Navigator>
    </NavigationContainer>
    
  )

}

export default App;