import React  from 'react';
import { Text, View, Button, ImageBackground, StyleSheet } from 'react-native';

export default function Welcome({navigation}) {
    return (
        <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <View style={styles.header}>
                <Text style={styles.mainTitle}>Welcome to LifeTree </Text>
                <Text>What would you like to do?</Text>
            </View>
            <View style={styles.contentContainer}>
                <Button title="Login" />
                <Button title="Sign Up" />
                <Button title="Continue as Guest" onPress={() => navigation.navigate('Home')} />
            </View>
        </ImageBackground >
    );
}


const styles = StyleSheet.create({

    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    mainTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },
});
