import React from 'react';
import { ImageBackground } from 'react-native';

// Imports activity spinner to indicate application is loading
import Spinner from 'react-native-loading-spinner-overlay';

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
