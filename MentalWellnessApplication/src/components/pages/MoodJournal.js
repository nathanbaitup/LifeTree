import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default class MoodJournal extends Component {
    render() {
        return (
            <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <View style={styles.contentContainer}>
                    <Text> This is the Mood Journal </Text>
                    {/* REFERENCE ACCESSED 08/12/2021 https://github.com/wix/react-native-calendars 
                    Used third party calendar dependency to be able to highlight specific dates that correspond to a users mood.*/}
                    <Calendar
                        current={Date.current}
                        minDate={'2015-01-01'}
                        enableSwipeMonths={true}
                        markingType={'custom'}
                        markedDates={{
                            '2021-12-01': {
                                customStyles: {
                                    container: {
                                        backgroundColor: '#108206'
                                    }
                                }
                            },
                            '2021-12-02': {
                                customStyles: {
                                    container: {
                                        backgroundColor: '#108206'
                                    }
                                }
                            },
                            '2021-12-03': {
                                customStyles: {
                                    container: {
                                        backgroundColor: '#112dec'
                                    }
                                }
                            },

                        }}
                    />
                </View>
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
});
