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

const Stack = createStackNavigator();
const App = () => {

  // const clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // };
  // clearAsyncStorage();

  const dispatch = useDispatch();
  const [isSignedIn, setSignedIn] = useState(false);
  //const [user, setUser] = useState({});
  const [token, setToken] = useState();
  const user = useSelector(state => state.userData);
  console.log('userrrr data has arrived yet or not', user, "let's see...");

  useEffect(() => {
    const tokenVerify = async () => {
      try {
        await AsyncStorage.getItem('token').then(value => {
          if (value) {
            console.log("App.js value of token",value)
            const token = value;
            setToken(value);
            axios
              .post('http://192.168.1.11:3002/user/jwtverify', {token: token})
              .then(res => {
                console.log('jwtVerified kya', res);
                console.log("achhhaaa aisa kya", res.data.payload);
                if (res.data.payload != {}) {
                  //dispatch(userAction(res.data.payload));
                  //const user = useSelector(state => state.userData);
                  console.log("workingggggg ??????");
                  setSignedIn(true);
                  //setUser(user);
                  console.log("userrrrrrrrrrr", isSignedIn);
                }
                else console.log("w")
              });
          }
        });
      } catch (error) {
        console.log('errrrrr', error);
      }
    };
    tokenVerify();
  }, [token]);

  useEffect(() => {
    console.log("userrrrr", user);
    if (user) {
      setSignedIn(true);
      console.log('worked???', isSignedIn);
    }
    else {
      setSignedIn(false);
    }
  }, [user]);

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
  );
};

const styles = StyleSheet.create({
  ppl: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 5,
  },
});

export default App;
