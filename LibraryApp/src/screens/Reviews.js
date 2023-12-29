import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import ReviewItem from "../components/ReviewItem";
import {
    getRecommendedCount,
    getReviewsList
} from "../service/RequestsService";

const ReviewsScreen = ({ navigation, route }) => {
    const { book } = route.params;
    const [userName, setUserName] = useState("");
    const [recommendCount, setRecommendCount] = useState("");
    const [reviews, setReviews] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        try {
            const user = await AsyncStorage.getItem('userName');
            setUserName(user);

            const recommendNum = await getRecommendedCount(book.isbn);
            setRecommendCount(recommendNum);

            const bookReviews = await getReviewsList(book.isbn);
            setReviews(bookReviews);
        } catch (error) {
            console.error('Error in fetchData:', error);
        }
    };

    const handleMakeReview = async () => {
        let reviewId = null;
        for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i];
            if (review.reviewer === userName) {
                reviewId = review.id;
                break;
            }
        }
        navigation.navigate('MakeReview', { book, reviewId });
    };

    const handleGoHome = () => {
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleGoHome}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleMakeReview}>
                    <Text style={styles.buttonText}>Review</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.recommendedCountText}>Recommend Count: {recommendCount}</Text>
            <FlatList
                data={reviews}
                renderItem={({ item }) => (
                    <ReviewItem review={item} />
                )}
                keyExtractor={(bookReview) => bookReview.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    button: {
        flex: 1,
        padding: 10,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Ubuntu-Bold',
    },
    text: {
        color: 'white',
        fontFamily: 'Ubuntu-Regular',
        marginBottom: 8,
    },
    recommendedCountText: {
        alignSelf: 'center',
        marginBottom: 8,
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default ReviewsScreen;
