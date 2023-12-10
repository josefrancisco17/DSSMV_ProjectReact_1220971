import React from 'react';
import {Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminScreen = ({navigation}) => {
    const logOut = async () => {
        await AsyncStorage.removeItem('userName');
        navigation.navigate('Login');
    };
    return (
        <View style={styles.screen}>
            <Button onPress={logOut} title="Logout"/>
            <Text style={styles.text}>Admin Menu</Text>
            <View>
                <Text style={styles.text}>Manage Libraries</Text>
                <Button title="Create Library"/>
                <Button title="Update Library"/>
                <Button title="Delete Library"/>
            </View>
            <View>
                <Text style={styles.text}>Manage Books</Text>
                <Button title="Create Book"/>
                <Button title="Delete Book"/>
            </View>
        </View>
    );
};

const styles = {
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black'
    },
};

export default AdminScreen;
