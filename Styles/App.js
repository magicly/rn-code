import React from 'react';
import { StyleSheet, ActivityIndicator, Dimensions, SectionList, FlatList, ScrollView, Alert, Button, Text, View, Image, TextInput } from 'react-native';

const MyText = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'Cochin', fontSize: 30 }, style]}>{children}</Text>
}

const TestImageResizeMode = ({ mode }) => {
  return <Image
    style={{
      width: 150,
      height: 150,
      backgroundColor: 'green',
      borderColor: 'red',
      borderWidth: 1,
      opacity: 0.9,
      overflow: 'hidden',
      resizeMode: mode,
    }}
    source={{ uri: 'http://d.hiphotos.baidu.com/image/pic/item/500fd9f9d72a6059fe4ebff42234349b023bba86.jpg' }}
  />
}

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.width = Dimensions.get('window').width;
    this.height = Dimensions.get('window').height;
  }
  render() {
    // Alert.alert(Object.keys(Image.resizeMode).join(' '));
    return (
      <ScrollView style={{
        // marginTop: 20, width: 300, height: 200,
        // borderColor: 'red',
        // borderWidth: 1,
        // borderRadius: 5,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, }}>
          <TestImageResizeMode mode="contain" />
          <TestImageResizeMode mode="cover" />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, }}>
          <TestImageResizeMode mode="stretch" />
          <TestImageResizeMode mode="center" />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, }}>
          <TestImageResizeMode mode="repeat" />
        </View>

        <View style={{
          position: 'absolute',
          bottom: 10,
          right: 20,
          marginLeft: 10,
          width: 80,
          height: 50,
          backgroundColor: 'hsla(360, 100%, 100%, 0.50)',
          borderRadius: 5,
          borderColor: 'green',
          borderWidth: 1,
          borderStyle: 'dotted',
          opacity: 0.5,
        }}><Text>position</Text></View>

        <MyText>this is default text.</MyText>
        <MyText style={{ color: 'red', fontSize: 40 }}>
          this is a big red text!
          <View style={{ width: 100, height: 30 }}>
            <Text>this text has no style.</Text>
          </View>
          <Text>this text has styles.</Text>
        </MyText>
        <Text style={{ fontFamily: 'Cochin', fontSize: 15, fontWeight: 'bold', fontStyle: 'italic' }}>
          base text
          <Text style={{ fontSize: 20, fontStyle: 'normal' }}>nest text..</Text>
          and this text is <Text style={{ color: 'red' }}>red!</Text>
        </Text>

        <Text>
          There is a blue square
          <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} />
          in between my text.
        </Text>
        <Text style={{ fontStyle: 'italic' }}>
          <Text>First part and </Text>
          <Text>second part</Text>
        </Text>
        <View>
          <Text>First part and </Text>
          <Text>second part</Text>
        </View>
      </ScrollView>
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