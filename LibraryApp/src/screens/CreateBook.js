import React, { useState } from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { getLibrariesList, postLibraryBook } from "../service/RequestsService";
import LibraryItem from "../components/LibraryItem";
import { useFocusEffect } from "@react-navigation/native";

const CreateBookScreen = ({ navigation }) => {
    const [searchLibrary, setSearchLibrary] = useState('');
    const [librariesList, setLibrariesList] = useState([]);
    const [bookIsbn, setBookIsbn] = useState('');
    const [libraryId, setLibraryId] = useState('');
    const [stock, setStock] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        try {
            const libraries = await getLibrariesList();
            setLibrariesList(libraries);
        } catch (error) {
            console.error('Error getting libraries list:', error);
        }
    };

    const filteredLibrariesList = librariesList.filter(
        (library) =>
            library.name &&
            library.name.toLowerCase().includes(searchLibrary.toLowerCase())
    );

    const handleLibraryClick = async (library) => {
        setLibraryId(library.id);
    };

    const handleSubmit = async () => {
        try {
            await postLibraryBook(bookIsbn, libraryId, stock);
        } catch (error) {
            throw error;
        }
        navigation.navigate('Admin');
    };

    return (
        <View style={styles.container}>
            <View style={styles.librarySearchContainer}>
                <TextInput
                    style={styles.search}
                    onChangeText={(text) => setSearchLibrary(text)}
                    placeholder="Search"
                    placeholderTextColor="#ccc"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FlatList
                    style={styles.flatList}
                    data={filteredLibrariesList}
                    renderItem={({ item }) => (
                        <LibraryItem library={item} handleClick={() => handleLibraryClick(item)} />
                    )}
                    keyExtractor={(library) => library.id.toString()}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.text}>Book Isbn</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setBookIsbn(text)}
                    value={bookIsbn}
                    placeholder="987544686464"
                    placeholderTextColor="#ccc"
                />

                <Text style={styles.text}>Book Stock</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setStock(text)}
                    value={stock}
                    placeholder="17"
                    placeholderTextColor="#ccc"
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 20,
    },
    librarySearchContainer: {
        flex: 1,
        marginBottom: 5,
    },
    textInputContainer: {
        flex: 1,
        borderColor: '#ccc',
        width: '93%',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    text: {
        color: 'white',
        marginVertical: 20,
    },
    input: {
        color: 'white',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 25,
    },
    search: {
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        color: 'white',
    },
    flatList: {
        marginVertical: 20,
        alignSelf: 'center',
        width: '90%',
    },
    button: {
        color: 'black',
        padding: 20,
        marginTop: 20,
        backgroundColor: '#007bff',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ccc',
        textAlign: 'center',
    }
});

export default CreateBookScreen;
