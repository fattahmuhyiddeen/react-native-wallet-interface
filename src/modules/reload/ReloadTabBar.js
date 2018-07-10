// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Colors, Resolution } from 'theme';
// import Icon from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// class ReloadTabBar extends React.Component {

//   constructor(props) {
//     super(props);
//     this.icons = [];
//   }

//   componentDidMount() {
//     this.listener = this.props.scrollValue.addListener(
//       this.setAnimationValue,
//     );
//   }

//   setAnimationValue = ({ value }) => {
//     this.icons.forEach((icon, i) => {
//       const progress = value - i >= 0 && value - i <= 1 ? value - i : 1;
//       // icon.setNativeProps({
//       //   style: {
//       //     color: this.iconColor(progress),
//       //   },
//       // });
//     });
//   }
//   icons = [];

//   // color between rgb(59,89,152) and rgb(204,204,204)
//   iconColor = (progress) => {
//     const red = 59 + (204 - 59) * progress;
//     const green = 89 + (204 - 89) * progress;
//     const blue = 152 + (204 - 152) * progress;
//     return `rgb(${red}, ${green}, ${blue})`;
//   }

//   render() {
//     console.log(this.props);

//     return (
//       <View style={[styles.tabs, this.props.style]}>
//         {this.props.tabs.map((tab, i) => {
//           return (
//             <TouchableOpacity
//               key={tab}
//               onPress={() => this.props.goToPage(i)}
//               style={styles.tab}
//             >
//               <FontAwesome
//                 name={
//                   i === 0 ? 'credit-card' : i === 1 ? 'university' : 'barcode'
//                 }

//                 size={25}
//                 color={
//                   this.props.activeTab === i
//                     ? Colors.oxfordBlue
//                     : 'rgb(204,204,204)'
//                 }
//                 ref={(icon) => {
//                   this.icons[i] = icon;
//                 }}
//               />
//               <Text style={[{
//                 color: this.props.activeTab === i
//                   ? Colors.oxfordBlue
//                   : 'rgb(204,204,204)'
//               }, styles.label]}
//               >{tab}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // paddingBottom: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.05)',
//     height: 70,
//   },
//   tabs: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 50,
//     flexDirection: 'row',
//     // paddingVertical: 20,
//     borderWidth: 0,
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     borderBottomColor: 'rgba(0,0,0,0.05)',
//     paddingBottom: 20,
//   },
//   label: {
//     fontSize: 10,
//   },
// });

// export default ReloadTabBar;
