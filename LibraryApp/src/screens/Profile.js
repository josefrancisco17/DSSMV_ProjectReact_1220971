import React from 'react';
import {Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
    const logOut = async () => {
        await AsyncStorage.removeItem('userName');
        navigation.navigate('Login');
    };
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Profile Screen</Text>
            <Button onPress={logOut} title="Logout"/>
        </View>
    );
};

const styles = {
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black'
    },
};

export default ProfileScreen;
