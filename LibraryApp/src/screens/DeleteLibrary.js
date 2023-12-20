import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { deleteLibrary, getLibrariesList } from "../service/RequestsService";
import LibraryItem from "../components/LibraryItem";
import { useFocusEffect } from "@react-navigation/native";

const DeleteLibraryScreen = ({ navigation }) => {
    const [searchLibrary, setSearchLibrary] = useState('');
    const [librariesList, setLibrariesList] = useState([]);

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
        try {
            const libraryId = library.id;
            await deleteLibrary(libraryId);
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
                    placeholderTextColor="white"
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    librarySearchContainer: {
        flex: 1,
    },
    search: {
        marginVertical: 20,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        color: 'white',
        marginBottom: 10,
    },
    flatList: {
        marginVertical: 20,
        alignSelf: 'center',
        width: '90%',
    },
});

export default DeleteLibraryScreen;
