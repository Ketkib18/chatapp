import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {
  TextInput,
  useTheme,
  Button,
  List,
  Appbar,
  IconButton,
} from 'react-native-paper';
import io from 'socket.io-client';

// const socket = io('http://10.212.5.216:3000');
const socket = io('https://group-chat-app-1ll6.onrender.com/');
export default function HomeScreen() {
  const theme = useTheme();

  const [username, setUsername] = useState('');
  const [groupName, setGroupName] = useState('');
  const [messages, setMessages] = useState<{sender: string; message: string}[]>(
    [],
  );
  const [inputMessage, setInputMessage] = useState<string>('');
  const [joinedGroup, setJoinedGroup] = useState<boolean>(false);

  useEffect(() => {
    socket.on('chat message', (data: {sender: string; message: string}) => {
      setMessages(prevMessages => [...prevMessages, data]);
      console.log(data);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('chat message', {sender: username, message: inputMessage});
      setInputMessage('');
    }
  };

  const joinGroup = () => {
    if (!username.trim() || !groupName.trim()) {
      Alert.alert('Error', 'Username and group name are required.'); // Use Alert from react-native-paper
      return;
    }

    socket.emit('join group', {
      username: username.trim(),
      groupName: groupName.trim(),
    });
    setJoinedGroup(true);
  };

  const leaveGroup = () => {
    socket.emit('leave group', {username, groupName});
    setUsername('');
    setGroupName('');
    setMessages([]);
    setJoinedGroup(false);
  };

  return (
    // KeyboardAvoidingView is for, when we open keybord it imsures that other elemend doesn't get hide, u can simply check just replace view by KeyboardAvoidingView then type in textbox it may hide input box with keybord
    // behavior='padding' is for adjust padding automatically between element and keybord
    // if still ui is covered by keybord then use keyboardVerticalOffset={some int value}
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: '#f2f2f2'}}>
        {/* <Appbar.Content title="Group Chat" subtitle={groupName} /> */}
        <Appbar.Content
          title={`Group: ${groupName}`}
          style={{alignItems: 'center'}}
        />

        {joinedGroup && <IconButton icon="logout" onPress={leaveGroup} />}
      </Appbar.Header>
      {joinedGroup ? (
        <View style={{flex: 1, width: '100%'}}>
          <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <List.Section>
              {/* <List.Subheader>Chat</List.Subheader> */}
              {messages.map((item, index) => (
                <List.Item
                  key={index.toString()}
                  // title={`${item.sender}: ${item.message}`}
                  title={`${item.sender}: `}
                  description={item.message}
                  titleNumberOfLines={1}
                  descriptionNumberOfLines={0}
                />
              ))}
            </List.Section>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <TextInput
              label="Type your message"
              value={inputMessage}
              onChangeText={setInputMessage}
              style={{flex: 1, margin: 6}}
            />
            {/* <IconButton icon="send" onPress={sendMessage} /> */}
            <IconButton
              icon="send"
              iconColor="white"
              style={{backgroundColor: '#673ab7', borderRadius: 30}}
              onPress={sendMessage}
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            label="Enter your username"
            value={username}
            onChangeText={setUsername}
            style={{marginBottom: 10, width: '80%'}}
            mode="outlined"
          />
          <TextInput
            label="Enter group name"
            value={groupName}
            onChangeText={setGroupName}
            style={{marginBottom: 10, width: '80%'}}
            mode="outlined"
          />
          <Button mode="contained" onPress={joinGroup} style={{width: '80%'}}>
            Join Group
          </Button>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Alert,
//   KeyboardAvoidingView,
// } from 'react-native';
// import {
//   TextInput,
//   useTheme,
//   Button,
//   List,
//   Appbar,
//   IconButton,
// } from 'react-native-paper';
// import io from 'socket.io-client';

// const socket = io('http://10.212.5.216:3000'); //replace ip by hosted link
// // const socket=io('https://group-chat-app-1ll6.onrender.com/');

// export default function HomeScreen() {
//   const theme = useTheme();

//   const [username, setUsername] = useState('');
//   const [groupName, setGroupName] = useState('');
//   const [messages, setMessages] = useState<{sender: string; message: string}[]>(
//     [],
//   );
//   const [inputMessage, setInputMessage] = useState<string>('');
//   const [joinedGroup, setJoinedGroup] = useState<boolean>(false);

//   useEffect(() => {
//     socket.on('chat message', (data: {sender: string; message: string}) => {
//       setMessages(prevMessages => [...prevMessages, data]);
//       console.log(data);
//     });

//     return () => {
//       socket.off('chat message');
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputMessage.trim() !== '') {
//       socket.emit('chat message', {sender: username, message: inputMessage});
//       setInputMessage('');
//     }
//   };

//   const joinGroup = () => {
//     if (!username.trim() || !groupName.trim()) {
//       Alert.alert('Error', 'Username and group name are required.'); // Use Alert from react-native-paper
//       return;
//     }

//     socket.emit('join group', {
//       username: username.trim(),
//       groupName: groupName.trim(),
//     });
//     setJoinedGroup(true);
//   };

//   const leaveGroup = () => {
//     socket.emit('leave group', {username, groupName});
//     setUsername('');
//     setGroupName('');
//     setMessages([]);
//     setJoinedGroup(false);
//   };

//   return (
//     // KeyboardAvoidingView is for, when we open keybord it imsures that other elemend doesn't get hide, u can simply check just replace view by KeyboardAvoidingView then type in textbox it may hide input box with keybord
//     // behavior='padding' is for adjust padding automatically between element and keybord
//     // if still ui is covered by keybord then use keyboardVerticalOffset={some int value}
//     <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
//       <Appbar.Header style={{backgroundColor: '#f2f2f2'}}>
//         {/* <Appbar.Content title="Group Chat" subtitle={groupName} /> */}
//         <Appbar.Content
//           title={`Group: ${groupName}`}
//           style={{alignItems: 'center'}}
//         />

//         {joinedGroup && <IconButton icon="logout" onPress={leaveGroup} />}
//       </Appbar.Header>
//       {joinedGroup ? (
//         <View style={{flex: 1, width: '100%'}}>
//           <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
//             <List.Section>
//               {/* <List.Subheader>Chat</List.Subheader> */}
//               {messages.map((item, index) => (
//                 <List.Item
//                   key={index.toString()}
//                   // title={`${item.sender}: ${item.message}`}
//                   title={`${item.sender}: `}
//                   description={item.message}
//                   titleNumberOfLines={1}
//                   descriptionNumberOfLines={0}
//                 />
//               ))}
//             </List.Section>
//           </ScrollView>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               paddingHorizontal: 10,
//             }}>
//             <TextInput
//               label="Type your message"
//               value={inputMessage}
//               onChangeText={setInputMessage}
//               style={{flex: 1, margin: 6}}
//             />
//             {/* <IconButton icon="send" onPress={sendMessage} /> */}
//             <IconButton
//               icon="send"
//               iconColor="white"
//               style={{backgroundColor: '#673ab7', borderRadius: 30}}
//               onPress={sendMessage}
//             />
//           </View>
//         </View>
//       ) : (
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <TextInput
//             label="Enter your username"
//             value={username}
//             onChangeText={setUsername}
//             style={{marginBottom: 10, width: '80%'}}
//             mode="outlined"
//           />
//           <TextInput
//             label="Enter group name"
//             value={groupName}
//             onChangeText={setGroupName}
//             style={{marginBottom: 10, width: '80%'}}
//             mode="outlined"
//           />
//           <Button mode="contained" onPress={joinGroup} style={{width: '80%'}}>
//             Join Group
//           </Button>
//         </View>
//       )}
//     </KeyboardAvoidingView>
//   );
// }

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Alert,
//   KeyboardAvoidingView,
// } from 'react-native';
// import {TextInput, useTheme, Button, List} from 'react-native-paper';
// import io from 'socket.io-client';

// const socket = io('http://10.212.5.216:3000');

// export default function HomeScreen() {
//   const theme = useTheme();

//   const [username, setUsername] = useState('');
//   const [groupName, setGroupName] = useState('');
//   const [messages, setMessages] = useState<{sender: string; message: string}[]>(
//     [],
//   );
//   const [inputMessage, setInputMessage] = useState<string>('');
//   const [joinedGroup, setJoinedGroup] = useState<boolean>(false);

//   useEffect(() => {
//     socket.on('chat message', (data: {sender: string; message: string}) => {
//       setMessages(prevMessages => [...prevMessages, data]);
//       console.log(data);
//     });

//     return () => {
//       socket.off('chat message');
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputMessage.trim() !== '') {
//       socket.emit('chat message', {sender: username, message: inputMessage});
//       setInputMessage('');
//     }
//   };

//   const joinGroup = () => {
//     if (!username.trim() || !groupName.trim()) {
//       Alert.alert('Error', 'Username and group name are required.'); // Use Alert from react-native-paper
//       return;
//     }

//     socket.emit('join group', {
//       username: username.trim(),
//       groupName: groupName.trim(),
//     });
//     setJoinedGroup(true);
//   };

//   const leaveGroup = () => {
//     socket.emit('leave group', {username, groupName});
//     setUsername('');
//     setGroupName('');
//     setMessages([]);
//     setJoinedGroup(false);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
//       behavior="padding">
//       {joinedGroup ? (
//         <View style={{flex: 1, width: '100%'}}>
//           <View
//             style={{alignItems: 'center', paddingTop: 20, paddingBottom: 10}}>
//             <Text>Group Name: {groupName}</Text>
//           </View>
//           <ScrollView
//             style={{flex: 1, width: '100%'}}
//             contentContainerStyle={{flexGrow: 1}}>
//             <List.Section>
//               {/* <List.Subheader>Chat</List.Subheader> */}
//               {messages.map((item, index) => (
//                 <List.Item
//                   key={index.toString()}
//                   title={`${item.sender}: ${item.message}`}
//                 />
//               ))}
//             </List.Section>
//           </ScrollView>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               paddingHorizontal: 10,
//             }}>
//             <TextInput
//               label="Type your message"
//               value={inputMessage}
//               onChangeText={setInputMessage}
//               style={{flex: 1, marginRight: 10}}
//             />
//             <Button mode="contained" onPress={sendMessage}>
//               Send
//             </Button>
//           </View>
//           <View style={{alignItems: 'center', paddingTop: 10}}>
//             <Button mode="outlined" onPress={leaveGroup}>
//               Leave Group
//             </Button>
//           </View>
//         </View>
//       ) : (
//         <View style={{width: '80%', alignItems: 'center'}}>
//           <TextInput
//             label="Enter your username"
//             value={username}
//             onChangeText={setUsername}
//             style={{marginBottom: 10, width: '100%'}}
//             mode="outlined"
//           />
//           <TextInput
//             label="Enter group name"
//             value={groupName}
//             onChangeText={setGroupName}
//             style={{marginBottom: 10, width: '100%'}}
//             mode="outlined"
//           />
//           <Button mode="contained" onPress={joinGroup} style={{width: '100%'}}>
//             Join Group
//           </Button>
//         </View>
//       )}
//     </KeyboardAvoidingView>
//   );
// }

// ------------------ version 1.2 (update with UI as react-native-ppaer ) -------------------------

// import React, {useState, useEffect} from 'react';
// import {View, Text, ScrollView, Alert} from 'react-native';
// import {TextInput, useTheme, Button, List} from 'react-native-paper';
// import io from 'socket.io-client';

// const socket = io('http://10.212.5.216:3000');

// export default function HomeScreen() {
//   const theme = useTheme();

//   const [username, setUsername] = useState('');
//   const [groupName, setGroupName] = useState('');
//   const [messages, setMessages] = useState<{sender: string; message: string}[]>(
//     [],
//   );
//   const [inputMessage, setInputMessage] = useState<string>('');
//   const [joinedGroup, setJoinedGroup] = useState<boolean>(false);

//   useEffect(() => {
//     socket.on('chat message', (data: {sender: string; message: string}) => {
//       setMessages(prevMessages => [...prevMessages, data]);
//       console.log(data);
//     });

//     return () => {
//       socket.off('chat message');
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputMessage.trim() !== '') {
//       socket.emit('chat message', {sender: username, message: inputMessage});
//       setInputMessage('');
//     }
//   };

//   const joinGroup = () => {
//     if (!username.trim() || !groupName.trim()) {
//       Alert.alert('Error', 'Username and group name are required.'); // Use Alert from react-native-paper
//       return;
//     }

//     socket.emit('join group', {
//       username: username.trim(),
//       groupName: groupName.trim(),
//     });
//     setJoinedGroup(true);
//   };

//   const leaveGroup = () => {
//     socket.emit('leave group', {username, groupName});
//     setUsername('');
//     setGroupName('');
//     setMessages([]);
//     setJoinedGroup(false);
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       {!joinedGroup ? (
//         <View style={{width: '80%', alignItems: 'center'}}>
//           <TextInput
//             label="Enter your username"
//             value={username}
//             onChangeText={setUsername}
//             style={{marginBottom: 10, width: '100%'}}
//             mode="outlined"
//           />
//           <TextInput
//             label="Enter group name"
//             value={groupName}
//             onChangeText={setGroupName}
//             style={{marginBottom: 10, width: '100%'}}
//             mode="outlined"
//           />
//           <Button mode="contained" onPress={joinGroup} style={{width: '100%'}}>
//             Join Group
//           </Button>
//         </View>
//       ) : (
//         <View
//           style={{
//             width: '90%',
//             alignItems: 'flex-start',
//             justifyContent: 'flex-start',
//           }}>
//           <Text>Group Name: {groupName}</Text>
//           <ScrollView
//             style={{width: '100%'}}
//             contentContainerStyle={{paddingTop: 10, paddingBottom: 10}}>
//             <List.Section>
//               <List.Subheader>Chat</List.Subheader>
//               {messages.map((item, index) => (
//                 <List.Item
//                   key={index.toString()}
//                   title={`${item.sender}: ${item.message}`}
//                 />
//               ))}
//             </List.Section>
//           </ScrollView>
//           <TextInput
//             label="Type your message"
//             value={inputMessage}
//             onChangeText={setInputMessage}
//             style={{marginBottom: 10, width: '100%'}}
//           />
//           <Button
//             mode="contained"
//             onPress={sendMessage}
//             style={{marginBottom: 10, width: '100%'}}>
//             Send
//           </Button>
//           <Button mode="outlined" onPress={leaveGroup} style={{width: '100%'}}>
//             Leave Group
//           </Button>
//         </View>
//       )}
//     </View>
//   );
// }

// ------------------ version 1.2 (without UI ) -------------------------
// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, Text, FlatList, Alert } from 'react-native';
// import { useTheme } from 'react-native-paper';
// import io from 'socket.io-client';

// const socket = io('http://10.212.5.216:3000'); //here new connection is being create for each new user, u may see on server logs connection message
//                                                 // on this 1st req. goes to server as HTTP req. along with Upgrade to Websocket protocol insted http
//                                                 // as respose it returns ws connection now on subsequent requests ws as protocol will be used :=> req format ws://localhost:3000
//                                                 // and also returns unique id. that use to uniquely identify each each socket/user uniquely

//                                                 //
// export default function HomeSceen() {

//     const theme = useTheme();

//     const [username, setUsername] = useState('');
//     const [groupName, setGroupName] = useState('');
//     const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
//     const [inputMessage, setInputMessage] = useState<string>('');
//     const [joinedGroup, setJoinedGroup] = useState<boolean>(false);

//     useEffect(() => {
//         // Listen for chat messages
//         // here
//         socket.on('chat message', (data: { sender: string; message: string }) => {
//             setMessages(prevMessages => [...prevMessages, data]); //note: socketio maintaines array of messages on each new message adds to list for that session
//             console.log(data);
//         });

//         //this func will call when component will unmount(i.e when other component gets loaded taht time unmount  will get trigger)
//         //note: this cleanup func. will also gets callled when state gets changed i.e prev. component removed and new component gets loaded
//         //this is basically clear func. it will get called when component will unmount. for eg. we moved to another window/screen
//         return () => {
//             socket.off('chat message');
//         };

//     }, []);

//     const sendMessage = () => {
//         if (inputMessage.trim() !== '') {
//             //here chat message(as object) is just var name will be use on server side to pass data
//             //emit or send just sends data to server
//             socket.emit('chat message', { sender: username, message: inputMessage });
//             setInputMessage('');
//         }
//     };

//     const joinGroup = () => {
//         if (!username.trim() || !groupName.trim()) {
//             Alert.alert('Error', 'Username and group name are required.');
//             return;
//         }

//         socket.emit('join group', { username: username.trim(), groupName: groupName.trim() });
//         setJoinedGroup(true);
//     };

//     const leaveGroup = () => {
//         socket.emit('leave group', { username, groupName });
//         setUsername('');
//         setGroupName('');
//         setMessages([]);
//         setJoinedGroup(false);
//     };

//     return (
//         <View style={{  backgroundColor: theme.colors.background,
//             padding: 20,
//             height: '100%',flex: 1, justifyContent: 'center', alignItems: 'center'  }} >
//             {!joinedGroup ? (
//                 <>
//                     <TextInput
//                         placeholder="Enter your username"
//                         onChangeText={setUsername}
//                         value={username}
//                         style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
//                     />
//                     <TextInput
//                         placeholder="Enter group name"
//                         onChangeText={setGroupName}
//                         value={groupName}
//                         style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
//                     />
//                     <Button title="Join Group" onPress={joinGroup} />
//                 </>
//             ) : (
//                 <>
//                     <Text>Group Name: {groupName}</Text>
//                     <FlatList
//                         data={messages}
//                         renderItem={({ item }) => <Text>{`${item.sender}: ${item.message}`}</Text>}
//                         keyExtractor={(item, index) => index.toString()}
//                     />
//                     <TextInput
//                         style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
//                         onChangeText={setInputMessage}
//                         value={inputMessage}
//                     />
//                     <Button title="Send" onPress={sendMessage} />
//                     <Button title="Leave Group" onPress={leaveGroup} />
//                 </>
//             )}
//         </View>
//     );
// }

// ------------------ version 1.1-------------------------
// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, Text, FlatList, Alert } from 'react-native';
// import io from 'socket.io-client';

// const socket = io('http://10.212.5.216:3000');

// export default function App() {
//     const [username, setUsername] = useState('');
//     const [groupName, setGroupName] = useState('');
//     const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
//     const [inputMessage, setInputMessage] = useState<string>('');

//     useEffect(() => {
//         if (username && groupName) {
//             // Join the group when both username and group name are set
//             socket.emit('join group', { username, groupName });

//             // Listen for chat messages
//             socket.on('chat message', (data: { sender: string; message: string }) => {
//                 setMessages(prevMessages => [...prevMessages, data]);
//             });
//         }

//         return () => {
//             // Leave the group when component unmounts or user logs out
//             socket.emit('leave group', { username, groupName });
//             socket.off('chat message');
//         };
//     }, [username, groupName]);

//     const sendMessage = () => {
//         if (inputMessage.trim() !== '') {
//             socket.emit('chat message', { sender: username, message: inputMessage });
//             setInputMessage('');
//         }
//     };

//     const joinGroup = () => {
//         if (!username.trim() || !groupName.trim()) {
//             Alert.alert('Error', 'Username and group name are required.');
//             return;
//         }

//         setUsername(username.trim());
//         setGroupName(groupName.trim());
//     };

//     const leaveGroup = () => {
//         socket.emit('leave group', { username, groupName });
//         setUsername('');
//         setGroupName('');
//         setMessages([]);
//     };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             {!username || !groupName ? (
//                 <>
//                     <TextInput
//                         placeholder="Enter your username"
//                         onChangeText={setUsername}
//                         value={username}
//                         style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
//                     />
//                     <TextInput
//                         placeholder="Enter group name"
//                         onChangeText={setGroupName}
//                         value={groupName}
//                         style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
//                     />
//                     <Button title="Join Group" onPress={joinGroup} />
//                 </>
//             ) : (
//                 <>
//                     <Text>Group Name: {groupName}</Text>
//                     <FlatList
//                         data={messages}
//                         renderItem={({ item }) => <Text>{`${item.sender}: ${item.message}`}</Text>}
//                         keyExtractor={(item, index) => index.toString()}
//                     />
//                     <TextInput
//                         style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
//                         onChangeText={setInputMessage}
//                         value={inputMessage}
//                     />
//                     <Button title="Send" onPress={sendMessage} />
//                     <Button title="Leave Group" onPress={leaveGroup} />
//                 </>
//             )}
//         </View>
//     );
// }

// ------------------ version 1.0-------------------------

// export default function App() {
//     const [messages, setMessages] = useState<string[]>([]); // Explicitly define the type as string[]

//     const [inputMessage, setInputMessage] = useState<string>(''); // Explicitly define the type as string

//     useEffect(() => {
//         socket.on('chat message', (msg: string) => { // Explicitly define the type as string
//             setMessages(prevMessages => [...prevMessages, msg]);
//         });
//     }, []);

//     const sendMessage = () => {
//         if (inputMessage.trim() !== '') {
//             socket.emit('chat message', inputMessage);
//             setInputMessage('');
//         }
//     };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <FlatList
//                 data={messages}
//                 renderItem={({ item }) => <Text>{item}</Text>}
//                 keyExtractor={(item, index) => index.toString()}
//             />
//             <TextInput
//                 style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
//                 onChangeText={setInputMessage}
//                 value={inputMessage}
//             />
//             <Button title="Send" onPress={sendMessage} />
//         </View>
//     );
// }
