import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home.js';
import LoginScreen from '../screens/Login.js';
import AdminScreen from '../screens/Admin.js';
import MainScreen from "../screens/Main";
import BookSearchScreen from "../screens/BookSearch.js";
import LibrarySearchScreen from "../screens/LibrarySearch.js";
import BookScreen from "../screens/Book.js";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={MainScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Admin" component={AdminScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="BookSearch" component={BookSearchScreen}/>
            <Stack.Screen name="LibrarySearch" component={LibrarySearchScreen}/>
            <Stack.Screen name="Book" component={BookScreen}/>
        </Stack.Navigator>
    );
};

export default AppNavigator;
