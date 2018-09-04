import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import Routes from './route';
// import globalState from './state';
import Button from './modules/common/Button';
import ApiCaller from './apiCaller';
import ModalIcon from './modalIcon';

let self;
console.disableYellowBox = true;

const isIos = Platform.OS == 'ios';

class App extends Component {
  constructor(props) {
    // setTimeout(() => alert(JSON.stringify(globalState.state)), 3000);
    super(props);
    self = this;
    this.state = this.getInitialState();

    Keyboard.addListener(
      'keyboard' + (isIos ? 'Will' : 'Did') + 'Show',
      this.onKeyboardAppear,
    );
    Keyboard.addListener(
      'keyboard' + (isIos ? 'Will' : 'Did') + 'Hide',
      this.onKeyboardHide,
    );
    // setTimeout(this.action.openModal, 2000);

    // globalState.setState(this.state);
    // ajax.get("https://facebook.github.io/react-native/movies.json");

    // setTimeout(
    // () =>
    //   ajax.post(
    //     "paymentLink",
    //     { amount: "10", product_description: "reload" },
    //     v => self.action.setBalance(v)
    //   ),
    // () => ajax.post("checkBalance", {}, v => self.action.setBalance(v)),
    //   0
    // );
  }

  onKeyboardAppear = e =>
    this.setState({
      isKeyboardAppear: true,
      keyboardHeight: e.endCoordinates.height,
      // screenHeight: Resolution.deviceHeight - e.endCoordinates.height,
    });

  onKeyboardHide = () =>
    this.setState({
      isKeyboardAppear: false,
      // screenHeight: Resolution.deviceHeight,
      keyboardHeight: 0,
    });

  initialModalState = () => ({
    isVisible: false,
    title: 'Hello',
    body: 'yeah',
    logo: 'error',
    onPress: this.resetModal,
    hasCloseButton: false,
  });

  getInitialState = () => ({
    modal: this.initialModalState(),
    isKeyboardAppear: false,
    numberOfTrialEnteringTac: 0,
    keyboardHeight: 0,
    routes: [Routes[0]],
    baseApiURL: this.props.baseApiURL,
    profile: {},
    reloadHistory: [],
    array_payment_ref_no: [],
    hasWallet: false,
    amountToReload: 0,
    token: this.props.token,
    refreshToken: '',
    themeColor: this.props.themeColor,
    currency: this.props.currency,
    balance: this.props.initialBalance,
    loadingBalance: true,
    screen: {
      reloadNotification: {
        scenario: 'fail', // first_success/success/fail
      },
    },
  });

  getProfileAndBalance = () => {
    const { token } = this.state;
    if (typeof token !== 'undefined' && token != null && token != '') {
      this.apiCaller.callApi('get', 'getProfile');
      this.refreshBalance();
    }
  };

  hardReset = () => this.setState(this.getInitialState());

  refreshBalance = () => {
    this.setState({ loadingBalance: true });
    this.apiCaller.callApi('post', 'checkBalance');
  };

  componentDidMount() {
    this.checkReloadHistory();
    this.getProfileAndBalance();
  }

  // navigation actions / emulating react navigation
  navigation = {
    navigate: (screen, props = {}) => {
      const { routes } = this.state;
      for (let i = 0; i < Routes.length; i++) {
        if (Routes[i].name === screen) {
          screen = Routes[i];
          screen.props = props;
          routes.push(screen);
          return this.setState({ routes });
        }
      }
    },
    goBack: () => {
      const { routes } = self.state;
      if (routes.length > 1) {
        routes.pop();
        this.setState({ routes });
      } else {
        this.props.onExit();
      }
    },
    reset: (screen, props = {}) => {
      for (let i = 0; i < Routes.length; i++) {
        if (Routes[i].name === screen) {
          return this.setState({ routes: [Routes[i]] });
        }
      }
    },
    onExit: () => {
      // const initialState = this.getInitialState();
      // this.setState({ ...initialState });
      this.props.onExit();
    },
  };
  // end navigation

  // getter method to get global state
  select = {
    balance: () => ((100 * this.state.balance) / 100).toFixed(2),
  };
  // end getter

