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
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import styles from '../styles';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationActions } from 'react-navigation';

const Profile = ({navigation}) => {
  const user = useSelector(state => state.userData);
  console.log('profile.....', user,navigation);

  const handelLogout = () => {
    const clearAsyncStorage = async () => {
      AsyncStorage.clear();
    };
    alert('Logging Out !!');
    clearAsyncStorage();
    console.log("lets see", navigation);
    navigation.navigate(NavigationActions.navigate({routeName:'Login'}));
    
  };

  const CustomDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="LogOut" onPress={handelLogout} />
      </DrawerContentScrollView>
    );
  };

  const Drawer = createDrawerNavigator();

  const DrawerIcon = ({navigation}) => {
    return (
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Icon.Button
          name="reorder"
          backgroundColor="#f4511e"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      </View>
    );
  };

  const MyDrawer = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="GoBack" component={DrawerIcon}  />
      </Drawer.Navigator>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <NavigationContainer independent={true}>
          <MyDrawer />
        </NavigationContainer>

        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../images/img_6.png')}
          />
        </View>
        <View style={styles.profile}>
          <View>
            <View>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#f4511e'}}>
                FirstName : {user.userData.firstname}
              </Text>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#f4511e'}}>
                LastName : {user.userData.lastname}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#f4511e',
                  fontStyle: 'italic',
                }}>
                Bio :
              </Text>
            </View>
            <View>
              <Text>
                This is an example of a description. You can create as many
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