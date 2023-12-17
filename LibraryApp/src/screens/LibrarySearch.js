import React, {useState, useEffect} from 'react';
import {TextInput, View, FlatList, Alert, TouchableOpacity, Text} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {getLibrariesList} from '../service/RequestsService';
import LibraryItem from '../components/LibraryItem';

const CheckOutScreen = ({navigation}) => {
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
        navigation.navigate('BookSearch', {library})
    };

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
};

export default CheckOutScreen;
