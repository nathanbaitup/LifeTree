import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importing the required third party modules to create the navigation bar.
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importing all of the different components for each different page.
import Home from './pages/Home';
import AddNewEntry from './pages/AddNewEntry';
import EntriesList from './pages/EntriesList';
import MoodJournal from './pages/MoodJournal';
import HRMonitoring from './pages/HRMonitoring';

// Variable that is useed to create all of the tabs required for the navigation bar.
const Tab = createBottomTabNavigator();

export default class App extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
              {/* The Navigation bar creation tag that sets the default tab to 'home', adds tint styling for when an
                option is selected and returns the user to the home tab if back is pressed from any tab other than home,
                where the application will close. 

                * REFERENCE ACCESSED 18/11/2021 https://aboutreact.com/react-native-bottom-navigation/
                * Used to learn how to create a navigation bar.
                */}
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName='Home'
                        backBehavior='initialRoute'
                        screenOptions={{
                        'tabBarStyle': [
                          {
                            'display': 'flex',
                            'tabBarActiveTintColor': '#448aff',
                          },
                          null ]}} >

                        <Tab.Screen
                            name='View all Entries' // Adds the page heading to the top of the screen. Can be removed by removing line.
                            component={EntriesList} // The component to switch to when tab is pressed.
                            options={{
                                tabBarLabel: 'View all Entries',
                                tabBarIcon: ({ color, size }) => (
                                    <Icon name='book' color={color} size={size} /> // Sets the icon to the default color and size.
                                )}} />
                        <Tab.Screen
                            name='Add an Entry'
                            component={AddNewEntry}
                            options={{
                                tabBarLabel: 'Add an Entry',
                                tabBarIcon: ({ color, size }) => (
                                    <Icon name='plus-circle' color={color} size={size} />
                                )}} />
                        <Tab.Screen
                            name='Home' 
                            component={Home}
                            options={{
                                tabBarLabel: 'Home',
                                tabBarIcon: ({ color, size }) => (
                                    {/* Adds custom styling for center button to be bigger and circular. */},
                                    <View style={styles.centerNavBTN}>  
                                        <Icon name='home' color={color} size={size} />
                                    </View>
                                )}} />
                        <Tab.Screen
                            name='View Moods'
                            component={MoodJournal}
                            options={{
                                tabBarLabel: 'View Moods',
                                tabBarIcon: ({ color, size }) => (
                                    <Icon name='calendar-multiselect' color={color} size={size} />
                                )}} />
                        <Tab.Screen
                            name='Heart Rate Monitoring'
                            component={HRMonitoring}
                            options={{
                                tabBarLabel: 'HR Monitoring',
                                tabBarIcon: ({ color, size }) => (
                                    <Icon name='heart-pulse' color={color} size={size} />
                                )}} />

                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    centerNavBTN: {
        position: 'absolute',
        bottom: 5,
        height: 58,
        width: 58,
        borderRadius: 58,
        backgroundColor: '#00e676',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
