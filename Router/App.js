import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';
import {
  DrawerNavigator, TabNavigator, StackNavigator,
} from 'react-navigation';

const friends = ['tom', 'lucy', 'lily', 'james'];
const MsgList = ({ navigation }) => (
  <View>
    {
      friends.map(name => {
        return <View key={name}>
          <Button
            title={`跟${name}的聊天`}
            onPress={() => navigation.navigate('ChatRoom', { name })}
          />
        </View>
      })
    }
  </View>
)

const Contact = () => (
  <View>
    {
      friends.map(name => (
        <Text key={name}>联系人: {name}</Text>
      ))
    }
  </View>
);

const Info = () => (
  <View>
    {
      friends.map(name => (
        <Text key={name}>{name}发了条消息。。。</Text>
      ))
    }
  </View>
);

const RootNavigator = TabNavigator({
  MsgList: {
    screen: MsgList,
    navigationOptions: {
      title: '消息'
    },
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      title: '联系人'
    },
  },
  Info: {
    screen: Info,
    navigationOptions: {
      title: '动态'
    },
  },
});


class ChatRoom extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.name}`,
  });
  render() {
    const { navigation } = this.props;
    const name = navigation.state.params.name;
    return <View>
      <Text>this is chatroom with {name}.</Text>
    </View>
  }
}

const Msgs = StackNavigator({
  RootNavigator: {
    screen: RootNavigator,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Button title="头像" onPress={() => navigation.navigate('DrawerOpen')} />,
    }),
  },
  ChatRoom: {
    screen: ChatRoom,
  },
})

const SettingScreen1 = ({ navigation }) => (
  <View>
    <Text>设置页面1。。。。</Text>
    <Button title="Go Back" onPress={() => navigation.goBack()} />
  </View>
);

const SettingScreen2 = ({ navigation }) => (
  <View>
    <Text>设置页面2。。。。</Text>
    <Button title="Go Back" onPress={() => navigation.goBack()} />
  </View>
);

const MyApp = DrawerNavigator({
  AllScreen: {
    screen: Msgs,
  },
  Setting1: {
    screen: SettingScreen1,
    navigationOptions: {
      title: '设置页面1',
    }
  },
  Setting2: {
    screen: SettingScreen2,
    navigationOptions: {
      title: '设置页面2',
    }
  },
}, {
    drawerPosition: 'left', // 默认就是left， 如果你想隐藏做右侧修改为right即可
    contentComponent: props => <CustomDrawerContentComponent {...props} />,
  });


const CustomDrawerContentComponent = (props) => {
  return <View style={{ elevation: 10 }}>
    <View style={{ height: 200, backgroundColor: '#6ABFA0' }}>
      <View style={{ marginTop: 50, alignItems: 'center' }}>
        <Button title="设置页面1"
          onPress={() => props.navigation.navigate("Setting1")}
        />
        <Button title="设置页面2"
          onPress={() => props.navigation.navigate("Setting2")}
        />
        <Text> Footer: Designed by Magicly </Text>
      </View>
    </View>
  </View>
};

export default MyApp;