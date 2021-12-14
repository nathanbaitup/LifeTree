import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Dimensions, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

import ViewSingleEntry from './ViewSingleEntry';

export default function EntriesList(props) {

    // All entries that are stored for a user.
    const [allEntries, setAllEntries] = useState([]);
    // The updated array that is displayed when a user does a search.
    const [filteredEntries, setFilteredEntries] = useState([]);
    // Will store the user-provided search term to filter through the journal lists and return results that contain the search term.
    const [searchText, setSearchText] = useState('');
    // Remembers the selected ID to load more data about the entry.
    const [selectedID, setSelectedID] = useState(null);

    // When the component is loaded on the users device, it sets the state to all entries that the user has stored.
    // TODO: This will be updated from hardcoded data to data that is stored in firebase cloud database.
    useEffect(() => {
        // let allEntries = [
        //     { key: '0', date: 'Jan', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar sollicitudin hendrerit. Donec a dolor lacus. Fusce feugiat velit vitae odio pretium ultricies. Proin sollicitudin nulla in ornare ullamcorper. In ut eros eget nisl placerat placerat sit amet sit amet nibh. Morbi porta fringilla metus, quis tincidunt augue lacinia ac. Quisque ornare velit imperdiet dictum fringilla. Donec in turpis ligula. Vestibulum et porta leo. Nulla molestie elit quam, in ornare neque malesuada ac. Curabitur aliquam in massa quis mattis. Aliquam sit amet est id ipsum pretium eleifend a id sem. Nam congue nisl ipsum, id ullamcorper eros elementum sed. ', mood: 'happy' },
        //     { key: '1', date: 'Jan', description: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah', mood: 'happy' },
        //     { key: '2', date: 'Jan', description: 'blah blah', mood: 'happy' },
        //     { key: '3', date: 'Jun', description: 'blah blah', mood: 'meh' },
        //     { key: '4', date: 'Aug', description: 'blah blah', mood: 'happy' },
        //     { key: '5', date: 'Aug', description: 'blah blah', mood: 'angry' },
        //     { key: '6', date: 'Sep', description: 'blah blah', mood: 'happy' },
        //     { key: '7', date: 'May', description: 'blah blah', mood: 'meh' },
        //     { key: '8', date: 'Jul', description: 'blah blah', mood: 'happy' },
        //     { key: '9', date: 'Mar', description: 'blah blah', mood: 'sad' },
        // ];
        // setAllEntries(allEntries);
    });

    // REFERENCE ACCESSED 07/12/2021 https://stackoverflow.com/a/55949691
    // Used to allow the user to search for journal entires based on the date for easier viewing.
    const search = (searchText) => {
        setSearchText(searchText);
        const filteredEntries = allEntries.filter(function (item) {
            // Returns eihter all entries with the same month or same mood searched for by the user.
            // TODO: Change the date so that it is using D Month, Yr format ( 1 December , 2021).
            return item.date.includes(searchText) || item.mood.includes(searchText.toLowerCase());
        });
        setFilteredEntries(filteredEntries);
    };
    // END REFERENCE

    const unsetCurrentEntry = () => {
        setSelectedID(null);
    };

    const currentEntryID = () => {
        return selectedID;
    };



    if (selectedID) {
        return (
            <View>
                <ViewSingleEntry currentEntryID={currentEntryID()} onBack={unsetCurrentEntry} />

            </View>
        );
    }

    return (
        // Sets the background image to half opacity.
        <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >

            <SearchBar
                round={true}
                lightTheme={true}
                placeholder='Search by Date or Mood...'
                autoCapitalize='none'
                onChangeText={search}
                value={searchText} />

            <View style={styles.contentContainer}>
                <FlatList
                    // REFERENCE ACCESSED 07/12/2021 https://stackoverflow.com/a/55949691
                    // Used to allow the user to search for journal entires based on the date for easier viewing.
                    data={filteredEntries && filteredEntries.length > 0 ? filteredEntries : allEntries}
                    keyExtractor={(item) => `item-${item.key}`}
                    // END REFERENCE
                    renderItem={({ item }) => <TouchableOpacity style={styles.listView} onPress={() => this.setState({ selectedID: item.key })}>
                        <Text style={styles.entryDate}>{item.date}</Text>
                        <Text style={styles.entryDesc} numberOfLines={2} >{item.description}</Text>
                        {/* Uses arrayed styled to set default styling and to set the colour of the text based on the mood. */}
                        <Text style={[styles.entryMood, { color: item.mood === 'happy' ? '#108206' : item.mood === 'meh' ? '#e38e07' : item.mood === 'sad' ? '#112dec' : '#f90505' }]}>Your mood: {item.mood} </Text>
                    </TouchableOpacity>
                    } />
            </View>
        </ImageBackground>
    );
}


// Function used to store height of device being used for responsive design on the homescreen.
const height = Dimensions.get('window').height;

// The styling for the Entries List.
const styles = StyleSheet.create({
    contentContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        height: height / 1.45,
    },
    listView: {
        borderBottomWidth: 1,
        borderRadius: 0.5,
        borderColor: 'rgba(215, 210, 210, 0.4)',
    },
    entryDesc: {
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 14,
        height: 44,
        color: '#000000',
    },
    entryDate: {
        paddingTop: 8,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
    },
    entryMood: {
        paddingLeft: 10,
        paddingBottom: 5,
        fontSize: 14,
        textAlign: 'right',
    }
});
