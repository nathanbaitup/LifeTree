import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importing the required third party modules to create the navigation bar.
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importing all of the different components for each different page.
import Home from './pages/Home';
import AddNewEntry from './pages/AddNewEntry';
import EntriesList from './pages/EntriesList';
import MoodJournal from './pages/MoodJournal';
import HRMonitoring from './pages/HRMonitoring';

const Tab = createBottomTabNavigator();

export default class App extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName='Feed'
                        screenOptions={{"tabBarActiveTintColor": "#42f44b",
                        "tabBarStyle": [
                          {
                            "display": "flex"
                          },
                          null
                        ]}} >

                        <Tab.Screen
                            name='View all Entries' // to remove the top nav bar delete this.
                            component={EntriesList}
                            options={{
                                tabBarLabel: 'View all Entries',
                                tabBarIcon: ({ color, size }) => (
                                    <Icon name='book' color={color} size={size} />
                                ),
                            }} />

                        <Tab.Screen
                            name='Add an Entry'
                            component={AddNewEntry}
                            options={{
                                tabBarLabel: 'Add an Entry',
                                tabBarIcon: ({ color, size }) => (
                                    <Icon name='plus-circle' color={color} size={size} />
                                ),
                            }} />

                        <Tab.Screen
                            name='Home' 
                            component={Home}
                            options={{
                                tabBarLabel: 'Home',
                                tabBarIcon: ({ color, size }) => (
                                    <Icon name='home' color={color} size={size} />
                                ),
                            }} />

                        <Tab.Screen
                            name='View Moods'
                            component={MoodJournal}
                            options={{
                                tabBarLabel: 'View Moods',
                                tabBarIcon: ({ color, size }) => (
                                    <Icon name='calendar-multiselect' color={color} size={size} />
                                ),
                            }} />

                        <Tab.Screen
                            name='Heart Rate Monitoring'
                            component={HRMonitoring}
                            options={{
                                tabBarLabel: 'HR Monitoring',
                                tabBarIcon: ({ color, size }) => (
                                    <Icon name='heart-pulse' color={color} size={size} />
                                ),
                            }} />

                    </Tab.Navigator>

                </NavigationContainer>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
})
