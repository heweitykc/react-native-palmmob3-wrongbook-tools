import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";


class RoundConnector extends Component {

  panValue = new Animated.ValueXY();
  isDriving = false;

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => { console.log("onMoveShouldSetPanResponder"); return true; },
    onStartShouldSetPanResponder: (evt, gestureState) => { console.log("onStartShouldSetPanResponder"); return true; },
    onStartShouldSetPanResponderCapture: (evt, gestureState) => { console.log("onStartShouldSetPanResponderCapture"); return true; },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => { console.log("onMoveShouldSetPanResponderCapture"); return true; },

    onPanResponderGrant: () => {
      console.log("onPanResponderGrant");
      this.isDriving = true;
      this.panValue.setOffset({
        x: this.panValue.x._value,
        y: this.panValue.y._value
      });
    },

    onPanResponderMove: (evt, gestureState) => {
      console.log("onPanResponderMove=", gestureState);
      let newPos = {x : gestureState.dx, y : gestureState.dy};
      if(this.props.rotation == 90){
        newPos = {x : gestureState.dy, y : gestureState.dx * -1};
      } else if(this.props.rotation == 180){
        newPos = {x : gestureState.dx * -1, y : gestureState.dy * -1};
      } else if(this.props.rotation == 270){
        newPos = {x : gestureState.dy * -1, y : gestureState.dx};
      }
      this.panValue.setValue(newPos);
    },

    onPanResponderRelease: () => {
      this.panValue.flattenOffset();
      this.isDriving = false;
    }
  });

  constructor(props) {
    super(props);
    this.panValue.addListener((ret) => {
      this.props.onMove(ret, this.isDriving);
    });    
    this.panValue.setValue({x:props.startPos.x, y:props.startPos.y});
  }

  componentWillUnmount() {
    this.panValue.removeAllListeners();
  }

  setPosX(x){
    let newPos = {x : x, y : this.panValue.y._value};
    this.isDriving = false;
    this.panValue.setValue(newPos);
  }

  setPosY(y){
    let newPos = {y : y, x : this.panValue.x._value};
    this.isDriving = false;
    this.panValue.setValue(newPos);
  }

  render() {
    return (
      <Animated.View
        style={[ styles.containter, {
          transform: this.panValue.getTranslateTransform()
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