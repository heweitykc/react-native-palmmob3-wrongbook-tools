
import {StyleSheet } from 'react-native';

const testpaper_styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    imbg: {
        position:'absolute',
        zIndex: -100,
        top:0,
        left:0,
        borderWidth:1,
        borderColor:"#FF0000"
    },    
    resize_container: {
        flex:1,
        width: '100%',
        // backgroundColor: '#0000FF',
        borderColor:'#FF0000',
        borderWidth:1
    },
    kuang: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor:'#000FFF',
    },   
});

export {
    testpaper_styles
};