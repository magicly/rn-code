import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Navigator,
  Picker,
  RefreshControl,
  ScrollView,
  Slider,
  Switch,
  TouchableHighlight,
  StyleSheet, Text, View,
  WebView,
  Dimensions,
} from 'react-native';

import MyList from './MyList';

export default class App extends React.Component {
  state = {
    language: 'java',
    sliderValue: 0,
    sliderFinalValue: 0,
    switchValue: false,
    modalVisible: false,
    refreshing: false,
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => { // 模拟异步加载数据
      // fetch data
      this.setState({ refreshing: false });
    }, 1000);
  }

  render() {
    return (
      <ScrollView style={{
        marginTop: 30,
      }}>
        <WebView
          source={{ uri: 'https://image.baidu.com/' }}
          style={{
            height: Dimensions.get('window').height - 30,
            width: Dimensions.get('window').width,
          }}
          // onLoadEnd={() => Alert.alert('loadend...')}
          // onError={() => Alert.alert('error.....')}
        />
        <MyList
          data={[ // age是我随便大概写的哈
            { title: 'java', age: 20 },
            { title: 'js', age: 21 },
            { title: 'rust', age: 18 },
            { title: 'python', age: 19 },
            // { key: 'java', title: 'java', age: 20 }, // 也可以这样设置key，就不用keyExtractor了， 但我觉得这种方式太复杂
            // { key: 'js', title: 'js', age: 21 },
            // { key: 'rust', title: 'rust', age: 18 },
            // { key: 'python', title: 'python', age: 19 },
          ]}
        />
        <Button title="ScrollTo" onPress={() => {
          this.refs.scrollView.scrollTo({ x: 300, y: 400, animated: true });
        }} />
        <Button title="ScrollToEnd" onPress={() => {
          this.refs.scrollView.scrollToEnd({ animated: true });
        }} />
        <ScrollView
          ref="scrollView"
          contentContainerStyle={styles.contentContainer}
          // style={styles.contentContainer}
          // horizontal={true}
          // onMomentumScrollBegin={e => Alert.alert('onMomentumScrollBegin: ' + e)}
          // onMomentumScrollEnd={e => Alert.alert('onMomentumScrollEnd: ' + e)}
          pagingEnabled={true}
          stickyHeaderIndices={[0]} // 滑动的时候第一个不动
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {
            ([1, 2, 3, 4, 5]).map(i => (
              <View key={i}>
                <Text>image: {i}</Text>
                <Image
                  style={{ width: 250, height: 250 }}
                  source={{ uri: 'http://e.hiphotos.baidu.com/baike/pic/item/ac6eddc451da81cb6de1cb4d5a66d0160924312e.jpg' }}
                />
              </View>
            ))
          }
        </ScrollView>
        <Modal
          animationType="fade" // 有none（默认），slide， fade三种类型
          transparent={true} // 如果是false的话， 看上去相当于是打开一个全新的view
          visible={this.state.modalVisible} // 决定modal是否显示
          onShow={() => Alert.alert('onshow...')} // modal显示出来会执行此回调函数
          onRequestClose={() => { alert("Modal has been closed.") }} // 当android用户按物理back键或者Apple TV用户按菜单返回键的时候执行
        >
          <View style={{
            marginTop: 22,
            backgroundColor: 'red'
          }}>
            <Text>Hello World!</Text>
            <Button title="Hide Modal" onPress={() => {
              this.setState({ modalVisible: false });
            }} />
          </View>
        </Modal>

        <Button title="Show Modal" onPress={() => {
          this.setState({ modalVisible: true });
        }} />

        <ActivityIndicator
          color="red" // 默认是gray
          size="large" // 默认是small
        />
        <Switch
          value={this.state.switchValue}
          onValueChange={value => this.setState({ switchValue: value })} // Switch为controlled component，必须手动修改value值
          onTintColor="red" // 当开关打开的时候背景颜色
          thumbTintColor="green" // 选择按钮的前景颜色
          tintColor="yellow" // 当开关关闭的时候， 在iOS下是边框颜色， android下是背景颜色
        />
        <Slider
          value={3} // 初始值
          disabled={false} // 如果为true，则无法选择
          minimumValue={1} // 最小值
          maximumValue={10} // 最大值
          step={1} // 步长
          onSlidingComplete={value => this.setState({ sliderFinalValue: value })} // 只在最后完成的时候触发
          onValueChange={value => this.setState({ sliderValue: value })} // 拖动选择过程中一直触发
        />
        <Text>slider value: {this.state.sliderValue}</Text>
        <Text>slider final value: {this.state.sliderFinalValue}</Text>
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ language: itemValue })
          }}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="Rust" value="rust" />
          <Picker.Item label="Python" value="python" />
        </Picker>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
});
