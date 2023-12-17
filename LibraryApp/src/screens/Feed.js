import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLibrariesList} from "../service/RequestsService";
import FeedItem from "../components/FeedItem";

const FeedScreen = ({navigation}) => {
    const [libraries, setLibraries] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async() => {
        try {
            setRefreshing(true);
            const librariesList = await getLibrariesList();
            setLibraries(librariesList);
        } catch (error) {
            console.error('Error fetching libraries:', error);
        } finally {
            setRefreshing(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <View style={styles.screen}>
            <FlatList
                style={styles.flatList}
                data={libraries}
                renderItem={({ item }) => <FeedItem navigation={navigation} library={item} />}
                keyExtractor={(library) => library.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    text: {
        color: 'black'
    },
});

export default FeedScreen;
