import React, { useState} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {getCheckOutsHistoryList, getCheckOutsList, getReviewsList} from "../service/RequestsService";
import CheckOutItem from "../components/CheckOutItem";

const CheckOutHistoryScreen = ({navigation}) => {
    const [history, setHistory] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            fetchData()
        }, [])
    );

    const fetchData = async () => {
        try {
            const user = await AsyncStorage.getItem('userName');
            const checkOutHistory = await getCheckOutsHistoryList(user)
            setHistory(checkOutHistory)
        } catch (error) {
            console.error('Error getting checkOutHistory list: ', error)
        }
    };

    const handleLongPress = async(checkOut) => {
        const book = checkOut.book
        const libraryId = checkOut.libraryId
        const libraryName = checkOut.libraryName
        navigation.navigate('Book', {book, libraryId, libraryName})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Check Out History</Text>
            <FlatList
                style={styles.flatList}
                data={history}
                renderItem={({item}) => (
                    <CheckOutItem checkOut={item} handleClick={() => {}} handleLongPress={() => handleLongPress(item)}/>
                )}
                keyExtractor={(checkOut) => checkOut.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    flatList: {
        marginTop: 20,
        width: '95%',
    },
    text: {
        color: 'black'
    },
    title: {
        marginTop: 30,
        color: 'white',
        fontSize: 22,
        fontFamily: 'Ubuntu-Bold',
    },
});

export default CheckOutHistoryScreen;
