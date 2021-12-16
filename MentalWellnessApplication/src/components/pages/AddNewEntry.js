import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';

// Imports firestore from firebase to save user entries to the firstore database.
import firestore from '@react-native-firebase/firestore';

export default function AddNewEntry(props) {

    // Initializing the state so that when a user selects a mood, it is outlined to show they have selected it.
    const [angry, setAngry] = useState(false);
    const [sad, setSad] = useState(false);
    const [meh, setMeh] = useState(false);
    const [happy, setHappy] = useState(false);

    // Initializing the state so that once a user has entered all of their details it can be stored to the firestore database.
    const [journalEntry, setJournalEntry] = useState('');
    const [usefulDate, setUsefulDate] = useState(null);
    const [displayDate, setDisplayDate] = useState(null);
    const [entryMood, setEntryMood] = useState('');

    // Creates a reference to the journal list collection in firestore to save data.
    const journalsRef = firestore().collection('journalList');
    // Gets the users ID from props passed in from App.js.
    const userID = props.extraData.id;

    useEffect(() => {
        // Gets the current date and creates an object on how to display the date.
        const date = new Date();
        const displayOptions = { day: 'numeric', month: 'long', year: 'numeric' };

        // Displays the date on the component in a nice format.
        const displayDateOfEntry = date.toLocaleDateString('en-US', displayOptions);
        setDisplayDate(displayDateOfEntry);

        // Takes the date in ISO format to be saved to the firestore databse and be displayed on the mood calendar.
        const usefulDateOfEntry = date.toISOString().split('T')[0];
        setUsefulDate(usefulDateOfEntry);

    }, []);


    // On submission, checks if there is an input for journal entry, then creates a timestamp and collects the userID,
    // mood, date, and jorunal entry to be stored in the firestore databse, then clears the fields and notifies the user if
    // the upload was successful or if an error occurs.
    const onSubmitButtonPress = () => {
        // REFERENCE ACCESSED 14/12/2021 https://www.freecodecamp.org/news/react-native-firebase-tutorial/ (8. Writing and Reading Data from Firestore)
        // Used to learn how to save data to firestore.
        if (journalEntry && journalEntry.length > 0) {
            const timestamp = firestore.FieldValue.serverTimestamp();
            const data = {
                authorID: userID,
                moodSelected: entryMood,
                journalText: journalEntry,
                moodCalendarDate: usefulDate,
                dateOfEntry : displayDate,
                createdAt: timestamp
            };
            journalsRef
                .add(data)
                .then((_doc) => {
                    Keyboard.dismiss();

                    setJournalEntry('');
                    setEntryMood('');
                    setAngry(false);
                    setSad(false);
                    setMeh(false);
                    setHappy(false);

                    alert('Entry Successfully Added');

                })
                .catch((error) => {
                    alert('Error: ' + error);
                });
        }
        //END REFERENCE
    };

    // ---------- Functions to set the user mood ----------
    // Used to highlight the users mood as well as set the mood to the state.
    const isAngry = () => {
        if (!angry) {
            setAngry(true);
            setSad(false);
            setMeh(false);
            setHappy(false);
            setEntryMood('Angry');
        }
    };
    const isSad = () => {
        if (!sad) {
            setAngry(false);
            setSad(true);
            setMeh(false);
            setHappy(false);
            setEntryMood('Sad');
        }
    };
    const isMeh = () => {
        if (!meh) {
            setAngry(false);
            setSad(false);
            setMeh(true);
            setHappy(false);
            setEntryMood('Meh');
        }
    };
    const isHappy = () => {
        if (!happy) {
            setAngry(false);
            setSad(false);
            setMeh(false);
            setHappy(true);
            setEntryMood('Happy');
        }
    };

    return (
        <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.header}>How are you feeling today?</Text>

                    <View style={styles.moodModules}>

                        <TouchableOpacity style={angry ? styles.moodModSelected : styles.moodModUnselected} onPress={isAngry} >
                            <Image source={require('../resources/img/faces/angry.png')} style={styles.moodFaces} />
                            <Text>Angry</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={sad ? styles.moodModSelected : styles.moodModUnselected} onPress={isSad}>
                            <Image source={require('../resources/img/faces/sad.png')} style={styles.moodFaces} />
                            <Text>Sad</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={meh ? styles.moodModSelected : styles.moodModUnselected} onPress={isMeh}>
                            <Image source={require('../resources/img/faces/meh.png')} style={styles.moodFaces} />
                            <Text>Meh</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={happy ? styles.moodModSelected : styles.moodModUnselected} onPress={isHappy}>
                            <Image source={require('../resources/img/faces/happy.png')} style={styles.moodFaces} />
                            <Text>Happy</Text>

                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.journalHeader}>Any comments for the day? </Text>
                        <TextInput style={styles.journalEntry}
                            placeholder='Feel free to dump as much or as little information in here as you want. We wont judge you. We promise! '
                            numberOfLines={10}
                            multiline={true}
                            onChangeText={(text) => setJournalEntry(text)}
                            value={journalEntry}
                        />

                        <Text style={styles.date}>Todays Date: {displayDate} </Text>
                        <View style={styles.submitButtonContainer}>

                            {/* TODO: MAKE ONPRESS TO SAVE DATA WHEN BACKEND HAS BEEN CONNECTED */}
                            <TouchableOpacity style={styles.submitButton} onPress={onSubmitButtonPress} >
                                <Text style={styles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

// Styling for the document.
const styles = StyleSheet.create({
    mainContainer: {
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
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000'
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
        paddingTop: 20,
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
