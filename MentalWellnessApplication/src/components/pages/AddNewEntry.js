import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';

export default class AddNewEntry extends Component {
    state = {
        isAngrySelected: false,
        isSadSelected: false,
        isMehSelected: false,
        isHappySelected: false,

        journalEntry: '',
        displayDateOfEntry: null,
        usefulDateOfEntry: null,
        moodForEntry: '',
    };

    // Used for onPress to set the state to angry and deselect all other options.
    isAngry = () => {
        if (!this.state.isAngrySelected) {
            this.setState({ isAngrySelected: true });
            this.setState({ isSadSelected: false });
            this.setState({ isMehSelected: false });
            this.setState({ isHappySelected: false });
        }
    };
    // Used for onPress to set the state to sad and deselect all other options.
    isSad = () => {
        if (!this.state.isSadSelected) {
            this.setState({ isAngrySelected: false });
            this.setState({ isSadSelected: true });
            this.setState({ isMehSelected: false });
            this.setState({ isHappySelected: false });
        }
    };
    // Used for onPress to set the state to meh and deselect all other options.
    isMeh = () => {
        if (!this.state.isMehSelected) {
            this.setState({ isAngrySelected: false });
            this.setState({ isSadSelected: false });
            this.setState({ isMehSelected: true });
            this.setState({ isHappySelected: false });
        }
    };
    // Used for onPress to set the state to happy and deselect all other options.
    isHappy = () => {
        if (!this.state.isHappySelected) {
            this.setState({ isAngrySelected: false });
            this.setState({ isSadSelected: false });
            this.setState({ isMehSelected: false });
            this.setState({ isHappySelected: true });
        }
    };


    componentDidMount() {
        const date = new Date();
        var displayOptions = {day: 'numeric', month: 'long', year: 'numeric'};
        const displayDateOfEntry = date.toLocaleDateString('en-US', displayOptions);
        const usefulDateOfEntry = date.toISOString().split('T')[0];
        this.setState({usefulDateOfEntry: usefulDateOfEntry});
        this.setState({displayDateOfEntry: displayDateOfEntry});  
    }

    updateStateMood = () => {
        if (this.state.isAngrySelected){
            this.setState({moodForEntry: 'angry'});
        } else if (this.state.isSadSelected) {
            this.setState({moodForEntry: 'sad'});
        } else if (this.state.isMehSelected){
            this.setState({moodForEntry: 'meh'});
        } else if (this.state.isHappySelected){
            this.setState({moodForEntry: 'happy'});
        } else {
            this.setState({moodForEntry: 'no mood selected'});
        }
    }


    // TODO: ADD DATE TO BE STORED TO THE STATE.
    render() {
        return (
            <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <View style={styles.mainContainer}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.header}>How are you feeling today? </Text>
                        <View style={styles.moodModules}>
                            <TouchableOpacity style={this.state.isAngrySelected ? styles.moodModSelected : styles.moodModUnselected} onPress={this.isAngry} >
                                <Image source={require('../resources/img/faces/angry.png')} style={styles.moodFaces} />
                                <Text>Angry</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.isSadSelected ? styles.moodModSelected : styles.moodModUnselected} onPress={this.isSad}>
                                <Image source={require('../resources/img/faces/sad.png')} style={styles.moodFaces} />
                                <Text>Sad</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.isMehSelected ? styles.moodModSelected : styles.moodModUnselected} onPress={this.isMeh}>
                                <Image source={require('../resources/img/faces/meh.png')} style={styles.moodFaces} />
                                <Text>Meh</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.isHappySelected ? styles.moodModSelected : styles.moodModUnselected} onPress={this.isHappy}>
                                <Image source={require('../resources/img/faces/happy.png')} style={styles.moodFaces} />
                                <Text>Happy</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.journalHeader}>Any comments for the day? </Text>
                            <TextInput style={styles.journalEntry}
                                placeholder='Feel free to dump as much or as little information in here as you want. We wont judge you at all. We promise! '
                                numberOfLines={10}
                                multiline={true}
                                onChangeText={(journalEntry) => { this.setState({ journalEntry: journalEntry }); }}
                                value={this.state.journalEntry}
                            />

                            <Text style={styles.date}>Todays Date: {this.state.displayDateOfEntry} </Text>
                            <View style={styles.submitButtonContainer}>
                                {/* TODO: MAKE ONPRESS TO SAVE DATA WHEN BACKEND HAS BEEN CONNECTED */}
                                <TouchableOpacity style={styles.submitButton} onPress={console.log(this.state.journalEntry)} >
                                    <Text style={styles.submitText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000'
    },
    moodModules: {
        flexDirection: 'row',
        paddingBottom: 50,
    },
    moodModUnselected: {
        marginTop: 10,
        marginLeft: 5,
        textAlign: 'center',
        paddingLeft: 10,
    },
    moodModSelected: {
        marginTop: 10,
        marginLeft: 5,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        paddingLeft: 10,
    },
    moodFaces: {
        marginTop: 10,
        height: 50,
        width: 66,
        alignItems: 'center',
    },
    journalEntry: {
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: '#ebebeb',
        borderRadius: 10,
        maxHeight: 250,
        height: 150,
    },
    journalHeader: {
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#000000',
    },
    submitButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 20,
    },
    submitButton: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00e676',
        borderRadius: 15,
        width: 150,
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000000',
    },
});
