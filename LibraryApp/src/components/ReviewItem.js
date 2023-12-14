import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const BookItem = ({ review, handleClick }) => {
    return (
        <View>
            <TouchableOpacity style={styles.bookItem} onPress={handleClick}>
                <Text>{review.reviewer}</Text>
                <Text>{review.review}</Text>
                <Text>{review.recommended.toString()}</Text>
                <Text>{review.createdDate}</Text>
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
