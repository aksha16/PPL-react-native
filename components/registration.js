import React, {useState} from 'react';
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

  const handleSignup = () => {
    if (username && email && password && firstname && lastname) {
      alert('Sign is done!!!');
      navigation.navigate('Login');
    } else {
      console.log(
        'data are',
        username, email, password, firstname, lastname
      );
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
          <Text>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={password => setPassword(password)}
            name="password"
            value={password}
          />
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
            <TouchableHighlight onPress={() => navigation.navigate('Login')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>GoToLogin</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Registration;
