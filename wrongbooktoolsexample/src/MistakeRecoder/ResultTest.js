import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight, Image, StatusBar } from 'react-native';

import NavBar from "./Views/NavBar";
import { Utils } from '../../libs/Utils'

export default class ResultTest extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {

    }

    navBack = () => {
        this.props.navigation.pop()
    }

    render() {
        const { imgUri } = this.props.route.params

        return (
            <View style={{ flex: 1 }} >
                <NavBar title='裁剪结果' titleColor='black' bgColor='white' backAction={this.navBack} backImg={require('./Resources/back_black.png')} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 200, height: 200 }} resizeMode='contain' source={{ uri: imgUri }} />
                </View>
            </View>
        )
    }

}