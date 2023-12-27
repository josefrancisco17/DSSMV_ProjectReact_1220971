import React, { useEffect, useState } from 'react';
import { Button, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import FeedScreen from "../screens/Feed";
import CheckOutScreen from '../screens/LibrarySearch.js';
import CheckInScreen from '../screens/CheckIn.js';
import ProfileScreen from '../screens/Profile.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWeather } from "../service/RequestsService";
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <ImageBackground source={require('../../assets/images/black-gradient.png')} style={styles.userDetails}>
                <Image source={require('../../assets/images/user.png')} style={styles.userImage} />
                <View style={styles.userInfo}>
                    <Text style={styles.userNameText}>{userName}</Text>
                    <Text style={styles.weatherText}>{weatherStatement}</Text>
                </View>
            </ImageBackground>
            <DrawerItemList {...props}/>
            <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
                <Icon name="sign-out" size={20} color="#ccc" />
                <Text style={styles.logoutButtonText}>LOGOUT</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Feed"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerActiveTintColor: 'white',
                drawerInactiveTintColor: 'grey',
                headerStyle: styles.headerStyle,
                headerTintColor: 'white',
            }}
        >
            <Drawer.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="CheckOut"
                component={CheckOutScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Icon name="shopping-cart" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="CheckIn"
                component={CheckInScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Icon name="check" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="  Profile"
                component={ProfileScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
                }}
            />
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
    userInfo: {
        marginLeft: 10,
    },
    userNameText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        fontFamily: 'Ubuntu-Bold',
        marginTop: 5,
        marginBottom: 10,
    },
    weatherText: {
        color: '#ccc',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 14,
    },
    drawerBottom: {
        padding: 10,
        alignItems: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    logoutButtonText: {
        color: '#ccc',
        fontFamily: 'Ubuntu-Bold',
        marginLeft: 35,
    },
};

export default DrawerNavigator;
