import React, { useState } from 'react';
import { Text, View, ImageBackground, TextInput, Image, TouchableOpacity } from 'react-native';
import Loading from '../../utils/Loading';

// Imports the documents styling.
import { loginStyles } from './Styles';

// Imports authentication and firestore from firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function Welcome({ navigation }) {
    // REFERENCE ACCESSED 13/12/2021 https://www.freecodecamp.org/news/react-native-firebase-tutorial/
    // Used to integrate firebase authentication into the application to create and sign into an account.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onLoginPress = () => {
        setLoading(true);
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
                        setLoading(false);
                        navigation.navigate('HomeScreen');
                    })
                    .catch(error => {
                        setLoading(false);
                        alert(error);
                    });
            })
            .catch(error => {
                setLoading(false);
                alert(error);
            });
    };
    // END REFERENCE

    if (loading) {
        return (
            <Loading loading={loading} />
        );
    } else {
        return (
            <ImageBackground source={require('../../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
                <View style={loginStyles.header}>
                    <Text style={loginStyles.mainTitle}>Welcome to LifeTree</Text>
                    <Text>Log into your account below:</Text>
                </View>
                <View style={loginStyles.contentContainer}>
                    <Image style={loginStyles.logo} source={require('../../../resources/img/faces/happy.png')} />

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
                        placeholder='enter your password...'
                        placeholderTextColor='#aaaaaa'
                        onChangeText={(textPass) => setPassword(textPass)}
                        value={password}
                        autoCapitalize='none'
                    />

                    <TouchableOpacity
                        style={loginStyles.loginBTN}
                        onPress={() => onLoginPress()}>
                        <Text style={loginStyles.loginText}> Log In </Text>
                    </TouchableOpacity>

                    <View style={loginStyles.footer}>
                        <Text style={loginStyles.createAnAccountText} >Don&apos;t have an account yet?<Text onPress={() => navigation.navigate('CreateAccount')} style={loginStyles.createAccountLink}> Sign up</Text> </Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
