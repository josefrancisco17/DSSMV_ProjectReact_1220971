import React, { useEffect, useState } from 'react';
import {Button, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import FeedScreen from "../screens/Feed";
import CheckOutScreen from '../screens/LibrarySearch.js'
import CheckInScreen from '../screens/CheckIn.js'
import ProfileScreen from '../screens/Profile.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWeather } from "../service/RequestsService";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    const [userName, setUserName] = useState('');
    const [weatherStatement, setWeatherStatement] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setUserName(await AsyncStorage.getItem('userName'));
        setWeatherStatement(await getWeather());
    }

    async function logOut() {
        await AsyncStorage.removeItem('userName');
        props.navigation.replace('Login');
    }

    return (
        <DrawerContentScrollView {...props} style={styles.drawerMenu}>
            <ImageBackground source={require('../assets/black-gradient.png')} style={styles.userDetails}>
                <Image source={require('../assets/user.png')} style={styles.userImage} />
                <Text style={styles.userNameText}>{userName}</Text>
                <Text style={styles.weatherText}>{weatherStatement}</Text>
            </ImageBackground>
            <DrawerItemList {...props} />
            <View style={styles.drawerBottom}>
                <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
                    <Text style={styles.logoutButtonText}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerActiveTintColor: 'white',
                drawerInactiveTintColor: 'grey',
                headerStyle: styles.headerStyle,
                headerTintColor: 'white',}}
        >
            <Drawer.Screen name="Feed" component={FeedScreen} />
            <Drawer.Screen name="CheckOut" component={CheckOutScreen} />
            <Drawer.Screen name="CheckIn" component={CheckInScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
};

const styles = {
    headerStyle: {
        backgroundColor: '#1a1a1a',
    },
    drawerMenu: {
        backgroundColor: '#1a1a1a',
    },
    userDetails: {
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#333',
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userNameText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    weatherText: {
        color: '#ccc',
        fontSize: 14,
    },
    drawerBottom: {
        padding: 10,
        alignItems: 'center',
    },
    logoutButton: {
        padding: 10,
        alignSelf: 'flex-start',
    },
    logoutButtonText: {
        color: '#ccc',
        fontWeight: 'bold',
        textAlign: 'center',
    },
};

export default DrawerNavigator;
