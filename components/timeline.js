import React, { useEffect } from 'react';
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
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './profile';
import AsyncStorage from '@react-native-community/async-storage';
import Upload from './upload';


function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>wooohooooo Profile!</Text>
    </View>
  );
}
const UploadScreen = () => {
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Upload!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

const Timeline = () => {
  return (
    <>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView>
          <Text>Hi, I'm TimeLine. What's up????</Text>
        </ScrollView>
      </View>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home';
              } else if (route.name === 'Upload') {
                iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
              } else if (route.name==='Profile'){
                iconName= focused ? 'md-person' : 'md-person'
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#f4511e',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Upload" component={Upload} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Timeline;
