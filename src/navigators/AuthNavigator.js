import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import LoginWith from '../screens/LoginWith';

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: 'white',
            headerBackTitleStyle: {
                color: 'white'
            }
        }}>
            <Stack.Screen name="loginwith" component={LoginWith} />
            <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;
