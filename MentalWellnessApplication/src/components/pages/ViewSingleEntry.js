import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, Image, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';

export default class ViewSingleEntry extends Component {
    // Parses the onBack function so when the back button is clicked the user is returned to the entries list.
    // Parses the key of the entry to be used to retrieve the journal entry in its entirety. 
    static propTypes = {
        onBack: PropTypes.func.isRequired,
        currentEntryID: PropTypes.string.isRequired,
    };

    state = {
        entry: this.props.currentEntryID,
        allEntries: [],
        selectedEntry: [],
    }

    // When the component is loaded on the users device, it sets the state to all entries that the user has stored.
    // Also takes the parsed entry key to find the correct entry to display to the user.
    componentDidMount() {
        // TODO: This will not be necessary with backend as all data can be retrieved from the entries list and parsed into this page.
        let allEntries = [
            { key: '0', date: 'Jan', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar sollicitudin hendrerit. Donec a dolor lacus. Fusce feugiat velit vitae odio pretium ultricies. Proin sollicitudin nulla in ornare ullamcorper. In ut eros eget nisl placerat placerat sit amet sit amet nibh. Morbi porta fringilla metus, quis tincidunt augue lacinia ac. Quisque ornare velit imperdiet dictum fringilla. Donec in turpis ligula. Vestibulum et porta leo. Nulla molestie elit quam, in ornare neque malesuada ac. Curabitur aliquam in massa quis mattis. Aliquam sit amet est id ipsum pretium eleifend a id sem. Nam congue nisl ipsum, id ullamcorper eros elementum sed. ', mood: 'happy' },
            { key: '1', date: 'Jan', description: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah', mood: 'happy' },
            { key: '2', date: 'Jan', description: 'blah blah', mood: 'happy' },
            { key: '3', date: 'Jun', description: 'blah blah', mood: 'meh' },
            { key: '4', date: 'Aug', description: 'blah blah', mood: 'happy' },
            { key: '5', date: 'Aug', description: 'blah blah', mood: 'angry' },
            { key: '6', date: 'Sep', description: 'blah blah', mood: 'happy' },
            { key: '7', date: 'May', description: 'blah blah', mood: 'meh' },
            { key: '8', date: 'Jul', description: 'blah blah', mood: 'happy' },
            { key: '9', date: 'Mar', description: 'blah blah', mood: 'sad' },
        ];
        this.setState({ allEntries: allEntries });

        // Uses the entry key to locate the correct journal entry to display within the page.
        let selectedEntry = allEntries.find(entry => entry.key === this.state.entry);
        this.setState({ selectedEntry: selectedEntry });
    }

    render() {
        return (
            // TODO: Import updated add an entry page from entries branch to get the mood images to highlight the users mood for an entry.
            <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <View style={styles.contentContainer}>
                    <Text style={styles.dateTitle}>Date of Entry: {this.state.selectedEntry.date}</Text>
                    <Text style={styles.header}>How you were feeling: </Text>

                    <View style={styles.moodModules}>
                        <View style={[styles.moodModulesIndiv, {borderWidth : this.state.selectedEntry.mood === 'angry' ? 1 : 0}]} >
                            <Image source={require('../resources/img/faces/angry.png')} style={styles.moodFaces} />
                            <Text>Angry</Text>
                        </View>
                        <View style={[styles.moodModulesIndiv, {borderWidth : this.state.selectedEntry.mood === 'sad' ? 1 : 0}]}>
                            <Image source={require('../resources/img/faces/sad.png')} style={styles.moodFaces} />
                            <Text>Sad</Text>
                        </View>
                        <View style={[styles.moodModulesIndiv, {borderWidth : this.state.selectedEntry.mood === 'meh' ? 1 : 0}]}>
                            <Image source={require('../resources/img/faces/meh.png')} style={styles.moodFaces} />
                            <Text>Meh</Text>
                        </View>
                        <View style={[styles.moodModulesIndiv, {borderWidth : this.state.selectedEntry.mood === 'happy' ? 1 : 0} ]}>
                            <Image source={require('../resources/img/faces/happy.png')} style={styles.moodFaces} />
                            <Text>Happy</Text>
                        </View>
                    </View>

                    <Text style={[{ textAlign: 'center' },
                    { color: this.state.selectedEntry.mood === 'happy' ? '#108206' : this.state.selectedEntry.mood === 'meh' ? '#e38e07' : this.state.selectedEntry.mood === 'sad' ? '#112dec' : '#f90505' }]}>
                        {this.state.selectedEntry.mood}
                    </Text>
                    <View>
                        <Text style={styles.journalHeader}>Your comments for the day: </Text>
                        <TextInput style={styles.journalEntry}
                            placeholder='Feel free to dump as much or as little information in here as you want. We wont judge you at all. We promise! '
                            numberOfLines={5}
                            multiline
                            editable={false}
                            value={this.state.selectedEntry.description}
                        />
                        <View style={styles.returnButtonContainer}>
                            <TouchableOpacity style={styles.returnButton} onPress={this.props.onBack}>
                                <Text style={styles.returnText}>Return to Entries</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

// The styling for the page.
const styles = StyleSheet.create({
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        padding: 10,
    },
    moodModules: {
        flexDirection: 'row',
        paddingBottom: 50,
    },
    moodModulesIndiv: {
        marginRight: 5, 
        marginLeft: 10,
        textAlign: 'center',
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
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#000000',
        padding: 10,
    },
    returnButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    returnButton: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 15,
        width: 150,
    },
    returnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000000',
    },
    dateTitle: {
        padding: 15,
        fontWeight: 'bold',
        fontSize: 18,
    }
});
