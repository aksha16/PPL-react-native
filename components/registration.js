import React, { useState } from 'react';
import {Text, View, Image, Button, TextInput} from 'react-native';
import styles from '../styles';
import {ScrollView} from 'react-native-gesture-handler';

const Registration = () => {
    const [userName, setUserName] = useState('');
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
              placeholder="UserName"
              onChangeText={userName => setUserName(userName)}
              name="userName"
              value={userName}
            />

        </View>        
      </View>
    </ScrollView>
  );
};

export default Registration;
