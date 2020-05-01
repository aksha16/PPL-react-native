import 'react-native-gesture-handler';
import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'

import FirstComponent from './components/firstComponent';
import SecondComponent from './components/secondComponent';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="First">
        <Stack.Screen name="First" component={FirstComponent} />
        <Stack.Screen name="Second" component={SecondComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
