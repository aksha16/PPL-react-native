import React from 'react';
import {Text, View, Button, Image, TouchableHighlight} from 'react-native';

const FirstComponent = ({navigation}) => {
  console.log('working', navigation);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../images/logo.png')} />
      <TouchableHighlight style={{backgroundColor:'red'}}>
        <Text>Hello World! FirstComponent!</Text>
      </TouchableHighlight>

      <Button
        title="Go to Registration"
        onPress={() => {
          navigation.navigate('Registration');
        }}
      />
    </View>
  );
};
export default FirstComponent;
