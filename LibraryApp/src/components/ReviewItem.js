import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { getBook } from '../service/RequestsService';

const BookItem = ({ review }) => {
    const [book, setBook] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const bookIsbn = review.isbn;
            setBook(await getBook(bookIsbn));
        };
        fetchData();
    }, []);

    const formatTimestamp = (timestamp) => {
        const options = {
            timeZone: 'Europe/Lisbon'
        };
        return new Date(timestamp).toLocaleString('pt-Pt', options);
    };

    return (
        <View style={styles.bookItem}>
            <Text style={styles.title}>{review.reviewer}</Text>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.reviewText}>{review.review}</Text>
            <Text style={[styles.recommendedText, { color: review.recommended ? 'green' : 'darkred', }]}>
                Recommended: {review.recommended.toString()}
            </Text>
            <Text style={styles.dateText}>{formatTimestamp(review.createdDate)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bookItem: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#2c2c2c',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    reviewText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    recommendedText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    dateText: {
        fontSize: 14,
        color: '#B0BEC5',
        textAlign: 'center',
    },
});

export default BookItem;
