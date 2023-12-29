import React, { useState } from 'react';
import {TouchableOpacity, StyleSheet, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
    const [inputText, setInputText] = useState('');

    const onLogIn = async () => {
        if (inputText.toLowerCase().trim() === 'admin') {
            await AsyncStorage.setItem('userName', inputText)
            navigation.navigate('Admin')
        } else if (inputText !== '') {
            await AsyncStorage.setItem('userName', inputText)
            navigation.navigate('Home')
        } else {
            await AsyncStorage.setItem('userName', 'Wonderful User')
            navigation.navigate('Home')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Library App</Text>
                <TextInput
                    placeholder="User Name"
                    placeholderTextColor="white"
                    value={inputText}
                    onChangeText={text => setInputText(text)}
                    style={styles.inputText}
                />
                <TouchableOpacity style={styles.button} onPress={onLogIn}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    card: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Ubuntu-Bold',
        marginBottom: 20,
        color: 'white',
    },
    inputText: {
        width: 200,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        color: 'white',
    },
    button: {
        width: 200,
        height: 40,
        backgroundColor: '#007bff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Ubuntu-Bold',
    },
})

export default LoginScreen
