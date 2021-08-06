import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';

import Utils from "../Utils/Utils";

export default class Marker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            points: this.props.points,
            isSelected: this.props.isSelected,
        }
    }

    componentDidMount() {
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            points: nextProps.points,
            isSelected: nextProps.isSelected,
        })
    }

    didClick = () => {
        this.setState({
            isSelected: !this.state.isSelected,
        }, () => {
            this.props.stateChange && this.props.stateChange(this.state.isSelected)
        })
    }

    //[]
    updatePosition = (points) => {
        if (!points || points.length < 4) return
        this.setState({
            points: points
        })
    }

    render() {
        let points = this.state.points
        console.log('point????', points)
        if (!points || points.length < 4) return null
        let toLeft = points[0].x
        let toTop = points[0].y
        let width = points[1].x - points[0].x
        let height = points[2].y - points[0].y
        let isSelected = this.state.isSelected
        return (
            <TouchableHighlight style={[styles.mk, { top: toTop, left: toLeft, width, height }]} underlayColor='transparent' activeOpacity={1} onPress={this.didClick}>
                <View style={[{ flex: 1, backgroundColor: isSelected ? 'rgba(255, 229, 0, 0.1)' : 'transparent', borderWidth: 1, borderColor: isSelected ? 'rgba(255, 230, 0, 1)' : 'white', borderStyle: 'solid' }]}>
                    <Image style={styles.mk_img} source={isSelected ? require('../Resources/lib_kuang_xz.png') : require('../Resources/lib_kuang.png')} />
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    mk: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mk_img: {
        height: Utils.size(21),
        width: Utils.size(21),
    }
})
