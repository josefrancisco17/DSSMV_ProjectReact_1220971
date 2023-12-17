import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from "@react-navigation/native";
import {getCheckOutsHistoryList, getMyReviewsList} from "../service/RequestsService";
import ReviewItem from "../components/ReviewItem";

const MyReviewsScreen = ({navigation}) => {
    const [userReviews, setUserReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            fetchData()
        }, [])
    );

    const fetchData = async () => {
        try {
            const user = await AsyncStorage.getItem('userName');
            const userReviews = await getMyReviewsList(user)
            setUserReviews(userReviews)
        } catch (error) {
            console.error('Error getting userReviews list: ', error)
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View style={styles.screen}>
            {isLoading ? (
                <ActivityIndicator size="large" color="blue" style={styles.activityIndicator} />
            ) : (
                <FlatList
                    style={styles.flatList}
                    data={userReviews}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                    keyExtractor={(bookReview) => bookReview.id.toString()}
                />
            )}
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
});

export default MyReviewsScreen;
