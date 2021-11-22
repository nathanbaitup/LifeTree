import React, { Component } from 'react';
import { Alert, Button, Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

export default class Home extends Component {

    state = {
        title: 'Good Day, User!', // Added to the state as it can be updated later.
        daysUsed: 1,
        dailyStreak: 0,
        dailyStreakText: '🔥: ',
    }

    showDailyStreakText = () => {
        this.setState({ dailyStreakText: 'Daily Streak: ' }, () => {
            setTimeout(() => {
                this.setState({ dailyStreakText: '🔥: ' });
            }, 2000);
        });
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.heading} >
                    <Text style={styles.title}> {this.state.title} </Text>
                    <Image style={styles.profilePic} source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} />
                </View>
                <View onPress={this.showDailyStreakText}>
                    <TouchableOpacity style={styles.dailyStreak} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}} onPress={this.showDailyStreakText}>
                        <Text style={styles.dailyStreakCounter} onPress={this.showDailyStreakText}> {this.state.dailyStreakText} {this.state.dailyStreak}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.treeFrame}>
                    <Image source={{ uri: 'https://i.dlpng.com/static/png/7497427_preview.png' }} style={styles.tree} />
                    {/* Not needed for MVP, placeholder template for Quotes API. */}
                    <Text style={styles.inspireQuote}>Anything is possible to those who believe. {'\n'} Mark: 9:23</Text>

                    <Text style={styles.daysUsed}> Days Used: {this.state.daysUsed}</Text>
                    <Button style={styles.detailsBTN}
                        onPress={showDailyUseDetails}
                        title="Find Out More"
                        accessibilityLabel='Find out more about how many used days affects the application' />
                </View>
            </View>
        );
    }
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
    heading: {
        flexDirection: 'row',
        paddingTop: 4,
    },
    title: {
        paddingTop: 5,
        paddingLeft: 5,
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        paddingRight: width / 4
    },
    profilePic: {
        //justifyContent: 'flex-end',
        //alignItems: 'flex-end',
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    tree: {
        alignSelf: 'center',
        width: '50%',
        height: 200,
    },
    treeFrame: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (height / 5)
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
        //color: '#7a7a7a',
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

    },
    dailyStreak: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingTop: 5,
        paddingLeft: 10,
    }



});
