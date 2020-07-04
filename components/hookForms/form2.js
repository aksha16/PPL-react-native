import React, {useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import styles from '../../styles';
import {ScrollView} from 'react-native-gesture-handler';
import Config from 'react-native-config';

const URL = Config.SERVER_URL;

export default function App() {
  console.log("url", URL);
  const {register, setValue, handleSubmit, errors, control} = useForm();
  const onSubmit = data => Alert.alert('Form Data', JSON.stringify(data));

  useEffect(() => {
    register({name: 'firstname'}, {required: true});
    register({name: 'lastname'});
    register({name: 'username'}, {required: true});
    register(
      {name: 'email'},
      {
        required: true,
        pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      },
    );
    register(
      {name: 'password'},
      {
        required: true,
        pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      },
    );
  }, [register]);

  return (
    <ScrollView>
      {console.log('hahahah Errors', errors)}
      <View style={styles.container}>
        <View style={styles.login_sec}>
          <Image style={styleIn.image} source={require('../images/logo.png')} />
          <Text style={styles.mainWord}>Create an Account </Text>
          <Text style={styleIn.text}>Username</Text>
          <Controller
            as={TextInput}
            control={control}
            name="username"
            onChange={args => args[0].nativeEvent.text}
            rules={{required: true}}
            defaultValue=""
            placeholder="username"
          />
          {errors.username && (
            <Text style={styleIn.error}>This is required.</Text>
          )}

          <Text style={styleIn.text}>Email</Text>
          {errors.email ? (
            errors.email.type === 'pattern' && (
              <Text style={styleIn.error}>
                Invalid Email, try somthing like abc@xyz.com
              </Text>
            )
          ) : (
            <></>
          )}
          <Controller
            as={TextInput}
            control={control}
            name="email"
            onChange={args => args[0].nativeEvent.text}
            rules={{required: true}}
            defaultValue=""
            placeholder="email"
          />
          {errors.email ? (
            errors.email.type === 'required' && (
              <Text style={styleIn.error}>This is required.</Text>
            )
          ) : (
            <></>
          )}

          {errors.password ? (
            errors.password.type === 'pattern' && (
              <Text style={styleIn.error}>
                Invalid password. Password must of atleast 9 characters which
                include a special character, numbers and alphabets.
              </Text>
            )
          ) : (
            <></>
          )}
          <Text style={styleIn.text}>Password</Text>
          <Controller
            as={TextInput}
            control={control}
            name="password"
            secureTextEntry={true}
            onChange={args => args[0].nativeEvent.text}
            rules={{required: true}}
            defaultValue=""
            placeholder="password"
          />
          {errors.password ? (
            errors.password.type === 'required' && (
              <Text style={styleIn.error}>This is required.</Text>
            )
          ) : (
            <></>
          )}

          <Text style={styleIn.text}>Firstname</Text>
          <Controller
            as={TextInput}
            control={control}
            name="firstname"
            onChange={args => args[0].nativeEvent.text}
            rules={{required: true}}
            defaultValue=""
            placeholder="firstname"
          />

          {errors.firstname && (
            <Text style={styleIn.error}>This is required.</Text>
          )}

          <Text style={styleIn.text}>Lastname</Text>
          <Controller
            as={TextInput}
            control={control}
            name="lastname"
            onChange={args => args[0].nativeEvent.text}
            defaultValue=""
            placeholder="lastname"
          />

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScrollView>
  );
}

const styleIn = StyleSheet.create({
  image: {width: 200, height: 100, alignSelf: 'center'},
  buttons: {flexDirection: 'row', justifyContent: 'space-around'},
  button: {flexDirection: 'column', justifyContent: 'space-around'},
  text: {color: 'black', fontWeight: 'bold'},
  error: {color: 'red', fontStyle: 'italic'},
});
