import React from 'react';
import {
  Alert,
  AsyncStorage,
  AppState,
  Button,
  Clipboard,
  Dimensions,
  NetInfo,
  Platform,
  PixelRatio,
  StyleSheet, Text, View,
  Vibration,
} from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      window: Dimensions.get('window'),
      appState: AppState.currentState,
      value: 'default value',
    }
  }
  componentDidMount() {
    AppState.addEventListener('change', this.appStateChangeHanler);

    Dimensions.addEventListener('change', event => {
      Alert.alert(JSON.stringify(event));
      this.setState({
        window: Dimensions.get('window'),
      })
    })
    Alert.alert('styles.container: ' + styles.container + JSON.stringify(StyleSheet.flatten(styles.container)))
  }
  componentWillMount() {
    AppState.removeEventListener('change', this.appStateChangeHanler);
  }
  appStateChangeHanler = (nextState) => {
    Alert.alert('' + nextState);
    this.setState({
      appState: nextState,
    })
  }
  saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      Alert.alert('error: ', error);
    }
  }
  getData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      this.setState({
        value: value,
      });
    } catch (error) {
      Alert.alert('error: ', error);
    }
  }
  render() {
    // Alert.alert('rendering...');
    const d = new Date();
    const obj = { a: 1 };
    // const window = Dimensions.get('window'); // 屏幕旋转的时候不会触发render， 所以旋转之后还是使用上次获取的window，宽和高对不上
    const window = this.state.window; // 屏幕旋转的时候不会触发render， 所以旋转之后还是使用上次获取的window，宽和高对不上
    const DURATION = 10000;
    const PATTERN = [1000, 2000, 3000];
    return (
      <View style={styles.container}>
        <Text>当前平台是：{Platform.OS}, Version: {Platform.Version}</Text>

        <Button title="振动一次" onPress={() => {
          Vibration.vibrate(DURATION); // Android振动10s， iOS不支持配置振动时间，所以会忽略duration参数，振动固定时间（大概是500ms）
        }} />
        <Button title="振动多次" onPress={() => {
          Vibration.vibrate(PATTERN);
          // Android: wait 1s -> vibrate 2s -> wait 3s
          // iOS: wait 1s -> vibrate -> wait 2s -> vibrate -> wait 3s -> vibrate
        }} />
        <Button title="一直振动" onPress={() => {
          Vibration.vibrate(PATTERN, true);
          // Android: wait 1s -> vibrate 2s -> wait 3s -> wait 1s -> vibrate 2s -> wait 3s -> ...
          // iOS: wait 1s -> vibrate -> wait 2s -> vibrate -> wait 3s -> vibrate -> wait 1s -> vibrate -> wait 2s -> vibrate -> wait 3s -> vibrate -> ...
        }} />
        <Button title="取消振动" onPress={() => {
          Vibration.cancel();
        }} />

        <Button title="GetClipBoard" onPress={async () => {
          const content = await Clipboard.getString();
          Alert.alert('从其他app里复制过来的内容： ' + content);
        }} />
        <Button title="SetClipBoard" onPress={async () => {
          await Clipboard.setString('这段文字现在被放在粘贴板里了， 可以去其他app的输入框里试一下能不能粘贴出来。');
        }} />

        <Button title="获取地理位置" onPress={() => {
          navigator.geolocation.getCurrentPosition(info => {
            Alert.alert('info: ' + JSON.stringify(info));
          })
        }} />


        <Button title="SaveData" onPress={() => { this.saveData('magicly', { name: 'maicly', age: 25 }) }} />
        <Button title="GetData" onPress={() => { this.getData('magicly') }} />
        <Text>存储的数据：{this.state.value}</Text>


        <Text>APP状态：{this.state.appState}</Text>

        <Button title="NetInfo" onPress={() => {
          NetInfo.getConnectionInfo().then(connectionInfo => {
            Alert.alert('type:' + connectionInfo.type + ' effectiveType:' + connectionInfo.effectiveType);
          })
        }} />

        <Button title="PixelRatio" onPress={() => {
          const pr = PixelRatio.get();
          const pixelSize1 = PixelRatio.getPixelSizeForLayoutSize(100);
          const pixelSize2 = PixelRatio.getPixelSizeForLayoutSize(100.3); // 能正确处理小数
          Alert.alert('PixelRatio: ' + pr + ' getPixelSizeForLayoutSize: ' + pixelSize1 + ' ' + pixelSize2);
        }} />
        <Button title="Dimensions" onPress={() => Alert.alert(JSON.stringify(window))} />
        <Button title="Test Alert String" onPress={() => Alert.alert('this is alert.')} />
        <Button title="Test Alert Array(would crash!)" onPress={() => Alert.alert([1, 2, 3])} />
        <Button title="Test Alert Object(would crash!)" onPress={() => Alert.alert(obj)} />
        <Button title="Test Alert Date" onPress={() => Alert.alert(d)} />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
const styles = ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
