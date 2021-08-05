import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';

export default class PhotoTailor extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {

    }

    back = () => {
        this.props.navigation.pop()
    }

    forward = () => {
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' }}>
                <TouchableHighlight style={{ width: 100, height: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} onPress={this.back}>
                    <Text style={{ fontSize: 25, color: 'yellow' }}>{'<-'}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{ marginTop: 50, width: 100, height: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} onPress={this.forward}>
                    <Text style={{ fontSize: 25, color: 'yellow' }}>{'->'}</Text>
                </TouchableHighlight>
            </View>
        )
    }

}