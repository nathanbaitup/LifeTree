import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import 'react-native-gesture-handler';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Importing the required third party modules to create the navigation bar.
import { NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importing all of the different components for each different page.

export default class App extends Component {
    render() {
        return (
            <View style = {styles.mainContainer}>
                <Text> Mental Wellness Application </Text>
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
