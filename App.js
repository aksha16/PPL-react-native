import 'react-native-gesture-handler';
import React from 'react';
import {Text, View} from 'react-native';
import FirstComponent from './components/firstComponent';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world!!!</Text>
      <FirstComponent />
        
    </View>
  );
};
export default App;
