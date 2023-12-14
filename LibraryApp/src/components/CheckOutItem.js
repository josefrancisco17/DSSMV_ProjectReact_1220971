import React, {useEffect} from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCheckOutsHistoryList} from "../service/RequestsService";

const CheckOutItem = ({ checkOut }) => {
    return (
        <View>
            <TouchableOpacity style={styles.checkoutItem}>
                <Text>{checkOut.book.title}</Text>
                <Text>{checkOut.libraryName}</Text>
                <Text>{checkOut.dueDate}</Text>
                <Text>Active: {checkOut.active.toString()}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    checkoutItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
});

export default CheckOutItem;
