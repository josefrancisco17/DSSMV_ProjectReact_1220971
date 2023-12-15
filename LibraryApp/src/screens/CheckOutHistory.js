import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCheckOutsHistoryList, getReviewsList} from "../service/RequestsService";
import CheckOutItem from "../components/CheckOutItem";

const CheckOutHistoryScreen = ({navigation}) => {
    const [userName, setUserName] = useState("")
    const [history, setHistory] = useState([])

    useEffect(() => {
        const getUserName = async () => {
            let user = await AsyncStorage.getItem('userName')
            setUserName(user)
        }
        const getHistoryfromWs = async () => {
            try {
                const checkOutHistory = await getCheckOutsHistoryList(userName)
                setHistory(checkOutHistory)
            } catch (error) {
                console.error('Error getting checkOutHistory list:', error)
            }
        };
        getUserName()
        getHistoryfromWs()
    }, []);

    return (
        <View style={styles.screen}>
            <FlatList
                style={styles.flatList}
                data={history}
                renderItem={({item}) => (
                    <CheckOutItem checkOut={item} handleClick={() => {}}/>
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

export default CheckOutHistoryScreen;
