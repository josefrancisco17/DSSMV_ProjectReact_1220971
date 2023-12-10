import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator.js';

const App = () => {
    return (
        <NavigationContainer>
            <AuthNavigator/>
        </NavigationContainer>
    );
};

export default App;
