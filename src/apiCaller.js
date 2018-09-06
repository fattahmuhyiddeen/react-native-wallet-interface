import { Component } from "react";
import { Platform, Alert } from "react-native";

const endPoints = {
  checkBalance: "cls/wallet/get-balance",
  checkPaymentStatus: "cls/wifi/payment/check_status",
  paymentLink: "cls/wifi/payment/create_link",
  walletRegister: "ums/wallet/register",
  verifyTac: "ums/wallet/verify-tac",
  resendTac: "ums/wallet/resend-tac",
  getProfile: "ums/user/profile",
  getReloadHistory: `cls/wallet/get-history?channel=${Platform.OS}`
};

class ApiCaller extends Component {
  response = (
    url,
    isSuccess,
    data = { error_message: "Generic error message" }
  ) => {
    // alert(JSON.stringify(data));
    data = isSuccess ? data.response : data.error_message;
    const { store } = this.props;
    const { action, navigation, state } = store;
    const { navigate, goBack, reset } = navigation;

    const { setBalance, setReloadHistory } = action;
    switch (url) {
      case "getReloadHistory":
        if (isSuccess) {
          setReloadHistory(data.trans_list);
        } else {
        }
        break;
      case "checkBalance":
        action.set("loadingBalance", false);
        if (isSuccess) {
          setBalance((data.balance / 100).toFixed(2));
          action.set("hasWallet", true);
        } else {
          action.set("hasWallet", false);
        }
        break;

      case "paymentLink":
        if (isSuccess) {
          navigate("WebView", {
            url: data.url,
            title: "Reload",
            payment_ref_no: data.payment_ref_no
          });
        } else {
          // alert('Fail to reload');
          action.openModal({
            title: "Sorry, something weird happened",
            body: "Please try again later"
          });
        }
        break;

      case "walletRegister":
        if (isSuccess) {
          // alert("succes");
          navigate("EnterTac");
        } else {
          // alert('Fail to call tac');
          action.openModal({
            title: "Sorry, something weird happened",
            body: "Please try again later"
          });
        }
        break;

      case "verifyTac":
        if (isSuccess) {
          // alert(JSON.stringify(data));
          // alert("succes");
          action.set("hasWallet", true);
          action.set("numberOfTrialEnteringTac", 0);
          reset("Reload");
          if (state.amountToReload != 0) {
            action.callApi("post", "paymentLink", {
              amount: state.amountToReload,
              product_description: ""
            });
            action.set("amountToReload", 0);
          }
        } else {
          action.openModal({
            title: "Yikes, seems like something went wrong!",
            body:
              "Hold on, could this be a case of fat fingers?\nLet's try that code again one more time?"
          });
          action.set(
            "numberOfTrialEnteringTac",
            state.numberOfTrialEnteringTac + 1
          );
          // alert('Fail to verify tac');
        }
        break;

      case "resendTac":
        action.set("numberOfTrialEnteringTac", 0);

        if (isSuccess) {
          // alert(JSON.stringify(data));
          // alert('New TAC code has been successfully generated');
          action.openModal({
            title: "Code has been resent",
            body:
              "3 minutes are too long without you! We know you missed us, so we sent the code to you via sms again to remind you we're here"
          });
        } else {
          // alert('Fail to resend tac');
          action.openModal({
            title: "Sorry, something weird happened",
            body: "Please try again later"
          });
        }
        break;
      case "getProfile":
        if (isSuccess) {
          // alert(JSON.stringify(data));
          action.set("profile", data);
          action.set(
            "hasWallet",
            typeof data.wallet_id !== "undefined" && data.wallet_id != null
          );
        } else {
          // alert('Fail to get profile');
        }
        break;

      case "checkPaymentStatus":
        if (isSuccess) {
          let scenario = data.payment_status.toLowerCase();
          let amount = data.amount;
          if (scenario == "processing") return;
          if (scenario == "completed") {
            scenario = "success";
          }
          if (scenario == "success" && store.select.balance() == 0) {
            scenario = "first_success";
          } else {
            amount = 0;
          }
          action.apiCheckBalance();
          navigate("ReloadNotification", { scenario, amount });
        } else {
          // setTimeout(()=>);
        }
        break;
    }
  };

  checkPaymentStatus = () => {
    const { store } = this.props;
    const arrs = store.state.array_payment_ref_no;
    for (let i = 0; i < arrs.length; i++) {
      const payment_ref_no = arrs[i];
      setTimeout(
        () => this.callApi("post", "checkPaymentStatus", { payment_ref_no }),
        3000
      );
      store.action.remove_payment_ref_no(payment_ref_no);
    }
  };

  callApi = (method, route, body = {}) => {
    if (method == null) return;
    const { store } = this.props;
    const is_max = store.state.numberOfTrialEnteringTac >= 2;

    if (route == "verifyTac" && is_max) {
      store.action.openModal({
        title: "Oh no! You've reached maximum attempts",
        body: "Just wait for 10 minutes and try again"
      });
      setTimeout(
        () => store.action.set("numberOfTrialEnteringTac", 0),
        60 * 1000 * 10
      );
      return;
    }
    url = route;
    if (endPoints[url] != null) {
      // const channel = 'APP';
      const channel = Platform.OS.toUpperCase();
      url = `${this.props.store.state.baseApiURL}/${endPoints[url]}`;
      if (method === "get") {
        url += `?channel=${channel}`;
      } else {
        body = { ...body, channel };
      }
    }

    // if (__DEV__) {
    console.log(`url :${url}`);
    console.log(`method :${method}`);
    console.log("params :");
    console.log(body);
    console.log("token :");
    console.log(this.props.store.state.token);
    // }

    const request = new XMLHttpRequest();
    request.setRequestHeader;
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        this.response(url, false, {});
        return;
      }

      let data = {};

      try {
        data = JSON.parse(request.responseText);
      } catch (e) {
        this.response(route, false);
        console.log(e); // error in the above string (in this case, yes)!
      }
      // if (__DEV__) {
      console.log(`response for api ${url}:`);
      console.log(data);
      // }

      // Alert.alert(route, request.responseText);
      if (request.status === 401) {
        this.response(route, false, data);
        this.props.store.action.onSessionExpired();
        return;
      }

      const isSuccess = request.status == 200 && data.code == 200;
      this.response(route, isSuccess, data);
    };

    request.open(method.toUpperCase(), url);
    request.setRequestHeader(
      "Authorization",
      `Bearer ${this.props.store.state.token}`
    );
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.send(method === "get" ? null : JSON.stringify(body));
  };
  render() {
    return null;
  }
}

ApiCaller.propTypes = {};

ApiCaller.defaultProps = {};
export default ApiCaller;
