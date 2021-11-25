import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'

export default class AddNewEntry extends Component {
    render() {
        return (
            <View>
                <View style={styles.contentContainer}>
                    <Text style={styles.header}>How are you feeling today? </Text>
                    <View style={styles.moodModules}>
                        <TouchableOpacity style={styles.moodModulesIndiv}>
                            <Text>Sad</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moodModulesIndiv}>
                            <Text>Crying</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moodModulesIndiv}>
                            <Text>Angry</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moodModulesIndiv}>
                            <Text>Meh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moodModulesIndiv}>
                            <Text>Happy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moodModulesIndiv}>
                            <Text>Very Happy</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.journalHeader}>Any comments for the day? </Text>
                        <TextInput style={styles.journalEntry}
                            placeholder='Feel free to dump as much or as little information in here as you want. We wont judge you at all. We promise! '
                            numberOfLines={5}
                            multiline
                        />
                        <View style={styles.submitButtonContainer}>
                            <TouchableOpacity style={styles.submitButton}>
                                <Text style={styles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    moodModulesIndiv: {
        marginRight: 5, 
        marginLeft: 10
    },
    journalEntry: {
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: '#ebebeb',
        borderRadius: 10,

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
