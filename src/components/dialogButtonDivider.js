import React, { Component } from "react";
import { View, StyleSheet, PixelRatio } from "react-native";

const styles = StyleSheet.create({
  divider: { width: 1 / PixelRatio.get(), height: 18, backgroundColor: "#999999" },
});

export default class DialogButtenDivider extends Component {
  render() {
    return (
      <View style={styles.divider} />
    );
  }
}
