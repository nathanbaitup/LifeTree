import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';

// Imports the documents styling.
import { listStyles } from './Styles';

// Imports firestore from firebase to save user entries to the firstore database.
import firestore from '@react-native-firebase/firestore';

// Imports the View Single Entry component so when an entry is pressed the user is able to view the entry.
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

    // Makes a reference to load the journal list collection from firestore.
    const journalsRef = firestore().collection('journalList');
    // Gets the users ID from props passed in from App.js.
    const userID = props.extraData.id;

    // Selects all journal entries where the user ID matches the authorID and sorts the list by newest date first.
    useEffect(() => {
        journalsRef
            .where('authorID', '==', userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newJournals = [];
                    querySnapshot.forEach((doc) => {
                        const journal = doc.data();
                        journal.id = doc.id;
                        newJournals.push(journal);
                    });
                    setAllEntries(newJournals);
                },
                error => {
                    alert(error);
                }
            );
    }, []);

    // REFERENCE ACCESSED 07/12/2021 https://stackoverflow.com/a/55949691
    // Used to allow the user to search for journal entires based on the date for easier viewing.
    const search = (searchText) => {
        setSearchText(searchText);
        const filteredEntries = allEntries.filter(function (item) {
            // Returns either all entries with the same month or same mood searched for by the user.
            return item.dateOfEntry.includes(searchText) || item.moodSelected.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredEntries(filteredEntries);
    };
    // END REFERENCE

    // Sets the selectedID back to null when returning from the ViewSingleEntry page.
    const unsetCurrentEntry = () => {
        setSelectedID(null);
    };

    // Checks if the selectedID has been set and if so, displays the ViewSingleEntry page to view a users entry.
    if (selectedID) {
        return (
            <View>
                <ViewSingleEntry {...props} extraData={userID} currentEntryID={selectedID} onBack={unsetCurrentEntry} />

            </View>
        );
    }

    return (
        // Sets the background image to half opacity.
        <ImageBackground source={require('../../../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >
            <SearchBar
                round={true}
                lightTheme={true}
                placeholder='Search by Date or Mood...'
                autoCapitalize='none'
                onChangeText={search}
                value={searchText} />

            <View style={listStyles.contentContainer}>
                <FlatList
                    // REFERENCE ACCESSED 07/12/2021 https://stackoverflow.com/a/55949691
                    // Used to allow the user to search for journal entires based on the date for easier viewing.
                    data={filteredEntries && filteredEntries.length > 0 ? filteredEntries : allEntries}
                    keyExtractor={(item) => item.id}
                    // END REFERENCE
                    renderItem={({ item }) => <TouchableOpacity style={listStyles.listView} onPress={() => setSelectedID(item.createdAt)}>
                        <Text style={listStyles.entryDate}>{item.dateOfEntry}</Text>
                        <Text style={listStyles.entryDesc} numberOfLines={2} >{item.journalText}</Text>
                        {/* Uses arrayed styles to set default styling and to set the colour of the text based on the mood. */}
                        <Text style={[listStyles.entryMood, { color: item.moodSelected === 'Happy' ? '#108206' : item.moodSelected === 'Meh' ? '#e38e07' : item.moodSelected === 'Sad' ? '#112dec' : '#f90505' }]}>Your mood: {item.moodSelected} </Text>
                    </TouchableOpacity>
                    } />
            </View>
        </ImageBackground>
    );
}
