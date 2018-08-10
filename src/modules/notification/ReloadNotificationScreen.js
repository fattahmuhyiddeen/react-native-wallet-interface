import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../common/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { color: 'black', fontWeight: 'bold', fontSize: 20 },
  subtitle: { color: 'grey' },
  amount: { color: 'black', fontWeight: 'bold', fontSize: 30 },
  message: { color: 'grey', marginTop: 20, marginBottom: 10 },
});

const successImg = require('./success.png');
const failImg = require('./fail.png');

export default ({ store, scenario, amount }) => {
  const { navigation } = store;
  let message = '';
  let title = 'Hooray!';
  let image = successImg;
  if (scenario === 'first_success') {
    message = 'Yay! You have enough cash now.\nHead over to enjoy wifi@unifi';
  } else if (scenario === 'success') {
    message =
      'You\'re in good hands! You\'ve got sufficient cash to enjoy wifi@unifi';
  } else {
    // } else if (scenario === 'fail') {
    message = 'Your transaction failed. Let\'s try again, shall we?';
    image = failImg;
    title = 'Oh No..';
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={image}
        resizeMode="contain"
        style={{ height: 120, width: 120 }}
      />
      <Text style={styles.subtitle}>Your current balance is</Text>
      <Text style={styles.amount}>{`${
        store.state.currency
      } ${store.select.balance() + amount}`}</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={{ padding: 20 }}>
        <Button label="Let's go" onPress={navigation.goBack} />
      </View>
    </View>
  );
};
