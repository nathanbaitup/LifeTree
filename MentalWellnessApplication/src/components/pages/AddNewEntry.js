import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';

export default class AddNewEntry extends Component {
    state = {
        isSelected: false,
    };


    // TODO: Make clear when a mood has been selected.
    render() {
        return (
            <ImageBackground source={require('../resources/img/background.png')} style = {{width:'100%', height:'100%', opacity:50}} >
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.header}>How are you feeling today? </Text>
                    <View style={styles.moodModules}>
                    <TouchableOpacity style={this.state.isSelected ? styles.moodModulesIndivSelected :styles.moodModulesIndivUnselected} onPress={() => this.setState({isselected: !this.state.isSelected})} >
                        <Image source={require('../resources/img/faces/angry.png')} style={styles.moodFaces} />
                            <Text>Angry</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moodModulesIndiv}>
                        <Image source={require('../resources/img/faces/sad.png')} style={styles.moodFaces} />
                            <Text>Sad</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moodModulesIndiv}>
                        <Image source={require('../resources/img/faces/meh.png')} style={styles.moodFaces} />
                            <Text>Meh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moodModulesIndiv}>
                        <Image source={require('../resources/img/faces/happy.png')} style={styles.moodFaces} />
                            <Text>Happy</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.journalHeader}>Any comments for the day? </Text>
                        <TextInput style={styles.journalEntry}
                            placeholder='Feel free to dump as much or as little information in here as you want. We wont judge you at all. We promise! '
                            numberOfLines={10}
                            multiline = {true}
                        />
                        <View style={styles.submitButtonContainer}>
                            {/* TODO: MAKE ONPRESS TO SAVE DATA WHEN BACKEND HAS BEEN CONNECTED */}
                            <TouchableOpacity style={styles.submitButton} >
                                <Text style={styles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
    moodModules: {
        flexDirection: 'row',
        paddingBottom: 50,
    },
    moodModulesIndivUnselected: {
        marginRight: 5, 
        marginLeft: 10,
        textAlign: 'center',
    },
    moodModulesIndivSelected: {
        marginRight: 5, 
        marginLeft: 10,
        textAlign: 'center',
        borderColor: '#000000',
        borderWidth: 1,
    },
    moodFaces:{
        marginTop: 10,
        height: 50,
        width: 66,
        alignItems: 'center',
    },
    journalEntry: {
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: '#ebebeb',
        borderRadius: 10,
        maxHeight: 250,
        height: 150,
    },
    journalHeader: {
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#000000',
    },
    submitButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    submitButton: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00e676',
        borderRadius: 15,
        width: 150,
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000000',
    },
});
