import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "#333333",
    padding: 8
  },
});

export default class DialogTitle extends Component {
  static defaultProps = {
    text: ""
  };

  render() {
    const { text } = this.props;
    return <Text style={[styles.text]}>{text}</Text>;
  }
}
