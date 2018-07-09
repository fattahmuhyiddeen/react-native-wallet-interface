import React, { Component } from "react";
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import PropTypes from "prop-types";

import Header from "../common/Header";

class Reload extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title="Add Money" type="dark" />
        <TouchableOpacity
          onPress={() => this.props.store.navigation.navigate("About")}
        >
          <TextInput />
          <Text>Add Cash now</Text>
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
