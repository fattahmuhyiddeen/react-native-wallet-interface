import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import NavBar from '../common/Header';

export default class History extends Component {
  render() {
    const { store } = this.props;
    let header = [];
    if (store != null) {
      const { navigation } = store;
      header = (
        <NavBar
          store={store}
          title="HISTORY"
          onLeftIconPressed={navigation.goBack}
          iconColor={'white'}
          type={'dark'}
        />
      );
    }

    return (
      <View style={styles.container}>
        <FlatList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
});
