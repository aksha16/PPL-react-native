import React from 'react';
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native';

const Timeline = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        <Text>Hi, I'm TimeLine. What's up????</Text>
      </ScrollView>
      <View>
        <Text>footer</Text>
      </View>
    </View>
  );
};

export default Timeline;
