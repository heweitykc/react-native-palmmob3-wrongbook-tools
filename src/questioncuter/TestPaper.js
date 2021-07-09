
import React, { Component,PureComponent, useState } from 'react';
import {Text, View,Image,TouchableOpacity } from 'react-native';
import { testpaper_styles } from './Styles'
import { DragResizeContainer } from '../dragable/DragResizeContainer'
import { DragResizeBlock } from '../dragable/DragResizeBlock'

let containerInfo = null;
let imgInfo = {w:0, h:0};

const TestPaper = (props) => {
    console.log("TestPaper render",props);
    // const [paperSize, setPaperSize] = useState({w:200,h:400});
    // const [paperRotate, setPaperRotate] = useState(0);
    const [paperLayout,setPaperLayout] = useState({w:200,h:400,r:0,x:0,y:0});
    
    // const Ref = useRef(null)
    
    const onContainerInit = (info) => {
        containerInfo = info;
        console.log(containerInfo);
        let resInfo = Image.resolveAssetSource(props.paperSrc);
        imgInfo.w = resInfo.width;
        imgInfo.h = resInfo.height;
        // Image.getSize(props.paperSrc, (width, height) => {            
        //     paperInfo.w = width;
        //     paperInfo.h = height;
        //     console.log(paperInfo)
        //     relayoutPaper();
        // });
        relayoutPaper();
    };

    const relayoutPaper = () => {
        let container_ratio = containerInfo.w / containerInfo.h;
        let img_ratio = imgInfo.w / imgInfo.h;
        console.log(container_ratio, img_ratio);
        
        if(paperLayout.r % 180 === 0){  //竖排
            if(container_ratio >= img_ratio){
                paperLayout.h = containerInfo.h;
                paperLayout.w = paperLayout.h * img_ratio;
                paperLayout.x = (containerInfo.w - paperLayout.w)*0.5;
                paperLayout.y = 0;                
            } else {
                paperLayout.w = containerInfo.w;
                paperLayout.h = paperLayout.w / img_ratio;
                paperLayout.y = (containerInfo.h - paperLayout.h)*0.5;
                paperLayout.x = 0;   
            }
        } else {                        //横排
            if(container_ratio >= img_ratio){
                paperLayout.h = containerInfo.w;
                paperLayout.w = paperLayout.h * img_ratio;    
                paperLayout.x = (containerInfo.w - paperLayout.w)*0.5;
                paperLayout.y = (containerInfo.h - paperLayout.h)*0.5;            
            } else {
                paperLayout.w = containerInfo.h;
                paperLayout.h = paperLayout.w / img_ratio;
                paperLayout.x = (containerInfo.w - paperLayout.w)*0.5;
                paperLayout.y = (containerInfo.h - paperLayout.h)*0.5;  
            }

        }
        console.log(paperLayout);
        setPaperLayout({...paperLayout});
    };

    const onRotatePress = () => {
        console.log('onRotate',paperLayout);
        paperLayout.r = (paperLayout.r + 90) % 360;        
        relayoutPaper();
    };

    return (
        <View style={[testpaper_styles.container]} >
            <Image source={props.paperSrc} 
                style={[
                    testpaper_styles.imbg, 
                    { 
                        width:paperLayout.w, height:paperLayout.h, 
                        transform: [{translateX:paperLayout.x}, {translateY:paperLayout.y}, {rotateZ: paperLayout.r + 'deg' }] 
                    }
                ]}
            />

            <DragResizeContainer
                style={testpaper_styles.resize_container}
                onInit={onContainerInit}
            >            
            </DragResizeContainer>

            <View style={testpaper_styles.toolbar} >
                <TouchableOpacity onPress={onRotatePress} >
                    <View  style={testpaper_styles.toolbar_rotate}><Text>旋转</Text></View>
                </TouchableOpacity>                
            </View>
        </View>        
    );
};

export default TestPaper;

// //试卷容器
// export class TestPaper extends PureComponent {

//     constructor(props) {
//         super(props);

//         this.state = {
//             img_width:200,
//             img_height:500,
//         };
//     }

//     resizeImg(uri, w, h, rotation){
//         Image.getSize(uri, (evt1, evt2)=>{
//             console.log(evt1, evt2);
//         });
//     }

//     render() {
//         const {
//           style,
//           children,
//           onInit,
//           paper_src,
//           paper_rotation
//         } = this.props;
            
//         return (
//             <View style={[style,testpaper_styles.container]} >
//                 <Image source={paper_src} 
//                     style={[testpaper_styles.imbg,  { width:this.state.img_width, height:this.state.img_height, transform: [{ rotateZ: paper_rotation }] }]} 
//                 />
//                 <DragResizeContainer
//                     style={testpaper_styles.resize_container}
//                     onInit={onInit}
//                 >
//                 {children}
//                 </DragResizeContainer>
//             </View>
            
//         );
//       }

// }

