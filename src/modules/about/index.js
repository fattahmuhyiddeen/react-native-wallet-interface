import React, { Component } from "react";
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from "react-native";
import PropTypes from "prop-types";

import Header from "../common/Header";

class Reload extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title="About" type="dark" />
        <TouchableOpacity onPress={() => this.props.store.navigation.goBack()}>
          <Text>Wallet Module</Text>
          <Text>This module is created by fattah</Text>
          <Text style={{ textDecorationLine: "underline" }}>
            fattahmuhyiddeen@gmail.com
          </Text>
          <Text style={{ textDecorationLine: "underline" }}>
            https://github.com/fattahmuhyiddeen
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  }
});

Reload.propTypes = {};

Reload.defaultProps = {};
export default Reload;
