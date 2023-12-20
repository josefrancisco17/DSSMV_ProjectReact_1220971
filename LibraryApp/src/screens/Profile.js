import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyReviewsScreen from "./MyReviews";
import CheckOutHistory from "./CheckOutHistory";
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <Tab.Screen
                name="MyReviews"
                component={MyReviewsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="star" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="CheckOutHistory"
                component={CheckOutHistory}
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="history" color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default ProfileScreen;
