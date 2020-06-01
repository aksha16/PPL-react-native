import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9

const Forms = () => {
  const Form = t.form.Form;

  const User = t.struct({
    email: t.String,
    username: t.String,
    password: t.String,
    firstname:t.String,
    terms: t.Boolean,
  });
  const handleSubmit =() => {
      const value = _form.getValue();
      console.log("value", value);

  }
  const options = {
    fields: {
      terms: {
        label: 'Agree to Terms',
      },
      password:{
          type:'password'
      }
    },
  };
  return (
    <View style={styles.container}>
      {/* <Text>FORM</Text> */}
      <Form ref={c => _form=c} type={User} options={options}  /> 
      <Button
          title="Sign Up!"
          onPress={handleSubmit}
        />
    </View>
  );
};

export default Forms;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
