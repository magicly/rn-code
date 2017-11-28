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
  View
} from 'react-native';

import MapView from './MapView.js';
import { NativeEventEmitter, NativeModules } from 'react-native';
const { ObjectCAPI, SwiftAPI } = NativeModules;

export default class App extends Component {
  constructor() {
    super();
    this.objectCEmitter = new NativeEventEmitter(ObjectCAPI)
    this.state = {
      lbs: {
        lat: 30,
        lng: 104,
      }
    }
  }

  componentDidMount() {
    this.subscription = this.objectCEmitter.addListener('LBSChanged',
      lbs => {
        console.log(lbs);
        this.setState({
          lbs: { lat: lbs.lat, lng: lbs.lng }
        });
      }
    )
  }

  componentWillUnmount() {
    this.subscription.remove();//不要的时候记得清除
  }

  render() {
    const region = {
      latitude: 30.67,
      longitude: 104.06,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    return <MapView
      style={{ flex: 1 }}
      region={region}
      zoomEnabled={false}
      onRegionChange={event => console.log('拖动地图', event)}
    />
    return (
      <View style={styles.container}>
        <Button title="获取Swift常量"
          onPress={() => {
            SwiftAPI.add(1, 0, (...result) => console.log(result));
          }}
        />
        <Button title="获取Swift常量"
          onPress={() => {
            console.log(SwiftAPI.x, SwiftAPI.y, SwiftAPI.z)
          }}
        />
        <Button title="模拟LBS位置切换"
          onPress={() => {
            setInterval(() => ObjectCAPI.mockChangeLBS(
              this.state.lbs.lat + Math.random(),
              this.state.lbs.lng + Math.random())
              , 1000);
          }}
        />
        <Text>lbsInfo: lat: {this.state.lbs.lat}, lng: {this.state.lbs.lng}</Text>
        <Button title="访问ObjectCAPI"
          onPress={() => {
            ObjectCAPI.nativeFunc('this is a message from js.');
          }}
        />
        <Button title="访问ObjectCAPI通过callback获得结果"
          onPress={() => {
            ObjectCAPI.resultFromNativeByCallback(1, 2, (err, result) => {
              console.log('err: ' + err + ' result: ' + typeof (result) + JSON.stringify(result))
              this.setState({
                result,
              })
            });
          }}
        />
        <Button title="访问ObjectCAPI通过Promise获得结果async/await"
          onPress={async () => {
            try {
              const result = await ObjectCAPI.resultFromNativeByPromise(1, 5)
              console.log('result: ' + typeof (result) + JSON.stringify(result))
              this.setState({
                result,
              })
            } catch (error) {
              console.log('error: ', error);
              this.setState({
                error: error.code
              })
            };
          }}
        />
        <Button title="访问ObjectCAPI通过Promise获得结果"
          onPress={() => {
            ObjectCAPI.resultFromNativeByPromise(1, 0)
              .then(result => {
                console.log('result: ' + typeof (result) + JSON.stringify(result))
                this.setState({
                  result,
                })
              })
              .catch(error => {
                console.log('error: ', error);
                this.setState({
                  error: error.code
                })
              });
          }}
        />
        <Button title="访问ObjectCAPI常量"
          onPress={() => {
            Alert.alert('name: ' + ObjectCAPI.name + " age: " + ObjectCAPI.age);
          }}
        />
        <Text>result from native: {this.state.result}</Text>
        <Text>error: {this.state.error}</Text>
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

