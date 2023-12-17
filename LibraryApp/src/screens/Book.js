import React, { useEffect, useState } from 'react';
import {ScrollView, TouchableOpacity, View, Text, StyleSheet, Image, Button} from 'react-native';
import { postCheckOutBook} from '../service/RequestsService';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookScreen = ({ navigation, route }) => {
    const { book, libraryId, libraryName } = route.params
    const coverUrl = 'http://193.136.62.24/v1/' + book.cover.largeUrl.slice('/api/v1/'.length);

    const handleCheckOutClick = async () => {
        const userName = await AsyncStorage.getItem('userName');
        await postCheckOutBook(libraryId, book.isbn, userName)
        navigation.navigate('Home')
    }

    const handleReviewsClick = async () => {
        navigation.navigate('Reviews', {book})
    }

    const handleGoHome = () => {
        navigation.replace('Home')
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Button onPress={handleGoHome} title="Home"/>
            <View style={styles.container}>
                <Image source={{ uri: coverUrl }} style={styles.bookImage} />
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.description}>{book.description}</Text>
                <Text style={styles.details}>Pages: {book.numberOfPages}</Text>
                <Text style={styles.details}>Author: {book.byStatement}</Text>
                <Text style={styles.details}>Library: {libraryName}</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={handleCheckOutClick}>Check Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={handleReviewsClick}>Reviews</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#1E1E1E',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        color: 'white',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 8,
        color: 'white',
    },
    details: {
        fontSize: 14,
        marginVertical: 4,
        color: 'white',
    },
    bookImage: {
        width: 200,
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#3498DB',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default BookScreen;
