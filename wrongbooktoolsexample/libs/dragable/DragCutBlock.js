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
      point0:this.startp0,
      point1:this.startp1,
      point2:this.startp2,
      point3:this.startp3,
      point4:this.startp4,
    };
  }

  initPos = (props) => {    
    this.startp1 = {x:0,y:0};
    this.startp2 = {x:props.imageRect.w,  y:0};
    this.startp3 = {x:0,  y:props.imageRect.h};
    this.startp4 = {x:props.imageRect.w,  y:props.imageRect.h};

    this.startp0 = {x:props.imageRect.w*0.5,  y:props.imageRect.h*0.5};
  }

  onStartPan0 = (isDriving) => {
    if(isDriving){
      this.connector1.startPan();
      this.connector2.startPan();
      this.connector3.startPan();
      this.connector4.startPan();
    }
  }

  onStartPan1 = (isDriving) => {
    if(isDriving && this.props.regular){
      this.connector2.startPan();
      this.connector3.startPan();      
    }    
  }
  onStartPan2 = (isDriving) => {
    if(isDriving && this.props.regular){
      this.connector1.startPan();
      this.connector4.startPan();      
    }
  }
  onStartPan3 = (isDriving) => {
    if(isDriving && this.props.regular){
      this.connector1.startPan();
      this.connector4.startPan();      
    }
  }
  onStartPan4 = (isDriving) => {
    if(isDriving && this.props.regular){
      this.connector2.startPan();
      this.connector3.startPan();      
    }
  }

  onMovePan0 = (pan, isDriving) => {
    if(isDriving){
      this.connector1.movePan(pan.x, pan.y);
      this.connector2.movePan(pan.x, pan.y);
      this.connector3.movePan(pan.x, pan.y);
      this.connector4.movePan(pan.x, pan.y);
    }
  }

  onMovePan1 = (pan, isDriving) => {
    if(isDriving && this.props.regular){
      this.connector2.movePan(0, pan.y);
      this.connector3.movePan(pan.x, 0);      
    }
    this.setCenter();
  }
  
  onMovePan2 = (pan, isDriving) => {
    if(isDriving && this.props.regular){
      this.connector1.movePan(0, pan.y);
      this.connector4.movePan(pan.x, 0);      
    }
    this.setCenter();
  }

  onMovePan3 = (pan, isDriving) => {
    if(isDriving && this.props.regular){
      this.connector1.movePan(pan.x,0 );
      this.connector4.movePan(0, pan.y);      
    }
    this.setCenter();
  }
  
  onMovePan4 = (pan, isDriving) => {
    if(isDriving && this.props.regular){
      this.connector2.movePan(pan.x, 0);
      this.connector3.movePan(0,pan.y);      
    }
    this.setCenter();
  }
  
  onReleasePan0 = (isDriving) => {
    if(isDriving){
      this.connector1.releasePan();
      this.connector2.releasePan();
      this.connector3.releasePan();
      this.connector4.releasePan();
    }
  }

  onReleasePan1 = (isDriving) => {
    if(isDriving && this.props.regular){
      this.connector2.releasePan();
      this.connector3.releasePan();
    }
  }

  onReleasePan2 = (isDriving) => {
    if(isDriving && this.props.regular){
      this.connector1.releasePan();
      this.connector4.releasePan();
    }
  }

  onReleasePan3 = (isDriving) => {
    if(isDriving && this.props.regular){
      this.connector1.releasePan();
      this.connector4.releasePan();
    }
  }

  onReleasePan4 = (isDriving) => {
    if(isDriving && this.props.regular){
      this.connector2.releasePan();
      this.connector3.releasePan();
    }
  }

  onMove0 = (pan, isDriving) => {
    this.setState({point0:{x: pan.x,  y: pan.y}}, ()=>{
      // this.onMoveCallback();
    });
  }

  onMove1 = (pan, isDriving) => {    
    this.setState({point1:{x: pan.x,  y: pan.y}}, ()=>{
      this.onMoveCallback();
    });
  };

  onMove2 = (pan, isDriving) => {    
    this.setState({point2:{x: pan.x,  y: pan.y}}, ()=>{
      this.onMoveCallback();     
    });
  };

  onMove3 = (pan, isDriving) => {    
    this.setState({point3:{x: pan.x,  y: pan.y}}, ()=>{
      this.onMoveCallback();     
    });
  };

  onMove4 = (pan, isDriving) => {    
    this.setState({point4:{x: pan.x,  y: pan.y}}, ()=>{
      this.onMoveCallback();     
    });
  };

  onMoveCallback = () => {
    let wScaleRatio = this.props.imageSize.width / this.props.imageRect.w;
    let hScaleRatio = this.props.imageSize.height / this.props.imageRect.h;
    let poslist = [
      {x:parseInt(this.state.point1.x * wScaleRatio), y:parseInt(this.state.point1.y * hScaleRatio)},
      {x:parseInt(this.state.point2.x * wScaleRatio), y:parseInt(this.state.point2.y * hScaleRatio)},
      {x:parseInt(this.state.point3.x * wScaleRatio), y:parseInt(this.state.point3.y * hScaleRatio)},
      {x:parseInt(this.state.point4.x * wScaleRatio), y:parseInt(this.state.point4.y * hScaleRatio)},
    ];
    this.props.onMove(poslist);
  }

  setCenter(){
    let poslist = [this.state.point1, this.state.point2, this.state.point3, this.state.point4];
    let center = Utils.getCenter(poslist);
    let dx = center.x - this.state.point0.x;
    let dy = center.y - this.state.point0.y;
    this.connector0.startPan();
    this.connector0.movePan(dx, dy);
    this.connector0.releasePan();
    console.log("poslist=",poslist);
    console.log("center=",center);    
  }

  render() {
    if(!this.props.imageRect){
      return null;
    }
    let rotateStr = this.props.imageRotation + 'deg';
    let img_rect = this.props.imageRect; 
    let path = `M ${this.state.point1.x} ${this.state.point1.y} L ${this.state.point2.x} ${this.state.point2.y} L ${this.state.point4.x} ${this.state.point4.y} L ${this.state.point3.x} ${this.state.point3.y} L ${this.state.point1.x} ${this.state.point1.y} `;
    console.log(path);
    return (
        <ImageBackground source={this.props.paperBg} resizeMode={'stretch'} 
            style={[
                styles.imgbg, 
                {
                  width:img_rect.w, height:img_rect.h,
                  transform: [ {translateX:img_rect.x}, {translateY:img_rect.y}, { rotateZ: rotateStr }]
                }
            ]}
        >
          <Svg width={img_rect.w} height={img_rect.h} fill="#0000FF33" >
            <Path d={path} stroke="#0000FF33" />
          </Svg>
          <RoundConnector dragsize={this.props.dragsize} ref={(ref) => { this.connector1 = ref }} rotation={this.props.imageRotation} onMove={this.onMove1.bind(this)} onMovePan={this.onMovePan1.bind(this)} onStartPan={this.onStartPan1.bind(this)} onReleasePan={this.onReleasePan1.bind(this)}  title={"1"} startPos={this.startp1} />
          <RoundConnector dragsize={this.props.dragsize}  ref={(ref) => { this.connector2 = ref }} rotation={this.props.imageRotation} onMove={this.onMove2.bind(this)} onMovePan={this.onMovePan2.bind(this)} onStartPan={this.onStartPan2.bind(this)} onReleasePan={this.onReleasePan2.bind(this)}  title={"2"} startPos={this.startp2} />
          <RoundConnector dragsize={this.props.dragsize}  ref={(ref) => { this.connector3 = ref }} rotation={this.props.imageRotation} onMove={this.onMove3.bind(this)} onMovePan={this.onMovePan3.bind(this)} onStartPan={this.onStartPan3.bind(this)} onReleasePan={this.onReleasePan3.bind(this)}  title={"3"} startPos={this.startp3} />
          <RoundConnector dragsize={this.props.dragsize}  ref={(ref) => { this.connector4 = ref }} rotation={this.props.imageRotation} onMove={this.onMove4.bind(this)} onMovePan={this.onMovePan4.bind(this)} onStartPan={this.onStartPan4.bind(this)} onReleasePan={this.onReleasePan4.bind(this)}  title={"4"} startPos={this.startp4} />          
          <RoundConnector dragsize={this.props.dragsize}  ref={(ref) => { this.connector0 = ref }} rotation={this.props.imageRotation} onMove={this.onMove0.bind(this)} onMovePan={this.onMovePan0.bind(this)} onStartPan={this.onStartPan0.bind(this)} onReleasePan={this.onReleasePan0.bind(this)} title={"0"} startPos={this.startp0} />          
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