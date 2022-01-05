import React from 'react';
import { ImageBackground } from 'react-native';

// Imports activity spinner to indicate application is loading
import Spinner from 'react-native-loading-spinner-overlay';

// REFERENCE ACCESSED 04/01/2022 https://github.com/joinspontaneous/react-native-loading-spinner-overlay/blob/master/example/App.js
// Used for loading spinner when the application is loading from state or firebase.
export default function Loading(props) {
    const loading = props.loading;
    return (
        <ImageBackground source={require('../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={{color: '#FFFFFF'}} />
        </ImageBackground>
    );
}
// END REFERENCE
