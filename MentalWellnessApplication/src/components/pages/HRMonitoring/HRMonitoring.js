import React, { useState, useEffect } from 'react';
import { Dimensions, ImageBackground, FlatList, Platform, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import HRGraph from './HRGraph';
import Loading from '../../utils/Loading';

// Imports the documents styling.
import { hrStyles } from './Styles';
// Imports Firestore from Firebase to save a users heart rate.
import firestore from '@react-native-firebase/firestore';
// Imports the fitness library to connect to Apple HealthKit.
import Fitness from '@ovalmoney/react-native-fitness';
// Imports the slider package to allow a user to select the heart rate they want to track.
import Slider from '@react-native-community/slider';
// The icon package for the tab bar.
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Imports the date time picker to select a time when adding a heart rate.
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HRMonitoring(props) {
    // If page is loading, display indicator for loading.
    const [loading, setLoading] = useState(true);
    // Initializing the state to store a specific user heart rate.
    const [userHeartRates, setUserHeartRates] = useState([]);
    const [filteredHeartRates, setFilteredHeartRates] = useState([]);
    const [heartRateTracker, setHeartRateTracker] = useState(75);

    // Variables to store to firebase when adding a description.
    const [selectedHR, setSelectedHR] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [description, setDescription] = useState('');
    const [editable, setEditable] = useState(true);

    // Brings up the new pages to add a description or heart rate.
    const [descriptionPressed, setDescriptionPressed] = useState(false);
    const [addHeartRate, setAddHeartRate] = useState(false);

    // Variables for adding a new heart rate.
    const [heartRate, setHeartRate] = useState('');
    const [timeOfEntry, setTimeOfEntry] = useState(new Date());

    // Creates a reference to the user ID and heart rate collection in firebase.
    const hrRef = firestore().collection('heartRateList');
    const userID = props.extraData.id;

    // REFERENCE ACCESSED 03/01/2022 https://www.npmjs.com/package/@react-native-community/datetimepicker
    // Used to import time picker for both ios and android.
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || timeOfEntry;
        setShow(Platform.OS === 'ios');
        setTimeOfEntry(currentTime);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showTimePicker = () => {
        showMode('time');
    };
    // END REFERENCE

    // REFERENCE ACCESSED 02/01/2022 https://github.com/OvalMoney/react-native-fitness/blob/master/README.md
    // Used to learn how to implement react-native-fitness library to read heart rate data from Goolge Fit and Apple HealthKit
    const permissions = [
        { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Read },
        { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Write },
    ];
    // If permission is authorized, then retrive all stored heart rate data and if greater than 0, add to userHeartRates list.
    const getHeartRate = async () => {
        Fitness.requestPermissions(permissions)
            .then(() => {
                Fitness.getHeartRate({
                    startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                    endDate: date.toISOString(),
                    interval: 'minute',
                }).then((heartRate) => {
                    if (heartRate.length > 0) {
                        setUserHeartRates(heartRate);
                        setLoading(false);
                    }
                }).catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
            }).catch((error) => {
                console.error('Error: ' + error);
                setLoading(false);
            });
            setLoading(false);
    };
    // END REFERENCE

    // Calling date functions to create a date formatted to be saved and displayed to the user.
    const date = new Date();
    const displayDate = date.toISOString().split('T')[0];
    const splitTime = timeOfEntry.toISOString().split('T')[1].split(':');
    const displayTime = splitTime[0] + ':' + splitTime[1];
    // Returns the time in a nice format to display
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
    // Filters through all heart rates and creates a new list based on the users tracker to display to the user..
    const onSliderChange = (value) => {
        setHeartRateTracker(value);
        const filter = userHeartRates.filter((item) => {
            if (item.quantity >= heartRateTracker) {
                return item.startDate, item.quantity, item.endDate;
            }
        });
        setFilteredHeartRates(filter);
    };

    // When a user has maually entered a heart rate, it is validate to remove non digit characters and added to the UserHeartRate list
    const addUserHeartRate = () => {
        const validatedHR = heartRate.replace(/[^0-9]/g, '');
        const newUserHeartRate = {
            endDate: timeOfEntry,
            quantity: validatedHR,
            startDate: timeOfEntry.toISOString(),
        };
        setLoading(true);
        setUserHeartRates(arr => [...arr, newUserHeartRate]);
        setAddHeartRate(false);
        setLoading(false);
    };

    useEffect(() => {
        getHeartRate();
        onSliderChange(75);
        userHeartRates;
    }, []);

    if (addHeartRate) {
        return (
            <ImageBackground source={require('../../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <View style={[hrStyles.contentContainer, { height: height / 2, justifyContent: 'center' }]}>
                    <Text style={[hrStyles.headerText, { marginBottom: 20 }]}>Add Heart Rate Data:</Text>

                    <View style={hrStyles.addHRContainer}>
                        <Text style={hrStyles.listHeading}>Date:</Text>
                        <TextInput
                            style={hrStyles.listText}
                            value={displayDate}
                            autoCapitalize='none'
                            editable={false} />
                    </View>

                    <View style={hrStyles.timePickerContainer}>
                        <View style={hrStyles.addHRContainer}>
                            <Text style={hrStyles.listHeading}>Time: <Text style={hrStyles.listText}>{displayTime}</Text> </Text>
                            <TouchableOpacity style={hrStyles.timeContainer} onPress={() => showTimePicker()}>
                                <Text style={[hrStyles.buttonText, { color: '#000000' }]}>Select Time:</Text>
                            </TouchableOpacity>
                        </View>
                        {show && (
                            <DateTimePicker
                                style={hrStyles.timePicker}
                                testID='dateTimePicker'
                                value={timeOfEntry}
                                mode={mode}
                                is24Hour={true}
                                display='default'
                                onChange={onTimeChange} />
                        )}
                    </View>

                    <View style={hrStyles.addHRContainer}>
                        <Text style={hrStyles.listHeading}>BPM:</Text>
                        <TextInput
                            style={hrStyles.listText}
                            placeholder='enter heart rate...'
                            placeholderTextColor='#aaaaaa'
                            onChangeText={(bpm) => setHeartRate(bpm)}
                            value={heartRate}
                            keyboardType='numeric' />
                    </View>

                    <TouchableOpacity style={hrStyles.addEntryButton} onPress={() => addUserHeartRate()}>
                        <Text style={[hrStyles.buttonText, { color: '#000000' }]}>Add Entry</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );

    } else if (loading) {
        return (
            <Loading  {...props} loading={loading} />
        );
    } else {
        return (
            <ImageBackground source={require('../../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <HRGraph {...props} heartRateList={userHeartRates} />

                <View style={[hrStyles.contentContainer, { height: height / 2.6 }]}>
                    <Text style={hrStyles.headerText}>Showing results for:  <Text style={{ fontStyle: 'italic' }} >{displayDate}</Text> </Text>
                    {/* Checks if descriptionPressed is false, to display the list view of all heart rates. 
                    If true, changes the view to allow a user to enter a description for the heart rate. */}
                    {descriptionPressed == false ? (
                        <View>
                            <Text style={hrStyles.subHeaderText}>Use the slider to set Heart Rate Display Parameter.</Text>
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
                                style={{ height: height / 5 }}
                                data={filteredHeartRates}
                                keyExtractor={(item) => (item.startDate)}
                                renderItem={({ item }) =>
                                    <View >
                                        {filteredHeartRates.length > 0 ? (
                                            <View style={[hrStyles.listView,]}>
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
                <TouchableOpacity style={hrStyles.fab} activeOpacity={0.8} onPress={() => setAddHeartRate(true)}>
                    <Icon name='plus' color={'#FFFFFF'} size={30} />
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

// Function used to store height of device being used for responsive design on the homescreen.
const height = Dimensions.get('window').height;
