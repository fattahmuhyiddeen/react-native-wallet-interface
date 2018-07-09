import { Platform, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const isIphoneX =
  Platform.OS === "ios" && (deviceHeight === 812 || deviceWidth === 812);
const isIphoneXStatusBar = isIphoneX ? 44 : 20;

export default {
  deviceHeight,
  deviceWidth,
  platform: Platform.OS,
  isIphoneX
};
