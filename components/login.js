import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import styles from '../styles';
import {ScrollView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {userAction} from '../redux/action';
import FirstComponent from './firstComponent';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logInErrorMsg, setLogInErrorMsg] = useState('');
  const [token, setToken] = useState();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (email && password) {
      const userData = {email: email, password: password};
      console.log('userDattttaaa', userData);
      axios.post('http://192.168.1.11:3002/user/login', user).then(res => {
        console.log('res:', res);
        if (res.data.token) {
          console.log('user can log-in!!', res.data);
          setLogInErrorMsg('');
          const storeData = async () => {
            try {
              await AsyncStorage.setItem('token', res.data.token);
            } catch (err) {
              console.log('Async errors', err);
            }
          };
          storeData();
          const token = res.data.token;

          axios
            .post('http://192.168.1.11:3002/user/jwtverify', {
              token: token,
            })
            .then(res => {
              console.log('jwtVerified?', res);
              if (res.data) {
                console.log('jwtverify', res.data);
                dispatch(userAction(res.data.payload));
              }
            });
          alert('login is done');
        } else {
          setLogInErrorMsg('Wrong Credentials!!');
        }
      });
    } else alert('Require all data!!');
  };

  return (
    <ScrollView>
      {/* {isLoading ? <ActivityIndicator size="large" color={'black'} /> : <></>} */}
      <View style={styles.container}>
        <View style={styles.login_sec}>
          <Image
            style={{width: 200, height: 100, alignSelf: 'center'}}
            source={require('../images/logo.png')}
          />
          <Text style={styles.mainWord}>Log-in to Account </Text>
          {logInErrorMsg ? (
            <Text style={{color: 'red'}}>{logInErrorMsg}</Text>
          ) : (
            <></>
          )}
          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email => setEmail(email)}
            name="email"
            value={email}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={password => setPassword(password)}
            name="password"
            value={password}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View>
            <TouchableHighlight onPress={handleLogin} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>LogIn</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{
              flexDirection: 'column-reverse',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text>Do not have Account</Text>
            </View>
            <View>
              <TouchableHighlight
                onPress={() => navigation.navigate('Registration')}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Register First</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const Stack =createStackNavigator();

const App1 = () => {
  return(
    <Stack.Navigator initialRouteName='Login' screenOptions={{header:false}}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='timeline' component={FirstComponent} />
    </Stack.Navigator>
  )
}


export default Login;
