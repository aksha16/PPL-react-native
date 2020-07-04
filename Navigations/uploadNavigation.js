import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Upload from '../components/upload';

const Stack = createStackNavigator();

const UploadNavigation = () =>{
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
    );
  };

  export default UploadNavigation;