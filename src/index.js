import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import Routes from "./route";
import ajax from "./services/HttpService";
import globalState from "./state";

class App extends Component {
  constructor(props) {
    // setTimeout(() => alert(JSON.stringify(globalState.state)), 3000);
    super(props);
    this.state = {
      routes: [Routes[0]],
      profile: {},
      // token: props.token,
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFmMTdhOWNjNDhiYjc1NjUyNmRjYzJmMDVkNzQ0YmMyNDU0ZDEwNTgzMmM5Y2VlMTQ4MjQyYWZiM2E1NTM2NzU1NGIwMTUxMWU4MmU4ODRlIn0.eyJhdWQiOiI1IiwianRpIjoiMWYxN2E5Y2M0OGJiNzU2NTI2ZGNjMmYwNWQ3NDRiYzI0NTRkMTA1ODMyYzljZWUxNDgyNDJhZmIzYTU1MzY3NTU0YjAxNTExZTgyZTg4NGUiLCJpYXQiOjE1MzM1MjA4NzksIm5iZiI6MTUzMzUyMDg3OSwiZXhwIjoxNTMzNTc2MDEwLCJzdWIiOiI4NyIsInNjb3BlcyI6WyJwcm9maWxlIl19.Dp1bOGHSRNp2OB6V90m_6O9W_em93g5uiX2oZU1eYopsKt6V61x9Rf7hs-Dv3A_HEAiIJ1ChqiULE7_LZhSwvEWO9ip86NOsaLCupmUJGtxe4rDQ-J7NePadCveHZmUjd7bftUaPSeJCnRlaIunzeCQwUou5o9ahChznWKLsxPK9uUdIcTbJI8P3JkmxmanU3-niUF3o-SZCOeCZIp5A0vAOxYzXK4QSUkVSYlc8bY_GdAo4K448Bgt42LZgtsNmgVF8JpURLqFLsri51HMAySfs9irnOVRZXNF654LzVIfxe7PHswslWO5kE5mvOxIpTaDpdUGUEyNeSYr64VJ1ha-ELiwYRoDX8olzu1L0VcoAdSSX9XFHv0lqDL8PyIoeLHExI8lzQeXLUlYVeoS91SyqIyWS5xBteIshw4XpU5HgB1Dcx97D0ngLe19cpYvfLtUf_-ilBrQXW26S2pzTFr2r_PWhQL006DKvSHEJ-xGN-DRsSiF6yQzfpR3SENU5kXhS0uPK7kwKgtBmgyBPCeih65d70jzMQFNwXTwe_4jFB3io6FusUzM7BA9eHVM3YcaPLAvQL-bYozzbJFG_tkLCPen8KU7oGgXWFDj-WWFjRvo94akftibCrxNGdLgdDPQrKAyvREVg2JSSE7F3_kio0cT3r5zWfqIifgk36cE",
      refreshToken: "",
      themeColor: props.themeColor,
      currency: props.currency,
      balance: props.initialBalance,
      selectedReloadAmount: null,
      screen: {
        reloadNotification: {
          scenario: "fail" //first_success/success/fail
        }
      }
    };

    globalState.setState(this.state);
    // ajax.get("https://facebook.github.io/react-native/movies.json");
    // setTimeout(() => ajax.post("checkBalance"), 3000);
  }

  //navigation actions / emulating react navigation
  navigation = {
    navigate: screen => {
      const { routes } = this.state;
      for (let i = 0; i < Routes.length; i++) {
        if (Routes[i].name === screen) {
          routes.push(Routes[i]);
          return this.setState({ routes });
        }
      }
    },
    goBack: () => {
      const { routes } = this.state;
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
    balance: () => (this.state.balance / 100).toFixed(2),
    didSelectReloadAmount: () => this.state.selectedReloadAmount != null
  };
  //end getter

  //actionto change states / simulate redux action
  action = {
    set: (s, v) => this.setState({ [s]: v }),
    setBalance: balance => {
      this.setState({ balance });
      this.props.onBalanceChanged(balance);
    },
    selectReloadAmount: v =>
      this.setState({ selectedReloadAmount: this.props.presetReloadAmount[v] })
  };
  //end action

  //public function that accessible from parent using ref
  getBalance = () => this.state.balance;
  //end public function

  componentDidUpdate(prevProps, prevState) {
    globalState.setState(this.state);
  }

  render() {
    console.log(this.state);
    const { presetReloadAmount } = this.props;
    const { routes } = this.state;
    const screens = [];
    for (let i = 0; i < routes.length; i += 1) {
      let s = (
        <View backgroundColor="white" key={i} style={styles.screen}>
          {React.createElement(routes[i].screen, {
            store: {
              navigation: this.navigation,
              state: this.state,
              select: this.select,
              action: this.action,
              presetReloadAmount
            }
          })}
        </View>
      );
      screens.push(s);
    }
    return <View style={styles.container}>{screens}</View>;
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
  themeColor: PropTypes.string,
  currency: PropTypes.string,
  balance: PropTypes.number,
  presetReloadAmount: PropTypes.array,
  onBalanceChanged: PropTypes.func,
  token: PropTypes.string
};

App.defaultProps = {
  onExit: () => null,
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
