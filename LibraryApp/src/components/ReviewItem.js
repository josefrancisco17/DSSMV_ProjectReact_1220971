import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const BookItem = ({ review }) => {
    return (
        <View>
            <View style={styles.bookItem}>
                <Text>{review.reviewer}</Text>
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
