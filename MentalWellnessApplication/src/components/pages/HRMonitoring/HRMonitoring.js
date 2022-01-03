import React, { useState, useEffect } from 'react';
import { ImageBackground, FlatList, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

// Imports the documents styling.
import { hrStyles } from './Styles';
// Imports Firestore from Firebase to save a users heart rate.
import firestore from '@react-native-firebase/firestore';
// Imports the fitness library to connect to Apple HealthKit.
import Fitness from '@ovalmoney/react-native-fitness';

// Imports the slider package to allow a user to select the heart rate they want to track.
import Slider from '@react-native-community/slider';

// TODO: Fix whatever is wrong with android idfk.
// TODO: Make a graph
// TODO: Add a FAB to input a heart rate manually.
// TODO: Implement users slider thing in this page.
// TODO: Display heart rate descriptions onto calnedar.

export default function HRMonitoring(props) {
    // Initializing the state to store a specific user heart rate.
    const [userHeartRates, setUserHeartRates] = useState([]);
    const [filteredHeartRates, setFilteredHeartRates] = useState([]);
    const [heartRateTracker, setHeartRateTracker] = useState(75);
    const [descriptionPressed, setDescriptionPressed] = useState(false);
    const [selectedHR, setSelectedHR] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [description, setDescription] = useState('');
    const [editable, setEditable] = useState(true);

    // Creates a reference to the user ID and heart rate collection in firebase.
    const hrRef = firestore().collection('heartRateList');
    const userID = props.extraData.id;

    // REFERENCE ACCESSED 02/01/2022 https://github.com/OvalMoney/react-native-fitness/blob/master/README.md
    // Used to learn how to implement react-native-fitness library to read heart rate data from Goolge Fit and Apple HealthKit
    const permissions = [
        { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Read },
        { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Write },
    ];

    // If permission is authorized, then retrive all stored heart rate data and if greater than 0, add to userHeartRates list.
    const getHeartRate = async () => {
        Fitness.requestPermissions(permissions)
            .then((authorized) => {
                console.info('Authorized: ' + authorized);
                Fitness.getHeartRate({
                    startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                    endDate: date.toISOString(),
                    interval: 'minute',
                }).then((heartRate) => {
                    if (heartRate.length > 0) {
                        setUserHeartRates(heartRate);
                    }
                });
            }).catch((error) => {
                console.error('Error: ' + error);
            });
    };
    // END REFERENCE

    // Calling date functions to create a date formatted to be saved and displayed to the user.
    const date = new Date();
    const displayDate = date.toISOString().split('T')[0];
    const displayStartTime = (startTime) => {
        const time = startTime.split('T')[1].split(':');
        return time[0] + ':' + time[1];
    };

    // Sets the heart rate a user has pressed to allow them to enter a description.
    // If a description is already present it is added from firebase for display.
    const onAddDescriptionPressed = async (item) => {
        setSelectedHR(item.quantity);
        setSelectedTime(displayStartTime(item.startDate));
        setDescriptionPressed(true);
        try {
            hrRef
                .where('timeOfReading', '==', displayStartTime(item.startDate))
                .where('heartRate', '==', item.quantity)
                .where('authorID', '==', userID)
                .onSnapshot(
                    querySnapshot => {
                        querySnapshot.forEach((doc) => {
                            const item = doc.data();
                            setDescription(item.description);
                            setEditable(false);
                        });
                    }
                );
        } catch (error) {
            console.error(error);
        }
    };
    // Saves the heart rate description to firebase and returns the user to the list view.
    const onSaveDescriptionPressed = async () => {
        const timestamp = firestore.FieldValue.serverTimestamp();
        hrRef
            .add({
                authorID: userID,
                heartRate: selectedHR,
                dateOfReading: displayDate,
                timeOfReading: selectedTime,
                description: description,
                createdAt: timestamp
            }).then(() => {
                setSelectedHR('');
                setSelectedTime('');
                setDescription('');
                setDescriptionPressed(false);
                Alert.alert('Your description has been saved.');
            }).catch((error) => {
                console.error('Error saving the heart rate description' + error);
            });
    };
    // Exits the heart rate description and returns the user to the list view.
    const onExitDescriptionPressed = () => {
        setDescriptionPressed(false);
        setDescription('');
        setEditable(true);
    };

    useEffect(() => {
        getHeartRate();
    }, []);

    const onSliderChange = (value) => {
        setHeartRateTracker(value);
        const filter = userHeartRates.filter((item) => {
            if (item.quantity >= heartRateTracker) {
                return item.startDate, item.quantity, item.endDate;
            }
        });
        setFilteredHeartRates(filter);
    };

    return (
        <ImageBackground source={require('../../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <View style={hrStyles.contentContainer}>
                <Text> Graph will go here. </Text>
            </View>
            <View style={hrStyles.contentContainer}>
                <Text style={hrStyles.headerText}>Showing results for:  <Text style={{ fontStyle: 'italic' }} >{displayDate}</Text> </Text>
                {/* Checks if descriptionPressed is false, to display the list view of all heart rates. 
                If true, changes the view to allow a user to enter a description for the heart rate. */}
                {descriptionPressed == false ? (
                    <View>
                        <Text style={hrStyles.subHeaderText}>Use the slider to set Heart Rate Display Parameter. If there are no heart rates available, then all will be displayed. </Text>
                        <Text style={hrStyles.subHeaderText}>Currently displaying: {heartRateTracker} BPM+ </Text>
                        <Slider style={hrStyles.slider}
                            minimumValue={75}
                            maximumValue={150}
                            minimumTrackTintColor='#00e676'
                            maximumTrackTintColor='#000000'
                            step={1}
                            onValueChange={value => onSliderChange(value)}
                        />
                        <FlatList
                            data={filteredHeartRates }
                            keyExtractor={(item) => (item.startDate)}
                            renderItem={({ item }) =>
                                <View >
                                    {filteredHeartRates.length > 0 ? (
                                        <View style={hrStyles.listView}>
                                            <View>
                                                <Text style={hrStyles.listHeading}>Time: <Text style={hrStyles.listText}> {displayStartTime(item.startDate)} </Text> </Text>
                                                <Text style={hrStyles.listHeading}>Heart Rate: <Text style={hrStyles.listText}> {item.quantity} BPM </Text> </Text>
                                            </View>
                                            <TouchableOpacity style={hrStyles.buttonContainer} onPress={() => onAddDescriptionPressed(item)} >
                                                <Text style={hrStyles.buttonText}>Add description</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View style={hrStyles.listView}>
                                            <Text style={hrStyles.listHeading}> No entries to display.</Text>
                                        </View>
                                    )}
                                </View>
                            } />
                    </View>
                ) : (
                    <View>
                        <Text style={hrStyles.listHeading}>Time: <Text style={hrStyles.listText} > {selectedTime} </Text> </Text>
                        <Text style={hrStyles.listHeading}>Heart Rate: <Text style={hrStyles.listText}> {selectedHR} BPM </Text> </Text>
                        <Text style={hrStyles.listHeading}>Description: </Text>
                        <TextInput style={hrStyles.textInput}
                            placeholder='What&apos;s the reason for this heart-rate spike? Was it due to exercise or maybe something else?'
                            numberOfLines={10}
                            multiline={true}
                            onChangeText={(text) => setDescription(text)}
                            value={description}
                            editable={editable} />
                        <TouchableOpacity style={[hrStyles.buttonContainer, { backgroundColor: '#00e676' }]} onPress={() => onSaveDescriptionPressed()}>
                            <Text style={hrStyles.buttonText}>Save description</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={hrStyles.buttonContainer} onPress={() => onExitDescriptionPressed()}>
                            <Text style={hrStyles.buttonText}>Exit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ImageBackground>
    );
}
