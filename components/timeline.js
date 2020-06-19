import React, {useEffect, Profiler} from 'react';
import {View, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './profile';
import Upload from './upload';
import Home from './home';
import ProfileLog from './profileLog';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Comments from './comments';
import Posts from './posts';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Timeline = ({navigation, route}) => {
  console.log("==============>>>>", route);

  const MyHomeStack = () =>{
    return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Posts} 
        options={{
                title: 'PPL',
                headerStyle: {backgroundColor: '#f4511e'},
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  alignSelf:'center',
                },
               }}
        />
         <Stack.Screen name="comments" component={Comments} 
           options={{
            title: 'PPL',
            headerStyle: {backgroundColor: '#f4511e'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf:'center',
            },
           }}
         />
      </Stack.Navigator>
    )
  }

  const MyUploadStack = () =>{
    return(
      <Stack.Navigator>
        <Stack.Screen name="Upload" component={Upload} 
        options={{
          title: 'PPL',
          headerStyle: {backgroundColor: '#f4511e'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
          },
         }}
        
        />
      </Stack.Navigator>
    )
  }

  

  return (
    <>
      <View style={{justifyContent: 'center', alignItems: 'center'}} />

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
        headerTitle="haikahukkkkk"
        >
        <Tab.Screen name="Home" component={MyHomeStack} 
        
        />
        <Tab.Screen name="Upload" component={MyUploadStack} />
        <Tab.Screen name="Profile"  component={ProfileLog} />
      </Tab.Navigator>
    </>
  );
};

export default Timeline;
