import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [inputText, setInputText] = useState('');

  const onSubmit = async () => {
    if (inputText !== '') {
      await AsyncStorage.setItem('userName', inputText);
    } else {
      await AsyncStorage.setItem('userName', 'Wonderful User');
    }
    navigation.replace('Home');
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const userName = await AsyncStorage.getItem('userName');
    if (userName !== null) {
      navigation.replace('Home');
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
      <Button title="Login" onPress={onSubmit} />
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
