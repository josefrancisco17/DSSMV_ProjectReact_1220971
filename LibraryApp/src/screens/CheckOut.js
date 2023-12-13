import React, {useState, useEffect} from 'react';
import {TextInput, View, FlatList, Alert} from 'react-native';
import {getLibrariesList} from '../service/RequestsService';
import LibraryItem from '../components/LibraryItem';

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
        (library) => library.name.toLowerCase().includes(searchLibrary.toLowerCase())
    );

    const handleLibraryClick = (item) => {
        Alert.alert(
            'Title',
            'Message',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false}
        );
    };

    const handleBookClick = (item) => {
        Alert.alert(
            'Title',
            'Message',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false}
        );
    };

    return (
        <View style={styles.screen}>
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
                data={filteredLibraries}
                renderItem={({item}) => <LibraryItem item={item} handleClick={handleLibraryClick}/>}
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
};

export default CheckOutScreen;
