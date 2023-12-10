import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home.js';
import LoginScreen from '../screens/Login.js';
import AdminScreen from '../screens/Admin.js';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Admin" component={AdminScreen}/>
        </Stack.Navigator>
    );
};

export default AuthNavigator;
