import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const LibraryItem = ({library, handleClick}) => {
    return (
        <View>
            <TouchableOpacity style={styles.libraryItem} onPress={handleClick}>
                <Text style={styles.text}>{library.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    libraryItem: {
        color: 'black',
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#007bff',
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        fontFamily: 'Ubuntu-Bold',
        color: 'white',
        textAlign: 'center',
    }
});


export default LibraryItem;
