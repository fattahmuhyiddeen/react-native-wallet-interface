import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity
} from "react-native";
import CodeInput from "react-native-confirmation-code-input";
import PropTypes from "prop-types";
import Button from "../common/Button";
// import AvatarImage from "common/AvatarImage";
import NavBar from "../common/Header";

export default class EnterTacScreen extends Component {
  state = {
    tac: "",
    modal: ""
  };

  resendCode = this.props.store.navigation.goBack;
  closeModal = () => this.setState({ modal: "" });
  render() {
    const { store } = this.props;
    const { state } = store;
    const { themeColor } = state;
    const isFilled = this.state.tac != "";
    return (
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <NavBar
            title={"VERIFICATION\nCODE"}
            type="dark"
            store={store}
            // onRightIconPressed={() => goToFromTab(2, "Options")}
          />
        </View>

        <View style={styles.scrollView}>
          <View style={{ padding: 20, paddingTop: 50 }}>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
              Verification Code
            </Text>
            <Text style={{ color: "grey", marginTop: 10 }}>
              Check your sms and type here the secret code we sent to you.
            </Text>

            <View style={{ alignItems: "center" }}>
              <CodeInput
                ref={ref => {
                  this.codeInput = ref;
                }}
                keyboardType="numeric"
                className={"border-b"}
                codeLength={6}
                space={5}
                size={40}
                codeInputStyle={{ color: "black" }}
                activeColor={"#000"}
                inactiveColor={"#bbb"}
                inputPosition="left"
                onFulfill={tac => this.setState({ tac })}
                // onUnfulfill={this.disableVerify}
              />
            </View>

            <View
              style={{ width: "100%", alignItems: "center", marginTop: 70 }}
            >
              <TouchableOpacity onPress={this.resendCode}>
                <Text style={{ color: "grey" }}>Resend Code</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={isFilled ? 0.5 : 1}
              style={[
                styles.button,
                isFilled ? styles.buttonFill : styles.buttonOutline
              ]}
              onPress={isFilled ? () => alert("a") : null}
            >
              <Text style={{ color: isFilled ? "white" : "orange" }}>
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal transparent visible={this.state.modal != ""}>
          <View style={styles.modalBG}>
            <View style={styles.modalBody}>
              <Text>Yikes</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonFill, { width: 250 }]}
                onPress={this.closeModal}
              >
                <Text style={{ color: "white" }}>OKAY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  modalBG: {
    backgroundColor: "#00000077",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalBody: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  button: {
    marginTop: 60,
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
  }
});
