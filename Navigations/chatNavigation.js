import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import  Chat from '../components/chat';
import Chatting from '../components/comments';
import { exp } from 'react-native-reanimated';

const Stack = createStackNavigator();

const ChatNavigation = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="setUpChat" component={Chat} />
            <Stack.Screen name="chatting" component={Chatting} />
        </Stack.Navigator>
    );

};


export default  ChatNavigation;