  // actionto change states / simulate redux action
  action = {
    openModal: (data = {}) =>
      this.setState({
        modal: { ...this.initialModalState(), ...data, isVisible: true },
      }),
    set: (s, v) => this.setState({ [s]: v }),
    setBalance: balance => {
      this.checkReloadHistory();
      this.setState({ balance });
      this.props.onBalanceChanged(balance);
    },
    setReloadHistory: data => {
      const reloadHistory = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].payment_type == '1') {
          const amount_in_cent = parseInt(data[i].amount);
          data[i].amount = amount_in_cent / 100;
          reloadHistory.push(data[i]);
        }
      }
      this.setState({ reloadHistory });
      this.props.onReloadHistoryChanged(reloadHistory);
    },
    apiCheckBalance: () => this.refreshBalance(),

    onSessionExpired: () => {
      this.setState({ token: '' });
      this.props.onSessionExpired();
    },
    callApi: (method, url, params = {}) =>
      this.apiCaller.callApi(method, url, params),
    add_payment_ref_no: v => {
      const array_payment_ref_no = this.state.array_payment_ref_no;
      array_payment_ref_no.push(v);
      this.setState({ array_payment_ref_no });
    },
    remove_payment_ref_no: v => {
      const array_payment_ref_no = this.state.array_payment_ref_no.filter(
        item => item != v,
      );
      this.setState({ array_payment_ref_no });
    },
    checkPaymentStatus: () => this.apiCaller.checkPaymentStatus(),
  };
  // end action

  // public function that accessible from parent using ref
  getBalance = () => this.state.balance;
  checkReloadHistory = () => this.apiCaller.callApi('post', 'getReloadHistory');
  // end public function

  componentDidUpdate(prevProps, prevState) {
    if (this.props.token != prevProps.token) {
      if (this.props.token == '' || this.props.token == null) {
        this.hardReset();
      } else {
        this.setState({ token: this.props.token }, this.getProfileAndBalance);
      }
    }
  }

  resetModal = () => this.setState({ modal: this.initialModalState() });

  render() {
    // if (__DEV__)
    console.log(this.state);
    const { presetReloadAmount } = this.props;
    const { routes, modal } = this.state;
    const screens = [];
    const store = {
      navigation: this.navigation,
      state: this.state,
      select: this.select,
      action: this.action,
      presetReloadAmount,
    };
    for (let i = 0; i < routes.length; i += 1) {
      const s = (
        <View backgroundColor="white" key={i} style={styles.screen}>
          {React.createElement(routes[i].screen, {
            ...routes[i].props,
            store,
          })}
        </View>
      );
      screens.push(s);
    }
    return (
      <View style={styles.container}>
        {screens}
        <ApiCaller store={store} ref={r => (this.apiCaller = r)} />
        <Modal
          visible={modal.isVisible}
          transparent
          animationType="fade"
          onRequestClose={this.resetModal}
          // onDismiss={}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBody}>
              {modal.hasCloseButton && (
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={this.resetModal}
                >
                  <Text>X</Text>
                </TouchableOpacity>
              )}
              {modal.logo != '' && <ModalIcon stype={modal.logo} />}
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'black',
                  marginVertical: 10,
                  textAlign: 'center',
                }}
              >
                {modal.title}
              </Text>
              <Text style={{ marginBottom: 20, color: 'grey' }}>
                {modal.body}
              </Text>
              <Button label="OKAY" onPress={modal.onPress} />
            </View>
            {/*  */}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B4A5C',
  },
  screen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: 300,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

App.propTypes = {
  onExit: PropTypes.func,
  onSessionExpired: PropTypes.func,
  themeColor: PropTypes.string,
  currency: PropTypes.string,
  balance: PropTypes.number,
  presetReloadAmount: PropTypes.array,
  onBalanceChanged: PropTypes.func,
  onReloadHistoryChanged: PropTypes.func,
  token: PropTypes.string,
  baseApiURL: PropTypes.string,
};

App.defaultProps = {
  onExit: () => null,
  onSessionExpired: () => null,
  themeColor: '#3B4A5C',
  currency: 'MYR',
  token: '',
  // token: !__DEV__
  //   ? ""
  //   : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk5YzNlYmI1NWIzMzVkYzgwYjAyNWM5MmJhNWQxOTU3OWQ2MzI0ZWE4MDg1NGFkZWVjYjE4NjYxMWJkZGI3ODg5OWU5MDYzYzBmMDU3MTYyIn0.eyJhdWQiOiI1IiwianRpIjoiOTljM2ViYjU1YjMzNWRjODBiMDI1YzkyYmE1ZDE5NTc5ZDYzMjRlYTgwODU0YWRlZWNiMTg2NjExYmRkYjc4ODk5ZTkwNjNjMGYwNTcxNjIiLCJpYXQiOjE1MzM3OTMwMjQsIm5iZiI6MTUzMzc5MzAyNCwiZXhwIjoxNTMzODc4MDA3LCJzdWIiOiIxMjYiLCJzY29wZXMiOlsicHJvZmlsZSJdfQ.HGzSITDS0JMRsJm3EjKtgTM14ZM4W-HucgClZmDVgVZm1ZV7GbBCYAY1voriWqSv94VehZtXVDUzFmw2wqJstgYtnMYZOyWMSviSzA0IasdDnsfpb1rkxsjWw7RAPljl8s0d7daf_t3aG6cm-1xK0thtipSChJbs0zgkEIbWGS3vXoNuh-cxYOBXUb2DskNR6JETKLBqtgjP8qvBa2JAPSnb_KJ5on1xkWjjx2_JqnBo876pcGBN5495HUU7bvkVA3AxYc9LysPu-TPvmEhLc3DEhOFQQpUrFfTdJZA6ZeM1ZhhG4pYpjG9BdmRdVdh3AoRxcCKaTm_6RU3BJuldqqy80oRhYYLgxWy-lO5QwzQPjDfYQFEleCpgjAXiCRrNDNy6CNmpFnRQZNt2Zw0jWoP612DRVDYTYoOoQFv94y4FhpoH34Xz3CRYjESqZN1-g5MIqVLizl-ARISVha-A0ejIY-u-PGNsFsQQe6Ob68lq9XVGsi0yh5mu77kyz2FdYj2_Ca8IRJDSKOsfJ94tJKl3B_hwWUAM1wrX_kPpn_SLxhz9GZxgnC5tQYfsiEc6W04zea9dKKgp6zzWWVXzkgUv78SB9qDuP2gOilJirV1rHjPb1RB3pbE6MzRO8Db4cF5o7KjhxaIVuis7OU0Q8KxXFHxE5ckwZLi5FKAZREI",
  baseApiURL: '',
  // baseApiURL: 'https://ifoundit.tcennoc.unifi.space',
  initialBalance: 0,
  onBalanceChanged: () => null,
  onReloadHistoryChanged: () => null,
  presetReloadAmount: [
    { amount: '3' },
    { amount: '5' },
    { amount: '10' },
    { amount: '30' },
    { amount: '50' },
    { amount: '100' },
  ],
};
export default App;
