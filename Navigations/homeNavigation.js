import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Comments from '../components/comments';
import Posts from '../components/posts';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Stack = createStackNavigator();

const HomeNavigation = ({navigation}) => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="posts" component={Posts} 
      options={{
              title: 'PPL',
              headerStyle: {backgroundColor: '#f4511e'},
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf:'center',
              },
              headerRight: () => (
                <Icon.Button
                  name="paper-plane"
                  backgroundColor="#f4511e"
                  onPress={() => {
                    navigation.navigate('chat');
                  }}
                />
              ),
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
};

export default HomeNavigation;
