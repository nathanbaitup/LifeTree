import { StyleSheet } from 'react-native';

export const journalStyles = StyleSheet.create({
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingTop: 20,
        color: '#000000'
    },
    keyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        color: '#000000',
        textAlign: 'center'
    },
    keyIndiv: {
        paddingLeft: 10,
        padding: 5,
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000000',
    },
    keyBackground: {
        borderRadius: 7,
        width: 30,
        height: 30,
    },
    keyIndivContainer: {
        flexDirection: 'row',
        height: 40,
    },
    keyContainer: {
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,

    },
    keyContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

