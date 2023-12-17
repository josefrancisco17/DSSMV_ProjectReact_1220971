import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, TextInput, FlatList, Button} from 'react-native';
import {deleteLibrary, getLibrariesList, postLibraryBook} from "../service/RequestsService";
import LibraryItem from "../components/LibraryItem";
import {useFocusEffect} from "@react-navigation/native";
import createLibrary from "./CreateLibrary";

const MakeBookScreen = ({ navigation }) => {
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
        setLibraryId(library.id)
    };

    const handleSubmit = async() => {
        try {
            await postLibraryBook(bookIsbn, libraryId, stock)
        } catch (error) {
            throw error
        }
        navigation.navigate('Admin')
    }

    return (
        <View style={styles.container}>
            <View style={styles.librarySearchContainer}>
                <TextInput
                    style={styles.search}
                    onChangeText={(text) => setSearchLibrary(text)}
                    placeholder="Search"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FlatList
                    style={styles.flatList}
                    data={filteredLibrariesList}
                    renderItem={({item}) => (
                        <LibraryItem library={item} handleClick={() => handleLibraryClick(item)}/>
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
                    placeholder={"987544686464"}
                />

                <Text style={styles.text}>Book Stock</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setStock(text)}
                    value={stock}
                    placeholder={"17"}
                />
            </View>
            <Button style={styles.submitButton} title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
    },
    librarySearchContainer: {
        flex: 1,
    },
    textInputContainer: {
        flex: 1,
    },
    text: {
        color: 'black',
    },
    input: {
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
};

export default MakeBookScreen
