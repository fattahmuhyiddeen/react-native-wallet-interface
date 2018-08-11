import React, { Component } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';

const endPoints = {
  checkBalance: 'cls/wallet/get-balance',
  checkPaymentStatus: 'cls/wifi/payment/check_status',
  paymentLink: 'cls/wifi/payment/create_link',
  walletRegister: 'ums/wallet/register',
  verifyTac: 'ums/wallet/verify-tac',
  resendTac: 'ums/wallet/resend-tac',
  getProfile: 'ums/user/profile',
};

class ApiCaller extends Component {
  response = (url, isSuccess, data) => {
    // alert(JSON.stringify(data));
    data = isSuccess ? data.response : data.error_message;
    const { store } = this.props;
    const { action, navigation, state } = store;
    const { navigate, goBack, reset } = navigation;

    const { setBalance } = action;
    switch (url) {
      case 'checkBalance':
        action.set('loadingBalance', false);
        if (isSuccess) {
          setBalance(data.balance);
          action.set('hasWallet', true);
        } else {
          action.set('hasWallet', false);
        }
        break;

      case 'paymentLink':
        if (isSuccess) {
          navigate('WebView', {
            url: data.url,
            title: 'Reload',
            payment_ref_no: data.payment_ref_no,
          });
        } else {
          alert('Fail to reload');
        }
        break;

      case 'walletRegister':
        if (isSuccess) {
          // alert("succes");
          navigate('EnterTac');
        } else {
          alert('Fail to call tac');
        }
        break;

      case 'verifyTac':
        if (isSuccess) {
          // alert(JSON.stringify(data));
          // alert("succes");
          action.set('hasWallet', true);
          reset('Reload');
          if (state.amountToReload != 0) {
            action.callApi('post', 'paymentLink', {
              amount: state.amountToReload,
              product_description: 'I dont know why back end still need this',
            });
            action.set('amountToReload', 0);
          }
        } else {
          alert('Fail to verify tac');
        }
        break;

      case 'resendTac':
        if (isSuccess) {
          // alert(JSON.stringify(data));
          alert('New TAC code has been successfully generated');
        } else {
          alert('Fail to resend tac');
        }
        break;
      case 'getProfile':
        if (isSuccess) {
          // alert(JSON.stringify(data));
          action.set('profile', data);
          action.set(
            'hasWallet',
            typeof data.wallet_id !== 'undefined' && data.wallet_id != null,
          );
        } else {
          // alert('Fail to get profile');
        }
        break;

      case 'checkPaymentStatus':
        if (isSuccess) {
          let scenario = data.payment_status.toLowerCase();
          let amount = data.amount;
          if (scenario == 'processing') return;
          if (scenario == 'completed') {
            scenario = 'success';
          }
          if (scenario == 'success' && store.select.balance() == 0) {
            scenario = 'first_success';
          } else {
            amount = 0;
          }
          action.apiCheckBalance();
          navigate('ReloadNotification', { scenario, amount });
        } else {
          // setTimeout(()=>);
        }
        break;
    }
  };

  checkPaymentStatus = () => {
    const { store } = this.props;
    const arrs = store.state.array_payment_ref_no;
    for (let i = 0; i < arrs.length; i++) {
      const payment_ref_no = arrs[i];
      setTimeout(
        () => this.callApi('post', 'checkPaymentStatus', { payment_ref_no }),
        3000,
      );
      store.action.remove_payment_ref_no(payment_ref_no);
    }
  };

  callApi = (method, route, body = {}) => {
    if (method == null) return;
    url = route;
    if (endPoints[url] != null) {
      body = { ...body, channel: Platform.OS.toUpperCase() };
      url = `${this.props.store.state.baseApiURL}/${endPoints[url]}`;
    }

    // if (__DEV__) {
    console.log(`url :${url}`);
    console.log(`method :${method}`);
    console.log('params :');
    console.log(body);
    // }

    const request = new XMLHttpRequest();
    request.setRequestHeader;
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        this.response(url, false, {});
        return;
      }
      const data = JSON.parse(request.responseText);
      // if (__DEV__) {
      console.log(`response for api ${url}:`);
      console.log(data);
      // }

      // alert(request.responseText);
      if (request.status === 401) {
        this.response(route, false, data);
        this.props.store.action.onSessionExpired();
        return;
      }

      const isSuccess = request.status == 200 && data.code == 200;
      this.response(route, isSuccess, data);
    };

    request.open(method.toUpperCase(), url);
    request.setRequestHeader(
      'Authorization',
      `Bearer ${this.props.store.state.token}`,
    );
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Accept', 'application/json');
    request.send(JSON.stringify(body));
  };
  render() {
    return null;
  }
}

ApiCaller.propTypes = {};

ApiCaller.defaultProps = {};
export default ApiCaller;
