import React, {useEffect, useState} from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import {getBook} from "../service/RequestsService";

const BookItem = ({ review }) => {
    const [book, setBook] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const bookIsbn = review.isbn
            setBook(await getBook(bookIsbn))
        }
        fetchData()
    }, []);
    return (
        <View>
            <View style={styles.bookItem}>
                <Text>{review.reviewer}</Text>
                <Text>{book.title}</Text>
                <Text>{review.review}</Text>
                <Text>{review.recommended.toString()}</Text>
                <Text>{review.createdDate}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bookItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
});

export default BookItem;
