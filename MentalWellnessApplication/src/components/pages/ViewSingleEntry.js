import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, Image, TouchableOpacity } from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default function ViewSingleEntry(props) {
    
    const [allEntries, setAllEntries] = useState([]);
    const [journalEntry, setJournalEntry] = useState([]);

    
    const userID = props.extraData;
    const onBack = props.onBack;
    const entryID = props.currentEntryID;

    const journalsRef = firestore().collection('journalList');
    
    // Selects all journal entries where the user ID matches the authorID and sorts the list by newest date first.
    useEffect(() => {
        journalsRef
            .where('authorID', '==', userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newJournals = [];
                    querySnapshot.forEach((doc) => {
                        const journal = doc.data();
                        journal.id = doc.id;
                        newJournals.push(journal);
                    });
                    setAllEntries(newJournals);
                },
                error => {
                    alert(error);
                }
            );
            let selectedEntry = allEntries.find(entry => entry.createdAt === entryID);
            setJournalEntry(selectedEntry); 
    }, []);




        return (
            // TODO: Import updated add an entry page from entries branch to get the mood images to highlight the users mood for an entry.
            <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <View style={styles.contentContainer}>
                    <Text style={styles.dateTitle}>Date of Entry:  {console.log(allEntries)} </Text>
                    <Text style={styles.header}>How you were feeling: </Text>

                    <View style={styles.moodModules}>
                        <View style={journalEntry.moodSelected === 'Angry' ? styles.moodModSelected : styles.moodModUnselected} >
                            <Image source={require('../resources/img/faces/angry.png')} style={styles.moodFaces} />
                            <Text>Angry</Text>
                        </View>
                        <View style={journalEntry.moodSelected === 'Sad' ? styles.moodModSelected : styles.moodModUnselected}>
                            <Image source={require('../resources/img/faces/sad.png')} style={styles.moodFaces} />
                            <Text>Sad</Text>
                        </View>
                        <View style={journalEntry.moodSelected === 'Meh' ? styles.moodModSelected : styles.moodModUnselected}>
                            <Image source={require('../resources/img/faces/meh.png')} style={styles.moodFaces} />
                            <Text>Meh</Text>
                        </View>
                        <View style={journalEntry.moodSelected === 'Happy' ? styles.moodModSelected : styles.moodModUnselected}>
                            <Image source={require('../resources/img/faces/happy.png')} style={styles.moodFaces} />
                            <Text>Happy</Text>
                        </View>
                    </View>

                    <Text style={[{ textAlign: 'center' }, {color: journalEntry.moodSelected === 'Happy' ? '#108206' : journalEntry.moodSelected === 'Meh' ? '#e38e07' : journalEntry.moodSelected === 'Sad' ? '#112dec' : '#f90505' }]}>
                       You were feeling: {journalEntry.moodSelected}
                    </Text>
                    <View>
                        <Text style={styles.journalHeader}>Your comments for the day: </Text>
                        <TextInput style={styles.journalEntry}
                            placeholder='Feel free to dump as much or as little information in here as you want. We wont judge you at all. We promise! '
                            numberOfLines={5}
                            multiline
                            editable={false}
                            value={journalEntry.journalText}
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
