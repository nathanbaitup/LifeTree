import { StyleSheet } from 'react-native';

export const hrStyles = StyleSheet.create({
    contentContainer: {
        margin: 20,
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
        backgroundColor: 'red',
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
});
