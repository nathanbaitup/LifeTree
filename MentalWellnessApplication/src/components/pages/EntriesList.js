import React, { Component } from 'react';
import { Text, View, ImageBackground, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class EntriesList extends Component {
    render() {
        return (
            <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <View style={styles.mainContainer}>
                    <View style={styles.filterBar}>
                        <Text>Search by....</Text>
                        <TouchableOpacity>
                        <Icon name='filter-variant' color={'#000000'} size={35} style={styles.filter} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text>This is the entries list </Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

// Function used to store width of device being used for responsive design on the homescreen.
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    filterBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        padding: 15,
    },
    filter:{
        marginLeft: width/1.6,
    },
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },
});
