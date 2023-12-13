import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckInScreen = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>CheckIn Screen</Text>
        </View>
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

export default CheckInScreen;
