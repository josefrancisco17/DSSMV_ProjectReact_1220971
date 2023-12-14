import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewsScreen = ({ navigation, route }) => {
    const { libraryBook } = route.params
    const library = libraryBook.library
    const book = libraryBook.book
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Reviews</Text>
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

export default ReviewsScreen;
