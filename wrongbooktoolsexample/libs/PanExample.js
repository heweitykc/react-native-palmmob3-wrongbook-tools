import React from "react";
import { View, StyleSheet,TouchableOpacity,Text } from "react-native";

import {DragCutBlock}  from './dragable/DragCutBlock'


class PanExample extends React.Component {
  constructor(props) {
    super(props);
  }

  onMove(posdata){
    console.log(posdata);
  }

  toggleFacing(){
    
  }

  render() {
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:'#CCCC00'}} >
        <DragCutBlock 
          regular={true}
          w={this.props.w} h={this.props.h} 
          paperBg={this.props.paperBg} onMove={this.onMove.bind(this)} 
          imageSize={this.props.imageSize} 
        />
        <TouchableOpacity onPress={this.toggleFacing.bind(this)}>
          <Text>校正</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PanExample;