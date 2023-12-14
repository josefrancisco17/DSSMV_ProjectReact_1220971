import React, {useEffect, useState} from 'react';
import {Button, Switch, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getReviewsList,postReviewBook, updateReviewBook} from "../service/RequestsService";

const MakeReviewScreen = ({ navigation, route }) => {
    const {book, reviewId} = route.params
    const [userName, setUserName] = useState("")
    const [reviewText, setReviewText] = useState("");
    const [recommended, setRecommended] = useState(false);

    useEffect(() => {
        const getUserName = async () => {
            let user = await AsyncStorage.getItem('userName')
            setUserName(user)
        }
        getUserName()
    }, []);

    const handleSubmitClick = async () => {
        if (reviewId === null) {
            await postReviewBook(book.isbn, userName , reviewText, recommended.toString())
        } else {
            await updateReviewBook(book.isbn, userName, reviewText, recommended.toString(), reviewId)
        }
        navigation.replace('Home')
    }

    const toggleSwitch = () => {
        setRecommended(previousState => !previousState)
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Make a review for {book.title}</Text>
            <TextInput
                placeholder="Review"
                placeholderTextColor="black"
                value={reviewText}
                onChangeText={text => setReviewText(text)}
                style={styles.reviewText}
            />
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={recommended ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={recommended}
            />
            <TouchableOpacity style={styles.submitButton}>
                <Text onPress={handleSubmitClick}>Submit</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black'
    },
    submitButton: {
        padding: 10,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewText: {
        width: 200,
        height: 40,
        borderColor: 'darkgray',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        color: 'black',
    },
});

export default MakeReviewScreen;
