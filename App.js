/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';

 import { SignUp, Login, Stores, Invite, Account, Bookmark, webView, GoToStore, wishlist } from "./screens";
 import { createStackNavigator } from "@react-navigation/stack";
 import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import DrawerContent from "./components/DrawerContent";

 import Tabs from "./navigation/tabs";
 
 const theme = {
     ...DefaultTheme,
     colors: {
         ...DefaultTheme.colors,
         border: "transparent",
     },
 };
 
 const Stack = createStackNavigator();
 
 const Drawer = createDrawerNavigator();

 const App = () => {

    function HomeScreen() {
   
    }
    
     return (
         <>
        
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'SignUp'}
            >
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Login" component={Login} />

                {/* Tabs */}
                <Stack.Screen name="Stores" component={Tabs} />
                <Stack.Screen name="webView" component={webView} />
                <Stack.Screen name="gotostore" component={GoToStore} />
                <Stack.Screen name="wishlist" component={wishlist} />

            </Stack.Navigator>
        </NavigationContainer>
        </>
     )
 }
 
 export default App;
 