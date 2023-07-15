import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen, WebViewScreen } from "../Screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MainNavigator =()=>{
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Web" component={WebViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );  
}

export default MainNavigator;