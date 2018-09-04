import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: '#ff6600',
    height: 40,
    width: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ff6600',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ({ type = 'error' }) => (
  <View style={styles.container}>
    <Text style={styles.text}>!</Text>
  </View>
);
