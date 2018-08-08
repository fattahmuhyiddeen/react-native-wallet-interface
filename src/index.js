import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import Routes from "./route";
import globalState from "./state";
import ApiCaller from "./apiCaller";
let self;
console.disableYellowBox = true;

class App extends Component {
  constructor(props) {
    // setTimeout(() => alert(JSON.stringify(globalState.state)), 3000);
    super(props);
    self = this;
    this.state = {
      routes: [Routes[0]],
      profile: {},
      hasWallet: false,
      amountToReload: 0,
      // token: props.token,
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjljNTBjZGQzMjQzMjE0NjczNzdiMjQyNTg0ZWMxMmMyZTRmN2QxMGNlNGM5NWY0NzY4Y2Y3M2RhZWY1NGJkMWI1ODJmYzU4ZjdlYWE1MDY1In0.eyJhdWQiOiI1IiwianRpIjoiOWM1MGNkZDMyNDMyMTQ2NzM3N2IyNDI1ODRlYzEyYzJlNGY3ZDEwY2U0Yzk1ZjQ3NjhjZjczZGFlZjU0YmQxYjU4MmZjNThmN2VhYTUwNjUiLCJpYXQiOjE1MzM3MDc2ODgsIm5iZiI6MTUzMzcwNzY4OCwiZXhwIjoxNTMzNzUzMDM3LCJzdWIiOiIxMjYiLCJzY29wZXMiOlsicHJvZmlsZSJdfQ.ZlqpRP2SYgtu7SSz5G0sF85NDQ2vN_Etf4e2dtt_Y25t5h93MbfRvx3vf70JIe6Fu07rdA0B0y58Nqt9ETDHy0v2TPTTZ-u4AjtWE9wUNyJ4kiv1UyD71tOn3zdCbzMZy-ltjRt4lCXdJgZ4BwKm3oZnB6ZoEnfocI7_60MMRwM2TNib3h_-3gwKT3fPL2SffuOCgQBSNutkAFeYyJBW-PCrSD0OvZkDoDMte51i2Wf5ETO_qHaRB6cdGhkR9xgWzk8sZcGu6iIkc9uCFX5nX_UzYvQHMiU2WDLPVLLXo5Y_AT37fCZkRw-eNiFSiYqwMxWCqHoCH1RfRS4n4G0W7H82Hd-HxLQ1e5l5lUpGHSdGFfIJ6Su_0aovdnnB62HNqSR-T7e9X0lG2VamVmBx2ChbMlvl7GtSSCeGGc8C9n-7valjeyzjw-DdKV4jw1D5I2hCY421qlFmdkW7Nce5U2T4LmH3HLP0wfrbAjfY60uTT4TYuR2hvc65sySbAZuXL4mYa0K54TkcRML0EAZTMkPr4MiGbgOKAVbOo4N0Mb4Wcmegk8Fb9HsU6kKvhcGuJsfPQvtyoI2sPKlJT1apmmEPWA-S4YJ06NEEGFjHgIQsDsaeMEX-8yf7yZL06XA1JnX38hjNBordmPsf6-Jzs-zVgTB6kaxFGRFWGj05Wxo",
      refreshToken: "",
      themeColor: props.themeColor,
      currency: props.currency,
      balance: props.initialBalance,
      screen: {
        reloadNotification: {
          scenario: "fail" //first_success/success/fail
        }
      }
    };

    globalState.setState(this.state);
    // ajax.get("https://facebook.github.io/react-native/movies.json");

    // setTimeout(
    // () =>
    //   ajax.post(
    //     "paymentLink",
    //     { amount: "10", product_description: "reload" },
    //     v => self.action.setBalance(v)
    //   ),
    // () => ajax.post("checkBalance", {}, v => self.action.setBalance(v)),
    //   0
    // );
  }

  componentDidMount() {
    this.apiCaller.callApi("post", "checkBalance");
  }

  //navigation actions / emulating react navigation
  navigation = {
    navigate: (screen, props = {}) => {
      const { routes } = this.state;
      for (let i = 0; i < Routes.length; i++) {
        if (Routes[i].name === screen) {
          screen = Routes[i];
          screen.props = props;
          routes.push(screen);
          return this.setState({ routes });
        }
      }
    },
    goBack: () => {
      const { routes } = self.state;
      if (routes.length > 1) {
        routes.pop();
        this.setState({ routes });
      } else {
        this.props.onExit();
      }
    },
    reset: (screen, props = {}) => {
      for (let i = 0; i < Routes.length; i++) {
        if (Routes[i].name === screen) {
          return this.setState({ routes: [Routes[i]] });
        }
      }
    },
    onExit: this.props.onExit
  };
  //end navigation

  //getter method to get global state
  select = {
    balance: () => (this.state.balance / 100).toFixed(2)
  };
  //end getter

  //actionto change states / simulate redux action
  action = {
    set: (s, v) => this.setState({ [s]: v }),
    setBalance: balance => {
      this.setState({ balance });
      this.props.onBalanceChanged(balance);
    },
    onSessionExpired: () => {
      // alert("aa");
      this.setState({ token: "" });
      this.props.onSessionExpired();
    },
    callApi: (method, url, params = {}) =>
      this.apiCaller.callApi(method, url, params)
  };
  //end action

  //public function that accessible from parent using ref
  getBalance = () => this.state.balance;
  //end public function

  componentDidUpdate(prevProps, prevState) {
    globalState.setState(this.state);
    globalState.app = this;
  }

  render() {
    console.log(this.state);
    const { presetReloadAmount } = this.props;
    const { routes } = this.state;
    const screens = [];
    const store = {
      navigation: this.navigation,
      state: this.state,
      select: this.select,
      action: this.action,
      presetReloadAmount
    };
    for (let i = 0; i < routes.length; i += 1) {
      let s = (
        <View backgroundColor="white" key={i} style={styles.screen}>
          {React.createElement(routes[i].screen, {
            ...routes[i].props,
            store
          })}
        </View>
      );
      screens.push(s);
    }
    return (
      <View style={styles.container}>
        {screens}
        <ApiCaller store={store} ref={r => (this.apiCaller = r)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B4A5C"
  },
  screen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

App.propTypes = {
  onExit: PropTypes.func,
  onSessionExpired: PropTypes.func,
  themeColor: PropTypes.string,
  currency: PropTypes.string,
  balance: PropTypes.number,
  presetReloadAmount: PropTypes.array,
  onBalanceChanged: PropTypes.func,
  token: PropTypes.string
};

App.defaultProps = {
  onExit: () => null,
  onSessionExpired: () => null,
  themeColor: "#3B4A5C",
  currency: "MYR",
  token: "",
  initialBalance: 0,
  onBalanceChanged: balance => null,
  presetReloadAmount: [
    { amount: "3" },
    { amount: "5" },
    { amount: "10" },
    { amount: "20" },
    { amount: "50" },
    { amount: "100" }
  ]
};
export default App;
