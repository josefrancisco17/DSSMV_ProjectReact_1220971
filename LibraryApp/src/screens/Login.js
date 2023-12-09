import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const LoginScreen = ({navigation}) => {
  const handleLogin = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.screen}>
      <Text>Login Screen</Text>
      <TextInput placeholder="Type here" />
      <Button title="Login" onPress={handleLogin} />
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
