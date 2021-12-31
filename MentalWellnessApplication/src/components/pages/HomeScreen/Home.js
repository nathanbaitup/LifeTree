import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

// Imports the documents styling.
import { homeStyles } from './Styles';

// Imports firestore and storage from firebase to save the days used and retrieve image data relating to the bonsai tree.
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export default function Home(props) {
    // The full name of the current logged in user. Used in the app title.
    const username = props.extraData.fullName;
    // The ID of the current logged in user. Used to update the daily counter.
    const userID = props.extraData.id;
    // Gets the current signed in user.
    const user = auth().currentUser;

    // Initialising the state so that if a new user logs in they are set to the default values.
    const [daysUsed, setDaysUsed] = useState(0);
    const [treeImageUrl, setTreeImageUrl] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState(null);

    // Creates a reference to the userCounter collection in firestore to retrieve and update data. 
    const userCounterRef = firestore().collection('userCounter');
    // Creates a reference to where the users profile picture is saved and grabs the image based on the users photo URL.
    const profilePicRef = storage().ref('users/' + user.uid + '/profilePicture/' + user.photoURL);

    // Gets the current day on the device.
    const date = new Date();
    const currentDay = date.toISOString().split('T')[0];

    // Sets the bonsai tree to be displayed based on the number of days the application is used.
    const setTreeDisplay = (days) => {
        let imageRef = null;
        try {
            if (days >= 200) {
                imageRef = storage().ref('/images/trees/standard/tree-11.png');
            } else if (days >= 150) {
                imageRef = storage().ref('/images/trees/standard/tree-10.png');
            } else if (days >= 100) {
                imageRef = storage().ref('/images/trees/standard/tree-09.png');
            } else if (days >= 75) {
                imageRef = storage().ref('/images/trees/standard/tree-08.png');
            } else if (days >= 50) {
                imageRef = storage().ref('/images/trees/standard/tree-07.png');
            } else if (days >= 20) {
                imageRef = storage().ref('/images/trees/standard/tree-06.png');
            } else if (days >= 15) {
                imageRef = storage().ref('/images/trees/standard/tree-05.png');
            } else if (days >= 10) {
                imageRef = storage().ref('/images/trees/standard/tree-04.png');
            } else if (days >= 5) {
                imageRef = storage().ref('/images/trees/standard/tree-03.png');
            } else if (days >= 3) {
                imageRef = storage().ref('/images/trees/standard/tree-02.png');
            } else if (days >= 1) {
                imageRef = storage().ref('/images/trees/standard/tree-01.png');
            } else if (days == 0) {
                imageRef = storage().ref('/images/trees/standard/tree-00.png');
            }
            imageRef
                .getDownloadURL()
                .then((downloadURL) => {
                    setTreeImageUrl(downloadURL);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        // Sets the profile picture, if not available, sets to a default image.
        profilePicRef
            .getDownloadURL()
            .then((downloadURL) => {
                setProfilePicUrl(downloadURL);
            }).catch(() => {
                setProfilePicUrl('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
            });

        // Set to a timeout to run the code after a set time so that all user properties are correctly loaded.
        setTimeout(() => {
            userCounterRef.doc(userID).get().then((doc) => {
                // If the document exists, where authorID = userID then add to allData.
                if (doc.exists) {
                    const storedDaysUsed = doc.data().daysUsedApplication;
                    setTreeDisplay(storedDaysUsed);
                    if (currentDay === doc.data().currentDay) {
                        setDaysUsed(storedDaysUsed);
                    } else {
                        // The userCounter collection is updated with the new date and the daysUsed counter is incremented by 1.
                        userCounterRef
                            .doc(userID)
                            .set({
                                authorID: userID,
                                currentDay: currentDay,
                                daysUsedApplication: (storedDaysUsed + 1),
                                //dailyStreak: dailyStreak
                            })
                            .then(() => {
                                setDaysUsed(storedDaysUsed + 1);
                            })
                            .catch((error) => {
                                alert(error.message);
                            });
                    }
                } else {
                    // The data that is used to create the document if it doesn't exist.
                    const data = {
                        authorID: userID,
                        currentDay: currentDay,
                        daysUsedApplication: daysUsed,
                        //dailyStreak: dailyStreak
                    };
                    userCounterRef
                        .doc(userID)
                        .set(data)
                        .catch((error) => {
                            alert(error.message);
                        });

                    setTreeDisplay(0);
                }
            });
        }, 500);

    }, []);

    return (
        <ImageBackground source={require('../../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <ScrollView>
                <View style={homeStyles.mainContainer}>
                    <View style={homeStyles.heading} >
                        <Text style={homeStyles.title}>Welcome, {username} </Text>
                        <TouchableOpacity >
                            <Image style={homeStyles.profilePic} source={{ uri: profilePicUrl }} />
                        </TouchableOpacity>
                    </View>
                    {/* <View>
                        <TouchableOpacity style={homeStyles.dailyStreak} onPress={() => setDailyStreakText('Daily Streak: ')}>
                            <Text style={homeStyles.dailyStreakCounter} > {dailyStreakText} {dailyStreak}</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={homeStyles.treeFrame}>
                        <Image source={{ uri: treeImageUrl }} style={homeStyles.tree} />
                        {/* Not needed for MVP, placeholder template for Quotes API. */}
                        <Text style={homeStyles.inspireQuote}>Anything is possible to those who believe. {'\n'} Mark: 9:23</Text>

                        <Text style={homeStyles.daysUsed}> Days Used: {daysUsed}</Text>
                        <Button style={homeStyles.detailsBTN}
                            onPress={showDailyUseDetails}
                            title="Find Out More"
                            accessibilityLabel='Find out more about how many used days affects the application' />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}



// Function that creates an alert to explain why the application should be used daily.
const showDailyUseDetails = () => {
    Alert.alert(
        // The alert title
        'Why use this app daily?',
        // The alert message
        'By using the application daily, you increase your days used counter! This has a direct link to the growth of the tree, which grows whilst you grow. ' +
        'Watch the tree grow overtime and see how far you have come on your own journey.',
        // brackets are required or android will giv an error message.
        [
            {
                text: 'OK', onPress: () => { }
            }
        ]);
};
