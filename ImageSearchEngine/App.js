import React from 'react';
import { StyleSheet, ActivityIndicator, Dimensions, SectionList, FlatList, ScrollView, Alert, Button, Text, View, Image, TextInput } from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: true,
      imgs: [],
    }
    this.width = Dimensions.get('window').width;
    this.height = Dimensions.get('window').height;
  }
  componentDidMount() {
    this.searchHandler();
  }
  async getImgsFromBaidu(query) {
    try {
      let response = await fetch(`https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=${query}&oq=${query}&rsp=-1`);
      let html = await response.text();
      const start = "app.setData('imgData', ";
      const end = ']}';
      const startIndex = html.indexOf(start);
      const endIndex = html.indexOf(end, startIndex);
      const dataStr = html.slice(startIndex + start.length, endIndex + end.length);
      const data = JSON.parse(dataStr.replace(/'/g, '"'));
      return data
    } catch (error) {
      Alert.alert('error: ' + error)
      console.error(error);
    }
  }
  async searchHandler(query = '汉源湖') {
    query = query || '汉源湖';// default parameter只处理undefined的情况
    this.setState({
      isLoading: true,
    });
    const data = await this.getImgsFromBaidu(query);
    const imgs = data.data.map(e => {
      delete e.base64;
      return e;
    }).filter(e => !!e.thumbURL);
    this.setState({
      isLoading: false,
      imgs,
    })
  }
  buttonHandler = () => {
    this.searchHandler(this.state.text);
  }
  render() {
    return (
      <View >
        <ScrollView>
          <View style={{ height: 20 }} />
          <View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <TextInput style={{
                width: 300,
                height: 40,
                borderColor: 'black',
                borderWidth: 1,
              }}
                placeholder="汉源湖"
                onChangeText={text => this.setState({ text })}
              />
              <Button
                onPress={this.buttonHandler}
                title="搜索"
                color="#841584"
              />
            </View>
          </View>
          {
            this.state.isLoading ? <ActivityIndicator />
              :
              <FlatList
                data={this.state.imgs}
                renderItem={({ item }) => {
                  const img = item;
                  if (!img.thumbURL) {
                    return null;
                  }
                  return <Image
                    style={{ width: this.width, height: this.width * img.height / img.width }}
                    source={{ uri: img.thumbURL }}
                  />
                }}
                keyExtractor={(item, index) => {
                  return item.thumbURL;
                }}
              />
          }
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;