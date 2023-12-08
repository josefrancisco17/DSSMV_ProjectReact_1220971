import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StartUpNavigator from './src/navigation/StartUpNavigator.js';
import 'react-native-gesture-handler';

function App() {
  return (
    <NavigationContainer>
      <StartUpNavigator />
    </NavigationContainer>
  );
}

export default App;
