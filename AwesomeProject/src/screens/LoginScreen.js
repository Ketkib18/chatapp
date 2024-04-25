import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.109.127:3000/login', {
        username,
        password,
      });

      // Alert.alert('in login', response.data)

      if (response.status === 200) {
        const {user} = response.data;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Incorrect username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        label="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={{marginBottom: 10, width: '80%'}}
        mode="outlined"
      />
      <TextInput
        label="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{marginBottom: 10, width: '80%'}}
        mode="outlined"
      />
      <Button onPress={handleLogin} style={{width: '80%'}}>
        Login
      </Button>
      <Button onPress={goToRegister} style={{width: '80%', marginTop: 10}}>
        Register
      </Button>
    </View>
  );
}