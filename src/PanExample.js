import React from "react";
import { View, StyleSheet } from "react-native";

import {DragCutBlock}  from './dragable/DragCutBlock'


class PanExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:'#CCCC00'}} >
        <DragCutBlock w={this.props.w} h={this.props.h} paperBg={this.props.paperBg} />
      </View>
    );
  }
}

export default PanExample;