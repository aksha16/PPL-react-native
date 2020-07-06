import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileLogNavigation from './profileLogNavigation';
import UploadNavigation from './uploadNavigation';
import TimelineNavigation from './timelineNavigation';

const Tab = createBottomTabNavigator();

const AllNavigation = ({navigation, route}) => {
  console.log('==============>>>>', route);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'Upload') {
            iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'md-person' : 'md-person';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#f4511e',
        inactiveTintColor: 'gray',
      }}
      headerTitle="haikahukkkkk">
      <Tab.Screen name="Home" component={TimelineNavigation} />
      <Tab.Screen name="Upload" component={UploadNavigation} />
      <Tab.Screen name="Profile" component={ProfileLogNavigation} />
    </Tab.Navigator>
  );
};

export default AllNavigation;
