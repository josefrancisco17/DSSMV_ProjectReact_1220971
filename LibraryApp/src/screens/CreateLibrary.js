import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { postLibrary } from "../service/RequestsService";

const CreateLibraryScreen = ({ navigation }) => {
    const [libraryName, setLibraryName] = useState('');
    const [libraryAddress, setLibraryAddress] = useState('');
    const [libraryOpenTime, setLibraryOpenTime] = useState('');
    const [libraryCloseTime, setLibraryCloseTime] = useState('');
    const [libraryOpenDays, setLibraryOpenDays] = useState('');

    const handleSubmit = async () => {
        try {
            await postLibrary(libraryName, libraryAddress, libraryOpenTime, libraryCloseTime, libraryOpenDays);
        } catch (error) {
            throw error;
        }
        navigation.navigate('Admin');
    };

    const handleReturn = async () => {
        navigation.navigate('Admin');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.returnButton} onPress={handleReturn}>
                <Text style={styles.buttonText}>Return</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Library Name</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLibraryName(text)}
                value={libraryName}
                placeholder="Isep Library"
                placeholderTextColor="#ccc"
            />

            <Text style={styles.title}>Library Address</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLibraryAddress(text)}
                value={libraryAddress}
                placeholder="R. Dr António Bernardino"
                placeholderTextColor="#ccc"
            />

            <Text style={styles.title}>Library Open Time</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLibraryOpenTime(text)}
                value={libraryOpenTime}
                placeholder="08:00:00"
                placeholderTextColor="#ccc"
            />

            <Text style={styles.title}>Library Close Time</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLibraryCloseTime(text)}
                value={libraryCloseTime}
                placeholder="22:00:00"
                placeholderTextColor="#ccc"
            />

            <Text style={styles.title}>Library Open Days</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLibraryOpenDays(text)}
                value={libraryOpenDays}
                placeholder="Everyday"
                placeholderTextColor="#ccc"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#1a1a1a',
    },
    title: {
        color: 'white',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 16,
        marginVertical: 10,
    },
    input: {
        color: '#ccc',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        marginTop: 35,
        padding: 20,
        width: '55%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 16,
    },
    returnButton: {
        position: 'absolute',
        top: 10,
        left: 20,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#333',
    },
});

export default CreateLibraryScreen;
