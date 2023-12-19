import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";

const MainScreen = ({navigation}) => {
    const getPermissions = async() => {
        Geolocation.requestAuthorization();
    }

    const checkLogIn = async () => {
        let userName = await AsyncStorage.getItem('userName');
        if (userName === null) {
            navigation.navigate('Login')
        } else if (userName.toLowerCase().trim() === 'admin') {
            navigation.navigate('Admin')
        } else {
            navigation.navigate('Home')
        }
    }

    useEffect(() => {
        checkLogIn()
        getPermissions()
    }, []);

    return (
        <ActivityIndicator size="large" color="white" style={styles.activityIndicator}/>
    )
}

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default MainScreen;
