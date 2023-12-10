import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home.js';
import LoginScreen from '../screens/Login.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const StartUpNavigator = () => {
  const [initialRouteName, setInitialRouteName] = useState('Login');

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const userName = await AsyncStorage.getItem('userName');
    if (userName !== null) {
      setInitialRouteName('Home');
    } else {
      setInitialRouteName('Login');
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default StartUpNavigator;
