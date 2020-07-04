import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import  HomeNavigation from './homeNavigation';
import ChatNavigation from './chatNavigation';

const Toptab = createMaterialTopTabNavigator();

const TimelineNavigation = () => {
    return (
      <Toptab.Navigator screenOptions={{header: {visible: false}}}>
        <Toptab.Screen name="home" component={HomeNavigation} />
        <Toptab.Screen name="chat" component={ChatNavigation} />
      </Toptab.Navigator>
    );
  };

export default TimelineNavigation;