import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';

export default class MoodJournal extends Component {
    render() {
        return (
            <ImageBackground source={require('../resources/img/background.png')} style = {{width:'100%', height:'100%', opacity:50}} >
            <View>
                <Text> This is the Mood Journal </Text>
            </View>
            </ImageBackground>
        );
    }
}
