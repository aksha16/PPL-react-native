import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import FirstComponent from './components/firstComponent';
import SecondComponent from './components/secondComponent';
import Registration from './components/registration';
import Login from './components/login';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import Timeline from './components/timeline';
import axios from 'axios';
import {userAction} from './redux/action';

const Stack = createStackNavigator();
const App = () => {

  // const clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // };
  // clearAsyncStorage();

  const dispatch = useDispatch();
  const [isSignedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState();
  const user = useSelector(state => state.userData);
  console.log('userrrr data has arrived yet or not', user, "let's see...");

  useEffect(() => {
    const tokenVerify = async () => {
      try {
        await AsyncStorage.getItem('token').then(value => {
          if (value) {
            console.log("App.js value of token",value);
            console.log("ohh that means till here things worked!!")
            axios
              .post('http://192.168.43.57:3002/user/jwtverify', {token: value})
              .then(res => {
                console.log('jwtVerified kya', res);
                console.log("achhhaaa aisa kya", res.data.payload);
                if (true) {
                  console.log("workingggggg ??????");
                  setSignedIn(true);
                  console.log("user signed is?", isSignedIn);
                  dispatch(userAction(res.data.payload));
                  console.log("worked.............")
                  
                  
                }
                else console.log("Not any payload....")
              });
          }
        });
      } catch (error) {
        console.log('errrrrr', error);
      }
    };
    tokenVerify();
  }, []);


  return (
    <>
      <NavigationContainer>
        {console.log('isSignedIn', isSignedIn)}
        {isSignedIn ? (
          <Stack.Navigator>
            <Stack.Screen
              name="timeline"
              options={{
                title: 'PPL',
                headerStyle: {backgroundColor: '#f4511e'},
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
              component={Timeline}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{header: () => null}}
            initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
    // <Text>Yesss</Text>
  );
};


export default App;
