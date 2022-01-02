import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground } from 'react-native';

// Imports the documents styling.
import { hrStyles } from './Styles';

import Fitness from '@ovalmoney/react-native-fitness';

export default function HRMonitoring() {
    const [userHeartRates, setUserHeartRates] = useState([]);
    // REFERENCE ACCESSED 02/01/2022 https://github.com/OvalMoney/react-native-fitness/blob/master/README.md
    // Used to learn how to implement react-native-fitness library to read heart rate data from Goolge Fit and Apple HealthKit
    const permissions = [
        { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Read },
        { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Write },
    ];

    const hasBeenAsked = Fitness.isAuthorized(permissions);

    useEffect(() => {

        if (!hasBeenAsked) {
            Fitness.requestPermissions(permissions);
        }
        Fitness.isAuthorized(permissions)
            .then((authorized) => {
                // Do something
            })
            .catch((error) => {
                // Do something
                console.log('Error: ' + error);
            });

        Fitness.getHeartRate({
            startDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            endDate: date.toISOString(),
            interval: 'minute',
        }).then((heartRate) => {
            console.log(heartRate);
            setUserHeartRates(heartRate);
        });
    }, []);
    // END REFERENCE

    const date = new Date();
    const displayDate = date.toISOString().split('T')[0];

    
    return (
        <ImageBackground source={require('../../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <View style={hrStyles.contentContainer}>
                <Text> Graph will go here </Text>
            </View>
            <View style={hrStyles.contentContainer}>
                <Text> List will go here</Text>
                </View>
        </ImageBackground>
    );
}
