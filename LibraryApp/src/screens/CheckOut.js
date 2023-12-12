import React, {useState, useEffect} from 'react';
import {TextInput, View, FlatList, Text} from 'react-native';
import {getLibrariesList} from '../service/RequestsService';

const CheckOutScreen = ({navigation}) => {
    const [searchLibrary, setSearchLibrary] = useState('');
    const [librariesList, setLibrariesList] = useState([]);

    useEffect(() => {
        const fetchLibraries = async () => {
            try {
                const libraries = await getLibrariesList();
                setLibrariesList(libraries);
            } catch (error) {
                console.error('Error fetching libraries list:', error);
            }
        };
        fetchLibraries();
    }, []);

    const filteredLibraries = librariesList.filter(
        library => library.name.toLowerCase().includes(searchLibrary.toLowerCase())
    )

    const LibraryItem = ({item}) => (
        <View>
            <Text style={styles.libraryItem}>{`${item.name}`}</Text>
        </View>
    );

    return (
        <View style={styles.screen}>
            <TextInput
                style={styles.search}
                onChangeText={text => setSearchLibrary(text)}
                placeholder="Search"
                placeholderTextColor="black"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FlatList
                style={styles.flatList}
                data={filteredLibraries}
                renderItem={LibraryItem}
                keyExtractor={(library) => library.id.toString()}
            />
        </View>
    );
};

const styles = {
    screen: {
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
    libraryItem: {
        color: 'black',
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'lightblue',
        borderRadius: 10,
    },
};

export default CheckOutScreen;
