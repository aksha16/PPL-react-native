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
import styles from '../styles';

const Home = props => {
  const [pics, setPics] = useState([]);
  const [picsCopy, setPicsCopy] = useState([]);
  const picsrc = '/home/com122/Desktop/ppl/clientSide/public/uploadPics/';
  const a = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    axios.post('http://192.168.43.57:3002/post/showpost').then(res => {
      console.log('server dataaaaaa: ', res.data);
      setPics(res.data);
      setPicsCopy(res.data);
      console.log('dekhte hai ..', pics, props);
    });
    console.log('uploaded pictures has been come to Home.....');
  }, []);

  return (
    <>
      {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <>
          <Text>seeee.....0000000</Text>
          <Image
            style={{width: 200, height: 100, alignSelf: 'center'}}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
            }}
          />
          <Image
            style={{width: 200, height: 100, alignSelf: 'center'}}
            source={{
              uri:
                'http://192.168.43.57:3002/uploadPics/5ca2a51dde045144e2707d15b6d310c3',
            }}
          />
        </>
      </View> */}
      <ScrollView>
        <View style={styles.container}>
          {console.log("does pics been updated", pics[0])}
          {pics.map((data, id) => {
            return (
              <View style={styles.post} key={id}>
                <View style={styles.postHeader}>
                  <View style={styles.postLeft}>
                    <View>
                      <Text>{data.caption}</Text>
                      {console.log('data has mapped?', data.caption)}
                      {/* <Text>hahahahah</Text>
                      <Text>{data.category}</Text>
                      <Text style={{fontSize: 20}}>{data.caption}</Text>
                      <Text>{data.date}</Text> */}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};
export default Home;
