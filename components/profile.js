import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import styles from '../styles';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState({});
  console.log('profile.........');
  const user = useSelector(state => state.userData);
  console.log("hahah", user)
  //setUserData(user);
  // useEffect(() => {   
  //   try {
  //     console.log('hahahahaProfile=======');
  //     const user = useSelector(state => state.userData);
  //     setUserData(user);
  //   } catch (err) {
  //     console.log('errr', err);
  //   }
  // }, []);
  return (
    <>
      {console.log('user data at profile', userData)}
      <View style={{flex: 1}}>
        <View style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Icon.Button
            name="reorder"
            backgroundColor="#ffa21d"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        </View>
        <View style={{alignItems:'center'}}>
              <Image
                style={{width: 100, height: 100}}
                source={require('../images/img_6.png')}
              />
            </View>
        <View style={styles.profile}>
            
            <View>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold', color:'#f4511e'}}>
                  FirstName : {userData.firstName}
                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold',color:'#f4511e'}}>
                  LastName : {userData.lastName}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold',color:'#f4511e', fontStyle:'italic'}}>
                  Bio :
                </Text>
              </View>
              <View>
                <Text>
                  This is an example of a comment. You can create as many
                  comments like this one or sub comments as you like and manage
                  all of your content inside Account.
                </Text>
              </View>
            </View>
      </View>
      </View>
    </>
  );
};
export default Profile;
