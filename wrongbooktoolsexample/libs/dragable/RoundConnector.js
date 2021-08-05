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
      this.isDriving = true;
      this.startPan();
      this.props.onStartPan(true);
    },

    onPanResponderMove: (evt, gestureState) => {
      // console.log(this.props.title + " onPanResponderMove=", gestureState);
      let newPos = {x : gestureState.dx, y : gestureState.dy};
      if(this.props.rotation == 90){
        newPos = {x : gestureState.dy, y : gestureState.dx * -1};
      } else if(this.props.rotation == 180){
        newPos = {x : gestureState.dx * -1, y : gestureState.dy * -1};
      } else if(this.props.rotation == 270){
        newPos = {x : gestureState.dy * -1, y : gestureState.dx};
      }
      console.log(this.props.title + " newPos = ",newPos);
      this.panValue.setValue(newPos);      
      this.props.onMovePan(newPos, true);
    },

    onPanResponderRelease: () => {      
      this.releasePan();      
      this.props.onReleasePan(true);
      this.isDriving = false;
    }
  });

  constructor(props) {
    super(props);
    this.panValue.addListener((ret) => {
      console.log(this.props.title + " ret = ",ret);
      this.props.onMove(ret, this.isDriving);
    });
    this.panValue.setValue({x:props.startPos.x, y:props.startPos.y});
  }

  componentWillUnmount() {
    this.panValue.removeAllListeners();
  }

  startPan(){
    console.log(this.props.title + " start pan");
    this.panValue.setOffset({
      x: this.panValue.x._value,
      y: this.panValue.y._value
    });
  }

  releasePan(){
    console.log(this.props.title + " release pan");
    this.panValue.flattenOffset();
  }

  setPan(dx, dy){
    let newPos = {y : dy, x : dx};
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