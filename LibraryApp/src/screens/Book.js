import React, { useEffect, useState } from 'react';
import {ScrollView, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import { postCheckOutBook } from '../service/RequestsService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookScreen = ({ navigation, route }) => {
    const { book, libraryId, libraryName } = route.params;
    const coverUrl =
        'http://193.136.62.24/v1/' + book.cover.largeUrl.slice('/api/v1/'.length);

    const handleCheckOutClick = async () => {
        const userName = await AsyncStorage.getItem('userName');
        await postCheckOutBook(libraryId, book.isbn, userName);
        navigation.navigate('Home');
    };

    const handleReviewsClick = async () => {
        navigation.navigate('Reviews', { book });
    };

    const handleGoHome = () => {
        navigation.replace('Home');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{book.title}</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.imageAndDetailsContainer}>
                    <Image source={{ uri: coverUrl }} style={styles.bookImage} />
                </View>
                <Text style={styles.byStatement}>{book.byStatement}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.details}>Pages: {book.numberOfPages} </Text>
                    <Text style={styles.details}> Library: {libraryName}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{book.description}</Text>
                </View>
                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleReviewsClick}>
                        <Text style={styles.buttonText}>Reviews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleCheckOutClick}>
                        <Text style={styles.buttonText}>Check Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#1a1a1a',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    imageAndDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
    },
    descriptionContainer: {
        borderWidth: 1,
        borderColor: '#007bff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 15,
    },
    byStatement: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: 'white',
    },
    details: {
        fontSize: 14,
        marginVertical: 4,
        color: 'white',
    },
    bookImage: {
        width: 250,
        height: 400,
        borderRadius: 8,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
        width: '48%',
    },
    homeButton: {
        padding: 20,
        borderRadius: 8,
        marginVertical: 8,
        backgroundColor: '#333',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default BookScreen;
