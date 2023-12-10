import React, {useEffect} from 'react';
import DrawerNavigator from "../navigation/DrawerNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View} from "react-native";

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
        <View></View>
    );
};

export default MainScreen;
