import React, {useEffect, useState} from 'react';
import {Button, Alert, FlatList, StyleSheet, Text, ScrollView, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReviewItem from "../components/ReviewItem.js";
import {getLibraryBooksList, getReviewsList} from "../service/RequestsService";

const ReviewsScreen = ({ navigation, route }) => {
    const [userName, setUserName] = useState("")
    const { libraryBook } = route.params
    const book = libraryBook.book
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const getUserName = async () => {
            let user = await AsyncStorage.getItem('userName')
            setUserName(user)
        }
        const getBookReviewsfromWs = async () => {
            try {
                const bookReviews = await getReviewsList(book.isbn)
                setReviews(bookReviews)
            } catch (error) {
                console.error('Error getting bookReviews list:', error)
            }
        };
        getUserName()
        getBookReviewsfromWs()
    }, []);

    const handleReviewClick = async (review) => {
        Alert.alert(
            'Review Details',
            `Author: ${review.reviewer}\nRating: ${review.recommended}\nComment: ${review.review}`,
            [
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                },
            ],
            { cancelable: false }
        );
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

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.reviewButton}>
                <Text onPress={handleMakeReview}>Review</Text>
            </TouchableOpacity>
            <FlatList
                style={styles.flatList}
                data={reviews}
                renderItem={({item}) => (
                    <ReviewItem review={item} handleClick={() => handleReviewClick(item)}/>
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
    reviewButton: {
        padding: 10,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ReviewsScreen;
