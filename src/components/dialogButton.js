import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#044DE0",
    textAlign: "center",
  },
});

export default class DialogButton extends Component {
  static defaultProps = {
    text: "",
  };

  render() {
    const { text, onPress } = this.props;
    return (
      <TouchableHighlight
        underlayColor="#F1F2F2"
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.button]}
      >
        <Text style={[styles.text]}>{text}</Text>
      </TouchableHighlight>
    );
  }
}
