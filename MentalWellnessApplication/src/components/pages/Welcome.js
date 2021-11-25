import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export default class Welcome extends Component {
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.mainTitle}>Welcome to [APP NAME HERE] </Text>
                    <Text>What would you like to do?</Text>
                </View>
                <View>
                    <Button title="Login" />
                    <Button title="Sign Up" />
                    <Button title="Continue as Guest" />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
