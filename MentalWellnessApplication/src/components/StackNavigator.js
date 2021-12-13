import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importing all of the different components for each different page.
import Welcome from './pages/Welcome';

// Imports the Tab Bar so that when a user logs in, they will be directed to the home page with the tab navigation.
import TabNavigator from './TabNavigator';

//Variable that is used to create a stack navigator to direct the user between the login screen and the rest of the application.
const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Home' component={TabNavigator} />
        </Stack.Navigator>
    );
};

export { MainStackNavigator };