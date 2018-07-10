import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";

const Button = ({
  label,
  onPress,
  type,
  style,
  disabled,
  isLoading,
  labelStyle,
  element,
  iconRight
}) => {
  let buttonStyle = styles.primary;
  let extraStyle = {};
  if (type === "default") {
    buttonStyle = styles.default;
  }

  if (type === "outline") {
    buttonStyle = styles.outline;
  }

  if (type !== "outline" && type !== "default") {
    if (disabled || isLoading) {
      extraStyle = { color: "orange" };
      buttonStyle = styles.outline;
    } else {
      buttonStyle = styles.primary;
      extraStyle = { color: "white" };
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={disabled || isLoading ? null : onPress}
      activeOpacity={disabled || isLoading ? 1 : 0.2}
    >
      {isLoading && (
        <View style={styles.labelContainer}>
          <ActivityIndicator size="small" color={"orange"} />
        </View>
      )}
      {label !== "" &&
        !isLoading && (
          <View style={styles.labelContainer}>
            <View style={styles.row}>
              <Text style={[styles.text, extraStyle, labelStyle]}>{label}</Text>
              {/* {iconRight && (
                  <FontAwesome
                    style={styles.icon}
                    name={iconRight}
                    size={12}
                    color={Colors.oxfordBlue}
                  />
                )} */}
            </View>
          </View>
        )}
      {!label && element}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    flexDirection: "row",
    height: 35,
    // paddingVertical: normalize(8),
    borderRadius: 50
  },
  labelContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  default: {
    backgroundColor: "transparent"
  },
  primary: {
    backgroundColor: "#ff6600"
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ff6600"
  },
  text: {
    color: "white",
    // fontSize: normalize(14),
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row"
  },
  icon: {
    // marginVertical: normalize(1),
    // marginHorizontal: normalize(5)
  }
});

Button.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["default", "primary", "outline", "card"]),
  onPress: PropTypes.func,
  labelStyle: PropTypes.any,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  element: PropTypes.any,
  iconRight: PropTypes.string
};

Button.defaultProps = {
  label: "",
  type: "primary",
  onPress: () => null,
  labelStyle: {},
  style: {},
  disabled: false,
  isLoading: false,
  element: null,
  iconRight: null
};

export default Button;
