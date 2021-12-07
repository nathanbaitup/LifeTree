import React, { Component } from 'react';
import { Text, View, ImageBackground, Dimensions, FlatList, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class EntriesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //currently used as test data, will be removed and replaced with data taken from database.
            allEntries: [],
            searchText: '',
            filteredData: [],
        };

        this.arrayHolder = [];
    }

    componentDidMount() {
        let allEntries = [
            { key: '0', date: 'Jan', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar sollicitudin hendrerit. Donec a dolor lacus. Fusce feugiat velit vitae odio pretium ultricies. Proin sollicitudin nulla in ornare ullamcorper. In ut eros eget nisl placerat placerat sit amet sit amet nibh. Morbi porta fringilla metus, quis tincidunt augue lacinia ac. Quisque ornare velit imperdiet dictum fringilla. Donec in turpis ligula. Vestibulum et porta leo. Nulla molestie elit quam, in ornare neque malesuada ac. Curabitur aliquam in massa quis mattis. Aliquam sit amet est id ipsum pretium eleifend a id sem. Nam congue nisl ipsum, id ullamcorper eros elementum sed. ', mood: 'happy' },
            { key: '1', date: 'Jan', description: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah', mood: 'happy' },
            { key: '2', date: 'Jan', description: 'blah blah', mood: 'happy' },
            { key: '3', date: 'Jun', description: 'blah blah', mood: 'meh' },
            { key: '4', date: 'Aug', description: 'blah blah', mood: 'happy' },
            { key: '5', date: 'Aug', description: 'blah blah', mood: 'angry' },
            { key: '6', date: 'Sep', description: 'blah blah', mood: 'happy' },
            { key: '7', date: 'May', description: 'blah blah', mood: 'meh' },
            { key: '8', date: 'Jul', description: 'blah blah', mood: 'happy' },
            { key: '9', date: 'Mar', description: 'blah blah', mood: 'sad' },
        ];
        this.setState({ allEntries: allEntries });
    }


    // REFERENCE ACCESSED 07/12/2021 https://stackoverflow.com/a/55949691
    // Used to allow the user to search for journal entires based on the date for easier viewing.
    search = (searchText) => {
        this.setState({ searchText: searchText });
        let filteredData = this.state.allEntries.filter(function (item) {
            return item.date.includes(searchText) || item.mood.includes(searchText);
        });

        this.setState({ filteredData: filteredData });
    };
    // END REFERENCE



    render() {
        return (
            <ImageBackground source={require('../resources/img/background.png')} style={{ width: '100%', height: '100%', opacity: 50 }} >

                <View style={styles.mainContainer}>
                    
                    <SearchBar round={true}
                        lightTheme={true}
                        placeholder='Search by Date or Mood...'
                        autoCapitalize='none'
                        onChangeText={this.search}
                        value={this.state.searchText} />

                    <View style={styles.contentContainer}>
                        <FlatList
                            // REFERENCE ACCESSED 07/12/2021 https://stackoverflow.com/a/55949691
                            // Used to allow the user to search for journal entires based on the date for easier viewing.
                            data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.allEntries}
                            keyExtractor={(item) => `item-${item.key}`}
                            // END REFERENCE
                            renderItem={({ item }) => <View style={styles.listView}>
                                <Text style={styles.entryDate}>{item.date}</Text>
                                <Text style={styles.entryDesc} numberOfLines = {2} >{item.description}</Text>
                                <Text style={styles.entryMood}> What</Text>
                            </View>}

                        />

                    </View>
                </View>
            </ImageBackground>
        );
    }
}

// Function used to store width of device being used for responsive design on the homescreen.
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    filterBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        padding: 15,
    },
    filter: {
        marginLeft: width / 1.6,
    },
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
});
