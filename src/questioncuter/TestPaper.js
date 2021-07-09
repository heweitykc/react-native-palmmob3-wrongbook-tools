
import React, { Component,PureComponent, useState,useEffect } from 'react';
import {Text, View,Image,TouchableOpacity } from 'react-native';
import { testpaper_styles } from './Styles'
import { DragResizeContainer } from '../dragable/DragResizeContainer'
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

let containerInfo = null;
let imgInfo = {w:0, h:0};
const defaultLimitation = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
};
const connectors = [            
    CONNECTOR_TOP_LEFT,  
    CONNECTOR_TOP_RIGHT,          
    CONNECTOR_BOTTOM_LEFT,
    CONNECTOR_BOTTOM_RIGHT,
    CONNECTOR_CENTER
];

const TestPaper = (props) => {

    console.log("TestPaper render",props);

    const computePaperLayout = () => {
        console.log('computePaperLayout,' + props.paperRotation);
        let layout = {w:0,h:0,x:0,y:0};

        if(!containerInfo) return layout;
        if(imgInfo.w <= 0)  return layout;

        let container_ratio = containerInfo.w / containerInfo.h;
        let img_ratio = imgInfo.w / imgInfo.h;
        console.log(container_ratio, img_ratio);
        
        if(props.paperRotation % 180 === 0){  //竖排
            if(container_ratio >= img_ratio){
                layout.h = containerInfo.h;
                layout.w = layout.h * img_ratio;
                layout.x = (containerInfo.w - layout.w)*0.5;
                layout.y = 0;                
            } else {
                layout.w = containerInfo.w;
                layout.h = layout.w / img_ratio;
                layout.y = (containerInfo.h - layout.h)*0.5;
                layout.x = 0;   
            }
        } else {                        //横排
            if(container_ratio >= img_ratio){
                layout.h = containerInfo.w;
                layout.w = layout.h * img_ratio;    
                layout.x = (containerInfo.w - layout.w)*0.5;
                layout.y = (containerInfo.h - layout.h)*0.5;            
            } else {
                layout.w = containerInfo.h;
                layout.h = layout.w / img_ratio;
                layout.x = (layout.w - layout.w)*0.5;
                layout.y = (containerInfo.h - layout.h)*0.5;  
            }

        }

        console.log('computePaperLayout = ', layout);
        return layout;
    };

    const onDragEnd = (evt) => {
        console.log(evt);
        if(props.onDragStart !== null) {
            props.onDragEnd(evt);
        }        
    };

    const onResizeEnd = (info) => {
        console.log(info);
        if(props.onResizeEnd !== null) {
            props.onResizeEnd(evt);
        }
    };

    const onContainerInit = (info) => {
        containerInfo = info;
        console.log('onInit');
        console.log(containerInfo);
        setLimitation1({...info});
        let resInfo = Image.resolveAssetSource(props.paperSrc);
        imgInfo.w = resInfo.width;
        imgInfo.h = resInfo.height;
        let newlayout = computePaperLayout();
        setPaperLayout({...newlayout});
    };

    const [paperLayout,setPaperLayout] = useState(computePaperLayout());
    const [limitation1, setLimitation1] = useState(defaultLimitation);

    console.log(paperLayout);
    let rotateStr = props.paperRotation + 'deg';

    return (
        <View style={[testpaper_styles.container]} >
            <Image source={props.paperSrc} 
                style={[
                    testpaper_styles.imbg, 
                    { 
                        width:paperLayout.w, height:paperLayout.h, 
                        transform: [{translateX:paperLayout.x}, {translateY:paperLayout.y}, {rotateZ:rotateStr}] 
                    }
                ]}
            />

            <DragResizeContainer
                style={testpaper_styles.resize_container}
                onInit={onContainerInit}
            >
                <DragResizeBlock
                    x={0}
                    y={0}
                    w={paperLayout.w}
                    h={100}
                    limitation={limitation1}
                    connectors={connectors}
                    onDragEnd={onDragEnd}
                    onResizeEnd={onResizeEnd}
                    >
                    <View style={testpaper_styles.kuang} />
                </DragResizeBlock>
            </DragResizeContainer>


        </View>        
    );
};

export default TestPaper;

