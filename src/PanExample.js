import React, { useRef, useState } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";

import { RoundConnector } from './dragable/RoundConnector'
import { DragCutBlock } from './dragable/DragCutBlock'
import Svg, {Path} from 'react-native-svg';

const containerInfo = {
  w:300,
  h:500,
};

const startp1 = {x:0,y:0};
const startp2 = {x:containerInfo.w,y:0};
const startp3 = {x:containerInfo.w,y:containerInfo.h};
const startp4 = {x:0,y:containerInfo.h};

class PanExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      point1:startp1,
      point2:startp2,
      point3:startp3,
      point4:startp4,
    };
  }

  onMove1 = (pos) => {
    console.log(pos); 
    this.setState({point1:{x: pos.x,  y: pos.y}});
  };

  onMove2 = (pos) => {
    console.log(pos);
    this.setState({point2:{x: pos.x,  y: pos.y}});
  };

  onMove3 = (pos) => {
    console.log(pos);
    this.setState({point3:{x: pos.x,  y: pos.y}});
  };

  onMove4 = (pos) => {
    console.log(pos);
    this.setState({point4:{x: pos.x,  y: pos.y}});
  };

  render() {
    let path = `M ${this.state.point1.x} ${this.state.point1.y} L ${this.state.point2.x} ${this.state.point2.y} L ${this.state.point3.x} ${this.state.point3.y} L ${this.state.point4.x} ${this.state.point4.y} L ${this.state.point1.x} ${this.state.point1.y} `;
    console.log(path);
    console.log("this.state.point1:",this.state.point1);
    return (
      <View style={styles.container}>
        <Svg height={containerInfo.h} width={containerInfo.w} fill="#0000FF66" >
          <Path d={path} stroke="black" />
         </Svg>      
         <RoundConnector onMove={this.onMove1.bind(this)}  title={"1"} startPos={startp1} />
         <RoundConnector onMove={this.onMove2.bind(this)}  title={"2"} startPos={startp2} />
         <RoundConnector onMove={this.onMove3.bind(this)}  title={"3"} startPos={startp3} />
         <RoundConnector onMove={this.onMove4.bind(this)}  title={"4"} startPos={startp4} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#CCCCCC',
    height: containerInfo.h,
    width: containerInfo.w,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default PanExample;