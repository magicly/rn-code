import React from 'react';
import {
  FlatList,
  Text,
  TouchableHighlight
} from 'react-native';

const MyItem = ({ title, age, selected, onPress }) => {
  return <TouchableHighlight
    style={{
      height: 50,
      backgroundColor: selected ? 'red' : 'white',
    }}
    onPress={() => onPress(title)}
  >
    <Text>this is {title}, age is: {age}...</Text>
  </TouchableHighlight>
}

class MyList extends React.Component {
  state = { selected: new Map() };

  _onPressItem = title => {
    const selected = this.state.selected;
    selected.set(title, !selected.get(title));
    this.setState({
      selected: selected,
    })
  };

  _renderItem = (props) => {
    const item = props.item;
    return <MyItem
      title={item.title}
      age={item.age}
      onPress={this._onPressItem}
      selected={!!this.state.selected.get(item.title)}
    />
  };

  render() {
    return (
      <FlatList
        style={{
          height: 500,
          borderColor: 'red',
          borderWidth: 1,
        }}
        data={this.props.data}
        renderItem={this._renderItem}
        numColumns={1}
        keyExtractor={(item, index) => item.title}
      />
    );
  }
}

export default MyList;