import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList, StyleSheet } from 'react-native';
import { getLibrariesList, getLibraryBooksList } from '../service/RequestsService';
import ReviewItem from './ReviewItem';

const FeedItem = ({ navigation, library }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const booksList = await getLibraryBooksList(library.id);
            setBooks(booksList);
        };
        fetchData();
    }, []);

    const handleLibraryClick = (library) => {
        navigation.navigate('Library', {library})
    }

    const handleBookClick = (libraryBook) => {
        const book = libraryBook.book
        const libraryName = libraryBook.library.name
        const libraryId = libraryBook.library.id
        navigation.navigate('Book', {book, libraryName, libraryId})
    }

    return (
        <View style={styles.card}>
            <Text style={styles.libraryName} onPress={() => handleLibraryClick(library)}>{library.name}</Text>
            <FlatList
                style={styles.flatList}
                data={books}
                renderItem={({ item }) => (
                    <Text style={styles.book} onPress={() => handleBookClick(item)}>{item.book.title}</Text>
                )}
                keyExtractor={(libraryBook) => libraryBook.isbn.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#3498db',
        margin: 10,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    libraryName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    flatList: {
        marginTop: 5,
    },
    book: {
        color: '#333',
        fontSize: 16,
        marginBottom: 5,
    },
});

export default FeedItem;
