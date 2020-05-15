import React, { useEffect, useState } from 'react';
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
import useSelector from 'react-redux';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const user = useSelector(state =>state.userData);
    setUserData(user);
  }, []);
  return (
    <>
    {console.log("user data at profile", userData)}
      <View style={{flex: 1}}>
        <View style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Icon.Button
            name="reorder"
            backgroundColor="#ffa21d"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        </View>
      </View>
    </>
  );
};
export default Profile;
