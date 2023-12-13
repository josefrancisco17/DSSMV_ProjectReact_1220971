import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import FeedScreen from "../screens/Feed";
import CheckOutScreen from '../screens/LibrarySearch.js'
import CheckInScreen from '../screens/CheckIn.js'
import ProfileScreen from '../screens/Profile.js'
import SettingsScreen from '../screens/Settings.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
let userName

async function getUserName() {
    userName = await AsyncStorage.getItem('userName')
}

const CustomDrawerContent = (props) => {
    async function logOut() {
        await AsyncStorage.removeItem('userName')
        props.navigation.replace('Login')
    }

    return (
        <DrawerContentScrollView {...props}>
            <View>
                <Text style={styles.text}>User Name: {userName}</Text>
            </View>
            <DrawerItemList {...props} />
            <View style={styles.drawerBottom}>
                <Button onPress={logOut} title="Logout"/>
            </View>
        </DrawerContentScrollView>
    );
};

const DrawerNavigator = () => {
    useEffect(() => {
        getUserName();
    }, []);

    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Feed" component={FeedScreen}
                           options={{drawerActiveTintColor: '#333', drawerActiveBackgroundColor: 'lightblue'}}/>
            <Drawer.Screen name="CheckOut" component={CheckOutScreen}
                           options={{drawerActiveTintColor: '#333', drawerActiveBackgroundColor: 'lightblue'}}/>
            <Drawer.Screen name="CheckIn" component={CheckInScreen}
                           options={{drawerActiveTintColor: '#333', drawerActiveBackgroundColor: 'lightblue'}}/>
            <Drawer.Screen name="Profile" component={ProfileScreen}
                           options={{drawerActiveTintColor: '#333', drawerActiveBackgroundColor: 'lightblue'}}/>
            <Drawer.Screen name="Settings" component={SettingsScreen}
                           options={{drawerActiveTintColor: '#333', drawerActiveBackgroundColor: 'lightblue'}}/>
        </Drawer.Navigator>
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
    drawerBottom: {
        padding: 10,
    },
};

export default DrawerNavigator;
