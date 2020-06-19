import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import styles from '../styles';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

const Profile = ({navigation}) => {
  const user = useSelector(state => state.userData);
  console.log('profile.....', user, navigation);

  const handelLogout = () => {
    const clearAsyncStorage = async () => {
      AsyncStorage.clear();
    };
    clearAsyncStorage();
    alert('Logging Out !!');

    console.log('lets see', navigation);
    // navigation.navigate(NavigationActions.navigate({routeName:'Login'}));
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
      <View style={styleIn.drawerIcon}>
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
        <Drawer.Screen name="GoBack" component={DrawerIcon} />
      </Drawer.Navigator>
    );
  };

  return (
    <>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={{alignItems: 'center', resizeMode: 'contain'}}>
            {/* <Image
            style={styleIn.image}
            source={require('../images/img_6.png')} /> */}
            <Ionicons name="md-person" color="#f4511e" size={100} />
          </View>
          <View style={styles.profile}>
            <View>
              <View>
                <Text style={styleIn.name}>
                  FirstName : {user.userData.firstname}
                </Text>
                <Text style={styleIn.name}>
                  LastName : {user.userData.lastname}
                </Text>
              </View>
              <View>
                <Text style={styleIn.bio}>Bio :</Text>
              </View>
              <View>
                <Text>I'm a Developer.</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styleIn = StyleSheet.create({
  drawerIcon: {display: 'flex', flexDirection: 'row-reverse'},
  image: {width: 100, height: 100},
  name: {fontSize: 20, fontWeight: 'bold', color: '#f4511e'},
  bio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4511e',
    fontStyle: 'italic',
  },
});

export default Profile;
