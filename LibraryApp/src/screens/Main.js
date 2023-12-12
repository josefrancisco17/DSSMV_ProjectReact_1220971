import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import DrawerNavigator from "../navigation/DrawerNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = ({navigation}) => {
    const checkLogIn = async () => {
        let userName = await AsyncStorage.getItem('userName');
        if (userName === null) {
            navigation.navigate('Login')
        }
        if (userName.toLowerCase().trim() === 'admin') {
            navigation.navigate('Admin');
        } else {
            navigation.navigate('Home');
        }
    };

    useEffect(() => {
        checkLogIn();
    }, []);

    return (
        <ActivityIndicator size="large" color="blue" style={styles.activityIndicator}/>
    );
};

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default MainScreen;
