import * as React from 'react';
import {Button, View, Text, StyleSheet, TextInput} from 'react-native';

function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.text}
        placeholder={'Enter your username'}
        placeholderTextColor="black"
      />
      <Button title="Login" onPress={() => navigation.replace('HomeScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
});

export default LoginScreen;
