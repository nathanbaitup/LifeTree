import React from 'react';

// Importing Navigation Container to allow the navigation bar to function correctly.
import { NavigationContainer } from '@react-navigation/native';

// Imports the createStackNavigator from react navigation.
import { createStackNavigator } from '@react-navigation/stack';

// Importing all of the different components for each different page.
import Welcome from './pages/Login/Welcome';
import CreateAccount from './pages/Login/CreateAccount';

// Imports the Tab Bar so that when a user logs in, they will be directed to the home page with the tab navigation.
import TabNavigator from './TabNavigator';

import { decode, encode } from 'base-64';
if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }


//Variable that is used to create a stack navigator to direct the user between the login screen and the rest of the application.
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            {/* REFERENCE ACCESSED 13/12/2021 https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da
            Used to have both a stack and tab navigatior so that once a user has logged in they gain access to the full application navigation. */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Welcome' component={Welcome} />
                <Stack.Screen name='CreateAccount' component={CreateAccount} />
                <Stack.Screen name='HomeScreen' component={TabNavigator} />

            </Stack.Navigator>
            {/* END REFERENCE */}
        </NavigationContainer>
    );
}
