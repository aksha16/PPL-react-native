import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Registration from './components/registration';
import Login from './components/login';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import AllNavigation from './Navigations/allNavigation';
import axios from 'axios';
import {userAction} from './redux/action';
import SERVER_URL from './config';
const Stack = createStackNavigator();
import messaging from '@react-native-firebase/messaging';

const App = ({navigation, route}) => {
  // const clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // };
  // clearAsyncStorage();

  const dispatch = useDispatch();
  const [isSignedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.userData);
  console.log('userrrr data has arrived yet or not', user, "let's see...");

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    console.log('firebasse', unsubscribe);
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          //alert(fcmToken);
          console.log('firebase token', fcmToken);
        } else {
          alert('no');
          // user doesn't have a device token yet
        }
      })
      .catch(error => console.log('err', error));
  }, []);

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
                  setLoading(false);
                } else console.log('Not any payload....');
              });
          } else {
            console.log('async storage got nothing..........');
            setLoading(false);
            setSignedIn(false);
          }
        });
      } catch (error) {
        console.log('errrrrr', error);
      }
    };
    tokenVerify();
  }, []);

  if (user == undefined && loading) {
    return <ActivityIndicator size="large" style={styleIn.activity} />;
  }

  return (
    <>
      <NavigationContainer>
        {console.log('isSignedIn', isSignedIn)}
        {user != undefined ? (
          <Stack.Navigator screenOptions={{header: () => null}}>
            <Stack.Screen name="timeline" component={AllNavigation} />
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
