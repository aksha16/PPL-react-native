import React from 'react';
import {Text, View} from 'react-native';

const FirstComponent = () => {
    console.log("woeking")
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
         
      <Text>Hello, world, FirstCompoenet!</Text>
    </View>
  );
};
export default FirstComponent;
