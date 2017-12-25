import React from 'react';
import {
  Animated,
  Button,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class RequestAnimationFrameDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      width: 100,
      height: 100
    };
  }
  zoom(bigger) {
    let count = 0;
    while (++count < 50) {
      requestAnimationFrame(() => {
        this.setState({
          width: bigger ? this.state.width + 1 : this.state.width - 1,
          height: bigger ? this.state.height + 1 : this.state.height - 1,
        });
      });
    }
  }
  bigger = () => {
    this.zoom(true);
  }
  smaller = () => {
    this.zoom(false);
  }
  movePosition = (right = true) => {
    let count = 0;
    while (++count < 50) {
      requestAnimationFrame(() => {
        this.setState({
          left: right ? this.state.left + 1 : this.state.left - 1,
        });
      });
    }
  }
  right = () => {
    this.movePosition(true);
  }
  left = () => {
    this.movePosition(false);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>RequestAnimationFrameDemo</Text>
        <Image source={require('./logo.png')}
          style={{
            left: this.state.left,
            width: this.state.width,
            height: this.state.height,
          }} />
        <Button
          title="Go to Right!"
          onPress={() => this.right()}
        />
        <Button
          title="Go to Left!"
          onPress={() => this.left()}
        />
        <Button
          title="Bigger!"
          onPress={() => this.bigger()}
        />
        <Button
          title="Smaller!"
          onPress={() => this.smaller()}
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