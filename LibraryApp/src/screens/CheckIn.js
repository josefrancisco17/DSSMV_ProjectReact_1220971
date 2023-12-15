import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCheckOutsList, postCheckInBook} from "../service/RequestsService";
import CheckOutItem from "../components/CheckOutItem";

const CheckInScreen = ({navigation}) => {
    const [userName, setUserName] = useState("")
    const [checkedOutBooksList, setCheckedOutBooksList] = useState([])

    useEffect(() => {
        const getUserName = async () => {
            let user = await AsyncStorage.getItem('userName')
            setUserName(user)
        }
        const getCheckedOutBooksListfromWs = async () => {
            try {
                const booksList = await getCheckOutsList(userName)
                setCheckedOutBooksList(booksList)
            } catch (error) {
                console.error('Error getting getCheckedOutBooks list:', error)
            }
        };
        getUserName()
        getCheckedOutBooksListfromWs()
    }, []);

    const handleCheckOutClick = async(checkOut) => {
        let originalString = checkOut.libraryId
        let libraryId = `${originalString.substring(0, 8)}-${originalString.substring(8, 12)}-${originalString.substring(12, 16)}-${originalString.substring(16, 20)}-${originalString.substring(20)}`;
        await postCheckInBook(libraryId, checkOut.book.isbn, userName)
    }

    return (
        <View style={styles.screen}>
            <FlatList
                style={styles.flatList}
                data={checkedOutBooksList}
                renderItem={({item}) => (
                    <CheckOutItem checkOut={item} handle handleClick={() => handleCheckOutClick(item)}/>
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
