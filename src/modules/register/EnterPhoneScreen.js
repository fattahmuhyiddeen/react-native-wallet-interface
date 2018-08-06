import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import Button from "../common/Button";
// import AvatarImage from "common/AvatarImage";
import NavBar from "../common/Header";

const tickImg = require("./tick.png");
const untickImg = require("./untick.png");

export default class EnterPhoneScreen extends Component {
  state = {
    phone: "a",
    countryCode: "a",
    isAgree: false
  };
  render() {
    const { store } = this.props;
    const { state } = store;
    const { themeColor } = state;
    const { phone, countryCode, isAgree } = this.state;
    const isFilled = phone != "" && countryCode != "" && isAgree;
    return (
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <NavBar
            title="COMPLETE REGISTRATION"
            type="dark"
            store={store}
            // onRightIconPressed={() => goToFromTab(2, "Options")}
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingTop: 10 }}
        >
          <View style={{ padding: 20 }}>
            <Text style={{ color: "grey" }}>
              Just enter your registered local mobile number, we'll send you the
              secret code. Easy-peasy.
            </Text>

            <TouchableOpacity
              onPress={() => this.setState({ isAgree: !isAgree })}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20
              }}
            >
              <Image
                source={isAgree ? tickImg : untickImg}
                style={{
                  tintColor: isAgree ? "green" : "grey",
                  width: 20,
                  height: 20,
                  marginRight: 10
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: isAgree ? "green" : "grey"
                }}
              >
                I agree with the terms and conditions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                isFilled ? styles.buttonFill : styles.buttonOutline
              ]}
            >
              <Text style={{ color: isFilled ? "white" : "orange" }}>
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
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
  button: {
    borderRadius: 20,
    padding: 10,
    alignItems: "center"
  },
  buttonOutline: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "orange"
  },
  buttonFill: {
    backgroundColor: "orange"
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
