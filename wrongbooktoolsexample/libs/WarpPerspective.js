import React from "react";
import { View, StyleSheet,TouchableOpacity,Text } from "react-native";

import {DragCutBlock}  from './dragable/DragCutBlock'
import { Utils } from './Utils'

class WarpPerspective extends React.Component {
  constructor(props) {
    super(props);
  }

  onMove(posdata){
    console.log(posdata);
  }

  toggleFacing(){
    
  }

  render() {
    let imageRotation = this.props.imgRotation;
    let img_rect = Utils.computePaperLayout(imageRotation, this.props.imageSize, this.props);
    console.log("img_rect=",img_rect);
    return (
      <View style={{width:this.props.w, height:this.props.h, alignItems:"flex-start", justifyContent:"flex-start", backgroundColor:'#00FFFF'}} >
        <DragCutBlock           
          regular={false}
          paperBg={this.props.paperBg} onMove={this.onMove.bind(this)} 
          imageSize={this.props.imageSize}
          imageRect={img_rect}
          imageRotation={imageRotation}
        />
      </View>
    );
  }
}

export default WarpPerspective;