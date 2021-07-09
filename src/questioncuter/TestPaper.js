
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

const computePaperLayout = (props,containerInfo,imgInfo,tag) => {
    console.log('computePaperLayout...',containerInfo,imgInfo,props);

    let layout = {w:0,h:0,x:0,y:0};

    if(!containerInfo) return layout;
    if(imgInfo.width <= 0)  return layout;

    let container_ratio = containerInfo.w / containerInfo.h;    
    console.log(container_ratio);
    
    if(props.paperRotation % 180 === 0){  //竖排
        let img_ratio = imgInfo.width / imgInfo.height;
        if(container_ratio >= img_ratio){
            console.log('1');
            layout.h = containerInfo.h;
            layout.w = layout.h * img_ratio;
            layout.x = (containerInfo.w - layout.w)*0.5;
            layout.y = 0;                
        } else {
            console.log('2');
            layout.w = containerInfo.w;
            layout.h = layout.w / img_ratio;
            layout.y = (containerInfo.h - layout.h)*0.5;
            layout.x = 0;   
        }
    } else {                        //横排      
        let img_ratio = imgInfo.height / imgInfo.width;  
        if(container_ratio < img_ratio){
            console.log('3');
            layout.h = containerInfo.w;
            layout.w = layout.h / img_ratio;    
            layout.x = (containerInfo.w - layout.w)*0.5;
            layout.y = (containerInfo.h - layout.h)*0.5;            
        } else {
            console.log('4');
            layout.w = containerInfo.h;
            layout.h = layout.w * img_ratio;
            layout.x = (containerInfo.w - layout.w)*0.5;
            layout.y = (containerInfo.h - layout.h)*0.5;  
        }

    }

    console.log('computePaperLayout result ', layout);
    return layout;
};

const TestPaper = (props) => {
    const onDragEnd = (evt) => {
        console.log(evt);
        if(props.onDragStart !== null) {
            props.onDragEnd(evt);
        }        
    };

    const onResizeEnd = (info) => {
        console.log(info);
        if(props.onResizeEnd !== null) {
            props.onResizeEnd(info);
        }
    };

    const onContainerInit = (info) => {
        console.log('onInit ', info);
        setLimitation1({...info});
        let resInfo = Image.resolveAssetSource(props.paperSrc);
        let newlayout = computePaperLayout(props, info, resInfo,'oninit');
        setPaperLayout({...newlayout});
    };

    const [paperLayout,setPaperLayout] = useState(computePaperLayout(props,null,null,'usestate'));
    const [limitation1, setLimitation1] = useState(defaultLimitation);
    
    console.log("render paperLayout=",paperLayout);
    let rotateStr = props.paperRotation + 'deg';

    useEffect(() => {
        onContainerInit(limitation1);
    }, [props.paperRotation]);

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

