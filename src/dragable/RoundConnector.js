import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";


class RoundConnector extends Component {

  pan = new Animated.ValueXY();

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
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
/* 
const RoundConnector = (props) => {
  const pan = useRef(new Animated.ValueXY({x:props.startPos.x, y:props.startPos.y})).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      onPanResponderGrant: (event, gestureState) => {
        console.log("onPanResponderGrant=");
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },

      onPanResponderMove: (evt, gestureState) => {
        console.log("onPanResponderMove=", gestureState);
        let newPos = {x : gestureState.dx, y : gestureState.dy};        
        props.onMove({
          x: gestureState.dx - pan.x._value,
          y: gestureState.dy - pan.y._value,
        });
        pan.setValue(newPos);
      },

      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
      <Animated.View
        style={[ styles.containter, {
          transform: pan.getTranslateTransform()
        }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} ><Text>{props.title}</Text></View>
      </Animated.View>
  );
}
*/

const styles = StyleSheet.create({
  containter: {
    position:"absolute",
    top:-50,
    left:-50,
    height: 100,
    width: 100,        
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'#00000044'
  },
  box: {
    height: 30,
    width: 30,
    backgroundColor: "yellow",
    borderRadius: 15,
    justifyContent:"center",
    alignItems:"center"
  }
});

export { RoundConnector };