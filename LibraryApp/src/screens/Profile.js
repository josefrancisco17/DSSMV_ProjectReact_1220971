import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyReviewsScreen from "./MyReviews";
import CheckOutHistory from "./CheckOutHistory";

const Tab = createBottomTabNavigator();

const ProfileScreen = ({ navigation }) => {
    const logOut = async () => {
        await AsyncStorage.removeItem('userName');
        navigation.navigate('Login');
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1c1c1c',
                    borderColor: '#1c1c1c',
                },
            }}
        >
            <Tab.Screen name="MyReviews" component={MyReviewsScreen} />
            <Tab.Screen name="CheckOutHistory" component={CheckOutHistory} />
        </Tab.Navigator>
    );
};

export default ProfileScreen;
