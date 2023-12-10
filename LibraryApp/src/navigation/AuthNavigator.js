import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home.js';
import LoginScreen from '../screens/Login.js';
import AdminScreen from '../screens/Admin.js';
import MainScreen from "../screens/Main";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Admin" component={AdminScreen}/>
            <Stack.Screen name="Main" component={MainScreen}/>
        </Stack.Navigator>
    );
};

export default AuthNavigator;
