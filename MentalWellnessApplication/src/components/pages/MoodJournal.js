import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default class MoodJournal extends Component {

    render() {

        let allData = [{ key: '0', displayDate: 'December-01-2021', usefulDate: '2021-12-01', mood: 'happy' },
        { key: '1', displayDate: 'December-02-2021', usefulDate: '2021-12-05', mood: 'happy' },
        { key: '2', displayDate: 'December-03-2021', usefulDate: '2021-12-08', mood: 'sad' },
        { key: '3', displayDate: 'December-04-2021', usefulDate: '2021-12-07', mood: 'sad' },
        { key: '4', displayDate: 'December-05-2021', usefulDate: '2021-12-18', mood: 'meh' },
        { key: '5', displayDate: 'December-06-2021', usefulDate: '2021-12-17', mood: 'happy' },
        { key: '6', displayDate: 'December-07-2021', usefulDate: '2021-12-28', mood: 'angry' },
        { key: '7', displayDate: 'December-08-2021', usefulDate: '2021-12-29', mood: 'angry' }];

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
                selectedColor: selectedMood === 'happy' ? '#108206' : selectedMood === 'meh' ? '#e38e07' : selectedMood === 'sad' ? '#112dec' : selectedMood === 'angry' ? '#f90505' : '#000000',
            };
        });
        // END REFERENCE

        return (
            <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <ScrollView>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}> Your Mood Journal at a glance: </Text>
                        
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
                            <View style={styles.keyContainer} >
                                <Text style={styles.keyTitle}>Mood Key:</Text>
                                <View style={styles.keyContainer2}>
                                    <View style={[styles.keyIndivContainer, { marginRight: 10 }]}>
                                        <Text style={styles.keyIndiv}>Happy:</Text>
                                        <Text style={[styles.keyBackground, { backgroundColor: '#108206' }]} />
                                    </View>
                                    <View style={[styles.keyIndivContainer, { marginRight: 20 }]}>
                                        <Text style={styles.keyIndiv}>Meh:</Text>
                                        <Text style={[styles.keyBackground, { backgroundColor: '#e38e07' }]} />
                                    </View>
                                </View>
                                <View style={styles.keyContainer2}>
                                    <View style={styles.keyIndivContainer}>
                                        <Text style={styles.keyIndiv}> Sad: </Text>
                                        <Text style={[styles.keyBackground, { backgroundColor: '#112dec', marginLeft: 8 }]} />
                                    </View>
                                    <View style={[styles.keyIndivContainer, { paddingLeft: 10, paddingRight: 20 }]}>
                                        <Text style={styles.keyIndiv}>Angry:</Text>
                                        <Text style={[styles.keyBackground, { backgroundColor: '#f90505' }]} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        color: '#000000'
    },
    keyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        color: '#000000',
        textAlign: 'center'
    },
    keyIndiv: {
        paddingLeft: 10,
        padding: 5,
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000000',
    },
    keyBackground: {
        borderRadius: 7,
        width: 30,
        height: 30,
    },
    keyIndivContainer: {
        flexDirection: 'row',
        height: 40,
    },
    keyContainer: {
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,

    },
    keyContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
