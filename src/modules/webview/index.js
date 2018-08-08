import React, { Component } from "react";
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  WebView,
  View,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";

import Header from "../common/Header";

class Reload extends Component {
  onNavigationStateChange = webViewState => {
    console.log("webview state");
    console.log(webViewState.url);
    if (webViewState.url.includes("tm_oses/oses_response")) {
      this.props.store.navigation.goBack();
    }
  };
  renderLoading = () => <ActivityIndicator size="large" />;
  render() {
    const { store, title } = this.props;
    return (
      <View style={styles.container}>
        <Header
          onLeftIconPressed={store.navigation.goBack}
          store={store}
          title={title}
          type="dark"
        />
        <WebView
          javaScriptEnabled
          renderLoading={this.renderLoading}
          startInLoadingState
          mixedContentMode="always"
          dataDetectorTypes="all"
          onNavigationStateChange={this.onNavigationStateChange}
          geolocationEnabled
          allowUniversalAccessFromFileURLs
          style={{ flex: 1 }}
          source={{ uri: this.props.url }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  }
});

Reload.propTypes = { url: PropTypes.string, title: PropTypes.string };

Reload.defaultProps = {
  url: "https://google.com",
  title: "WebView"
};
export default Reload;
