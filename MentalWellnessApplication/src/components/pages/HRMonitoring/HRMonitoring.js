import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';

// Imports the documents styling.
import {hrStyles} from './Styles';

export default class HRMonitoring extends Component {
    render() {
        return (
            <ImageBackground source={require('../resources/img/background.png')} style = {{width:'100%', height:'100%', opacity:50}} >
            <View>
                <Text> This is the Heart Rate Monitor page </Text>
            </View>
            </ImageBackground>
        );
    }
}
