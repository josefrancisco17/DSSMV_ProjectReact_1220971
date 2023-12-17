import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const LibraryScreen = ({ navigation, route }) => {
    const { library } = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{library.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        color: 'white',
    },
})

export default LibraryScreen
