import React, {useState} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import styles from '../styles';
import {ScrollView} from 'react-native-gesture-handler';

const Registration = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [validation, setValidation] = useState({email: '', password: ''});

  const handleSignup = () => {
    if (username && email && password && firstname && lastname) {
      const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (emailRe.test(email) === false) {
        setValidation({...validation, email: 'wrong'});
        console.log('Is this work??', validation.email);
      } else setValidation({...validation, email: ''});
      const passRe = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (passRe.test(password) === false) {
        setValidation({...validation, password: 'wrong'});
      } else setValidation({...validation, password: ''});
      console.log(
        'data are',
        username,
        email,
        password,
        firstname,
        lastname,
        emailRe.test(email),
        validation,
      );
      const user = {
        username: username,
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      };
      alert('chal bhi raha hai kuch');
      axios
        .post('http://192.168.1.11:3002/user/registration', user)
        .then(res => {
          console.log('server Registration response', res);
          alert('Sign is done!!!');
        })
        .catch(err => {
          alert(err, 'login catch axios');
        });

      //navigation.navigate('Login');
    } else {
      console.log('data are', username, email, password, firstname, lastname);
      alert('Required all data!!');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.login_sec}>
          <Image
            style={{width: 200, height: 100, alignSelf: 'center'}}
            source={require('../images/logo.png')}
          />
          <Text style={styles.mainWord}>Create an Account </Text>
          <Text>Username</Text>
          <TextInput
            id="usd"
            style={styles.textInput}
            placeholder="Username"
            onChangeText={username => setUsername(username)}
            name="username"
            value={username}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email => setEmail(email)}
            name="email"
            value={email}
          />
          {validation.email === 'wrong' ? (
            <Text style={{color: 'red'}}>
              Enter Right Mail like As <Text> Example@gmail.com</Text>
            </Text>
          ) : (
            <></>
          )}
          <Text>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={password => setPassword(password)}
            name="password"
            value={password}
          />
          {validation.password === 'wrong' ? (
            <Text style={{color: 'red'}}>
              Try Another PassWord like As Example@123
            </Text>
          ) : (
            <></>
          )}
          <Text>Firstname</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Firstname"
            onChangeText={firstname => setFirstname(firstname)}
            name="firstname"
            value={firstname}
          />
          <Text>Lastname</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Lastname"
            onChangeText={lastname => setLastname(lastname)}
            name="lastname"
            value={lastname}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View>
            <TouchableHighlight onPress={handleSignup} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>SignUp</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View>
            <View
              style={{flexDirection: 'column', justifyContent: 'space-around'}}>
              <TouchableHighlight onPress={() => navigation.navigate('Login')}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>GoToLogin</Text>
                </View>
              </TouchableHighlight>
              <Text>Already have a account</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Registration;
