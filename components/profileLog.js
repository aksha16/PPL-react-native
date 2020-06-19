import * as React from 'react';
import {Button, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from './profile';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.toggleDrawer()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function ProfileLog({navigation}) {

  const handleLogout = ({navigation, route},props) => {
    // const clearAsyncStorage = async () => {
    //   AsyncStorage.clear();
    // };
    // clearAsyncStorage();
    // navigation.dispatch(DrawerActions.closeDrawer())
    alert('Logging Out !!');

    console.log('lets see=======', navigation, props, route);
    // navigation.navigate(NavigationActions.navigate({routeName:'Login'}));
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

        {/* <Stack.Screen
          name="Logout"
          component={NotificationsScreen}
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
                  alert('hia');
                  navigation.toggleDrawer();
                }}
              />
            ),
          }}
        /> */}
      </Stack.Navigator>
    );
  };

  return (
    <Drawer.Navigator
      //initialRouteName="Home1"
      drawerContentOptions={{
        activeTintColor: '#f4511e',
      }}
      drawerPosition="right"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* <Drawer.Screen name="Home1" component={HomeScreen} />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <DrawerButton onPress={() => navigation.toggleDrawer()} />
          ),
        })}
      /> */}
      <Drawer.Screen name="Go Back" component={MyProfileStack} />
    </Drawer.Navigator>
  );
}
