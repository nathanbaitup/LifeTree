import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Imports the documents styling.
import {journalStyles} from './Styles';

// Imports firestore from firebase to save user entries to the firstore database.
import firestore from '@react-native-firebase/firestore';

export default function MoodJournal(props) {
    // Gets all of the data currently stored in firebase for the speicifc user for use on the calnedar.
    const [allData, setAllData] = useState([]);

    // Creates a reference to the journals collection in firestore to save data.
    const journalRef = firestore().collection('journalList');
    // Gets the users ID from props passed in from App.js.
    const userID = props.extraData.id;

    // Generates a list of all the dates from allData.
    const allDates = [];
    // Generates a list of all the moods from allData.
    const allMoods = [];

    // Gets all data from firebase where the signed in user ID matches the authorID and pushes the data to the allData array.
    useEffect(() =>{
        journalRef
            .where('authorID', '==', userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newData = [];
                    querySnapshot.forEach(doc => {
                        const userData = doc.data();
                        userData.id = doc.id;
                        newData.push(userData);
                    });
                    setAllData(newData);
                },
                error => {
                    console.error(error);
                }
            );
    }, []);

    // For loop that adds the dates from allData to allDates.
    for (let i = 0; i < allData.length; i++) {
        allDates.push(allData[i].moodCalendarDate);
    }

    // For loop that adds the moods from allData to allMoods.
    for (let i = 0; i < allData.length; i++) {
        allMoods.push(allData[i].moodSelected);
    }

    // REFERENCE ACCESSED 08/12/2021 https://github.com/wix/react-native-calendars/issues/160#issuecomment-408405419
    // Used to learn how to make the calendar load a list of dates.

    // Turns dates into objects that can be used with the calendar to be displayed.
    let allDatesObject = {};
    let selectedMood = '';

    // For each day in allDates array, cycle through the day, select the mood colour and add the current day to the calendar.
    allDates.forEach((day) => {

        // Checks if the day is the same as the date and then adds the mood for the date to the calendar.
        for (let i = 0; i < allMoods.length; i++) {
            if (day === allDates[i]) {
                selectedMood = allMoods[i];
            }
        }

        allDatesObject[day] = {
            selected: true,
            marked: false,
            selectedColor: selectedMood === 'Happy' ? '#108206' : selectedMood === 'Meh' ? '#e38e07' : selectedMood === 'Sad' ? '#112dec' : selectedMood === 'Angry' ? '#f90505' : '#000000',
        };
    });
    // END REFERENCE

    return (
        <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <ScrollView>
                <View style={journalStyles.contentContainer}>
                    <Text style={journalStyles.title}> Your Mood Journal at a glance: </Text>

                    {/* REFERENCE ACCESSED 08/12/2021 https://github.com/wix/react-native-calendars 
                         Used third party calendar dependency to be able to highlight specific dates that correspond to a users mood.*/}
                    <Calendar
                        current={Date.current}
                        minDate={'2015-01-01'}
                        enableSwipeMonths={true}
                        markedDates={allDatesObject}
                    />
                    {/* END REFERENCE */}

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={journalStyles.keyContainer} >
                            <Text style={journalStyles.keyTitle}>Mood Key:</Text>
                            <View style={journalStyles.keyContainer2}>
                                <View style={[journalStyles.keyIndivContainer, { marginRight: 10 }]}>
                                    <Text style={journalStyles.keyIndiv}>Happy:</Text>
                                    <Text style={[journalStyles.keyBackground, { backgroundColor: '#108206' }]} />
                                </View>
                                <View style={[journalStyles.keyIndivContainer, { marginRight: 20 }]}>
                                    <Text style={journalStyles.keyIndiv}>Meh:</Text>
                                    <Text style={[journalStyles.keyBackground, { backgroundColor: '#e38e07' }]} />
                                </View>
                            </View>
                            <View style={journalStyles.keyContainer2}>
                                <View style={journalStyles.keyIndivContainer}>
                                    <Text style={journalStyles.keyIndiv}> Sad: </Text>
                                    <Text style={[journalStyles.keyBackground, { backgroundColor: '#112dec', marginLeft: 8 }]} />
                                </View>
                                <View style={[journalStyles.keyIndivContainer, { paddingLeft: 10, paddingRight: 20 }]}>
                                    <Text style={journalStyles.keyIndiv}>Angry:</Text>
                                    <Text style={[journalStyles.keyBackground, { backgroundColor: '#f90505' }]} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}
