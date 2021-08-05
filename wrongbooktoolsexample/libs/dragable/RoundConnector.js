import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";

class RoundConnector extends Component {

  panValue = new Animated.ValueXY();
  isDriving = false;
  currentPos = {};
  startPos = {};

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => { return true; },
    onStartShouldSetPanResponder: (evt, gestureState) => { return true; },
    onStartShouldSetPanResponderCapture: (evt, gestureState) => {  return true; },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => { return true; },

    onPanResponderGrant: () => {
      this.isDriving = true;
      this.startPan();
      this.props.onStartPan(true);
    },

    onPanResponderMove: (evt, gestureState) => {      
      let newPos = {x : gestureState.dx, y : gestureState.dy};
      if(this.props.rotation == 90){
        newPos = {x : gestureState.dy, y : gestureState.dx * -1};
      } else if(this.props.rotation == 180){
        newPos = {x : gestureState.dx * -1, y : gestureState.dy * -1};
      } else if(this.props.rotation == 270){
        newPos = {x : gestureState.dy * -1, y : gestureState.dx};
      }
      console.log(this.props.title + " newXY = ",newPos, ", startPos=", this.startPos);
      newPos.x = this.getLimitionX(newPos.x);
      newPos.y = this.getLimitionY(newPos.y);
      console.log(this.props.title + " --- newPos = ",newPos);
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
      this.currentPos.x = ret.x;
      this.currentPos.y = ret.y;
    });
    this.panValue.setValue({x:props.startPos.x, y:props.startPos.y});
  }

  getLimitionX(dx){
    let x = dx + this.startPos.x;

    if(x < this.props.limition.x0){
      return this.props.limition.x0 - this.startPos.x;
    }
    if(x > this.props.limition.x1){
      return this.props.limition.x1 - this.startPos.x;
    }    
    return dx;
  }

  getLimitionY(dy){
    let y = dy + this.startPos.y;

    if(y < this.props.limition.y0){
      return this.props.limition.y0 - this.startPos.y;
    }
    if(y > this.props.limition.y1){
      return this.props.limition.y1 - this.startPos.y;
    }    
    return dy;
  }

  componentWillUnmount() {
    this.panValue.removeAllListeners();
  }

  startPan(){
    this.startPos.x = this.currentPos.x;
    this.startPos.y = this.currentPos.y;
    console.log(this.props.title + " start pan");
    this.panValue.setOffset({
      x: this.panValue.x._value,
      y: this.panValue.y._value
    });
  }  

  movePan(dx, dy){
    dx = this.getLimitionX(dx);
    dy = this.getLimitionY(dy);

    let newPos = {y : dy, x : dx};
    this.isDriving = false;
    this.panValue.setValue(newPos);
  }

  releasePan(){
    console.log(this.props.title + " release pan");
    this.panValue.flattenOffset();
  }

  render() {
    let dragScope = this.props.dragsize[0];
    let dragPoint = this.props.dragsize[1];
    return (
      <Animated.View
        style={[ styles.containter, {
          top:   dragScope*-0.5,
          left:  dragScope*-0.5,
          height:dragScope,
          width: dragScope,
          borderRadius: dragScope*0.5,
          transform: this.panValue.getTranslateTransform()
        }]}
        {...this.panResponder.panHandlers}
      >
        <View style={[styles.box, 
          {
            width:dragPoint, 
            height:dragPoint, 
            borderRadius:dragPoint*0.5
          }]} >
            <Text>{this.props.title}</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  containter: {
    position:"absolute",

    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'#00000044'
  },
  box: {
    backgroundColor: "#FFFF0044",    
    justifyContent:"center",
    alignItems:"center"
  }
});

export { RoundConnector };