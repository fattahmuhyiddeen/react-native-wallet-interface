// import React from 'react';
// import PropTypes from 'prop-types';
// import I18n from 'config/i18n';
// import { Text, View, ScrollView } from 'react-native';
// import TextField from 'common/TextField';
// import Button from 'common/Button';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import * as Validation from 'utils/validation';
// import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';

// const selector = formValueSelector('reloadPin');
// const formFields = [
//   'pin',
// ];

// const ReloadSoftPin = ({ invalid }) => (
//   <View style={{ flex: 1 }}>
//     <ScrollView style={{ flex: 1 }}>
//       <View style={{ height: 300 }}>
//         <View
//           style={{
//             height: 35,
//             justifyContent: 'center',
//             backgroundColor: '#ADADAD',
//             paddingLeft: 10,
//           }}
//         >
//           <Text>{I18n.t('reload.softPinTitle')}</Text>
//         </View>
//         <Text style={{ textAlign: 'center', marginTop: 10, padding: 20 }}>
//           {I18n.t('reload.pleaseEnterPin')}
//         </Text>

//         <View style={{ padding: 10 }}>
//           <Field
//             placeholder=""
//             name="pin"
//             component={TextField}
//             inputStyle={{ flex: 1 }}
//             autoFocus
//             validate={[Validation.required]}
//           />
//         </View>
//       </View>
//     </ScrollView>
//     <View style={{ justifyContent: 'flex-end', paddingBottom: 10 }}>
//       <Button
//         style={{ marginHorizontal: 20, justifyContent: 'flex-end' }}
//         disabled={invalid}
//         label={I18n.t('common.continue')}
//       />
//     </View>
//   </View>
// );

// ReloadSoftPin.propTypes = {
//   formValues: PropTypes.string.isRequired,
//   invalid: PropTypes.bool.isRequired,
// };

// ReloadSoftPin.defaultProps = {
//   formValues: '',
// };

// const mapStateToProps = createStructuredSelector({
//   formValues: store => selector(store, ...formFields),
// });

// const ReloadPin = reduxForm({
//   form: 'reloadPin',
// })(ReloadSoftPin);

// export default connect(mapStateToProps)(ReloadPin);
