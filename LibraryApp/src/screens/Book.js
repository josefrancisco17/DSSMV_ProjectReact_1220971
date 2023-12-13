import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { getBook } from '../service/RequestsService';

const BookScreen = ({ route }) => {
    const { libraryBook } = route.params;
    const library = libraryBook.library;
    const [url, setUrl] = useState(' ');
    const [book, setBook] = useState('');

    useEffect(() => {
        const getBookfromWs = async () => {
            try {
                const newBook = await getBook(libraryBook.book.isbn);
                const imageUrl =
                    'http://193.136.62.24/v1/' +
                    newBook.cover.largeUrl.slice('/api/v1/'.length);
                setUrl(imageUrl);
                setBook(newBook);
            } catch (error) {
                console.error('Error getting book:', error);
            }
        };
        getBookfromWs();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image source={{ uri: url }} style={styles.bookImage} />
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.description}>{book.description}</Text>
                <Text style={styles.details}>Pages: {book.numberOfPages}</Text>
                <Text style={styles.details}>Author: {book.byStatement}</Text>
                <Text style={styles.details}>Library: {library.name}</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Check Out</Text>
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
