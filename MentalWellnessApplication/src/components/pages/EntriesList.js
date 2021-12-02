import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity, SectionList, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Dropdown } from 'react-native-material-dropdown';

import { Picker } from '@react-native-picker/picker';

import { FloatingAction } from "react-native-floating-action";

import ActionButton from 'react-native-action-button';


export default class EntriesList extends Component {

    //pickerRef = useRef();

    // filterDropdown = () => {
    //     pickerRef.current.focus();
    // }

    render() {
        return (
            <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >

                <View style={styles.mainContainer}>
                        <View style={styles.filterBar}>
                            <Text>Search by....</Text>
                            <TouchableOpacity onPress={this.filterDropdown}>
                                <Icon name='filter-variant' color={'#000000'} size={35} style={styles.filter} />
                            </TouchableOpacity>
                        </View>
                    
                    <View style={styles.contentContainer}>
                        <SectionList
                            sections={[
                                { title: 'Today', data: ['blah blah 1', 'blah blah 2', 'blah blah 3'] },
                                { title: 'This Week', data: ['blah blah 4', 'blah blah 5'] },
                                { title: 'This Month', data: ['blah blah 6', 'blah blah 7', 'blah blah 8', 'blah blah 9', 'blah blah 10', 'blah blah 11', 'blah blah 12', 'blah blah 13', 'blah blah 14', 'blah blah 15', 'blah blah 16', 'blah blah 17', 'blah blah 18', 'blah blah 19'] },

                            ]} renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                            renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                            keyExtractor={(item, index) => index} />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

// Function used to store width of device being used for responsive design on the homescreen.
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    filterBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        padding: 15,
    },
    filter: {
        marginLeft: width / 1.6,
    },
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        height: height/1.45,
        
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#e0e0de',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: '#000000',
    },
});
