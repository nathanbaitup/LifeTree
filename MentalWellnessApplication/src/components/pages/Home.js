import React, { Component } from 'react';
import { Button, Text, View, Image, Dimensions, StyleSheet } from 'react-native';

export default class Home extends Component {

    state = {
        title: 'Good Day, User!', // Added to the state as it can be updated later.
        daysUsed: 1,
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}> {this.state.title} </Text>
                
                <View style={styles.imageFrame}>
                    <Image source={{uri: 'https://i.dlpng.com/static/png/7497427_preview.png'}}  style={styles.image}/>
                    {/* Not needed for MVP, placeholder template for Quotes API. */}
                    <Text style = {styles.inspireQuote}>Anything is possible to those who believe. {'\n'} Mark: 9:23</Text>

                    <Text style={styles.daysUsed}> Days Used: {this.state.daysUsed}</Text>
                    <Button uppercase={false} style={styles.detailsBTN} accessibilityLabel='Find out more about how many used days affects the application' title="Find Out More" />
                </View>
            </View>
        ); 
    }
}

// used to ensure that the image of the tree will be at the correct location depending on the height of the device being used.
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        justifyContent: 'center', 
    },

    title: {
        paddingTop: 5,
        paddingLeft: 5,
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'flex-start',
    },
    image: {
        alignSelf: 'center',
        width: '50%',
        height: 200,
    },

    imageFrame: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (height/5)
    },
    inspireQuote: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingTop: 10,
        color: '#7a7a7a',
    },

    daysUsed: {
        fontSize: 18,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingTop: 15,
        //color: '#7a7a7a',
    },
    detailsBTN: {
        paddingTop: 5,
        textTransform: 'lowercase',
    },
    detailsInfo: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingTop: 15,
        //color: '#7a7a7a',
    },
    
        
});
