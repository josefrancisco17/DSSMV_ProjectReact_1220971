import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyReviewsScreen from "./MyReviews";
import CheckOutHistory from "./CheckOutHistory";

const Tab = createBottomTabNavigator();

const ProfileScreen = ({navigation}) => {
    const logOut = async () => {
        await AsyncStorage.removeItem('userName');
        navigation.navigate('Login');
    };
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="MyReviews" component={MyReviewsScreen} />
            <Tab.Screen name="CheckOutHistory" component={CheckOutHistory} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black'
    },
});

export default ProfileScreen;
