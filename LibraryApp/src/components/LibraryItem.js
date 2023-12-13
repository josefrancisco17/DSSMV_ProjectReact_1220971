import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const LibraryItem = ({library, handleClick}) => {
    return (
        <View>
            <TouchableOpacity style={styles.libraryItem} onPress={handleClick}>
                <Text>{library.name}</Text>
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
