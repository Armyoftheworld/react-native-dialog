import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Dialog from "./dialog";
import DialogTitle from "./components/dialogTitle";
import DialogButton from "./components/dialogButton";
import DialogButtonDivider from "./components/dialogButtonDivider";
import DialogContent from "./components/dialogContent";

export default class DialogDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneButtonModal: false,
      twoButtonModal: false,
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Show OneButtonModal"
          onPress={() => {
            this.setState({
              oneButtonModal: true,
            });
          }}
        />
        <Button
          title="Show TwoButtonModal"
          onPress={() => {
            this.setState({
              twoButtonModal: true,
            });
          }}
        />
        <Dialog
          width={0.8}
          visible={this.state.oneButtonModal}
          rounded
          onHardwareBackPress={() => {
            const visible = this.state.oneButtonModal;
            this.setState({ oneButtonModal: false });
            return visible;
          }}
          onTouchOutside={() => {
            this.setState({ oneButtonModal: false });
          }}
        >
          <DialogTitle text="Title" />
          <DialogContent text="react-native-root-siblings源码解读" />
          <View style={{ flexDirection: "row" }}>
            <DialogButton
              text="Ok"
              onPress={() => this.setState({ oneButtonModal: false })}
            />
          </View>
        </Dialog>
        <Dialog
          width={0.8}
          visible={this.state.twoButtonModal}
          rounded
          onHardwareBackPress={() => {
            const visible = this.state.twoButtonModal;
            this.setState({ twoButtonModal: false });
            return visible;
          }}
          onTouchOutside={() => {
            this.setState({ twoButtonModal: false });
          }}
        >
          <DialogTitle text="Title" />
          <DialogContent text="react-native-root-siblings源码解读" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <DialogButton
              text="Cancel"
              onPress={() => this.setState({ twoButtonModal: false })}
            />
            <DialogButtonDivider />
            <DialogButton
              text="Ok"
              onPress={() => this.setState({ twoButtonModal: false })}
            />
          </View>
        </Dialog>
      </View>
    );
  }
}
