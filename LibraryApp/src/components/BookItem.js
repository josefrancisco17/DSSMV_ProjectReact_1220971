import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const BookItem = ({ libraryBook, handleClick }) => {
    return (
        <View>
            <TouchableOpacity style={styles.bookItem} onPress={handleClick}>
                <Text>{libraryBook.book.title}</Text>
            </TouchableOpacity>
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
