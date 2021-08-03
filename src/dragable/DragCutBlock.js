import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

import { RoundConnector } from './RoundConnector'
import { Utils } from '../Utils'
import Svg, {Path} from 'react-native-svg';

class DragCutBlock extends React.Component {
  constructor(props) {
    super(props);

    this.initPos(props);

    this.state = {
      point1:this.startp1,
      point2:this.startp2,
      point3:this.startp3,
      point4:this.startp4,
    };

  }

  initPos = (props) => {
    this.startp1 = {x:0,y:0};
    this.startp2 = {x:props.w,y:0};
    this.startp3 = {x:props.w,y:props.h};
    this.startp4 = {x:0,y:props.h};
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
    let pRotation = 0;
    let rotateStr = pRotation + 'deg';
    let containerInfo = { w:this.props.w, h:this.props.h};
    let img_rect = Utils.computePaperLayout(pRotation, this.props.paperBg, containerInfo);
    let path = `M ${this.state.point1.x} ${this.state.point1.y} L ${this.state.point2.x} ${this.state.point2.y} L ${this.state.point3.x} ${this.state.point3.y} L ${this.state.point4.x} ${this.state.point4.y} L ${this.state.point1.x} ${this.state.point1.y} `;
    console.log(path);
    console.log(img_rect);
    return (
        <ImageBackground source={this.props.paperBg} resizeMode={'stretch'} 
            style={[styles.imgbg, {width:this.props.w, height:this.props.h,  transform: [ {translateX:img_rect.x}, {translateY:img_rect.y}, { rotateZ: rotateStr }] }]}
        >
          <Svg width={this.props.w} height={this.props.h} fill="#0000FF33" >
            <Path d={path} stroke="#0000FF33" />
          </Svg>
          <RoundConnector onMove={this.onMove1.bind(this)}  title={"1"} startPos={this.startp1} />
          <RoundConnector onMove={this.onMove2.bind(this)}  title={"2"} startPos={this.startp2} />
          <RoundConnector onMove={this.onMove3.bind(this)}  title={"3"} startPos={this.startp3} />
          <RoundConnector onMove={this.onMove4.bind(this)}  title={"4"} startPos={this.startp4} />
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imgbg: {
    borderWidth:0,
    borderColor:"#000000",
  },  
});

export { DragCutBlock } ;