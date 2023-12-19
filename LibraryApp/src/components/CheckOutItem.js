import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CheckOutItem = ({ checkOut, handleClick, handleLongPress }) => {

    const formatTimestamp = (timestamp) => {
        const options = {
            timeZone: 'Europe/Lisbon'
        };
        return new Date(timestamp).toLocaleString('pt-Pt', options);
    };

    return (
        <View>
            <TouchableOpacity style={styles.checkoutItem} onPress={handleClick} onLongPress={handleLongPress}>
                <Text style={styles.titleText}>{checkOut.book.title}</Text>
                <Text style={styles.libraryText}>{checkOut.libraryName}</Text>
                <Text style={styles.dueDateText}>{formatTimestamp(checkOut.dueDate)}</Text>
                <Text style={styles.activeText}>Active: {checkOut.active.toString()}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    checkoutItem: {
        margin: 10,
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#007bff',
        borderRadius: 10,
    },
    titleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    libraryText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
    },
    dueDateText: {
        color: 'white',
        fontSize: 14,
        alignSelf: 'center',
    },
    activeText: {
        color: 'white',
        fontSize: 14,
        alignSelf: 'center',
    },
});

export default CheckOutItem;
