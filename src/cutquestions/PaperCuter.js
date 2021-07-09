
import React, { Component,PureComponent } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { papercuter_styles } from './Styles'
import { TestPaper } from './TestPaper';
import { DragResizeBlock } from '../dragable/DragResizeBlock'

import { 
    CONNECTOR_TOP_LEFT,
    CONNECTOR_TOP_MIDDLE,
    CONNECTOR_TOP_RIGHT,
    CONNECTOR_MIDDLE_RIGHT,
    CONNECTOR_BOTTOM_RIGHT,
    CONNECTOR_BOTTOM_MIDDLE,
    CONNECTOR_BOTTOM_LEFT,
    CONNECTOR_MIDDLE_LEFT,
    CONNECTOR_CENTER,
 } from '../dragable/Connector'

const defaultLimitation = {
    x: 0,
    y: 0,
    w: 300,
    h: 500,
};

const connectors = [            
    CONNECTOR_TOP_LEFT,  
    CONNECTOR_TOP_RIGHT,          
    CONNECTOR_BOTTOM_LEFT,
    CONNECTOR_BOTTOM_RIGHT,
    CONNECTOR_CENTER
];

//裁剪原始图片
export class PaperCuter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paper_rotation:0
        };
    }

    componentDidMount() {

    }

    onRotate() {
        console.log('onRotate');
        this.setState((prevState) => ({
            paper_rotation: prevState.paper_rotation + 90
        }));        
    }

    render() {
        const {
            paperSrc,
            style
        } = this.props;

        let p_roration = this.state.paper_rotation + 'deg';

        return (
            <View  style={[style, papercuter_styles.container]} >

                <TestPaper style={papercuter_styles.testpaper_container} 
                    paper_src={paperSrc} paper_rotation={p_roration}
                    onInit={(limitation) => {

                    }}
                >
                    <DragResizeBlock
                        x={0}
                        y={0}
                        w={style.width}
                        h={100}
                        limitation={defaultLimitation}
                        connectors={connectors}
                        >
                        <View
                            style={papercuter_styles.kuang}
                        />
                    </DragResizeBlock>
                </TestPaper>

                <View style={papercuter_styles.toolbar} >
                    <TouchableOpacity onPress={() => { this.onRotate() }} >
                         <View  style={papercuter_styles.toolbar_rotate}><Text >旋转</Text></View>
                    </TouchableOpacity>
                </View>

            </View>
            
        );
    }
}
