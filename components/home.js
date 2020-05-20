import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
import {useSelector} from 'react-redux';

const Home = () => {
  const [pics, setPics] = useState([]);
  const [picsCopy, setPicsCopy] = useState([]);
  const picsrc = '/home/com122/Desktop/ppl/clientSide/public/uploadPics/';
//   useEffect(() => {
//     axios.post('http://192.168.1.11:3002/post/showpost').then(res => {
//       console.log('server dataaaaaa: ', res.data);
//       setPics(res.data);
//       setPicsCopy(res.data);
//       console.log('dekhte hai ..', pics);
//     });
//     console.log('timelinelft lets see your');
//   }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* {pics.map((data, id) => {
                  return(
                      <>
                      <Text>{data.caption} </Text>
                      <Image 
                       style={{width: 200, height: 100, alignSelf: 'center'}}
                       source={require('/home/com122/Pictures/2020-05-07-091633.jpg')}/>
                      </>
                  )
              })} */}
      <>
        <Text>seeee.....0000000</Text>
        <Image
          style={{width: 200, height: 100, alignSelf: 'center'}}
          source={{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}}
        />
      </>
    </View>
  );
};
export default Home;
