import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Comments from './comments';
import Posts from './posts';

const Home = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="posts" component={Posts} />
      <Stack.Screen name="comments" component={Comments} />
    </Stack.Navigator>
  );
};

export default Home;
