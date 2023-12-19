import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const BookItem = ({ libraryBook, handleClick }) => {
    return (
        <View>
            <TouchableOpacity style={styles.bookItem} onPress={handleClick}>
                <Text style={styles.text}>{libraryBook.book.title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bookItem: {
        color: 'black',
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#007bff',
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    }
});

export default BookItem;
