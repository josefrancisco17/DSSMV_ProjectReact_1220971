import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminScreen = ({ navigation }) => {
    const logOut = async () => {
        await AsyncStorage.removeItem('userName')
        navigation.navigate('Login')
    }

    const handleCreateLibrary = () => {
        navigation.navigate('CreateLibrary')
    }

    const handleDeleteLibrary = () => {
        navigation.navigate('DeleteLibrary')
    }

    const handleCreateBook = () => {
        navigation.navigate('CreateBook')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={logOut} style={styles.logoutButton}>
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Admin Menu</Text>

            <View style={styles.sectionContainer}>
                <Text style={styles.text}>Manage Libraries</Text>
                <TouchableOpacity style={styles.button} onPress={handleCreateLibrary}>
                    <Text style={styles.text}>Create Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDeleteLibrary}>
                    <Text style={styles.text}>Delete Library</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.text}>Manage Books</Text>
                <TouchableOpacity style={styles.button} onPress={handleCreateBook}>
                    <Text style={styles.text}>Create Book</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a1a',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 60,
        color: '#ccc',
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ccc',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingTop: 20,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    logoutButton: {
        backgroundColor: '#333',
        width: 100,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingTop: 15,
        borderRadius: 8,
    },
})

export default AdminScreen
