import 'react-native-gesture-handler';
import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import FirstComponent from './components/firstComponent';
import SecondComponent from './components/secondComponent';
import Registration from './components/registration';
import Login from './components/Login';

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <Text style={styles.ppl}>PPL</Text>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{header: () => null}}
          initialRouteName="Login">
          <Stack.Screen
            options={{headerTitle: 'Login'}}
            name="Login"
            component={Login}
          />
          {/* <Stack.Screen name="Second" component={SecondComponent} /> */}
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  ppl: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 5,
  },
});

export default App;
