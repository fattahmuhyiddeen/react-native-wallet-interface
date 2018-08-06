import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import Arrow from "react-native-arrow";
import Resolution from "../../style/Resolution";

const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? (Resolution.isIphoneX ? 44 : 20) : 0;
const HEADER_HEIGHT =
  Platform.OS === "ios" ? (Resolution.isIphoneX ? 88 : 64) : 45;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const Header = ({
  title,
  type,
  onLeftIconPressed,
  leftIcon,
  rightIcon,
  onRightIconPressed,
  isBorderVisible,
  store
}) => {
  const titleStyle = {
    // color: type !== "dark" ? store.state.themeColor : "white"
  };
  const navBarStyle = {
    // backgroundColor: type !== "dark" ? "white" : store.state.themeColor
  };
  return (
    <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
      <View style={styles.container}>
        <View style={[styles.statusBar, navBarStyle]} />
        <View style={[styles.navBar, navBarStyle]}>
          <View style={styles.leftContainer}>
            {onLeftIconPressed && (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  Keyboard.dismiss();
                  onLeftIconPressed();
                }}
              >
                <Arrow size={14} />
              </TouchableOpacity>
            )}
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          </View>

          {onRightIconPressed ? (
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                onRightIconPressed();
              }}
            >
              {/* <Icon color={Colors.white} size={25} name={rightIcon} /> */}
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
      {isBorderVisible && <View style={styles.border} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    height: HEADER_HEIGHT
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    backgroundColor: "transparent",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black"
  },
  border: {
    height: 5,
    backgroundColor: "black"
  }
});

Header.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(["dark", "light", "transparent"]),
  onLeftIconPressed: PropTypes.func,
  rightIcon: PropTypes.string,
  leftIcon: PropTypes.string,
  onRightIconPressed: PropTypes.func,
  isBorderVisible: PropTypes.bool
};

Header.defaultProps = {
  title: null,
  type: "transparent",
  onLeftIconPressed: null,
  rightIcon: "md-more",
  leftIcon: "md-arrow-back",
  onRightIconPressed: null,
  isBorderVisible: false
};
export default Header;
