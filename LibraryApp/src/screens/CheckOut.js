import React from 'react';
import {Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckOutScreen = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Checkout Screen</Text>
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
export default CheckOutScreen;
