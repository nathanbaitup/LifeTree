import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text> Mental Wellness App </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 50,
    },
})
