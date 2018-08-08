import React, { Component } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import globalState from "./state";

const baseURL = "https://ifoundit.tcennoc.unifi.space/";
const endPoints = {
  checkBalance: "cls/wallet/get-balance",
  paymentLink: "cls/wifi/payment/create_link",
  walletRegister: "ums/wallet/register"
};

class ApiCaller extends Component {
  response = (url, isSuccess, data) => {
    data = data.response;
    const { action, navigation } = this.props.store;
    const { navigate, goBack } = navigation;

    const { setBalance } = action;
    action.set("hasWallet", isSuccess);
    switch (url) {
      case "checkBalance":
        if (isSuccess) {
          setBalance(data.balance);
        } else {
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
    }
  };

  callApi = (method, route, body = {}) => {
    url = route;
    if (endPoints[url] != null) {
      body = { ...body, channel: Platform.OS.toUpperCase() };
      url = baseURL + endPoints[url];
    }

    const request = new XMLHttpRequest();
    request.setRequestHeader;
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        this.response(url, false, {});
        return;
      }

      // alert(request.responseText);
      if (request.status === 401) {
        this.response(route, false, {});
        this.props.store.action.onSessionExpired();
      }

      if (request.status === 200) {
        const data = JSON.parse(request.responseText);
        this.response(route, true, data);
        // alert(JSON.stringify(data));
        // callback(data.balance + 1);

        console.log("success", request.responseText);
      } else {
        console.warn("error");
        this.response(route, false, {});
      }
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
