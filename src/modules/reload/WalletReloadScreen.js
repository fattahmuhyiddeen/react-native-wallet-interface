// import React, { Component } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import NavBar from 'common/NavBar';
// import PropTypes from 'prop-types';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import { openMapApp } from 'utils/links';
// import { Colors, Resolution } from 'theme';
// import { Icon, Button as NBButton } from 'native-base';
// import FeatherIcons from 'react-native-vector-icons/Feather';
// import { makeSelectHotspotsNearMe } from 'selectors/wifi/apSelector';
// import isEmpty from 'lodash/isEmpty';
// import I18n from 'config/i18n';
// import ReloadDebit from './ReloadDebit';
// import ReloadSoftPin from './ReloadSoftPin';
// import ReloadTabBar from './ReloadTabBar';

// // Ducks
// // import * as tabActions from 'ducks/nav/tab/tabActions';
// import * as wifiScanActions from 'ducks/scanner/scan';

// // Sagas
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import {
//   makeSelectScannerIsScanning,
//   makeSelectScannerScanningSuccess,
//   makeSelectScannerScanningError,
//   makeSelectScannerScanningConnected,
//   makeSelectScannerScanningAuthenticated,
// } from 'selectors/scanner/scan';
// import { makeSelectUser } from 'selectors/persist/user';
// import CurrentBalance from 'modules/balance';

// // Analytics
// import * as trackerActions from 'ducks/analytics/tracker';
// import { ANALYTICS } from 'constants';
// // import { call } from 'redux-saga/effects';
// export const WISPR_SUCCESS_MESSAGE = 'WISPr Login Success';

// const height = Resolution.screenHeight;

// const UNIFI_LOGO = require('assets/images/scanner/logo-white-bg.png');
// const SCANNING_ANIM = require('../../animation/pulse-new.json');

// const buttonSize = Resolution.isTablet ? 200 : Resolution.deviceWidth * 0.4;

// class WalletReloadScreen extends Component {
//   componentDidMount() {

//   }

//   render() {
//     const {navigation} = this.props;

//     return (
//       <View style={styles.container}>
//         <NavBar
//           title="RELOAD"
//           onLeftIconPressed={() => {
//             // callback(true);
//             navigation.goBack();
//           }}
//           iconColor={'white'}
//           type={'dark'}
//         />
//         <CurrentBalance balance={'3.00'} />
//         <View style={styles.reloadMethodView}>
//           <ReloadDebit
//             tabLabel={I18n.t('walletReload.debitCreditCard')}
//           />
//           {/* <ScrollableTabView
//             style={{ marginTop: 15, }}
//             initialPage={0}
//             renderTabBar={() => <ReloadTabBar />}
//           >
//             <ReloadDebit
//               tabLabel={I18n.t('walletReload.debitCreditCard')}
//             />
//             <ReloadDebit
//               tabLabel={I18n.t('walletReload.onlineBanking')}
//             />
//             <ReloadSoftPin
//               tabLabel={I18n.t('walletReload.softPin')}
//             />
//           </ScrollableTabView> */}
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   currentBalanceView: {
//     flex: 0.15,
//     backgroundColor: Colors.oxfordBlue,
//     paddingLeft: 20,
//     paddingTop: 35,
//   },
//   reloadMethodView: {
//     flex: 1,
//     backgroundColor: '#EFEFEF',
//   },
//   linearGradient: {
//     flex: 1,
//     width: Resolution.deviceWidth,
//     height,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageButton: { width: buttonSize, height: buttonSize },
//   container: {
//     flex: 1,
//     backgroundColor: '#EFEFEF',
//   },
//   subView: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     width: Resolution.deviceWidth,
//     height,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   textAnimated: {
//     position: 'absolute',
//     color: 'black',
//     backgroundColor: 'transparent',
//     fontSize: 12,
//     fontFamily: 'Lato-Regular',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   touchableOpacityAnimated: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ff6600',
//     borderRadius: buttonSize / 2,
//     height: buttonSize,
//     width: buttonSize,
//   },
//   textTitle: {
//     paddingTop: 10,
//     fontFamily: 'Lato-Bold',
//     color: 'white',
//     fontSize: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     textAlign: 'center',
//   },
//   closeBtn: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     width: 50,
//     height: 50,
//     backgroundColor: 'transparent',
//   },
//   closeBtnIcon: {
//     fontSize: 60,
//     color: 'white',
//     backgroundColor: 'transparent',
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   scanAgainButton: {
//     marginTop: 20,
//     backgroundColor: 'white',
//     paddingLeft: 50,
//     paddingRight: 50,
//     alignSelf: 'center',
//   },
//   scanAgainText: {
//     fontFamily: 'Lato-Bold',
//     fontSize: 18,
//     color: '#196ab2',
//   },
//   hotspotsListDirectionView: {
//     flex: 0.25,
//     borderLeftWidth: 1,
//     height: 65,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingLeft: 5,
//   },
//   hotspotsListDirectionTouchable: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   nearbyHotspotContainer: {
//     position: 'absolute',
//     bottom: Resolution.isIphoneX ? 65 : 45,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   connectingText: {
//     color: 'white',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginTop: 230,
//   },
//   nearbyHotspotContainerView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 5,
//     backgroundColor: '#fff',
//     shadowColor: '#555',
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: Colors.lightGray,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     elevation: 3,
//     borderRadius: 10,
//     padding: 10,
//   },
//   hotspotsListCardView: {
//     flex: 0.75,
//     height: 70,
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   hotspotsListNameTxt: {
//     fontWeight: 'normal',
//     fontFamily: 'Lato-Bold',
//     fontSize: 14,
//     paddingTop: 10,
//     paddingLeft: 5,
//   },
//   hotspotsListDistanceTxt: {
//     fontWeight: 'normal',
//     fontFamily: 'Lato-Bold',
//     fontSize: 13,
//     paddingBottom: 10,
//     paddingLeft: 5,
//   },
//   exitContainer: {
//     position: 'absolute',
//     top: Resolution.isIphoneX ? 50 : 30,
//     right: 30,
//   },
// });

// WalletReloadScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
//   wifiScan: PropTypes.func.isRequired,
//   wifiIsScanning: PropTypes.bool.isRequired,
//   wifiIsFound: PropTypes.bool.isRequired,
//   wifiIsConnected: PropTypes.bool.isRequired,
//   wifiIsAuthenticated: PropTypes.bool.isRequired,
//   wifiHasError: PropTypes.object,
//   wifiScanAuthenticated: PropTypes.func.isRequired,
//   wifiScanAuthenticatedFail: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
//   wifiScanResetState: PropTypes.func.isRequired,
//   trackEvent: PropTypes.func.isRequired,
//   trackScreen: PropTypes.func.isRequired,
//   hotspotsNearMe: PropTypes.any.isRequired,
//   navigation: PropTypes.object.isRequired,
//   // goBackFromTab: PropTypes.func.isRequired,
// };

// WalletReloadScreen.defaultProps = {
//   wifiHasError: {},
// };

// const mapStateToProps = createStructuredSelector({
//   wifiIsScanning: makeSelectScannerIsScanning(),
//   wifiIsFound: makeSelectScannerScanningSuccess(),
//   wifiHasError: makeSelectScannerScanningError(),
//   wifiIsConnected: makeSelectScannerScanningConnected(),
//   wifiIsAuthenticated: makeSelectScannerScanningAuthenticated(),
//   hotspotsNearMe: state => makeSelectHotspotsNearMe(state),
//   user: makeSelectUser(),
// });

// const mapDispatchToProps = {
//   // goBackFromTab: tabActions.goToFromTab,
//   wifiScan: wifiScanActions.wifiScan,
//   wifiScanResetState: wifiScanActions.wifiScanResetState,
//   wifiScanAuthenticated: wifiScanActions.wifiScanAuthenticated,
//   wifiScanAuthenticatedFail: wifiScanActions.wifiScanAuthenticatedFail,
//   trackEvent: trackerActions.trackEvent,
//   trackScreen: trackerActions.trackScreen,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(WalletReloadScreen);
