import React, { Component } from 'react';
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  WebView,
  View,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

import Header from '../common/Header';

class Reload extends Component {
  constructor(props) {
    super(props);

    if (props.payment_ref_no == null) {
      props.store.navigation.goBack();
    } else {
      props.store.action.add_payment_ref_no(props.payment_ref_no);
    }
  }
  onNavigationStateChange = webViewState => {
    console.log('webview state');
    console.log(webViewState.url);
    if (webViewState.url.includes('tm_oses/oses_response')) {
      this.onClose(true);
    }
    //it looks like above url still triggered even though error
    // else if (webViewState.url.includes('oses/errResTxn.jsp')) {
    //   this.onClose();
    // }
  };
  renderLoading = () => <ActivityIndicator size="large" />;

  onClose = (isComplete = false) => {
    const { store } = this.props;
    if (isComplete) {
      store.action.checkPaymentStatus();
    } else {
      store.action.remove_payment_ref_no(this.props.payment_ref_no);
    }
    store.navigation.goBack();
  };

  render() {
    const { store, title } = this.props;
    return (
      <View style={styles.container}>
        <Header
          onLeftIconPressed={this.onClose}
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
    backgroundColor: 'white',
    flex: 1,
  },
});

Reload.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  payment_ref_no: PropTypes.string,
};

Reload.defaultProps = {
  url: 'https://google.com',
  title: 'WebView',
  payment_ref_no: null,
};
export default Reload;
