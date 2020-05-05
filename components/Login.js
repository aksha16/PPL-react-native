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

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert('log-In');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.login_sec}>
          <Image
            style={{width: 200, height: 100, alignSelf: 'center'}}
            source={require('../images/logo.png')}
          />
          <Text style={styles.mainWord}>Log-in to Account </Text>
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
          <View style={{flexDirection:'column-reverse', justifyContent:'space-between'}}>
          <View>
              <Text>Do not have Account</Text>
          </View>
          <View>
            <TouchableHighlight
              onPress={() => navigation.navigate("Registration")}>
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
export default Login;
