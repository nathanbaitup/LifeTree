
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
// The styling for the page.
import { hrStyles } from './Styles';
// Imports the Chart Kit library.
import { LineChart } from 'react-native-chart-kit';

export default function HRGraph(props) {
    const heartRateListData = props.heartRateList;
    // Used to set data points on graph.
    const allTimes = [];
    const allHeartRates = [];
    
    // Returns the time in a nice format to display
    const displayStartTime = (startTime) => {
        const time = startTime.split('T')[1].split(':');
        return time[0] + ':' + time[1];
    };

    // Initialises the arrays to be used for the graph.
    for (let i = 0; i < heartRateListData.length; i++) {
        const endDate = heartRateListData[i].startDate;  
        allTimes.push(displayStartTime(endDate));
        allHeartRates.push(parseInt(heartRateListData[i].quantity, 10));
    }

    // REFERENCE ACCESSED 04/01/2022 https://www.npmjs.com/package/react-native-chart-kit
    // Used to install and use the chart kit library.

    // Configures the data to be displayed on the graph.
    const data = {
        labels: allTimes,
        datasets: [
            {
                data: allHeartRates,
                color: (opacity = 1) => `rgba(255, 50, 56, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ['BPM'] // optional
    };
    // Configures the styling of the graph.
    const chartConfig = {
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#ebedf0',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
    };

    return (
        <View style={hrStyles.contentContainer}>
            {allTimes.length === 0 && allHeartRates.length === 0 ? (
                <Text style={hrStyles.headerText}>No data to display in graph</Text>
            ) : (
                <View>
                    <Text style={hrStyles.headerText}>Your Heart Rates for the day: </Text>
                    <LineChart
                        data={data}
                        width={Dimensions.get('window').width - 60} // from react-native
                        height={200}
                        yAxisSuffix=' bpm'
                        xAxisSuffix='Time:'
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={chartConfig}
                        bezier
                        style={{
                            borderRadius: 16
                        }}
                    />
                </View>
            )}
        </View>
    );
}
// END REFERENCE

