import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {getLibraryBooksList} from "../service/RequestsService";
import { useFocusEffect } from '@react-navigation/native';
import BookItem from '../components/BookItem.js';
import {SearchBar} from "react-native-screens";

const BookSearchScreen = ({ navigation, route }) => {
    const { library } = route.params;
    const [searchBook, setSearchBook] = useState('');
    const [booksList, setBooksList] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchData()
        }, [])
    );

    const fetchData = async () => {
        try {
            const books = await getLibraryBooksList(library.id);
            setBooksList(books);
        } catch (error) {
            console.error('Error getting books list:', error);
        }
    };

    const filteredBooksList = booksList.filter(
        (libraryBook) => libraryBook.book.title && libraryBook.book.title.toLowerCase().includes(searchBook.toLowerCase())
    )

    const handleBookClick = (libraryBook) => {
        const book = libraryBook.book
        const libraryId = libraryBook.library.id
        const libraryName = libraryBook.library.name
        navigation.navigate('Book', {book, libraryId, libraryName})
    }

    const handleBackClick = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackClick}>
                <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.search}
                onChangeText={(text) => setSearchBook(text)}
                placeholder="Search Book"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FlatList
                style={styles.flatList}
                data={filteredBooksList}
                renderItem={({ item }) => (
                    <BookItem libraryBook={item} handleClick={() => handleBookClick(item)} />
                )}
                keyExtractor={(libraryBook) => libraryBook.isbn.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a1a',
    },
    search: {
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderRadius: 10,
        color: '#ccc',
        fontSize: 16,
        fontFamily: 'Ubuntu-Regular',
        borderColor: '#ccc',
        textAlign: 'center',
    },
    flatList: {
        marginTop: 10,
    },
    text: {
        fontSize: 18,
        fontFamily: 'Ubuntu-Bold',
        color: '#ccc',
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#333',
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 10,
    },
})

export default BookSearchScreen
