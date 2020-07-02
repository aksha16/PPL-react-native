import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import SERVER_URL from '../config';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 12) / 48);
const imageWidth = Math.round((dimensions.width - 2) / 3);

const Profile = ({navigation}) => {
  const [user, setUser] = useState([]);
  const user2 = async () => {
    const user1 = await useSelector(state => state.userData);
    console.log('userrrrrrrrrrrrrrrr1', user1);
    setUser(user1);
    console.log('userrrrr', user);
    return user1;
  };
  user2();
  //setUser(user2());
  const userr = useSelector(state => state.userData);

  console.log('profile.....', user, navigation);
  const [myUploads, setUploads] = useState([]);

  useEffect(() => {
    console.log('inside useEffect', user);
    if (user.userData != undefined) {
      console.log('ohh yeahhhhh', user);
      axios
        .post(SERVER_URL + 'post/myuploads', {
          user: user,
        })
        .then(res => {
          console.log('my uploads data ', res.data);
          setUploads(res.data);
        })
        .catch(err => {
          console.log(' my uploads errors are', err);
          throw err;
        });
    } else {
      console.log('ohh no!!', user);
    }
  }, [user]);

  // useEffect(() => {
  //   console.log("does user updated", user);
  //   if(user!= []){
  //   axios
  //     .post(SERVER_URL + 'post/myuploads', {
  //       id: user.userData._id,
  //     })
  //     .then(res => {
  //       console.log('my uploads data ', res.data);
  //       //setUploads(res.data);
  //     })
  //     .catch(err => {
  //       console.log(' my uploads errors are', err);
  //       throw err;
  //     });}
  //else  console.log("user hasn't arrived")
  // }, [myUploads]);

  return (
    <>
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={
            {alignItems: 'center', resizeMode: 'contain'}}
            >
            <Image
              style={styleIn.profileImage}
              source={require('../images/aksha.jpeg')}
              resizeMode='cover'
            />
            {/* <Ionicons name="md-person" color="#f4511e" size={100} /> */}
          </View>
          <View style={styles.profile}>
            <View>
              <View>
                <Text style={styleIn.name}>
                  FirstName :{user?.userData?.firstname}
                </Text>
                <Text style={styleIn.name}>
                  LastName : {user?.userData?.lastname}
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
          <Text style={styleIn.uploads}>My Uploads</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}>
            {myUploads &&
              myUploads.map((data, id) => {
                return (
                  <View key={data._id}>
                    <View>
                      <Image
                        style={styleIn.image}
                        source={{
                          uri: SERVER_URL + `uploadPics/${data.image}`,
                        }}
                      />
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styleIn = StyleSheet.create({
  drawerIcon: {display: 'flex', flexDirection: 'column'},
  image: {width: imageWidth, height: imageHeight},
  name: {fontSize: 20, fontWeight: 'bold', color: '#f4511e'},
  bio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4511e',
    fontStyle: 'italic',
  },
  uploads: {
    fontSize: 18,
    color: '#f4511e',
    padding: 5,
    fontWeight: 'bold',
  },
  profileImage: {
    resizeMode: 'cover',
    height: 86,
    width: 86,
    borderWidth: 2,
    borderRadius: 75,
    marginTop:5
  },
  
});

export default Profile;
