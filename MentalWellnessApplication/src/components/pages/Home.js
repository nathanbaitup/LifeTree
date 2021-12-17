import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View, Image, Dimensions, TouchableOpacity, ImageBackground, ScrollView, StyleSheet } from 'react-native';

// Imports firestore from firebase to save the days used and daily streak in the database.
import firestore from '@react-native-firebase/firestore';

// Imports storage from firebase to retrieve image data relating to the bonsai tree
import storage from '@react-native-firebase/storage';

export default function Home(props) {
    //TODO: Add counter for daily streak
    //TODO: Based on what the days used counter equals, update the image of the tree.

    // The full name of the current logged in user. Used in the app title.
    const username = props.extraData.fullName;
    // The ID of the current logged in user. Used to update the daily counter.
    const userID = props.extraData.id;

    // Initialising the state so that if a new user logs in they are set to the default values.
    const [daysUsed, setDaysUsed] = useState(0);
    const [dailyStreak, setDailyStreak] = useState(0);
    const [dailyStreakText, setDailyStreakText] = useState('🔥: ');
    const [imageName, setImageName] = useState('tree-00.png');
    const [treeImageUrl, setTreeImageUrl] = useState(null);

    // Creates a reference to the userCounter collection in firestore to retrieve and update data. 
    const userCounterRef = firestore().collection('userCounter');

    // Gets the current day on the device.
    const date = new Date();
    const currentDay = date.toISOString().split('T')[0];
    const imageRef = storage().ref('/images/trees/standard/' + imageName);

    const setTreeDisplay = () => {
        if (daysUsed === 0) {
            setImageName('tree-00.png');
        }; 
        if (daysUsed >= 1) {
            setImageName('tree-01.png');
        }; 
        if (daysUsed >= 3) {
            setImageName('tree-02.png');
        };
        if (daysUsed >= 5) {
            setImageName('tree-03.png');
        };
        if (daysUsed >= 10) {
            setImageName('tree-04.png');
        };
        if (daysUsed >= 15) {
            setImageName('tree-05.png');
        }; 
        if (daysUsed >= 20) {
            setImageName('tree-06.png');
        }; 
        if (daysUsed >= 50) {
            setImageName('tree-07.png');
        }; 
        if (daysUsed >= 75) {
            setImageName('tree-08.png');
        };
        if (daysUsed >= 100) {
            setImageName('tree-09.png');
        }; 
        if (daysUsed >= 150) {
            setImageName('tree-10.png');
        }; 
        if (daysUsed >= 200) {
            setImageName('tree-11.png');
        };
    };

    useEffect(() => {
        // Set to a timeout to run the code after a set time so that all user properties are correctly loaded.
        setTimeout(() => {
            userCounterRef.doc(userID).get().then((doc) => {
                // If the document exists, where authorID = userID then add to allData.
                if (doc.exists) {

                    // Sets the state variables to equal the database fields.
                    setDaysUsed(doc.data().daysUsedApplication);
                    setDailyStreak(doc.data().dailyStreak);

                    setTreeDisplay()

                    imageRef
                        .getDownloadURL()
                        .then((downloadURL) => {
                            setTreeImageUrl(downloadURL)
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    // Checks if the current day is equal to the date stored in the database to update the days used counter.
                    if (currentDay === doc.data().currentDay) {
                        // Nothing happens as day counter is correct.
                    } else {
                        // The userCounter collection is updated with the new date and the daysUsed counter is incremented by 1.
                        userCounterRef
                            .doc(userID)
                            .set({
                                authorID: userID,
                                currentDay: currentDay,
                                daysUsedApplication: (daysUsed + 1),
                                dailyStreak: dailyStreak
                            })
                            .then(() => {
                                setDaysUsed(daysUsed + 1);
                            })
                            .catch((error) => {
                                alert(error.message);
                            });
                    }
                } else {
                    // If the document doesnt exist, it is created and the defualt data from the state is saved to the database.

                    // The data that is used to create the document if it doesn't exist.
                    const data = {
                        authorID: userID,
                        currentDay: currentDay,
                        daysUsedApplication: daysUsed,
                        dailyStreak: dailyStreak
                    };
                    userCounterRef
                        .doc(userID)
                        .set(data)
                        .catch((error) => {
                            alert(error.message);
                        });
                }
            });
        }, 500);

    }, []);

    return (
        <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.heading} >
                        <Text style={styles.title}>Welcome, {username} </Text>
                        <TouchableOpacity >
                            <Image style={styles.profilePic} source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.dailyStreak} onPress={() => setDailyStreakText('Daily Streak: ')}>
                            <Text style={styles.dailyStreakCounter} > {dailyStreakText} {dailyStreak}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.treeFrame}>
                        {/* <Image source={require('../resources/img/trees/standard/tree-0.png')} style={styles.tree} /> */}
                        <Image source={{uri: treeImageUrl}} style={styles.tree} />
                        {/* Not needed for MVP, placeholder template for Quotes API. */}
                        <Text style={styles.inspireQuote}>Anything is possible to those who believe. {'\n'} Mark: 9:23</Text>

                        <Text style={styles.daysUsed}> Days Used: {daysUsed}</Text>
                        <Button style={styles.detailsBTN}
                            onPress={showDailyUseDetails}
                            title="Find Out More"
                            accessibilityLabel='Find out more about how many used days affects the application' />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

// Function used to store height of device being used for responsive design on the homescreen.
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

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

// The styling for home page.
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    heading: {
        flexDirection: 'row',
        paddingTop: 4,
    },
    title: {
        paddingTop: 5,
        paddingLeft: 5,
        textAlign: 'left',
        fontSize: 26,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        paddingRight: width / 4,
        color: '#000000',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    tree: {
        alignSelf: 'center',
        width: 200,
        height: 125,
    },
    treeFrame: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (height / 7),
    },
    inspireQuote: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingTop: 10,
        color: '#7a7a7a',
    },
    daysUsed: {
        fontSize: 18,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingTop: 15,
        color: '#000000',
        marginBottom: 20,
    },
    detailsBTN: {
        paddingTop: 5,
        textTransform: 'lowercase',
    },
    dailyStreakCounter: {
        backgroundColor: '#00e676',
        borderRadius: 12,
        overflow: 'hidden',
        padding: 10,
        color: '#000000',

    },
    dailyStreak: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingTop: 5,
        paddingLeft: 10,
    }



});
