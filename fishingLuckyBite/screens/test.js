import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const CustomBarChart = ({data}) => {
  return (
    <View style={styles.chartContainer}>
      {/* Labels for hours */}
      <View style={styles.labelContainer}>
        {[...Array(24)].map((_, index) => (
          <Text key={index} style={styles.label}>
            {index + 1}
          </Text>
        ))}
      </View>
      {/* Bars for fish catch */}
      <View style={styles.barsContainer}>
        {data.map((fishCount, index) => (
          <View key={index} style={[styles.bar, {height: fishCount * 30}]} />
        ))}
      </View>
      {/* Labels for fish count */}
      <View style={styles.fishCountLabels}>
        {[...Array(10)].map((_, index) => (
          <Text key={index} style={styles.label}>
            {index + 1}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  label: {
    fontSize: 12,
    color: 'gray',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '80%',
  },
  bar: {
    width: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  fishCountLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '10%',
  },
});

export default CustomBarChart;
