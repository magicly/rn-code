import React from 'react';
import { Animated, Text, View } from 'react-native';

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // 初始透明度：0
  }

  componentDidMount() {
    Animated.timing(// 随时间变化
      this.state.fadeAnim,
      {
        toValue: 1, // 最终变化到1（不透明）
        duration: 1000,// 动画持续时间， 1000ms
      }
    ).start();// 开始动画
  }

  render() {
    return (
      <Animated.View// 动画View
        style={{
          ...this.props.style,
          opacity: this.state.fadeAnim,         // 将透明度设置为变化的state
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FadeInView style={{ width: 250, height: 50, backgroundColor: 'powderblue' }}>
          <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>Fading in</Text>
        </FadeInView>
      </View>
    )
  }
}