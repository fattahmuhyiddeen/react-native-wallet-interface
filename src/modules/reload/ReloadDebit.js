import React, { Component } from "react";
// import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity
} from "react-native";
// import {ListItem} from 'native-base';
// import {GeneralFlatList} from 'common/GeneralFlatList';
// import { Shadow, Colors } from 'theme';
// import Icon from "react-native-vector-icons/Entypo";
import SelectableGrid from "react-native-selectable-grid";
import Button from "../common/Button";
// import ajax from "../../services/HttpService";

// import I18n from 'config/i18n';

// import styles from './styles';

// const renderItem = ({item}) => {
//   return (
//     <ListItem style={[styles.listItem, Shadow.nonOffset]}>
//       <View style={styles.containerListItem}>
//         <View style={styles.containerListItemLeft}>
//           <Icon name={'wallet'} size={30} />
//         </View>
//         <View style={styles.containerListItemMiddle}>
//           <Text style={styles.txtTitle}>{'1 May 2018'}</Text>
//           <Text style={styles.txtDate}>{'12:30 pm'}</Text>
//         </View>
//         <View style={styles.containerListItemRight}>
//           <Text style={styles.txtAmount}>{'MYR 3.00'}</Text>
//         </View>
//       </View>
//     </ListItem>
//   );
// };

// renderItem.propTypes = {
//   item: PropTypes.object.isRequired,
// };

class ReloadDebit extends Component {
  state = { selectedIndex: null, modal: "" };
  closeModal = () => this.setState({ modal: "" });

  cellRender = (data, cellStyles) => (
    <View style={cellStyles.cellContainer}>
      <Text style={cellStyles.myrText}>{this.props.store.state.currency}</Text>
      <Text style={cellStyles.amountText}>{data.amount}</Text>
    </View>
  );

  reload = () => {
    const { store } = this.props;
    const amount = store.presetReloadAmount[this.state.selectedIndex].amount;
    if (!store.state.hasWallet) {
      store.action.set("amountToReload", amount);
      return this.setState({ modal: "notify_create" });
    }
    store.action.callApi("post", "paymentLink", {
      amount,
      product_description: "I dont know why back end still need this"
    });
    // ajax.post("paymentLink");
  };
  continueNoWallet = () => {
    this.setState({ modal: "" });
    this.props.store.navigation.navigate("EnterPhone");
  };
  render() {
    const { store } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.subHeader}>
            <Text>Select Amount</Text>
          </View>
          <SelectableGrid
            // ref={ref => {
            //   this.sbRef = ref;
            // }}
            data={store.presetReloadAmount}
            maxPerRow={3}
            unselectedRender={data => this.cellRender(data, styles)}
            selectedRender={data => this.cellRender(data, selectedStyles)}
            unselectedStyle={{
              backgroundColor: "white",
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              borderColor: "grey"
            }}
            onSelect={selectedIndex => this.setState({ selectedIndex })}
            selectedStyle={{
              backgroundColor: store.state.themeColor,
              borderColor: store.state.themeColor
            }}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            style={{ marginHorizontal: 20, justifyContent: "flex-end" }}
            label={"CONTINUE"}
            disabled={this.state.selectedIndex == null}
            onPress={this.reload}
            // onPress={() => store.navigation.navigate("ReloadNotification")}
          />
        </View>
        <Modal transparent visible={this.state.modal != ""}>
          <View style={styles.modalBG}>
            <View style={styles.modalBody}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 10,
                  height: 30,
                  width: 30
                }}
                onPress={this.closeModal}
              >
                <Text style={{ color: "black" }}>X</Text>
              </TouchableOpacity>
              <Text
                style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
              >
                But Wait!
              </Text>

              <Text style={{ color: "grey", marginTop: 10, marginBottom: 30 }}>
                {"You don't have any cash in your account.\nLet's begin now?"}
              </Text>

              <Button
                style={{
                  marginHorizontal: 20,
                  justifyContent: "flex-end",
                  width: 250
                }}
                label={"CONTINUE"}
                onPress={this.continueNoWallet}
                // onPress={() => store.navigation.navigate("ReloadNotification")}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cellContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  modalBG: {
    backgroundColor: "#00000077",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalBody: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  subHeader: {
    height: 35,
    justifyContent: "center",
    backgroundColor: "#ADADAD",
    paddingLeft: 10
  },
  myrText: {
    // fontFamily: "Lato-Regular",
    fontSize: 12
  },
  amountText: {
    // fontFamily: "Lato-Bold",
    fontSize: 20
  },
  buttonContainer: {
    paddingVertical: 10,
    marginBottom: 10
  }
});

const selectedStyles = StyleSheet.create({
  cellContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  myrText: {
    // fontFamily: "Lato-Regular",
    fontSize: 12,
    color: "white"
  },
  amountText: {
    // fontFamily: "Lato-Bold",
    fontSize: 20,
    color: "white"
  },
  buttonContainer: {
    bottom: 0,
    padding: 10,
    paddingHorizontal: 30
  }
});

export default ReloadDebit;
