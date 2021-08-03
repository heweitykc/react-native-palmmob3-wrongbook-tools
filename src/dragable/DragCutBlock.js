import React from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";

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
    this.startp3 = {x:0,y:props.h};
    this.startp4 = {x:props.w,y:props.h};    
    this.imageSize = Image.resolveAssetSource(props.paperBg);
  }

  onMove1 = (pos) => {
    console.log(pos); 
    this.setState({point1:{x: pos.x,  y: pos.y}}, ()=>{
      this.onMoveCallback();     
    });
  };

  onMove2 = (pos) => {
    console.log(pos);
    this.setState({point2:{x: pos.x,  y: pos.y}}, ()=>{
      this.onMoveCallback();     
    });
  };

  onMove3 = (pos) => {
    console.log(pos);
    this.setState({point3:{x: pos.x,  y: pos.y}}, ()=>{
      this.onMoveCallback();     
    });
  };

  onMove4 = (pos) => {
    console.log(pos);
    this.setState({point4:{x: pos.x,  y: pos.y}}, ()=>{
      this.onMoveCallback();     
    });
  };

  onMoveCallback = () => {
    let wScaleRatio = this.imageSize.width / this.props.w;
    let hScaleRatio = this.imageSize.height / this.props.h;
    let posdata = [
      {x:parseInt(this.state.point1.x * wScaleRatio), y:parseInt(this.state.point1.y * hScaleRatio)},
      {x:parseInt(this.state.point2.x * wScaleRatio), y:parseInt(this.state.point2.y * hScaleRatio)},
      {x:parseInt(this.state.point3.x * wScaleRatio), y:parseInt(this.state.point3.y * hScaleRatio)},
      {x:parseInt(this.state.point4.x * wScaleRatio), y:parseInt(this.state.point4.y * hScaleRatio)},
    ];
    this.props.onMove(posdata);
  }

  render() {
    let pRotation = 0;
    let rotateStr = pRotation + 'deg';
    let containerInfo = { w:this.props.w, h:this.props.h};
    let img_rect = Utils.computePaperLayout(pRotation, this.imageSize, containerInfo);
    let path = `M ${this.state.point1.x} ${this.state.point1.y} L ${this.state.point2.x} ${this.state.point2.y} L ${this.state.point4.x} ${this.state.point4.y} L ${this.state.point3.x} ${this.state.point3.y} L ${this.state.point1.x} ${this.state.point1.y} `;
    return (
        <ImageBackground source={this.props.paperBg} resizeMode={'stretch'} 
            style={[styles.imgbg, {width:this.props.w, height:this.props.h }]}
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