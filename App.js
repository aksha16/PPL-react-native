import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Registration from './components/registration';
import Login from './components/login';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import Timeline from './components/timeline';
import axios from 'axios';
import {userAction} from './redux/action';
import SERVER_URL from './config';
const Stack = createStackNavigator();
import Icon from 'react-native-vector-icons/FontAwesome';

const App = ({navigation,route }) => {
  // const clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // };
  // clearAsyncStorage();
  
  console.log('123456789sdfghjxcvbn=====', navigation, route);
  const dispatch = useDispatch();
  const [isSignedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.userData);
  console.log('userrrr data has arrived yet or not', user, "let's see...");

  useEffect(() => {
    const tokenVerify = async () => {
      try {
        await AsyncStorage.getItem('token').then(value => {
          if (value) {
            console.log('App.js value of token', value);
            console.log('ohh that means till here things worked!!');
            axios
              .post(SERVER_URL + 'user/jwtverify', {token: value})
              .then(res => {
                console.log('jwtVerified kya', res);
                console.log('achhhaaa aisa kya', res.data.payload);
                if (res.data.payload) {
                  console.log('workingggggg ??????');
                  setSignedIn(true);
                  console.log('user signed is?', isSignedIn);
                  dispatch(userAction(res.data.payload));
                  console.log('worked.............');
                } else console.log('Not any payload....');
              });
          } else {
            console.log('async storage got nothing..........');
            setSignedIn(false);
          }
        });
      } catch (error) {
        console.log('errrrrr', error);
      }
    };
    tokenVerify();
  }, []);

  if (!isSignedIn && AsyncStorage.getItem('token') != undefined) {
    return <ActivityIndicator size="large" style={styleIn.activity} />;
  }

  return (
    <>
      <NavigationContainer>
        {console.log('isSignedIn', isSignedIn)}
        {isSignedIn ? (
          <Stack.Navigator  screenOptions={{header: () => null}}>
            <Stack.Screen
              name="timeline"
              // options={{
              //   title: 'PPL',
              //   headerStyle: {backgroundColor: '#f4511e'},
              //   headerTintColor: '#fff',
              //   headerTitleStyle: {
              //     fontWeight: 'bold',
              //     alignSelf: 'center',
              //   },
              //   headerRight: () => (
              //     <Icon.Button
              //       name="reorder"
              //       backgroundColor="#f4511e"
              //       onPress={() =>
              //         alert("hia")
              //         //navigation.dispatch(DrawerActions.openDrawer())
              //       }
              //     />
              //   ),
              // }}
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

const styleIn = StyleSheet.create({
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
