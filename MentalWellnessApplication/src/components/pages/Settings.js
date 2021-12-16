import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Button, StyleSheet } from 'react-native';

export default function Settings (props) {

    // Parsing the logout function from App.js
    const logout = props.logout;

        return (
            <ImageBackground source={require('../resources/img/background.png')} style = {{width:'100%', height:'100%', opacity:50}} >
            <View style={styles.contentContainer}>
                <Text> Settings Page </Text>
                <Button title="Logout" onPress={logout} />
            </View>
            </ImageBackground>
        );
    }

    // The styling for the settings page.
const styles = StyleSheet.create({
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },

});
