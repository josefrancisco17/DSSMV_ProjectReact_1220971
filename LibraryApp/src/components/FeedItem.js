import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { getLibraryBooksList } from '../service/RequestsService';

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
        navigation.navigate('Library', { library });
    };

    const handleBookClick = (libraryBook) => {
        const book = libraryBook.book;
        const libraryName = libraryBook.library.name;
        const libraryId = libraryBook.library.id;
        navigation.navigate('Book', { book, libraryName, libraryId });
    };

    return (
        <View style={styles.card}>
            <Text style={styles.libraryName} onPress={() => handleLibraryClick(library)}>
                {library.name}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {books.map((item) => (
                    <TouchableOpacity key={item.isbn} onPress={() => handleBookClick(item)}>
                        <Image
                            source={{ uri: 'http://193.136.62.24/v1/' + item.book.cover.largeUrl.slice('/api/v1/'.length) }}
                            style={styles.bookImage}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#9784',
        margin: 15,
        padding: 15,
        borderRadius: 10,
    },
    scrollView: {
        marginTop: 5,
        flexGrow: 1,
    },
    bookImage: {
        width: 110,
        height: 155,
        marginHorizontal: 10,
        borderRadius: 8,
    },
    libraryName: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Ubuntu-Bold',
        marginBottom: 20,
    },
});

export default FeedItem;
