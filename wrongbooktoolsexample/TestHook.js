import React, { Component,PureComponent, useState, useEffect} from 'react';
import { Platform, StyleSheet, Text, View,Button,TouchableWithoutFeedback } from 'react-native';
import {  PaperCuter } from 'react-native-palmmob3-wrongbook-tools';

let testpaper1 = require('./testpaper1.jpg');

const useClickCount = (tag) => {
   const [count, setCount] = useState(0);
   useEffect(() => {
     const timer1 = setInterval(() => {
      setCount(count + 1);
      console.log(tag + ', count = ' + count);
     }, 5000);
     return () => {
       clearInterval(timer1);
     };
   });   
   return count;
}

const RenderView1 = (props) => {
  let cnt = useClickCount(props.title);
  return (
    <View><Text>[{props.title}]View[{cnt}] 1 1 1 1 1 1 1 1 1</Text></View>
  );
}

const RenderView2 = (props) => {
  let cnt = useClickCount(props.title);
  return (
    <View><Text>[{props.title}]View[{cnt}] 2 2 2 2 2 2 2 2 2</Text></View>
  );
}

export default TestHook = () => {

  // const count =100;
  const [isOnline, setIsOnline] = useState(null);
  const [count, setCount] = useState(0);
  let btnLabel = "You clicked " + count + " times";

  const handleStatusChange = (status) => {
    setIsOnline(status.isOnline);
  };

  const pressMe = () => {
    console.log('pressMe');
    setCount(count + 1);
  }

  useEffect(() => {
    console.log('useEffect. 1');
    return () => {
      console.log('useEffect. 2');
    };
  }, [count]);

  useEffect(() => {
    console.log('init!');
  },[]);

  return (
    <View style={styles.bg} >  
      <Text>You clicked {count} times</Text>    
      <Button 
        onPress={pressMe} 
        // title={btnLabel}
        title={"断我排位呢"}
      />
      <TouchableWithoutFeedback onPress={pressMe}  >
        <Text>断网。。。。。。。</Text>
      </TouchableWithoutFeedback>
      {RenderView1({title:"$$$$$$$$"})}
      {RenderView2({title:"########"})}
      <RenderView1 title='XXXXX' />
      <RenderView2 title='00000' />
    </View>      
  );
};

const styles = StyleSheet.create({
  papercuter: {    
    backgroundColor: '#000000',
    width: 300,
    height: 500,
    borderWidth: 1,
    borderColor:'#00FF00',
    alignItems:'center'    
  },
  bg: {
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFF00',      
      borderWidth: 1,
      borderColor:'#0000FF'
  },  
});
