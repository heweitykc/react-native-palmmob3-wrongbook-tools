
import React, { Component,PureComponent, useState,useEffect } from 'react';
import {Text, View,Image,TouchableOpacity } from 'react-native';
import { testpaper_styles } from './Styles'

const defaultLimitation = {
    x: 0,
    y: 0,
    w: 300,
    h: 500,
};


const computeLimition = () => {
    console.log('computeLimition .. ');
    return {
        x: 0,
        y: 0,
        w: 300,
        h: 500,
    };
};

const TestComponent = (props) => {
    console.log(props);
    const [limitation1, setLimitation1] = useState(computeLimition());

    const onContainerInit = (info) => {
        console.log('onContainerInit',info);
    };

    const onRotatePress = () => {
        limitation1.x++;
        setLimitation1({...limitation1});
    };

    useEffect(() => {
        onContainerInit(limitation1);
    }, [props.paperRotation]);

    let rotateStr = props.paperRotation + 'deg';

    let paperimg = (
        <Image source={props.paperSrc} 
            style={[
                testpaper_styles.imbg,
                { 
                    width:100, height:40, 
                    transform: [{rotateZ:rotateStr}] 
                }
            ]}
        />
    );

    return (
        <View style={[testpaper_styles.container]} >
            {paperimg}
            <TouchableOpacity onPress={onRotatePress} >
                <View><Text>加加加加加加加加{limitation1.x}</Text></View>
            </TouchableOpacity>
            {props.children}
        </View>        
    );
};

export default TestComponent;

