/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  requireNativeComponent,
} from 'react-native';

// const MyTextView = requireNativeComponent('MyTextView');
import MyTextView from './MyTextView'

import { NativeEventEmitter, NativeModules, DeviceEventEmitter } from 'react-native';
const { NativeAPI } = NativeModules;

export default class App extends Component {
  constructor() {
    super();
    this.javaEmitter = new NativeEventEmitter(NativeAPI)
    this.state = {
      lbs: {
        lat: 30,
        lng: 104,
      }
    }
  }

  componentDidMount() {
    this.subscription = this.javaEmitter.addListener('LBSChanged', lbs => {
      // DeviceEventEmitter.addListener('LBSChanged', lbs => { // 官网文档这样写的， 但是就没有移除监听了
      console.log('lbsinfo: ', lbs)
      this.setState({
        lbs: { lat: lbs.lat, lng: lbs.lng }
      });
    })
  }

  componentWillUnmount() {
    this.subscription.remove();//不要的时候记得清除
  }

  render() {
    return (
      <View style={styles.container}>
        <MyTextView
          style={{
            width: 200,
            height: 100,
          }}
          text="hahah...."
          size={25}
          // onChangeCapture={event => {
          onChangeXXX={event => console.log('onchange...', event.nativeEvent)}
        />
        <Button title="NativeFunc"
          onPress={() => NativeAPI.nativeFunc('message from js', 1, 2.0)}
        />
        <Button title="33333iisss访问NativeAPI.div2通过Promise获得结果"
          onPress={() => NativeAPI.div2(1, 2)
            .then(r => console.log('success: ', r))
            .catch(err => console.log('failed: ', err))}
        />
        <Button title="访问NativeAPI.div2通过Promise获得结果async/await"
          onPress={async () => {
            try {
              const r = await NativeAPI.div2(1, 0);
              console.log('success: ', r);
            } catch (err) {
              console.log('failed: ', err)
            }
          }}
        />
        <Button title="访问NativeAPI.div通过callback获得结果"
          onPress={() => NativeAPI.div(1, 0,
            r => console.log('success: ', r),
            err => console.log('failed: ', err),
          )}
        />
        <Button title="获取NativeAPI常量"
          onPress={() => {
            console.log(NativeAPI.one, NativeAPI.two);
          }}
        />
        <Text>lbsInfo: lat: {this.state.lbs.lat}, lng: {this.state.lbs.lng}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

