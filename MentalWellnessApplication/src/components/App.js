import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

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
