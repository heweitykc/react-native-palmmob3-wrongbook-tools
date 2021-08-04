import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";


class RoundConnector extends Component {

  pan = new Animated.ValueXY();

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => { console.log("onMoveShouldSetPanResponder"); return true; },
    onStartShouldSetPanResponder: (evt, gestureState) => { console.log("onStartShouldSetPanResponder"); return true; },
    onStartShouldSetPanResponderCapture: (evt, gestureState) => { console.log("onStartShouldSetPanResponderCapture"); return true; },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => { console.log("onMoveShouldSetPanResponderCapture"); return true; },

    onPanResponderGrant: () => {
      console.log("onPanResponderGrant");
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value
      });
    },

    onPanResponderMove: (evt, gestureState) => {
      console.log("onPanResponderMove=", gestureState);
      let newPos = {x : gestureState.dx, y : gestureState.dy};              
      this.pan.setValue(newPos);
    },

    onPanResponderRelease: () => {
      this.pan.flattenOffset();
    }
  });

  constructor(props) {
    super(props);
    this.pan.setValue({x:props.startPos.x, y:props.startPos.y});

    this.pan.addListener((ret) => {
      this.props.onMove(ret);
    });
  }

  render() {
    return (
      <Animated.View
        style={[ styles.containter, {
          transform: this.pan.getTranslateTransform()
        }]}
        {...this.panResponder.panHandlers}
      >
        <View style={styles.box} ><Text>{this.props.title}</Text></View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  containter: {
    position:"absolute",
    top:-50,
    left:-50,
    height: 100,
    width: 100,        
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'#00000099'
  },
  box: {
    height: 30,
    width: 30,
    backgroundColor: "#FFFF00AA",
    borderRadius: 15,
    justifyContent:"center",
    alignItems:"center"
  }
});

export { RoundConnector };