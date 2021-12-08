import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default class MoodJournal extends Component {

    render() {

        let allData = [{ key: '0', displayDate: 'December-01-2021', usefulDate: '2021-12-01', mood: 'happy' },
        { key: '1', displayDate: 'December-02-2021', usefulDate: '2021-12-05', mood: 'happy' },
        { key: '2', displayDate: 'December-03-2021', usefulDate: '2021-12-08', mood: 'sad' },
        { key: '3', displayDate: 'December-04-2021', usefulDate: '2021-12-07', mood: 'sad' },
        { key: '4', displayDate: 'December-05-2021', usefulDate: '2021-12-18', mood: 'meh' },
        { key: '5', displayDate: 'December-06-2021', usefulDate: '2021-12-17', mood: 'happy' },
        { key: '0', displayDate: 'December-07-2021', usefulDate: '2021-12-28', mood: 'crying' },
        { key: '0', displayDate: 'December-08-2021', usefulDate: '2021-12-29', mood: 'crying' }];

        // Generates a list of all the dates from allData.
        const allDates = [];

        // For loop that adds the dates from allData to allDates.
        for (let i = 0; i < allData.length; i++) {
            allDates.push(allData[i].usefulDate);
        }

        // Generates a list of all the moods from allData.
        const allMoods = [];

        // For loop that adds the moods from allData to allMoods.
        for (let i = 0; i < allData.length; i++) {
            allMoods.push(allData[i].mood);
        }

        // REFERENCE ACCESSED 08/12/2021 https://github.com/wix/react-native-calendars/issues/160#issuecomment-408405419
        // Used to learn how to make the calendar load a list of dates.

        // Turns dates into objects that can be used with the calendar to be displayed.
        let allDatesObject = {};
        let selectedMood = '';

        // For each day in allDates array, cycle through the day, select the mood colour anf add the current day to the calendar.
        allDates.forEach((day) => {

            selectedMood = allMoods[day];  // Not working, expected to cycle through all moods based on the day and assign a colour to the calendar
            allDatesObject[day] = {
                selected: true,
                marked: false,
                selectedColor: selectedMood === 'happy' ? '#108206' : selectedMood === 'meh' ? '#e38e07' : selectedMood === 'sad' ? '#112dec' : selectedMood === 'angry' ? '#f90505' : '#000000',
            };
        });

        // END REFERENCE


        return (

            <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}> Your Mood Journal at a glance: </Text>
                    {/* REFERENCE ACCESSED 08/12/2021 https://github.com/wix/react-native-calendars 
                    Used third party calendar dependency to be able to highlight specific dates that correspond to a users mood.*/}
                    <Calendar
                        current={Date.current}
                        minDate={'2015-01-01'}
                        enableSwipeMonths={true}
                        markedDates={allDatesObject} />

                    <View style={styles.keyContainer} >
                        <Text style={styles.keyTitle}>Mood Key:</Text>
                        <Text style={styles.keyIndiv}>Happy = Green</Text>
                        <Text style={styles.keyIndiv}>Meh = Orange</Text>
                        <Text style={styles.keyIndiv}>Sad = Blue</Text>
                        <Text style={styles.keyIndiv}>Angry = Red</Text>
                    </View>



                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingTop: 20,
    },
    keyTitle: {
        fontSize:16,
        fontWeight: 'bold',
        padding: 10,
    },
    keyIndiv : {
        paddingLeft: 10,
        padding: 5,
        fontSize: 14,
    },
});
