import React from 'react';
import {
  Animated,
  Button,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class AnimatedDemo extends React.Component {
  constructor() {
    super();
    this.direction = -1;
  }
  state = {
    width: new Animated.Value(100),
    height: new Animated.Value(100),
    left: new Animated.Value(0),
  }
  zoom = () => {
    this.direction *= -1;
    this.zoomAnimation && this.zoomAnimation.stop();
    this.zoomAnimation = Animated.parallel([
      Animated.timing(this.state.width,
        {
          toValue: 100 + this.direction * 50,
          duration: 1000,
        }
      ),
      Animated.timing(this.state.height,
        {
          toValue: 100 + this.direction * 50,
          duration: 1000,
        }
      ),
    ])
    this.zoomAnimation.start(this.zoom);
  }
  stopZoom = () => {
    console.log('stopZoom', this.zoomAnimation);
    this.zoomAnimation.stop();
  }
  movePosition = () => {
    this.state.left.stopAnimation(value => console.log(value));
    this.direction *= -1;
    // this.state.left.setValue(0);
    Animated.timing(this.state.left,
      {
        toValue: this.direction * 100,
        duration: 1000,
      }).start(this.movePosition);
  }
  render() {
    console.log('===========', this.state.width)
    return (
      <View style={styles.container}>
        <Text>RequestAnimationFrameDemo</Text>
        <Animated.Image source={require('./logo.png')}
          style={{
            left: this.state.left,
            width: this.state.width,
            height: this.state.height,
          }} />
        <Button
          title="Translate!"
          onPress={() => this.movePosition()}
        />
        <Button
          title="Zoom!"
          onPress={() => this.zoom()}
        />
        <Button
          title="Stop Zoom!"
          onPress={() => this.stopZoom()}
        />
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