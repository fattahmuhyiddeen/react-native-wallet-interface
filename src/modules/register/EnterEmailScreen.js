import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import Button from "../common/Button";
// import AvatarImage from "common/AvatarImage";
import NavBar from "../common/Header";

export default class ProfileIndex extends Component {
  render() {
    const { store } = this.props;
    const { state } = store;
    const { themeColor } = state;
    return (
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <NavBar
            title="PROFILE"
            type="dark"
            store={store}
            // onRightIconPressed={() => goToFromTab(2, "Options")}
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingTop: 10 }}
        >
          <View />
        </ScrollView>
        <View style={styles.subheader}>
          {/* <AvatarImage
              style={styles.avatar}
              source={hasInternet ? user.avatar : null}
            /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },

  scrollView: {
    marginTop: 70,
    flex: 0.8
  },
  header: {
    paddingBottom: 60
    // borderBottomWidth: 4
    // borderBottomColor: Colors.primary
  },
  subheader: {
    position: "absolute",
    top: 65,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "white"
  }
});
