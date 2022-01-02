import React, { useState, useEffect } from 'react';
import { ImageBackground, FlatList, Text, TouchableOpacity, View } from 'react-native';

// Imports the documents styling.
import { hrStyles } from './Styles';

// Imports the fitness library to connect to Google Fit and Apple HealthKit.
import Fitness from '@ovalmoney/react-native-fitness';

export default function HRMonitoring() {
    const [userHeartRates, setUserHeartRates] = useState([]);
    const [heartRateTracker, setHeartRateTracker] = useState(0);

    // REFERENCE ACCESSED 02/01/2022 https://github.com/OvalMoney/react-native-fitness/blob/master/README.md
    // Used to learn how to implement react-native-fitness library to read heart rate data from Goolge Fit and Apple HealthKit
    const permissions = [
        { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Read },
        { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Write },
    ];
    const hasBeenAsked = Fitness.isAuthorized(permissions);

    // IF the user hasnt been asked for permission, ask for permission
    const askPermissions = async () => {
        if (!hasBeenAsked) {
            Fitness.requestPermissions(permissions);
        }
    };

    // If permission is authorized, then retrive all stored heart rate data and if greater than 0, add to userHeartRates list.
    const getHeartRate = async () => {
        Fitness.isAuthorized(permissions)
            .then((authorized) => {
                console.info('Authorized: ' + authorized);
                Fitness.getHeartRate({
                    startDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
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

    useEffect(() => {
        askPermissions();
        getHeartRate();

    }, []);
    
    const date = new Date();
    const displayDate = date.toISOString().split('T')[0];

    const displayStartTime = (startTime) => {
        const time = startTime.split('T')[1].split(':');
        return time[0] + ':' + time[1];
    };

    return (
        <ImageBackground source={require('../../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <View style={hrStyles.contentContainer}>
                <Text> Graph will go here </Text>
            </View>
            <View style={hrStyles.contentContainer}>
                <Text style={hrStyles.headerText}>Showing results for:  <Text style={{ fontStyle: 'italic' }} >{displayDate}</Text> </Text>
                <Text style={hrStyles.subHeaderText}>Set Heart Rate display parameter: {heartRateTracker} BPM+ </Text>
                <FlatList
                    data={userHeartRates}
                    keyExtractor={(item) => (item.startDate)}
                    renderItem={({ item }) =>
                        <View style={hrStyles.listView}>
                            <View>
                                <Text style={hrStyles.listHeading}>Time: <Text style={hrStyles.listText}> {displayStartTime(item.startDate)} </Text> </Text>
                                <Text style={hrStyles.listHeading}>Heart Rate: <Text style={hrStyles.listText}> {item.quantity} BPM </Text> </Text>
                            </View>
                            <TouchableOpacity style={hrStyles.buttonContainer}>
                                <Text style={hrStyles.buttonText}>Add description</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </ImageBackground>
    );
}
