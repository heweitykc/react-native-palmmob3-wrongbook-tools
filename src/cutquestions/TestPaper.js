
import React, { Component,PureComponent } from 'react';
import {Text, View,Image } from 'react-native';
import { testpaper_styles } from './Styles'
import { DragResizeContainer } from '../dragable/DragResizeContainer'

//试卷容器
export class TestPaper extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            img_width:200,
            img_height:500,
        };
    }

    resizeImg(uri, w, h, rotation){
        Image.getSize(uri, (evt1, evt2)=>{
            console.log(evt1, evt2);
        });
    }

    render() {
        const {
          style,
          children,
          onInit,
          paper_src,
          paper_rotation
        } = this.props;
            
        return (
            <View style={[style,testpaper_styles.container]} >
                <Image source={paper_src} 
                    style={[testpaper_styles.imbg,  { width:this.state.img_width, height:this.state.img_height, transform: [{ rotateZ: paper_rotation }] }]} 
                />
                <DragResizeContainer
                    style={testpaper_styles.resize_container}
                    onInit={onInit}
                >
                {children}
                </DragResizeContainer>
            </View>
            
        );
      }

}

