import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const LibraryScreen = ({ navigation, route }) => {
    const { library } = route.params;

    const handleReturn = async () => {
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{library.name}</Text>
            <Text style={styles.subtitle}>Library Information</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Address:</Text>
                <Text style={styles.infoText}>{library.address}</Text>
                <Text style={styles.infoLabel}>Open Time:</Text>
                <Text style={styles.infoText}>{library.openTime}</Text>
                <Text style={styles.infoLabel}>Close Time:</Text>
                <Text style={styles.infoText}>{library.closeTime}</Text>
                <Text style={styles.infoLabel}>Open:</Text>
                <Text style={styles.infoText}>{library.open.toString()}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleReturn()}>
                <Text style={styles.buttonText}>Home</Text>
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
        fontSize: 30,
        fontFamily: 'Ubuntu-Bold',
        marginTop: 16,
        color: 'white',
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Ubuntu-Bold',
        marginTop: 10,
        marginBottom: 10,
        color: '#007bff',
    },
    infoContainer: {
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 12,
        marginVertical: 20,
        width: '100%',
    },
    infoLabel: {
        color: '#007bff',
        fontSize: 16,
        fontFamily: 'Ubuntu-Regular',
        marginBottom: 5,
    },
    infoText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Ubuntu-Regular',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 12,
        marginTop: 30,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
    },
});

export default LibraryScreen;
