import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import  HomeNavigation from './homeNavigation';
import ChatNavigation from './chatNavigation';
import Animated from 'react-native-reanimated';  
import  {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';

const Toptab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
  console.log("navigation of top tab", descriptors )
  return (
    <View style={{ flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        // modify inputRange for custom behavior
        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={{ opacity }}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TimelineNavigation = () => {
    return (
      <Toptab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Toptab.Screen name="home" component={HomeNavigation} />
        <Toptab.Screen name="chat" component={ChatNavigation} />
      </Toptab.Navigator>
    );
  };

export default TimelineNavigation;