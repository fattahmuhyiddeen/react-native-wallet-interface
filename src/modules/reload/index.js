import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import NavBar from "../common/Header";
import PropTypes from "prop-types";
import Resolution from "../../style/Resolution";
// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import { openMapApp } from 'utils/links';
// import { Colors, Resolution } from "theme";
// import { Icon, Button as NBButton } from "native-base";
// import FeatherIcons from "react-native-vector-icons/Feather";
// import { makeSelectHotspotsNearMe } from "selectors/wifi/apSelector";
// import isEmpty from "lodash/isEmpty";
// import I18n from "config/i18n";
import ReloadDebit from "./ReloadDebit";
// import ReloadSoftPin from "./ReloadSoftPin";
// import ReloadTabBar from "./ReloadTabBar";

// Ducks
// import * as tabActions from 'ducks/nav/tab/tabActions';
// import * as wifiScanActions from "ducks/scanner/scan";

// Sagas
// import CurrentBalance from "modules/balance";

// Analytics

const height = Resolution.screenHeight;

const buttonSize = Resolution.isTablet ? 200 : Resolution.deviceWidth * 0.4;

class WalletReloadScreen extends Component {
  render() {
    const { navigation, state, select } = this.props.store;
    const { themeColor, currency, balance } = state;

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: themeColor.backgroundColor }
        ]}
      >
        <NavBar
          store={this.props.store}
          title="RELOAD"
          onLeftIconPressed={navigation.goBack}
          iconColor={"white"}
          type={"dark"}
        />
        {/* <CurrentBalance balance={"3.00"} /> */}
        <View style={styles.currentBalanceView}>
          <Text style={{ color: "white", fontSize: 16, paddingBottom: 5 }}>
            Current Balance
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 35 }}>
              {currency + " " + select.balance()}
            </Text>
            <TouchableOpacity>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.reloadMethodView}>
          <ReloadDebit store={this.props.store} tabLabel="Reload wallet" />
          {/* <ScrollableTabView
            style={{ marginTop: 15, }}
            initialPage={0}
            renderTabBar={() => <ReloadTabBar />}
          >
            <ReloadDebit
              tabLabel={I18n.t('walletReload.debitCreditCard')}
            />
            <ReloadDebit
              tabLabel={I18n.t('walletReload.onlineBanking')}
            />
            <ReloadSoftPin
              tabLabel={I18n.t('walletReload.softPin')}
            />
          </ScrollableTabView> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plus: {
    fontWeight: "bold",
    marginLeft: 15,
    fontSize: 35,
    color: "white"
  },
  currentBalanceView: {
    flex: 0.15,
    // backgroundColor: "black",
    paddingLeft: 20,
    paddingTop: 35
  },
  reloadMethodView: {
    flex: 1,
    backgroundColor: "#EFEFEF"
  },
  linearGradient: {
    flex: 1,
    width: "100%",
    // width: Resolution.deviceWidth,
    height,
    justifyContent: "center",
    alignItems: "center"
  },
  imageButton: { width: buttonSize, height: buttonSize },
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF"
  },
  subView: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    // width: Resolution.deviceWidth,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  textAnimated: {
    position: "absolute",
    color: "black",
    backgroundColor: "transparent",
    fontSize: 12,
    // fontFamily: "Lato-Regular",
    justifyContent: "center",
    alignItems: "center"
  },
  touchableOpacityAnimated: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6600",
    borderRadius: buttonSize / 2,
    height: buttonSize,
    width: buttonSize
  },
  textTitle: {
    paddingTop: 10,
    // fontFamily: "Lato-Bold",
    color: "white",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center"
  },
  closeBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  closeBtnIcon: {
    fontSize: 60,
    color: "white",
    backgroundColor: "transparent",
    alignSelf: "center",
    justifyContent: "center"
  },
  scanAgainButton: {
    marginTop: 20,
    backgroundColor: "white",
    paddingLeft: 50,
    paddingRight: 50,
    alignSelf: "center"
  },
  scanAgainText: {
    // fontFamily: "Lato-Bold",
    fontSize: 18,
    color: "#196ab2"
  },
  hotspotsListDirectionView: {
    flex: 0.25,
    borderLeftWidth: 1,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5
  },
  hotspotsListDirectionTouchable: {
    justifyContent: "center",
    alignItems: "center"
  },
  nearbyHotspotContainer: {
    position: "absolute",
    // bottom: Resolution.isIphoneX ? 65 : 45,
    width: "90%",
    alignSelf: "center"
  },
  connectingText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 230
  },
  nearbyHotspotContainerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#fff",
    shadowColor: "#555",
    borderWidth: StyleSheet.hairlineWidth,
    // borderColor: Colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    elevation: 3,
    borderRadius: 10,
    padding: 10
  },
  hotspotsListCardView: {
    flex: 0.75,
    height: 70,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  hotspotsListNameTxt: {
    fontWeight: "normal",
    // fontFamily: "Lato-Bold",
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 5
  },
  hotspotsListDistanceTxt: {
    fontWeight: "normal",
    // fontFamily: "Lato-Bold",
    fontSize: 13,
    paddingBottom: 10,
    paddingLeft: 5
  },
  exitContainer: {
    position: "absolute",
    // top: Resolution.isIphoneX ? 50 : 30,
    right: 30
  }
});

export default WalletReloadScreen;
// import React, { Component } from "react";
// import {
//   Platform,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
//   TextInput,
//   View
// } from "react-native";
// import PropTypes from "prop-types";

// import Header from "../common/Header";

// class Reload extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Header title="Add Money" type="dark" />
//         <TouchableOpacity
//           onPress={() => this.props.store.navigation.navigate("About")}
//         >
//           <TextInput />
//           <Text>Add Cash now</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     flex: 1
//   }
// });

// Reload.propTypes = {};

// Reload.defaultProps = {};
// export default Reload;
