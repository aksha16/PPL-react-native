import React from 'react';
import {Text, View} from 'react-native';

const SecondComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world, SecondComponent!</Text>
    </View>
  );
};

export default SecondComponent;
