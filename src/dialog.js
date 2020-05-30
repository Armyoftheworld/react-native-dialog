import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  BackHandler,
  Animated,
} from "react-native";
import BackDrop from "./backOverlay";
import FadeAnimation from "./animations/FadeAnimation";

const MODAL_OPENING = "opening";
const MODAL_OPENED = "opened";
const MODAL_CLOSING = "closing";
const MODAL_CLOSED = "closed";

const OPEN_STATE = [MODAL_OPENING, MODAL_OPENED];

// default dialog config
const DEFAULT_ANIMATION_DURATION = 150;

// event types
const HARDWARE_BACK_PRESS_EVENT = "hardwareBackPress";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
  round: {
    borderRadius: 8,
  },
});

export default class Dialog extends Component {
  static defaultProps = {
    rounded: true,
    visible: false,
    animationDuration: DEFAULT_ANIMATION_DURATION,
    modalStyle: null,
    // 可以是具体的宽度，也可以是相对于屏幕宽度的占比
    width: null,
    // 可以是具体的高度，也可以是相对于屏幕高度的占比
    height: null,
    onTouchOutside: () => {},
    onHardwareBackPress: () => false,
    hasOverlay: true,
    overlayOpacity: 0.5,
    overlayPointerEvents: null,
    overlayBackgroundColor: "#000000",
    onShow: () => {},
    onDismiss: () => {},
    useNativeDriver: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalAnimation:
        props.modalAnimation ||
        new FadeAnimation({
          animationDuration: props.animationDuration,
        }),
      modalState: MODAL_CLOSED,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.show();
    }
    BackHandler.addEventListener(
      HARDWARE_BACK_PRESS_EVENT,
      this.onHardwareBackPress
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        this.show();
        return;
      }
      this.dismiss();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      HARDWARE_BACK_PRESS_EVENT,
      this.onHardwareBackPress
    );
  }

  onHardwareBackPress = () => this.props.onHardwareBackPress();

  pointerEvents = () => {
    const { overlayPointerEvents } = this.props;
    const { modalState } = this.state;
    if (overlayPointerEvents) {
      return overlayPointerEvents;
    }
    return modalState === MODAL_OPENED ? "auto" : "none";
  };

  modalSize = () => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get(
      "window"
    );
    let { width, height } = this.props;
    if (width && width > 0.0 && width <= 1.0) {
      width *= screenWidth;
    }
    if (height && height > 0.0 && height <= 1.0) {
      height *= screenHeight;
    }
    return { width, height };
  };

  show = () => {
    this.setState({ modalState: MODAL_OPENING }, () => {
      this.state.modalAnimation.in(() => {
        this.setState({ modalState: MODAL_OPENED }, this.props.onShow);
      });
    });
  };

  dismiss = () => {
    this.setState({ modalState: MODAL_CLOSING }, () => {
      this.state.modalAnimation.out(() => {
        this.setState({ modalState: MODAL_CLOSED }, this.props.onDismiss);
      });
    });
  };

  render() {
    const { modalState, modalAnimation } = this.state;
    const {
      rounded,
      children,
      onTouchOutside,
      hasOverlay,
      modalStyle,
      animationDuration,
      overlayOpacity,
      useNativeDriver,
      overlayBackgroundColor,
    } = this.props;
    const overlayVisible = hasOverlay && OPEN_STATE.includes(modalState);
    const round = rounded ? styles.round : null;
    const hidden = modalState === MODAL_CLOSED && styles.hidden;
    return (
      <View style={[styles.container, hidden]}>
        <BackDrop
          pointerEvents={this.pointerEvents()}
          visible={overlayVisible}
          onPress={onTouchOutside}
          backgroundColor={overlayBackgroundColor}
          opacity={overlayOpacity}
          animationDuration={animationDuration}
          useNativeDriver={useNativeDriver}
        />
        <Animated.View
          style={[
            styles.modal,
            round,
            this.modalSize(),
            modalStyle,
            modalAnimation.getAnimations(),
          ]}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
}
