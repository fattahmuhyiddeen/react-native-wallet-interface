import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import Routes from "./route";
import globalState from "./state";
import ApiCaller from "./apiCaller";
let self;
class App extends Component {
  constructor(props) {
    // setTimeout(() => alert(JSON.stringify(globalState.state)), 3000);
    super(props);
    self = this;
    this.state = {
      routes: [Routes[0]],
      profile: {},
      // token: props.token,
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA0N2Q5YmU0MmI4NzVkZmQ3YmU2MDg4NTlkMWVjNjAwY2JkZDg4NDZiNjZlMjAyZWVjNmZhMzgwNDAyZjJlOGMxYTBhYmJlZmJhYjA3ZjVmIn0.eyJhdWQiOiI1IiwianRpIjoiMDQ3ZDliZTQyYjg3NWRmZDdiZTYwODg1OWQxZWM2MDBjYmRkODg0NmI2NmUyMDJlZWM2ZmEzODA0MDJmMmU4YzFhMGFiYmVmYmFiMDdmNWYiLCJpYXQiOjE1MzM2MjY5MDYsIm5iZiI6MTUzMzYyNjkwNiwiZXhwIjoxNTMzNzExMzI4LCJzdWIiOiI4NyIsInNjb3BlcyI6WyJwcm9maWxlIl19.TGQlK3VhPkdJ_16Dcw2XUf6u2DZbUvBoWk4jozkD9R7-bvTCUuBQ17YCJU1e3EhDtjnzWNLVojkrASz9ngwdmz981Km1TZWe2YtrFD0GJKfMOPGWdnkkiLUM6fsLCaHAd7vMHfAR8sRL1SVRx6De6bpu_MHR80tqQWfLl7jEQULoNZrZTs-e5i262f5H7YBhi0acUT9IZf_3QZn0LRPV94o4lYCV0JRlfgEX9O4K90vhB-1GTndM8c0j6rq3X_maZHiqtPUTPHquEeHKPn68B1cA2K5yLQMYdpf7SpU2i1ReHGBXHrdzVF2jx3Q__MQeSlH_Z8kbNzMan19lxRXK2tWg-_Bjtp7hwUaJBxFPm7KrNg-PZIiPTSg7JyYAtkiY3S7BbrK-kVswRzKuO08BVzb6lGASVsnB91YuBpE5M7Uiq_kMWIyg0xS79xJZXj_wLaIbc_TwG7G753ZD-burDdoO3t_nhyt_n8dumZucZHEtQ_RHtwrkf-sqr3R4ZnUtWiUrYoKQjz1ze2k0GjiapdshmSs48BNb3ts9kGlCIfmTLCbeM4jK4SlgzmZFCbUAmIGdLCaKCRKP1vY2PaHwWoPbBl-VKW7zR81kJbrxDB9yG4tMhG3w7QJkw22GrymQnSNqJNcJAr8gxwX5QjzUOR6X787bm-bf1xi0oghowJs",
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
