import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import NavBar from '../common/Header';
import PropTypes from 'prop-types';
import Resolution from '../../style/Resolution';
import ReloadDebit from './ReloadDebit';
const height = Resolution.screenHeight;

const buttonSize = Resolution.isTablet ? 200 : Resolution.deviceWidth * 0.4;

class WalletReloadScreen extends Component {
  render() {
    const { store } = this.props;
    const { navigation, state, select, action } = store;
    const { themeColor, currency, balance } = state;

    return (
      <View style={[styles.container, { backgroundColor: themeColor }]}>
        <NavBar
          store={this.props.store}
          title="RELOAD"
          onLeftIconPressed={navigation.goBack}
          // onRightIconPressed={() => navigation.navigate('History')}
          iconColor={'white'}
          type={'dark'}
        />
        {/* <CurrentBalance balance={"3.00"} /> */}
        <View
          style={[styles.currentBalanceView, { backgroundColor: themeColor }]}
        >
          <Text style={{ color: 'white', fontSize: 16, paddingBottom: 5 }}>
            Current Balance
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {state.loadingBalance ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity onPress={() => action.apiCheckBalance()}>
                <Text style={{ color: 'white', fontSize: 35 }}>
                  {`${currency} ${select.balance()}`}
                </Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.reloadMethodView}>
          <ReloadDebit store={store} tabLabel="Reload wallet" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plus: {
    fontWeight: 'bold',
    marginLeft: 15,
    fontSize: 35,
    color: 'white',
  },
  currentBalanceView: {
    flex: 0.15,
    paddingLeft: 20,
    paddingTop: 35,
  },
  reloadMethodView: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },

  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
});

export default WalletReloadScreen;
