import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from "react-native";

import { Utils } from './Utils'
import Marker from "../src/MistakeRecoder/Views/Marker";

export default class TopicMarker extends Component {
    constructor(props) {
        super(props);

        this.updateData(props, true)
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        console.log('TopicSelecter release...')
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.updateData(nextProps)
    }

    updateData = (props, isInit) => {
        if (isInit) {
            this.state = {
                img: props.img,
                imgSize: props.imgSize,
                containerSize: props.containerSize,
                markers: props.markers
            }
            return
        }
        this.setState({
            img: props.img,
            imgSize: props.imgSize,
            containerSize: props.containerSize,
            markers: props.markers
        })
    }

    render() {
        let markers = this.state.markers
        console.log('markers:', markers)
        let img_rect = Utils.computePaperLayout(0, this.state.imgSize, this.state.containerSize, false)
        return (
            <View style={{ width: this.state.containerSize.w, height: this.state.containerSize.h, alignItems: "flex-start", justifyContent: "flex-start", backgroundColor: 'lightgray' }}>
                <ImageBackground source={this.state.img} resizeMode={'stretch'} style={[styles.imgbg, { width: img_rect.w, height: img_rect.h, transform: [{ translateX: img_rect.x }, { translateY: img_rect.y }] }]} >
                    {
                        (markers && markers.length > 0)
                            ?
                            markers.map((marker, i) => {
                                return <Marker key={i + ''} points={marker[0]} isSelected={marker[1]} />
                            })
                            :
                            null
                    }
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imgbg: {
        position: 'absolute'
    },
});