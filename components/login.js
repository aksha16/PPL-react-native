import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
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
import SERVER_URL from '../config';

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
      axios.post( SERVER_URL + 'user/login', userData).then(res => {
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
            .post( SERVER_URL + 'user/jwtverify', {
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
          console.log('Wrong credential!!!');
          setLogInErrorMsg('Wrong Credentials!!');
        }
      });
    } else alert('Require all data!!');
  };

  const fetchData = async () => {
    try {
      await AsyncStorage.getItem('token').then(value => {
        if (value) {
          console.log(value, 'vallllllllluuuuuueeeee');
          setToken(value);
        } else {
          setToken();
        }
      });
    } catch (error) {
      console.log('errrrrr', error);
    }
  };
  useEffect(() => {
    console.log('is this useEffect working????');
    fetchData();
  }, [token]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.login_sec}>
          <Image style={styleIn.image} source={require('../images/logo.png')} />
          <Text style={styles.mainWord}>Log-in to Account </Text>
          {logInErrorMsg ? (
            <Text style={styleIn.errorMsg}>{logInErrorMsg}</Text>
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
        <View style={styleIn.buttons}>
          <View>
            <TouchableHighlight onPress={handleLogin} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>LogIn</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styleIn.button}>
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

const styleIn = StyleSheet.create({
  image: {width: 200, height: 100, alignSelf: 'center'},
  errorMsg: {color: 'red'},
  buttons: {flexDirection: 'row', justifyContent: 'space-around'},
  button: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
  },
});

export default Login;
