import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import axios from 'axios';

export default function RegistrationForm({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const handleRegister = async () => {
    try {
      console.log('Data being sent:', {username, password, mobile});
      const response = await axios.post('http://192.168.109.127:3000/register', {
        username,
        password,
        mobile,
      });

      console.log(response);

      if (response.status === 201) {
        navigation.navigate('Login');
        Alert.alert('Success', 'Registration successful. Please login.');
      } else {
        Alert.alert(
          'Error',
          'An error occurred during registration. Please try again.',
        );
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
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
      <TextInput
        label="Enter mobile number"
        value={mobile}
        onChangeText={setMobile}
        style={{marginBottom: 10, width: '80%'}}
        mode="outlined"
      />
      <Button onPress={handleRegister} style={{width: '80%'}}>
        Register
      </Button>
      <Button onPress={goToLogin} style={{width: '80%'}}>
        Login
      </Button>
    </View>
  );
}

// import React, {useState} from 'react';
// import {View, Alert} from 'react-native';
// import {Button, TextInput} from 'react-native-paper';
// import axios from 'axios';

// export default function RegisterScreen({navigation}) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [mobile, setMobile] = useState('');

//   const handleRegister = async () => {
//     try {
//       console.log('Data being sent:', {username, password, mobile});
//       const response = await axios.post('http://10.212.5.216:3000/register', {
//         username,
//         password,
//         mobile,
//       });

//       console.log(response);

//       if (response.status === 201) {
//         navigation.navigate('Login');
//         Alert.alert('Success', 'Registration successful. Please login.');
//       } else {
//         Alert.alert(
//           'Error',
//           'An error occurred during registration. Please try again.',
//         );
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       Alert.alert('Error', 'An error occurred. Please try again later.');
//     }
//   };

//   const goToLogin = () => {
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <TextInput
//         label="Enter your username"
//         value={username}
//         onChangeText={setUsername}
//         style={{marginBottom: 10, width: '80%'}}
//         mode="outlined"
//       />
//       <TextInput
//         label="Enter your password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={{marginBottom: 10, width: '80%'}}
//         mode="outlined"
//       />
//       <TextInput
//         label="Enter mobile number"
//         value={mobile}
//         onChangeText={setMobile}
//         style={{marginBottom: 10, width: '80%'}}
//         mode="outlined"
//       />
//       <Button mode="contained" onPress={handleRegister} style={{width: '80%'}}>
//         {'Register'}
//       </Button>
//       <Button
//         mode="contained"
//         onPress={goToLogin}
//         style={{width: '80%', marginTop: 10}}>
//         {'Login'}
//       </Button>
//     </View>
//   );
// }
