import React, { useState, useEffect } from 'react';
import { Alert, Button, Image, ImageBackground, Text, TouchableOpacity, ScrollView, View, } from 'react-native';
import Loading from '../../utils/Loading';

// Imports the documents styling.
import { homeStyles } from './Styles';
// Imports the API handler.
import ajax from '../../utils/ajax';

import Settings from '../Settings/Settings';

// Imports firestore and storage from firebase to save the days used and retrieve image data relating to the bonsai tree.
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export default function Home(props) {
    // Parsing logout function for Settings from App.js
    const logout = props.logout;
    // Gets all information regarding the current user.
    const username = props.extraData.fullName;
    const userID = props.extraData.id;
    const user = auth().currentUser;

    // Initialising the state so that if a new user logs in they are set to the default values.
    const [daysUsed, setDaysUsed] = useState(0);
    const [dailyStreak, setDailyStreak] = useState(0);
    const [dailyStreakText, setDailyStreakText] = useState('🔥: ');
    const [treeImageUrl, setTreeImageUrl] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [quoteAPI, setQuoteAPI] = useState(null);
    const [quoteAuthor, setQuoteAuthor] = useState(null);
    const [settingsPressed, setSettingsPressed] = useState(false);
    const [loading, setLoading] = useState(true);

    // Creates references to firebase objects to get the user collection and profile picture. 
    const userCounterRef = firestore().collection('userCounter');
    const profilePicRef = storage().ref('users/' + user.uid + '/profilePicture/' + user.photoURL);

    // Gets the current day on the device.
    const date = new Date();
    const currentDay = date.toISOString().split('T')[0];

    // Initiates all data on the home page. Called in useEffect.
    const setHomeScreenData = async () => {
        // Takes the current user ID to check if the user exists in the collection.
        // If the user exists, the days used, date and streak are saved to check if it is a new day,
        // Where the days used counter and daily streak counter are updated respectfully.
        // If the user does not exist in the collection, then a document is created for them using
        // default data from the state.
        userCounterRef.doc(userID).get().then((doc) => {
            if (doc.exists) {
                const storedDaysUsed = doc.data().daysUsedApplication;
                const storedDate = doc.data().currentDay;
                const storedStreak = doc.data().dailyStreak;

                setTreeDisplay(storedDaysUsed);

                if (currentDay === storedDate) {
                    setDaysUsed(storedDaysUsed);
                    setDailyStreak(storedStreak);
                    setLoading(false);
                } else {
                    const userStoredDate = new Date(storedDate).setUTCHours(0, 0, 0, 0);
                    // REFERENCE ACCESSED 31/12/2021 https://stackoverflow.com/a/1296374
                    // Used to get the previous date.
                    const previousDateFromCurrent = new Date(new Date().setDate(new Date().getDate() - 1)).setUTCHours(0, 0, 0, 0);
                    // END REFERENCE
                    if (previousDateFromCurrent === userStoredDate) {
                        userCounterRef
                            .doc(userID)
                            .set({
                                authorID: userID,
                                currentDay: currentDay,
                                daysUsedApplication: (storedDaysUsed + 1),
                                dailyStreak: (storedStreak + 1),
                            })
                            .then(() => {
                                setDaysUsed(storedDaysUsed + 1);
                                setDailyStreak(storedStreak + 1);
                                setLoading(false);
                            });
                    } else {
                        userCounterRef
                            .doc(userID)
                            .set({
                                authorID: userID,
                                currentDay: currentDay,
                                daysUsedApplication: (storedDaysUsed + 1),
                                dailyStreak: 0,
                            })
                            .then(() => {
                                setDaysUsed(storedDaysUsed + 1);
                                setDailyStreak(0);
                                setLoading(false);
                            });
                    }
                }
            } else {
                const data = {
                    authorID: userID,
                    currentDay: currentDay,
                    daysUsedApplication: daysUsed,
                    dailyStreak: dailyStreak,
                };
                userCounterRef
                    .doc(userID)
                    .set(data)
                    .catch((error) => {
                        alert(error.message);
                    });
                setTreeDisplay(0);
                setLoading(false);
            }
        });

    };
    // Gets and sets the random API quote, called in useEffect.
    const setDailyQuote = async () => {
        let quotes = await ajax.fetchRandomQuotes();
        const jsonText = JSON.stringify(quotes);
        setQuoteAPI(jsonText.split('"')[3]);
        setQuoteAuthor(jsonText.split('"')[7]);
    };
    // Sets the users profile picture, called in useEffect.
    const setProfilePic = async () => {
        // Sets the profile picture, if not available, sets to a default image.
        profilePicRef
            .getDownloadURL()
            .then((downloadURL) => {
                setProfilePicUrl(downloadURL);
            }).catch(() => {
                setProfilePicUrl('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
            });
    };
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
    // Parsed into the settings page so when the close settings button is pressed the user is returned to home.
    const closeSettings = () => {
        setProfilePic();
        setSettingsPressed(false);
    };
    // React hook that sets up the home page on component load.
    useEffect(() => {
        setDailyQuote();
        setHomeScreenData();
        setProfilePic();
    }, []);

    if (loading) {
        return (
            <Loading loading={loading} />
        );
        // Renders the page if settings pressed is false, else renders the settings page.
    } else if (settingsPressed == false) {
        return (
            <ImageBackground source={require('../../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <ScrollView>
                    <View style={homeStyles.mainContainer}>
                        <View style={homeStyles.heading} >
                            <Text testID='userGreeting' style={homeStyles.title}>Hello, {username}! </Text>
                            <TouchableOpacity onPress={() => setSettingsPressed(true)} >
                                <Image style={homeStyles.profilePic} source={{ uri: profilePicUrl }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={homeStyles.dailyStreak} onPress={() => {
                                setDailyStreakText('Daily Streak: ');
                                setTimeout(() => { setDailyStreakText('🔥: '); }, 1000);
                            }}>
                                <Text style={homeStyles.dailyStreakCounter} > {dailyStreakText} {dailyStreak}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={homeStyles.treeFrame}>
                            <Image source={{ uri: treeImageUrl }} style={homeStyles.tree} />
                            <Text style={homeStyles.inspireQuote}>{quoteAPI} {'\n'} -{quoteAuthor}</Text>
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
    } else {
        return (
            <Settings {...props} closeSettings={closeSettings} logout={logout} />
        );
    }
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
