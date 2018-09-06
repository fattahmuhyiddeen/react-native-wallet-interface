import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import NavBar from "../common/Header";
import AvatarImage from "./AvatarImage";

const tickImg = require("./tick.png");
const untickImg = require("./untick.png");
const hpImg = require("./hp.png");

export default class EnterPhoneScreen extends Component {
  state = {
    phone: __DEV__ ? "12423489" : "",
    countryCode: "60",
    isAgree: __DEV__
  };

  buttonPressed = () => {
    const { store } = this.props;
    const { countryCode, phone } = this.state;
    store.action.callApi("post", "walletRegister", {
      contact_number: countryCode + phone,
      full_name: store.state.profile.full_name
    });
    // store.navigation.navigate("EnterTac");
  };
  render() {
    const { store } = this.props;
    const { state } = store;
    const { themeColor, profile } = state;
    const { phone, countryCode, isAgree } = this.state;
    const isFilled = phone != "" && countryCode != "" && isAgree;
    return (
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <NavBar
            title="COMPLETE REGISTRATION"
            type="dark"
            store={store}
            onLeftIconPressed={store.navigation.goBack}

            // onRightIconPressed={() => goToFromTab(2, "Options")}
          />
        </View>
        {!state.isKeyboardAppear && (
          <View
            style={{
              position: "absolute",
              // left: 0,
              // right: 0,
              height: 100,
              top: 100,
              alignSelf: "center"
            }}
          >
            <AvatarImage />
            <Text
              style={{ fontSize: 17, fontWeight: "bold", textAlign: "center" }}
            >
              {profile.full_name}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.scrollView,
            { marginTop: state.isKeyboardAppear ? 30 : 140 }
          ]}
        >
          <View style={{ padding: 20 }}>
            <Text style={{ color: "grey", marginVertical: 10 }}>
              Just enter your registered local mobile number, we'll send you the
              secret code. Easy-peasy.
            </Text>

            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={styles.countryCodeGroup}>
                <Image
                  source={hpImg}
                  resizeMode="contain"
                  style={{ height: 20, width: 20, marginRight: 7 }}
                />
                <TextInput
                  value={"+" + countryCode}
                  maxLength={3}
                  placeholder="60"
                  // editable={false}
                  style={[styles.textInput, { flex: 2 }]}
                  keyboardType="phone-pad"
                  onChangeText={countryCode => this.setState({ countryCode })}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={{ flex: 4, padding: 5 }}>
                <TextInput
                  value={phone}
                  maxLength={9}
                  placeholder="e.g. : 1110001000"
                  // autoFocus
                  style={styles.textInput}
                  keyboardType="phone-pad"
                  onChangeText={phone => this.setState({ phone })}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>

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
              activeOpacity={isFilled ? 0.5 : 1}
              style={[
                styles.button,
                isFilled ? styles.buttonFill : styles.buttonOutline
              ]}
              onPress={isFilled ? this.buttonPressed : null}
            >
              <Text style={{ color: isFilled ? "white" : "orange" }}>
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  countryCodeGroup: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1
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
