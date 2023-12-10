import React from 'react';
import {Button, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const FeedScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Feed Screen</Text>
        </View>
    );
};

const CheckOutScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>CheckOut Screen</Text>
        </View>
    );
};

const CheckInScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>CheckIn Screen</Text>
        </View>
    );
};

const ProfileScreen = ({navigation}) => {
    const logOut = async () => {
        await AsyncStorage.removeItem('userName');
        navigation.navigate('Login');
    };
    return (
        <View style={styles.screen}>
            <Text>Profile Screen</Text>
            <Button onPress={logOut} title="Logout"/>
        </View>
    );
};

const HomeScreen = ({navigation}) => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Feed" component={FeedScreen}/>
            <Drawer.Screen name="CheckOut" component={CheckOutScreen}/>
            <Drawer.Screen name="CheckIn" component={CheckInScreen}/>
            <Drawer.Screen name="Profile" component={ProfileScreen}/>
        </Drawer.Navigator>
    );
};

const styles = {
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default HomeScreen;
