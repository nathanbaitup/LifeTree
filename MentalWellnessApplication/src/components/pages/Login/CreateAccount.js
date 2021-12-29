import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';

// Imports the documents styling.
import { loginStyles } from './Styles';

// Imports auth and firestore from the firebase console.
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function CreateAccount({ navigation }) {

    // REFERENCE ACCESSED 13/12/2021 https://www.freecodecamp.org/news/react-native-firebase-tutorial/
    // Used to integrate firebase authentication into the application to create and sign into an account.
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onRegisterPress = () => {
        // Checks if password and confirm password are matching
        if (password !== confirmPassword) {
            alert('Please check your passwords are entered correctly as they dont match.');
            return;
        }
        // Calls the createUserWithEmailAndPassword API from Auth to create a new account in the Firebase Console.
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                // If account creation is successful, the user data is stored to Firestore (database)
                // to allow all data related to the account creation to be stored.
                // If data is successfully stored to Firestore, then the user is returned to the homescreen. 
                const usersRef = firestore().collection('users');
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('HomeScreen', { user: data });
                    })
                    .catch((error) => {
                        alert('Error: ' + error);
                    });
            })
            .catch((error) => {
                alert('Error: ' + error);
            });
    };
    // END REFERENCE


    return (
        <ImageBackground source={require('../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <View style={loginStyles.header}>
                <Text style={loginStyles.mainTitle}>Welcome to LifeTree </Text>
                <Text>Register for an account below:</Text>
            </View>
            <View style={loginStyles.contentContainer}>
                <Image style={loginStyles.logo} source={require('../../resources/img/faces/happy.png')} />

                <TextInput
                    style={loginStyles.textInput}
                    placeholder='enter your full name...'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(textName) => setFullName(textName)}
                    value={fullName}
                    autoCapitalize='none'
                />

                <TextInput
                    style={loginStyles.textInput}
                    placeholder='enter your email address...'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(textEmail) => setEmail(textEmail)}
                    value={email}
                    autoCapitalize='none'
                />

                <TextInput
                    style={loginStyles.textInput}
                    secureTextEntry
                    placeholder='enter a password...'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(textPass) => setPassword(textPass)}
                    value={password}
                    autoCapitalize='none'
                />

                <TextInput
                    style={loginStyles.textInput}
                    secureTextEntry
                    placeholder='confirm your password...'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(textPass) => setConfirmPassword(textPass)}
                    value={confirmPassword}
                    autoCapitalize='none'
                />

                <TouchableOpacity
                    style={loginStyles.loginBTN}
                    onPress={() => onRegisterPress()}>
                    <Text style={loginStyles.loginText}> Create Account </Text>
                </TouchableOpacity>

                <View style={loginStyles.footer}>
                    <Text style={loginStyles.createAnAccountText} > Already have an account? <Text onPress={() => navigation.navigate('Welcome')} style={loginStyles.createAccountLink}> Log In</Text> </Text>
                </View>
            </View>
        </ImageBackground>
    );
}
