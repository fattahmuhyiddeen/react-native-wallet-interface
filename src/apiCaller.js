import React, { Component } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import globalState from "./state";

const endPoints = {
  checkBalance: "cls/wallet/get-balance",
  paymentLink: "cls/wifi/payment/create_link",
  walletRegister: "ums/wallet/register",
  verifyTac: "ums/wallet/verify-tac",
  resendTac: "ums/wallet/resend-tac",
  getProfile: "ums/user/profile"
};

class ApiCaller extends Component {
  response = (url, isSuccess, data) => {
    // alert(JSON.stringify(data));
    data = isSuccess ? data.response : data.error_message;
    const { action, navigation } = this.props.store;
    const { navigate, goBack } = navigation;

    const { setBalance } = action;
    switch (url) {
      case "checkBalance":
        if (isSuccess) {
          setBalance(data.balance);
          action.set("hasWallet", true);
        } else {
          action.set("hasWallet", false);
          // alert("Fail to retrieve balance");
        }
        break;

      case "paymentLink":
        if (isSuccess) {
          // alert(data.url);
          navigate("WebView", { url: data.url, title: "Reload" });
        } else {
          alert("Fail to reload");
        }
        break;

      case "walletRegister":
        if (isSuccess) {
          alert("succes");
          navigate("EnterTac");
        } else {
          alert("Fail to call tac");
        }
        break;

      case "verifyTac":
        if (isSuccess) {
          // alert(JSON.stringify(data));
          // alert("succes");
        } else {
          alert("Fail to verify tac");
        }
        break;

      case "resendTac":
        if (isSuccess) {
          // alert(JSON.stringify(data));
          alert("New TAC code has been successfully generated");
        } else {
          alert("Fail to resend tac");
        }
        break;
      case "getProfile":
        if (isSuccess) {
          // alert(JSON.stringify(data));
          action.set(
            "hasWallet",
            typeof data.wallet_id != "undefined" && data.wallet_id != null
          );
        } else {
          alert("Fail to get profile");
        }
        break;
    }
  };

  callApi = (method, route, body = {}) => {
    url = route;
    if (endPoints[url] != null) {
      body = { ...body, channel: Platform.OS.toUpperCase() };
      url = this.props.store.state.baseApiURL + "/" + endPoints[url];
    }

    console.log("url :" + url);
    console.log("method :" + method);
    console.log("params :");
    console.log(body);

    const request = new XMLHttpRequest();
    request.setRequestHeader;
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        this.response(url, false, {});
        return;
      }
      const data = JSON.parse(request.responseText);
      console.log(`response for api ${url}:`);
      console.log(data);

      // alert(request.responseText);
      if (request.status === 401) {
        this.response(route, false, data);
        this.props.store.action.onSessionExpired();
        return;
      }

      const isSuccess = request.status == 200 && data.code == 200;
      this.response(route, isSuccess, data);
    };

    request.open(method.toUpperCase(), url);
    request.setRequestHeader("Authorization", `Bearer ${globalState.token}`);
    request.setRequestHeader("Content-Type", `application/json`);
    request.setRequestHeader("Accept", `application/json`);
    request.send(JSON.stringify(body));
  };
  render() {
    return null;
  }
}

ApiCaller.propTypes = {};

ApiCaller.defaultProps = {};
export default ApiCaller;
