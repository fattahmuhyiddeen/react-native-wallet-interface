import ReloadScreen from "../modules/reload";
import AboutScreen from "../modules/about";
import ReloadNotificationScreen from "../modules/notification/ReloadNotificationScreen";
import EnterPhoneScreen from "../modules/register/EnterPhoneScreen";
import EnterTacScreen from "../modules/register/EnterTacScreen";
import React from "react";

export default [
  { screen: EnterPhoneScreen, name: "EnterPhone" },
  { screen: EnterTacScreen, name: "EnterTac" },
  { screen: ReloadScreen, name: "Reload" },
  { screen: AboutScreen, name: "About" },
  { screen: ReloadNotificationScreen, name: "ReloadNotification" }
];
