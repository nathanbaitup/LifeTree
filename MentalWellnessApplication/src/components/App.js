import React from 'react';

// Importing Navigation Container to allow the navigation bar to function correctly.
import { NavigationContainer } from '@react-navigation/native';

// Imports the Main Stack Navigator that opens the application to the Login / Sign Up screen.
import { MainStackNavigator } from './StackNavigator';

export default function App() {
    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    );
}
