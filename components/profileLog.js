import * as React from 'react';
import {Button, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {DrawerActions, NavigationAction} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from './profile';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import { userAction } from '../redux/action';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default ProfileLog = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const clearAsyncStorage = async () => {
     await AsyncStorage.clear();
    };
    clearAsyncStorage();
    navigation.dispatch(DrawerActions.closeDrawer());
    dispatch(userAction(null));

    alert('Logging Out !!');
   
    console.log('lets see=======', navigation);
   //navigation.navigate("Login");
  };

  const CustomDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Log Out" onPress={handleLogout} />
      </DrawerContentScrollView>
    );
  };

  const MyProfileStack = ({navigation}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'PPL',
            headerStyle: {backgroundColor: '#f4511e'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center',
            },
            headerRight: () => (
              <Icon.Button
                name="reorder"
                backgroundColor="#f4511e"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            ),
          }}
        />
        </Stack.Navigator>
    );
  };

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#f4511e',
      }}
      drawerPosition="right"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Go Back" component={MyProfileStack} />
    </Drawer.Navigator>
  );
}
