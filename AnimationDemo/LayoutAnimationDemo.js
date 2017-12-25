import React from 'react';
import {
  Animated,
  Button,
  Image,
  LayoutAnimation,
  Text,
  UIManager,
  View,
  StyleSheet,
} from 'react-native';

// 没有下面这行代码Android没有效果
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LayoutAnimationDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      width: 100,
      height: 100
    };
  }
  zoom(bigger) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear, (args) => {
      console.log('zoom over.', args)
    });
    // const config = LayoutAnimation.create(500, LayoutAnimation.Types.linear, LayoutAnimation.Properties.scaleXY);
    // LayoutAnimation.configureNext(config);
    // LayoutAnimation.configureNext({
    //   duration: 800,
    //   create: {
    //     type: LayoutAnimation.Types.linear,
    //     property: LayoutAnimation.Properties.scaleXY,
    //   },
    //   update: {
    //     type: LayoutAnimation.Types.linear,
    //   },
    // });
    this.setState({
      width: bigger ? this.state.width + 50 : this.state.width - 50,
      height: bigger ? this.state.height + 50 : this.state.height - 50,
    })
  }
  bigger = () => {
    this.zoom(true);
  }
  smaller = () => {
    this.zoom(false);
  }
  movePosition = (right = true) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear, (args) => {
      console.log('movePosition over.', args)
    });
    this.setState({
      left: right ? this.state.left + 50 : this.state.left - 50,
    });
  }
  right = () => {
    this.movePosition(true);
  }
  left = () => {
    this.movePosition(false);
  }
  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <Text>LayoutAnimationDemo</Text>
        <Image
          ref='image'
          source={require('./logo.png')}
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