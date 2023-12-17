import React, {useEffect, useState} from 'react';
import {Button, Alert, FlatList, StyleSheet, Text, ScrollView, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReviewItem from "../components/ReviewItem.js";
import {getCheckOutsList, getLibraryBooksList, getReviewsList} from "../service/RequestsService";
import {useFocusEffect} from "@react-navigation/native";

const ReviewsScreen = ({ navigation, route }) => {
    const [userName, setUserName] = useState("")
    const { book } = route.params
    const [reviews, setReviews] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            fetchData()
        }, [])
    );

    const fetchData = async () => {
        try {
            const user = await AsyncStorage.getItem('userName');
            setUserName(user);

            const bookReviews = await getReviewsList(book.isbn)
            setReviews(bookReviews)
        } catch (error) {
            console.error('Error in fetchData:', error);
        }
    };

    const handleMakeReview = async () => {
        let reviewId = null
        for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i]
            if (review.reviewer === userName) {
                reviewId = review.id
                break
            }
        }
        navigation.navigate('MakeReview', {book, reviewId})
    };

    const handleGoHome = () => {
        navigation.replace('Home')
    };

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.button}>
                <Text onPress={handleMakeReview}>Review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text onPress={handleGoHome}>Home</Text>
            </TouchableOpacity>
            <FlatList
                style={styles.flatList}
                data={reviews}
                renderItem={({item}) => (
                    <ReviewItem review={item}/>
                )}
                keyExtractor={(bookReview) => bookReview.id.toString()}
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
    text: {
        color: 'black'
    },
    flatList: {
        border: 2,
        borderWidth: 2,
    },
    button: {
        padding: 10,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ReviewsScreen;
