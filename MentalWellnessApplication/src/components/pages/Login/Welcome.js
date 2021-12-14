import React, { useState } from 'react';
import { Text, View, ImageBackground, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Imports authentication and firestore from firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function Welcome({ navigation }) {
    // REFERENCE ACCESSED 13/12/2021 https://www.freecodecamp.org/news/react-native-firebase-tutorial/
    // Used to integrate firebase authentication into the application to create and sign into an account.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLoginPress = () => {
        // Calls the signInWithEmailAndPassword API from Auth to take the email and password entered and check if the user exists.
        // If successful, the user data is stored to the variable 'user' to be parsed through the application and the user
        // is signed in and taken to the home page.
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                const usersRef = firestore().collection('users');
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert('User does not exist. Please check your credentials.');
                            return;
                        }
                        const user = firestoreDocument.data();
                        navigation.navigate('HomeScreen', {user});
                    })
                    .catch(error => {
                        alert('Error: ' + error);
                    });
            })
            .catch(error => {
                alert('Error: ' + error);
            });
    };
    // END REFERENCE

    return (
        <ImageBackground source={require('../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <View style={styles.header}>
                <Text style={styles.mainTitle}>Welcome to LifeTree </Text>
                <Text>Log into your account below:</Text>
            </View>
            <View style={styles.contentContainer}>
                <Image style={styles.logo} source={require('../../resources/img/faces/happy.png')} />

                <TextInput
                    style={styles.textInput}
                    placeholder='enter your email address...'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(textEmail) => setEmail(textEmail)}
                    value={email}
                    autoCapitalize='none'
                />

                <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    placeholder='enter your password...'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(textPass) => setPassword(textPass)}
                    value={password}
                    autoCapitalize='none'
                />

                <TouchableOpacity
                    style={styles.loginBTN}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.loginText}> Log In </Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.createAnAccountText} > Don&apos;t have an account yet? <Text onPress={() => navigation.navigate('CreateAccount')} style={styles.createAccountLink}> Sign up</Text> </Text>
                </View>
            </View>
        </ImageBackground>
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
        justifyContent: 'center',
    },
    logo: {
        marginTop: 20,
        marginBottom: 10,
        height: 100,
        width: 134,
        alignSelf: 'center',
    },
    textInput: {
        height: 50,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f0efed',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
    },
    loginBTN: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00e676',
        borderRadius: 15,
        width: 150,
        alignSelf: 'center',
        marginTop: 20,
    },
    loginText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000000',
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    createAnAccountText: {
        fontSize: 16,
    },
    createAccountLink: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6db8bf',
    }
});
