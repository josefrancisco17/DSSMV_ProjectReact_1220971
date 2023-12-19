import React, {useEffect, useState} from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCheckOutsList, postCheckInBook} from "../service/RequestsService";
import CheckOutItem from "../components/CheckOutItem";
import {check} from "react-native-permissions";

const CheckInScreen = ({navigation}) => {
    const [userName, setUserName] = useState("")
    const [checkedOutBooksList, setCheckedOutBooksList] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            fetchData()
        }, [])
    );

    const fetchData = async () => {
        try {
            const user = await AsyncStorage.getItem('userName');
            setUserName(user);

            const booksList = await getCheckOutsList(user);
            setCheckedOutBooksList(booksList);
        } catch (error) {
            console.error('Error in fetchData:', error);
        }
    };

    const handleCheckOutClick = async(checkOut) => {
        let originalString = checkOut.libraryId
        let libraryId = `${originalString.substring(0, 8)}-${originalString.substring(8, 12)}-${originalString.substring(12, 16)}-${originalString.substring(16, 20)}-${originalString.substring(20)}`;
        try {
            await postCheckInBook(libraryId, checkOut.book.isbn, userName)
        } catch (error) {
            console.log("Cant checkin because Library is closed")
        }
        fetchData();
    }

    const handleLongPress = async(checkOut) => {
        const book = checkOut.book
        const libraryId = checkOut.libraryId
        const libraryName = checkOut.libraryName
        navigation.navigate('Book', {book, libraryId, libraryName})
    }

    return (
        <View style={styles.screen}>
            <FlatList
                style={styles.flatList}
                data={checkedOutBooksList}
                renderItem={({item}) => (
                    <CheckOutItem checkOut={item} handleClick={() => handleCheckOutClick(item)} handleLongPress={() => handleLongPress(item)}/>
                )}
                keyExtractor={(checkOut) => checkOut.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        border: 2,
        borderWidth: 2,
    },
    text: {
        color: 'black'
    },
});

export default CheckInScreen;
