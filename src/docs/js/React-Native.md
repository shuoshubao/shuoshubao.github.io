# Getting Started

> brew install node
> 
> brew install watchman
> 
> $ npm install -g react-native-cli
>
> react-native init AwesomeProject
> 
> cd AwesomeProject
> 
> react-native run-ios

# Hello world

```
import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';

class Hello extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => Hello);
```

# Component

## react-native

* AppRegistry
* StyleSheet

# base

* View
* ListView
* ScrollView
* Navigator
* Text
* Image
* TextInput
* TouchableHighlight

* Animated
* LayoutAnimation
* TouchableOpacity
