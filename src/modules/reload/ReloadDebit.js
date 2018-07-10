import React from "react";
// import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView } from "react-native";
// import {ListItem} from 'native-base';
// import {GeneralFlatList} from 'common/GeneralFlatList';
// import { Shadow, Colors } from 'theme';
// import Icon from "react-native-vector-icons/Entypo";
import SelectableGrid from "react-native-selectable-grid";
import Button from "../common/Button";

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

const ReloadDebit = ({ store }) => {
  const cellRender = (data, cellStyles) => (
    <View style={cellStyles.cellContainer}>
      <Text style={cellStyles.myrText}>{store.state.currency}</Text>
      <Text style={cellStyles.amountText}>{data.amount}</Text>
    </View>
  );

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
          unselectedRender={data => cellRender(data, styles)}
          selectedRender={data => cellRender(data, selectedStyles)}
          unselectedStyle={{
            backgroundColor: "white",
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderColor: "grey"
          }}
          onSelect={v => store.action.selectReloadAmount(v)}
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
          disabled={!store.select.didSelectReloadAmount()}
          onPress={() => store.navigation.navigate("ReloadNotification")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
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
    fontSize: 12
    // color: Colors.white
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
