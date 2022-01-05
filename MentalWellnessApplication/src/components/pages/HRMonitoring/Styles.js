import { Dimensions, StyleSheet } from 'react-native';

// Function used to store height of device being used for responsive design on the homescreen.
const width = Dimensions.get('window').width;

export const hrStyles = StyleSheet.create({
    contentContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        marginTop: 15,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },
    headerText: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
    },
    subHeaderText: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        fontSize: 14,
        color: '#000000',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    listHeading: {
        paddingTop: 8,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
    },
    listText: {
        fontWeight: 'normal',
        fontSize: 16,
        color: '#000000',
        marginTop: 8,
    },
    listView: {
        borderRadius: 0.5,
        borderColor: 'rgba(215, 210, 210, 0.4)',
        borderBottomWidth: 1,
        paddingBottom: 10,
        flexDirection: 'row',
        paddingTop: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#f57367',
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 2,
        justifyContent: 'center',
        height: 50,
        marginTop: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    textInput: {
        height: 100,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0efed',
        marginBottom: 10,
        marginTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
    },
    slider: {
        width: 200,
        height: 50,
        alignItems: 'center',
        alignSelf: 'center',
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#448aff',
        borderRadius: 30,
    },
    addHRContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    timeContainer: {
        alignSelf: 'flex-end',
        left: width / 4,
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#00e676',
        borderRadius: 10,
        justifyContent: 'center',
        height: 40,
    },
    timePicker: {
        right: 13,
    },
    addEntryButton: {
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#00e676',
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 2,
        justifyContent: 'center',
        height: 50,
        marginTop: 50,
        width: 150,
        alignSelf: 'center',
    }

});
