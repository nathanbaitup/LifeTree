import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';

export default class Settings extends Component {
    render() {
        return (
            <ImageBackground source={require('../resources/img/background.png')} style = {{width:'100%', height:'100%', opacity:50}} >
            <View>
                <Text> Settings Page </Text>
            </View>
            </ImageBackground>
        );
    }
}
