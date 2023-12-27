import React, { useEffect } from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";

const MainScreen = ({ navigation }) => {
    const getPermissions = async () => {
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
        <View style={styles.container}>
            <Text style={styles.text}>Loading</Text>
            <ActivityIndicator size="large" color="white" style={styles.activityIndicator} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1a1a1a',
    },
    activityIndicator: {
        marginTop: 20,
    },
    text: {
        color: 'white',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 24,
    },
})

export default MainScreen;
