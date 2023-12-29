import React, { useState } from 'react';
import { Switch, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postReviewBook, updateReviewBook } from "../service/RequestsService";
import { useFocusEffect } from "@react-navigation/native";

const MakeReviewScreen = ({ navigation, route }) => {
    const { book, reviewId } = route.params;
    const [userName, setUserName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [recommended, setRecommended] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        try {
            const user = await AsyncStorage.getItem('userName');
            setUserName(user);
        } catch (error) {
            console.error('Error in fetchData:', error);
        }
    };

    const handleSubmitClick = async () => {
        if (reviewId === null) {
            await postReviewBook(book.isbn, userName, reviewText, recommended.toString());
        } else {
            await updateReviewBook(book.isbn, userName, reviewText, recommended.toString(), reviewId);
        }
        navigation.replace('Reviews', { book });
    };

    const handleReturnClick = async () => {
        navigation.replace('Reviews', { book });
    };

    const toggleSwitch = () => {
        setRecommended(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.returnButton} onPress={handleReturnClick}>
                <Text style={styles.buttonText}>Return</Text>
            </TouchableOpacity>

            <View style={styles.mainContainer}>
                <Text style={styles.heading}>Make a Review for {book.title}</Text>

                <TextInput
                    placeholder="Your Review"
                    placeholderTextColor="#999"
                    value={reviewText}
                    onChangeText={text => setReviewText(text)}
                    style={styles.reviewText}
                    multiline={true}
                />

                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Recommend:</Text>
                    <Switch
                        thumbColor={recommended ? 'green' : 'red'}
                        onValueChange={toggleSwitch}
                        value={recommended}
                    />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitClick}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontFamily: 'Ubuntu-Bold',
        marginBottom: 20,
        color: 'white',
    },
    reviewText: {
        width: '100%',
        height: 120,
        borderColor: '#333',
        borderWidth: 2,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        color: 'white',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 16,
        fontFamily: 'Ubuntu-Regular',
        marginRight: 10,
        color: 'white',
    },
    submitButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    returnButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 20,
        borderRadius: 8,
        marginVertical: 8,
        backgroundColor: '#333',
    },
    mainContainer: {
        width: 375,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Ubuntu-Bold',
    },
});

export default MakeReviewScreen;
