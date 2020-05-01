import React from 'react';
import {Text, View, Button} from 'react-native';

const FirstComponent = ({navigation}) => {
  console.log('working', navigation);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello World! FirstComponent!</Text>
      <Button
        title="Go to Second"
        onPress={() => {
          navigation.navigate('Second');
        }}
      />
    </View>
  );
};
export default FirstComponent;
