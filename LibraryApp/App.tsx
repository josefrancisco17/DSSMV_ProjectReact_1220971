import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StartUpNavigator from './src/navigation/StartUpNavigator.js';

const App = () => {
  return (
    <NavigationContainer>
      <StartUpNavigator />
    </NavigationContainer>
  );
};

export default App;
