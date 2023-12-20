import React, {useState, useEffect} from 'react';
import {TextInput, View, FlatList, Alert, TouchableOpacity, Text, StyleSheet} from 'react-native';
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
            <TextInput
                style={styles.search}
                onChangeText={(text) => setSearchLibrary(text)}
                placeholder="Search Library"
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
    );
};

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
        borderColor: '#ccc',
        textAlign: 'center',
    },
    flatList: {
        marginTop: 10,
    },
});

export default CheckOutScreen;
