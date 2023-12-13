import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const LibraryItem = ({item, handleClick}) => {
    return (
        <View>
            <TouchableOpacity style={styles.libraryItem} onPress={handleClick}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    libraryItem: {
        color: 'black',
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
};

export default LibraryItem;
