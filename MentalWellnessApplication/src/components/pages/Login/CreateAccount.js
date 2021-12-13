import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';

export default function CreateAccount({ navigation }) {

    // REFERENCE ACCESSED 13/12/2021 https://www.freecodecamp.org/news/react-native-firebase-tutorial/
    // Used to integrate firebase authentication into the application to create and sign into an account.
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onRegisterPress = () => {

    };
    // END REFERENCE


    return (
        <ImageBackground source={require('../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <View style={styles.header}>
                <Text style={styles.mainTitle}>Welcome to LifeTree </Text>
                <Text>Register for an account below:</Text>
            </View>
            <View style={styles.contentContainer}>
                <Image style={styles.logo} source={require('../../resources/img/faces/happy.png')} />

                <TextInput
                    style={styles.textInput}
                    placeholder='enter your full name...'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(textName) => setFullName(textName)}
                    value={fullName}
                    autoCapitalize='none'
                />

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
                    placeholder='enter a password...'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(textPass) => setPassword(textPass)}
                    value={password}
                    autoCapitalize='none'
                />

                <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    placeholder='confirm your password...'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(textPass) => setConfirmPassword(textPass)}
                    value={confirmPassword}
                    autoCapitalize='none'
                />

                <TouchableOpacity
                    style={styles.loginBTN}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.loginText}> Create Account </Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.createAnAccountText} > Already have an account? <Text onPress={() => navigation.navigate('Welcome')} style={styles.createAccountLink}> Log In</Text> </Text>
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