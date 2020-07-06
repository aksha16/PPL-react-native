import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import  Chat from '../components/chat';
import Chatting from '../components/chatting';
import { exp } from 'react-native-reanimated';

const Stack = createStackNavigator();

const ChatNavigation = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="setUpChat" component={Chat} 
            options={{
                title: 'Chat-Set-Up',
                headerStyle: {backgroundColor: '#f4511e'},
                headerTintColor: '#fff',
                // headerTitleStyle: {
                //   fontWeight: 'bold',
                //   alignSelf:'center',
                // },
               }}/>
            <Stack.Screen name="chatting" component={Chatting} 
            options={{
                title: 'Chatting',
                headerStyle: {backgroundColor: '#f4511e'},
                headerTintColor: '#fff',
                // headerTitleStyle: {
                //   fontWeight: 'bold',
                //   alignSelf:'center',
                // },
               }}/>
        </Stack.Navigator>
    );

};


export default  ChatNavigation;