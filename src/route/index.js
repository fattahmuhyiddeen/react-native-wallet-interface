import ReloadScreen from "../modules/reload";
import AboutScreen from "../modules/about";
import ReloadNotificationScreen from "../modules/notification/ReloadNotificationScreen";
import EnterPhoneScreen from "../modules/register/EnterPhoneScreen";
import React from "react";

export default [
  { screen: EnterPhoneScreen, name: "EnterPhone" },
  { screen: ReloadScreen, name: "Reload" },
  { screen: AboutScreen, name: "About" },
  { screen: ReloadNotificationScreen, name: "ReloadNotification" }
];
