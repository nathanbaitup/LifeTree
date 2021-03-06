import {Dimensions, StyleSheet } from 'react-native';

// Function used to store height of device being used for responsive design on the homescreen.
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const  homeStyles = StyleSheet.create({
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
        paddingRight: 20,
        textAlign: 'left',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        width: width / 1
    },
    profilePic: {
        position: 'absolute',
        top: 5,
        right: 15,
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
        paddingLeft: 4,
        paddingRight: 4,
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
