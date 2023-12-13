import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const BookItem = ({item, handleClick}) => {
    return (
        <View>
            <TouchableOpacity style={styles.bookItem} onPress={handleClick}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    bookItem: {
        color: 'black',
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
};

export default BookItem;
