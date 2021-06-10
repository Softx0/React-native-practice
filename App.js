import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import UserList from "./screens/UserList";
import UserDetail from "./screens/UserDetail";
import CreateUser from "./screens/CreateUser";

const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} options={{ title: `Users List` }} />
      <Stack.Screen name="CreateUser" component={CreateUser} options={{ title: 'Create new user' }} />
      <Stack.Screen name="UserDetail" component={UserDetail} options={{ title: `User's Detail` }} />

    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <>
      <NavigationContainer style={styles}>
        <MyStack></MyStack>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
