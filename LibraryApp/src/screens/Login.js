import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
    const [inputText, setInputText] = useState('');

    const checkLogIn = async () => {
        let userName = await AsyncStorage.getItem('userName');
        if (userName === 'admin') {
            navigation.navigate('Admin');
        } else if (userName !== null) {
            navigation.navigate('Home');
        }
    };

    useEffect(() => {
        checkLogIn();
    }, []);

    const onLogIn = async () => {
        if (inputText.toLowerCase().trim() === 'admin') {
            await AsyncStorage.setItem('userName', inputText);
            navigation.navigate('Admin');
        } else if (inputText !== '') {
            await AsyncStorage.setItem('userName', inputText);
            navigation.navigate('Home');
        } else {
            await AsyncStorage.setItem('userName', 'Wonderful User');
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.screen}>
            <Text>Login Screen</Text>
            <TextInput
                placeholder="Type here"
                value={inputText}
                onChangeText={text => setInputText(text)}
            />
            <Button title="Login" onPress={onLogIn}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;
