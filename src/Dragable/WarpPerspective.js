import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { DragCutBlock } from './DragCutBlock'
import Utils from '../Utils'

class WarpPerspective extends React.Component {
  constructor(props) {
    super(props);
  }

  onMove(posdata) {
    console.log('posdata:', posdata);
    this.props.onMove && this.props.onMove(posdata)
  }

  toggleFacing() {

  }

  componentWillUnmount() {
    console.log('WarpPerspective release...')
  }

  render() {
    let imageRotation = this.props.imgRotation;
    let img_rect = Utils.computePaperLayout(imageRotation, this.props.imageSize, this.props);
    console.log("img_rect=", img_rect);
    return (
      <View style={[{ width: this.props.w, height: this.props.h, alignItems: "flex-start", justifyContent: "flex-start", backgroundColor: '#000000', position: 'absolute', overflow: 'hidden' }, this.props.style]} >
        <DragCutBlock
          dragsize={this.props.dragsize}
          regular={this.props.regular}
          paperBg={this.props.paperBg}
          onMove={this.onMove.bind(this)}
          imageSize={this.props.imageSize}
          imageRect={img_rect}
          imageRotation={imageRotation}
          inUse={this.props.inUse}
          initPoints={this.props.initPoints}
          showRoundConnector={this.props.showRoundConnector}
        />
      </View>
    );
  }
}

export default WarpPerspective;