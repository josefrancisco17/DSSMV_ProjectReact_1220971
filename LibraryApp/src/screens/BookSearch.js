import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {getLibraryBooksList} from "../service/RequestsService";
import BookItem from '../components/BookItem.js';

const BookSearchScreen = ({ navigation, route }) => {
    const { library} = route.params;
    const [searchBook, setSearchBook] = useState('');
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        const fetchLibraryBooks = async () => {
            try {
                const books = await getLibraryBooksList(library.id);
                setBooksList(books);
            } catch (error) {
                console.error('Error fetching books list:', error);
            }
        };
        fetchLibraryBooks();
    }, []);

    const filteredBooksList = booksList.filter(
        (libraryBook) => libraryBook.book.title && libraryBook.book.title.toLowerCase().includes(searchBook.toLowerCase())
    )

    const handleBookClick = (item) => {
        navigation.navigate('Book')
    }

    return (
        <View style={styles.bookSearchContainer}>
            <TextInput
                style={styles.search}
                onChangeText={(text) => setSearchBook(text)}
                placeholder="Search"
                placeholderTextColor="black"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FlatList
                style={styles.flatList}
                data={filteredBooksList}
                renderItem={({ item }) => (
                    <BookItem libraryBook={item} handleClick={() => handleBookClick(item)} />
                )}
                keyExtractor={(book) => book.isbn.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    librarySearchContainer: {
        flex: 1,
    },
    bookSearchContainer: {
        flex: 1,
    },
    text: {
        color: 'black',
    },
    search: {
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        color: 'black',
    },
    flatList: {
        border: 2,
        borderWidth: 2,
    },
    bookItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
})

export default BookSearchScreen
