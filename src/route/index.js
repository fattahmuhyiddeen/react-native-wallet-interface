import ReloadScreen from '../modules/reload';
import AboutScreen from '../modules/about';
import ReloadNotificationScreen from '../modules/notification/ReloadNotificationScreen';
import EnterPhoneScreen from '../modules/register/EnterPhoneScreen';
import EnterTacScreen from '../modules/register/EnterTacScreen';
import WebViewScreen from '../modules/webview';
import React from 'react';

export default [
  { screen: ReloadScreen, name: 'Reload' },
  { screen: ReloadNotificationScreen, name: 'ReloadNotification' },
  { screen: EnterTacScreen, name: 'EnterTac' },
  { screen: EnterPhoneScreen, name: 'EnterPhone' },
  { screen: AboutScreen, name: 'About' },
  { screen: WebViewScreen, name: 'WebView' },
];
