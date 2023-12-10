import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminScreen = ({navigation}) => {
    const logOut = async () => {
        await AsyncStorage.removeItem('userName');
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={logOut} style={styles.logoutButton}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <Text style={styles.headerText}>Admin Menu</Text>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Manage Libraries</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Create Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Update Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Delete Library</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Manage Books</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Create Book</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Delete Book</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    logoutButton: {
        backgroundColor: 'blue',
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#555',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default AdminScreen;
