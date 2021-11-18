import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import 'react-native-gesture-handler';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Importing the required third party modules to create the navigation bar.
import { NavigationContainer} from '@react-navigation/native'
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
            <View style = {styles.mainContainer}>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName='Feed'
                        tabBarOptions={{ activeTintColor: '#42f44b' }} >

                        <Tab.Screen
                            name='Home' // to remove the top nav bar delete this.
                            component={Home}
                            options={{
                                tabBarLabel: 'Home',
                                tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name='home' color={color} size={size} />
                                ),
                            }} />
                        <Tab.Screen 
                            name='Add an Entry'
                            component={AddNewEntry}
                            options={{ 
                                tabBarLabel: 'Add an Entry',
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name='add' color={color} size={size} />
                                ),
                            }}
                            />
                            <Tab.Screen 
                            name='View all Entries'
                            component={EntriesList}
                            options={{ 
                                tabBarLabel: 'View all Entries',
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name='add' color={color} size={size} />
                                ),
                            }}
                            />
                            <Tab.Screen 
                            name='View Moods'
                            component={MoodJournal}
                            options={{ 
                                tabBarLabel: 'View Moods',
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name='add' color={color} size={size} />
                                ),
                            }}
                            />
                             <Tab.Screen 
                            name='Heart Rate Monitoring'
                            component={HRMonitoring}
                            options={{ 
                                tabBarLabel: 'HR Monitoring',
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name='add' color={color} size={size} />
                                ),
                            }}
                            />

                    </Tab.Navigator>

                </NavigationContainer>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        justifyContent: 'center',
    },
})
