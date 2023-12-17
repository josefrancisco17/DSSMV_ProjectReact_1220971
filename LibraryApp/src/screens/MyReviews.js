import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyReviewsScreen = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>MyReviews Screen</Text>
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

export default MyReviewsScreen;
