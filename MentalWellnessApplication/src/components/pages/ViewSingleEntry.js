import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, Image, TouchableOpacity } from 'react-native';

// Imports firestore from firebase to display the selected user entry.
import firestore from '@react-native-firebase/firestore';

export default function ViewSingleEntry(props) {

    // Initializing the state to save firestore fields to their corresponding variables for display.
    const [selectedMood, setSelectedMood] = useState('');
    const [journalEntry, setJournalEntry] = useState('');
    const [displayDate, setDisplayDate] = useState('');

    // Parses the userID from the entries list.
    const userID = props.extraData;
    // Parses the onBack method to return the user to the entries list when the back button is pressed.
    const onBack = props.onBack;
    //  Parses the entryID of the selected journal to ensure the correct image is displayed.
    const entryID = props.currentEntryID;


    // Creates a reference to the journal list collection in firestore to save data.
    const journalsRef = firestore().collection('journalList');

    // Selects the journal entry where the user ID matches the authorID and createdAt timestamp matches the current entry ID
    // and saves each field to its respectable variable to be displayed to the user when they select an entry to display.
    useEffect(() => {
        journalsRef
            .where('authorID', '==', userID)
            .where('createdAt', '==', entryID)
            .onSnapshot(
                querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        const journal = doc.data();
                        setSelectedMood(journal.moodSelected);
                        setJournalEntry(journal.journalText);
                        setDisplayDate(journal.dateOfEntry);
                    });
                },
                error => {
                    alert(error);
                }
            );
    }, []);

    return (
        <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <View style={styles.contentContainer}>
                <Text style={styles.dateTitle}>Date of Entry: {displayDate} </Text>
                <Text style={styles.header}>How you were feeling: </Text>

                <View style={styles.moodModules}>
                    <View style={selectedMood === 'Angry' ? styles.moodModSelected : styles.moodModUnselected} >
                        <Image source={require('../resources/img/faces/angry.png')} style={styles.moodFaces} />
                        <Text>Angry</Text>
                    </View>
                    <View style={selectedMood === 'Sad' ? styles.moodModSelected : styles.moodModUnselected}>
                        <Image source={require('../resources/img/faces/sad.png')} style={styles.moodFaces} />
                        <Text>Sad</Text>
                    </View>
                    <View style={selectedMood === 'Meh' ? styles.moodModSelected : styles.moodModUnselected}>
                        <Image source={require('../resources/img/faces/meh.png')} style={styles.moodFaces} />
                        <Text>Meh</Text>
                    </View>
                    <View style={selectedMood === 'Happy' ? styles.moodModSelected : styles.moodModUnselected}>
                        <Image source={require('../resources/img/faces/happy.png')} style={styles.moodFaces} />
                        <Text>Happy</Text>
                    </View>
                </View>

                <Text style={[{ textAlign: 'center' }, { color: selectedMood === 'Happy' ? '#108206' : selectedMood === 'Meh' ? '#e38e07' : selectedMood === 'Sad' ? '#112dec' : '#f90505' }]}>
                    You were feeling: {selectedMood}
                </Text>
                <View>
                    <Text style={styles.journalHeader}>Your comments for the day: </Text>
                    <TextInput style={styles.journalEntry}
                        placeholder='Feel free to dump as much or as little information in here as you want. We wont judge you at all. We promise! '
                        numberOfLines={5}
                        multiline
                        editable={false}
                        value={journalEntry}
                    />
                    <View style={styles.returnButtonContainer}>
                        <TouchableOpacity style={styles.returnButton} onPress={onBack}>
                            <Text style={styles.returnText}>Return to Entries</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
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
    moodModUnselected: {
        marginTop: 10,
        marginLeft: 5,
        textAlign: 'center',
        paddingLeft: 10,
    },
    moodModSelected: {
        marginTop: 10,
        marginLeft: 5,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        paddingLeft: 10,
    },
    moodFaces: {
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
        color: '#000000',
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
        color: '#000000',
    }
});
