import React from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";

import { RoundConnector } from './RoundConnector'
import Utils from '../Utils'
import Svg, { Path } from 'react-native-svg';

class DragCutBlock extends React.Component {

  constructor(props) {
    super(props);

    this.updateData(props, true)
  }

  updateData = (props, isInit) => {
    this.imageRect = props.imageRect
    this.dragsize = props.dragsize
    this.regular = props.regular
    this.paperBg = props.paperBg
    this.imageSize = props.imageSize
    this.imageRotation = props.imageRotation
    this.onMove = props.onMove
    this.inUse = props.inUse

    //default start point
    this.initPoints = props.initPoints

    if (this.initPoints && this.initPoints.length >= 4) {
      this.startp1 = this.initPoints[0]
      this.startp2 = this.initPoints[1]
      this.startp3 = this.initPoints[2]
      this.startp4 = this.initPoints[3]
      this.startp0 = { x: (this.initPoints[1].x - this.initPoints[0].x) * 0.5 + this.initPoints[0].x, y: (this.initPoints[2].y - this.initPoints[0].y) * 0.5 + this.initPoints[0].y };
    } else {
      this.startp1 = { x: 0, y: 0 };
      this.startp2 = { x: props.imageRect.w, y: 0 };
      this.startp3 = { x: 0, y: props.imageRect.h };
      this.startp4 = { x: props.imageRect.w, y: props.imageRect.h };
      this.startp0 = { x: props.imageRect.w * 0.5, y: props.imageRect.h * 0.5 };
    }

    if (isInit) {
      this.state = {
        point0: this.startp0,
        point1: this.startp1,
        point2: this.startp2,
        point3: this.startp3,
        point4: this.startp4,
        limition: { x0: 0, x1: this.imageRect.w, y0: 0, y1: this.imageRect.h },
        center_limition: this.getCenterLimition(this.startp0, this.startp1, this.startp2, this.startp3, this.startp4)
      }
      return
    }

    this.setState({
      point0: this.startp0,
      point1: this.startp1,
      point2: this.startp2,
      point3: this.startp3,
      point4: this.startp4,
      limition: { x0: 0, x1: this.imageRect.w, y0: 0, y1: this.imageRect.h },
      center_limition: this.getCenterLimition(this.startp0, this.startp1, this.startp2, this.startp3, this.startp4)
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('receiveProps...')
    // this.updateData(nextProps)

    this.inUse = nextProps.inUse
  }

  onStartPan0 = (isDriving) => {
    if (!isDriving) return;
    this.connector1.startPan();
    this.connector2.startPan();
    this.connector3.startPan();
    this.connector4.startPan();
  }

  onStartPan1 = (isDriving) => {
    if (!isDriving) return;
    if (this.regular) {
      this.connector2.startPan();
      this.connector3.startPan();
    }
  }
  onStartPan2 = (isDriving) => {
    if (!isDriving) return;
    if (this.regular) {
      this.connector1.startPan();
      this.connector4.startPan();
    }
  }
  onStartPan3 = (isDriving) => {
    if (!isDriving) return;
    if (this.regular) {
      this.connector1.startPan();
      this.connector4.startPan();
    }
  }
  onStartPan4 = (isDriving) => {
    if (!isDriving) return;
    if (this.regular) {
      this.connector2.startPan();
      this.connector3.startPan();
    }
  }

  onMovePan0 = (pan, isDriving) => {
    if (!isDriving) return;
    this.connector1.movePan(pan.x, pan.y);
    this.connector2.movePan(pan.x, pan.y);
    this.connector3.movePan(pan.x, pan.y);
    this.connector4.movePan(pan.x, pan.y);
  }

  onMovePan1 = (pan, isDriving) => {
    this.updateCenterPos();
    if (!isDriving) return;
    if (this.regular) {
      this.connector2.movePan(0, pan.y);
      this.connector3.movePan(pan.x, 0);
    }
  }

  onMovePan2 = (pan, isDriving) => {
    this.updateCenterPos();
    if (!isDriving) return;
    if (this.regular) {
      this.connector1.movePan(0, pan.y);
      this.connector4.movePan(pan.x, 0);
    }
  }

  onMovePan3 = (pan, isDriving) => {
    this.updateCenterPos();
    if (!isDriving) return;
    if (this.regular) {
      this.connector1.movePan(pan.x, 0);
      this.connector4.movePan(0, pan.y);
    }
  }

  onMovePan4 = (pan, isDriving) => {
    this.updateCenterPos();
    if (!isDriving) return;
    if (this.regular) {
      this.connector2.movePan(pan.x, 0);
      this.connector3.movePan(0, pan.y);
    }
  }

  onReleasePan0 = (isDriving) => {
    if (!isDriving) return;
    this.connector1.releasePan();
    this.connector2.releasePan();
    this.connector3.releasePan();
    this.connector4.releasePan();
  }

  onReleasePan1 = (isDriving) => {
    this.updateCenterLimition();
    if (!isDriving) return;
    if (this.regular) {
      this.connector2.releasePan();
      this.connector3.releasePan();
    }
  }

  onReleasePan2 = (isDriving) => {
    this.updateCenterLimition();
    if (!isDriving) return;
    if (this.regular) {
      this.connector1.releasePan();
      this.connector4.releasePan();
    }
  }

  onReleasePan3 = (isDriving) => {
    this.updateCenterLimition();
    if (!isDriving) return;
    if (this.regular) {
      this.connector1.releasePan();
      this.connector4.releasePan();
    }
  }

  onReleasePan4 = (isDriving) => {
    this.updateCenterLimition();
    if (!isDriving) return;
    if (this.regular) {
      this.connector2.releasePan();
      this.connector3.releasePan();
    }
  }

  onMove0 = (pan, isDriving) => {
    this.setState({ point0: { x: pan.x, y: pan.y } }, () => {
      // this.onMoveCallback();
    });
  }

  onMove1 = (pan, isDriving) => {
    this.setState({ point1: { x: pan.x, y: pan.y } }, () => {
      this.onMoveCallback();
    });
  };

  onMove2 = (pan, isDriving) => {
    this.setState({ point2: { x: pan.x, y: pan.y } }, () => {
      this.onMoveCallback();
    });
  };

  onMove3 = (pan, isDriving) => {
    this.setState({ point3: { x: pan.x, y: pan.y } }, () => {
      this.onMoveCallback();
    });
  };

  onMove4 = (pan, isDriving) => {
    this.setState({ point4: { x: pan.x, y: pan.y } }, () => {
      this.onMoveCallback();
    });
  };

  onMoveCallback = () => {
    let wScaleRatio = this.imageSize.width / this.imageRect.w;
    let hScaleRatio = this.imageSize.height / this.imageRect.h;
    let poslist = [
      { x: parseInt(this.state.point1.x * wScaleRatio), y: parseInt(this.state.point1.y * hScaleRatio) },
      { x: parseInt(this.state.point2.x * wScaleRatio), y: parseInt(this.state.point2.y * hScaleRatio) },
      { x: parseInt(this.state.point3.x * wScaleRatio), y: parseInt(this.state.point3.y * hScaleRatio) },
      { x: parseInt(this.state.point4.x * wScaleRatio), y: parseInt(this.state.point4.y * hScaleRatio) },
    ];
    if (this.inUse) {
      this.onMove(poslist);
    }
  }

  updateCenterLimition() {
    this.setState({
      center_limition: this.getCenterLimition(this.state.point0, this.state.point1, this.state.point2, this.state.point3, this.state.point4)
    });
  }

  updateCenterPos() {
    let poslist = [this.state.point1, this.state.point2, this.state.point3, this.state.point4];
    let center = Utils.getCenter(poslist);
    let dx = center.x - this.state.point0.x;
    let dy = center.y - this.state.point0.y;
    this.connector0.startPan();
    this.connector0.movePan(dx, dy, true);
    this.connector0.releasePan();
  }

  getCenterLimition(p0, p1, p2, p3, p4) {
    let img_rect = this.imageRect;
    let maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
    let minX = Math.min(p1.x, p2.x, p3.x, p4.x);
    let maxY = Math.max(p1.y, p2.y, p3.y, p4.y);
    let minY = Math.min(p1.y, p2.y, p3.y, p4.y);
    let limition = {};
    limition.x0 = p0.x + (0 - minX);
    limition.x1 = p0.x + (img_rect.w - maxX);
    limition.y0 = p0.y + (0 - minY);
    limition.y1 = p0.y + (img_rect.h - maxY);
    console.log("getCenterLimition=", limition);
    return limition;
  }

  render() {
    if (!this.imageRect || !this.state.point1 || !this.state.point2 || !this.state.point3 || !this.state.point4 || !this.state.limition || !this.state.center_limition) {
      return null;
    }
    console.log('cutBlock render...')
    let rotateStr = this.imageRotation + 'deg';
    let img_rect = this.imageRect;
    let path = `M ${this.state.point1.x} ${this.state.point1.y} L ${this.state.point2.x} ${this.state.point2.y} L ${this.state.point4.x} ${this.state.point4.y} L ${this.state.point3.x} ${this.state.point3.y} L ${this.state.point1.x} ${this.state.point1.y} `;
    console.log(path);
    return (
      <ImageBackground source={this.paperBg} resizeMode={'stretch'}
        style={[
          styles.imgbg,
          {
            width: img_rect.w, height: img_rect.h,
            transform: [{ translateX: img_rect.x }, { translateY: img_rect.y }, { rotateZ: rotateStr }]
          }
        ]} >
        <Svg width={img_rect.w} height={img_rect.h} fill="rgba(255, 229, 0, 0.1)" >
          <Path d={path} stroke="#FFE600" />
        </Svg>
        <RoundConnector limition={this.state.limition} dragsize={this.dragsize} ref={(ref) => { this.connector1 = ref }} rotation={this.imageRotation} onMove={this.onMove1.bind(this)} onMovePan={this.onMovePan1.bind(this)} onStartPan={this.onStartPan1.bind(this)} onReleasePan={this.onReleasePan1.bind(this)} title={"1"} startPos={this.startp1} />
        <RoundConnector limition={this.state.limition} dragsize={this.dragsize} ref={(ref) => { this.connector2 = ref }} rotation={this.imageRotation} onMove={this.onMove2.bind(this)} onMovePan={this.onMovePan2.bind(this)} onStartPan={this.onStartPan2.bind(this)} onReleasePan={this.onReleasePan2.bind(this)} title={"2"} startPos={this.startp2} />
        <RoundConnector limition={this.state.limition} dragsize={this.dragsize} ref={(ref) => { this.connector3 = ref }} rotation={this.imageRotation} onMove={this.onMove3.bind(this)} onMovePan={this.onMovePan3.bind(this)} onStartPan={this.onStartPan3.bind(this)} onReleasePan={this.onReleasePan3.bind(this)} title={"3"} startPos={this.startp3} />
        <RoundConnector limition={this.state.limition} dragsize={this.dragsize} ref={(ref) => { this.connector4 = ref }} rotation={this.imageRotation} onMove={this.onMove4.bind(this)} onMovePan={this.onMovePan4.bind(this)} onStartPan={this.onStartPan4.bind(this)} onReleasePan={this.onReleasePan4.bind(this)} title={"4"} startPos={this.startp4} />

        <RoundConnector limition={this.state.center_limition} dragsize={this.dragsize} ref={(ref) => { this.connector0 = ref }} rotation={this.imageRotation} onMove={this.onMove0.bind(this)} onMovePan={this.onMovePan0.bind(this)} onStartPan={this.onStartPan0.bind(this)} onReleasePan={this.onReleasePan0.bind(this)} title={"0"} startPos={this.startp0} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imgbg: {
    position: 'absolute',
    borderWidth: 0,
    borderColor: "#000000",
  },
});

export { DragCutBlock };