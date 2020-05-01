import React from 'react';
import {Text, View, Button} from 'react-native';

const SecondComponent = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world, SecondComponent!</Text>
      <Button
        title="go to First"
        onPress={() => {
          navigation.navigate('First');
          //navigation.goBack()
        }}
      />
    </View>
  );
};

export default SecondComponent;
