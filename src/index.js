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
      profile: { full_name: "fattah" },
      hasWallet: false,
      amountToReload: 0,
      // token: props.token,
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZjYzU2NzYwODE4OTYzY2QyYTU2MjI0OGUyNzExNmQxYTQwZTc5NzZkY2QyZDYwMWFmYjYyNjFkNDhmZWRiNGY4ZDVhMGY1NzliZDYxNmYwIn0.eyJhdWQiOiI1IiwianRpIjoiZmNjNTY3NjA4MTg5NjNjZDJhNTYyMjQ4ZTI3MTE2ZDFhNDBlNzk3NmRjZDJkNjAxYWZiNjI2MWQ0OGZlZGI0ZjhkNWEwZjU3OWJkNjE2ZjAiLCJpYXQiOjE1MzM3MTczNzksIm5iZiI6MTUzMzcxNzM3OSwiZXhwIjoxNTMzODAzNjA3LCJzdWIiOiIxMjYiLCJzY29wZXMiOlsicHJvZmlsZSJdfQ.Ej4Fx9jpIP3AudoaR_g--HMUGnAP7XUVMykan5BTSNYULsh7nVvz1vRCNle2UsgUaX6w0wh_n-keJgn1jZHuIZEk5l50UMT310gfMYDEPLsLRw5rze1gg2zigLeDXt9qwPVu-4lgG2Nvmq23gZIM7EcXpEJsT6vP9SvMgo30HHhi41TLVxsk7OTdp8ff6C1-_830g9Vp0PDvmxHPBWXjaazkyqD7lA6YJ7YALxR5FsxuQFmQ-09KeUSk80ba-zxcDUgfauoJu8wSkxXzk596xhV9pEvgpKDU3OGrwLuYKRnAuVuybUrQs0Eqjjn_dHhNQTjO_OR0xw774el5bDeNzjzg9zvEinZ6PZdQwH7W-fpjtWlwtWflFYj6F5HP64JQ-18HWfMjIXANBFex84d-91Q9RdSFG67Lzhq5_iMJHA59znF5ALKELkOxWQOameJwut2b0RtBvgBu5fmH5d_YtDhUVLaNpIy2rSFOlSLQPmvt_ulWFUOJ8egLFG0DP_bP9rQbG83icq0ruhJRM55zcOe-cQkWZXVQnvqPabw9kyp4_6my9odjVs00TGSTnzvZVTCZqt8V-Co9C3iFC68U-VPaBgzBOkuX9kibv606OHCJv0dOoZvmbTzkXy_YedWu4I7tNylvMM_8gFCy8JRCDJdjx9mKjYwJX7DZJFjmiKg",
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
    balance: () => ((100 * this.state.balance) / 100).toFixed(2)
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
