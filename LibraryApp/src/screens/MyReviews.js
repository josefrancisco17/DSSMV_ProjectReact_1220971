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
        <View style={styles.container}>
            <Text style={styles.title}>Your Reviews</Text>
            {isLoading ? (
                <ActivityIndicator size="large" color="white" style={styles.activityIndicator} />
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
    title: {
        marginTop: 30,
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default MyReviewsScreen;
