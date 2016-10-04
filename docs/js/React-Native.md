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

class AwesomeProject extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
```

# Component

## react-native

* AppRegistry
* StyleSheet

# basic

* View
* ListView
* ScrollView
* Navigator
* Text
* Image
* TextInput