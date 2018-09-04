import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const defaultProfileImage = require('./avatar-0.jpg');
const styles = StyleSheet.create({
  bgImg: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ({ source = null, style = null }) => (
  <View style={styles.bgImg}>
    <Image
      resizeMode="contain"
      source={source ? { uri: source } : defaultProfileImage}
      style={[styles.img, style]}
    />
  </View>
);
