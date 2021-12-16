import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Button, Image, ActivityIndicator, StyleSheet } from 'react-native';

import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';

export default function Settings(props) {

    // Parsing the logout function from App.js
    const logout = props.logout;

    const userID = props.extraData.id;

    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState(null);
    const [transferred, setTransferred] = useState(0);

    // REFERENCE ACCESSED 16/12/2021 https://www.instamobile.io/mobile-development/react-native-firebase-storage/
    // Used to be able to use the camera and image library of the device to capture / select an image to use for the profile picture of the user and save that image to storage in firebase.

    const takeImage = () => {
        // Sets how the image should be saved to firebase and the path to save it at.
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: '/images/userProfilePictures/'
            }
        };

        // Launch the camera for the device and if the image was taken, then set the image to the image uri.
        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                setImage(source);
            }
        });
    }

    const selectImage = () => {
        // Sets how the image should be saved to firebase and the path to save it at.
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: '/images/userProfilePictures/'
            }
        };

        // Launch the image library for the device and if the image was selected, then set the image to the image uri.
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                setImage(source);
            }
        });
    }

    // The uploadImage function, that sets the image uri and filename, then uploads the file to firebase storage,
    // and sets the image state back to null.
    const uploadImage = async () => {
        const { uri } = image;
        const filename = userID;
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        setUploading(true);
        setTransferred(0);

        const task = storage()
        .ref(filename)
        .putFile(uploadUri);

        task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });

        try {
            await task;
        } catch (error) {
            console.error(error);
        }
        setUploading(false);
        alert('Successfully uploaded image.');
        setImage(null);
    }

    return (
        <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <View style={styles.contentContainer}>
                <Text> Settings Page </Text>
                {image !== null ? (
                    <Image source={{ uri: image.uri }} style={styles.imageBox} />
                ) : null}
                <Button title='Take a profile picture' onPress={takeImage} />
                <Button title='Select a profile picture' onPress={selectImage} />

                <Button title='Upload Image' onPress={uploadImage} />
                <Button title='Logout' onPress={logout} />

            </View>
        </ImageBackground>
    );
}

// The styling for the settings page.
const styles = StyleSheet.create({
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
    },
    imageBox: {
        width: 300,
        height: 300,
        borderRadius: 150,
    },

});
