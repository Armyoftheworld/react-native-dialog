import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    padding: 16
  },
});

export default class DialogContent extends Component {
  render() {
    return <Text style={styles.text}>{this.props.text}</Text>;
  }
}
