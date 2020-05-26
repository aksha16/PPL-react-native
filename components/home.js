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
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import styles from '../styles';

const Home = props => {
  const [pics, setPics] = useState([]);
  const [picsCopy, setPicsCopy] = useState([]);
  const picsrc = '/home/com122/Desktop/ppl/clientSide/public/uploadPics/';
  const a = [1, 2, 3, 4, 5, 6, 7];
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 12) / 16);
  const imageWidth = dimensions.width - 2;
  const user = useSelector(state => state.userData);
  const [comment, setComment] = useState('');
  const [addComment, setAddComment] = useState({id: ''});

  useEffect(() => {
    axios.post('http://192.168.43.57:3002/post/showpost').then(res => {
      console.log('server dataaaaaa: ', res.data);
      setPics(res.data);
      setPicsCopy(res.data);
      console.log('dekhte hai ..', pics, props);
    });
    console.log('uploaded pictures has been come to Home.....');
  }, []);

  const showAddComment = id => {
    if (addComment.id != '') {
      setAddComment({...addComment, id: id});
    } else setAddComment({...addComment, id: id});
  };

  const handleLikes = id => {
    console.log('id check:', id);
    let index = pics.findIndex(x => x._id === id);
    console.log('index:', index, pics[index].likes);
    let oldpics = [...pics];
    axios
      .post('http://192.168.43.57:3002/post/likes', {
        _id: id,
        email: user.userData.email,
      })
      .then(res => {
        if (res.data.nModified === 1) {
          console.log('likes added !! ', res);
          oldpics[index].likedBy.push('1');
          setPics(oldpics);

          console.log('likes changed :', pics[index].likes);
        } else {
          oldpics[index].likedBy.pop();
          setPics(oldpics);
        }
      });
  };

  const handleComment = () => {};

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {console.log('does pics been updated', pics[0])}
          {pics.map((data, id) => {
            return (
              <View style={styles.post} key={id}>
                <View style={styles.postHeader}>
                  <View style={styles.postLeft}>
                    <View style={styles.postIcon}>
                      <View>
                        <Image
                          style={{width: 20, height: 20}}
                          source={{
                            uri: 'http://192.168.43.57:3002/images/img_6.png',
                          }}
                        />
                      </View>
                      <View>
                        <Text style={{color: 'white', paddingHorizontal: 10}}>
                          {' '}
                          {data.postedBy.firstname +
                            ' ' +
                            data.postedBy.lastname}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{fontSize: 20, color: '#f4511e'}}>
                        {data.caption}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.postRight}>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          backgroundColor: '#f4511e',
                          padding: 5,
                        }}>
                        {data.category}
                      </Text>
                    </View>
                    <View>
                      <Text>{data.date}</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Image
                    style={{width: imageWidth, height: imageHeight}}
                    source={{
                      uri: `http://192.168.43.57:3002/uploadPics/${data.image}`,
                    }}
                  />
                </View>

                <View>
                  <View style={styles.postHeader}>
                    <View style={styles.postIcon}>
                      <View>
                        <Image
                          style={{width: 20, height: 20}}
                          source={{
                            uri:
                              'http://192.168.43.248:9000/images/icon_001.png',
                          }}
                        />
                      </View>
                      <View>
                        <Text style={{color: 'white'}}> Share </Text>
                      </View>
                    </View>
                    <TouchableHighlight
                      onPress={() => {
                        handleLikes(data._id);
                      }}>
                      <View style={styles.postIcon}>
                        <View>
                          <Image
                            style={{width: 20, height: 20}}
                            source={{
                              uri:
                                'http://192.168.43.248:9000/images/icon_003.png',
                            }}
                          />
                        </View>
                        <View>
                          <Text style={{color: 'white'}}>
                            {' '}
                            {data.likedBy.length} Likes
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => showAddComment(data._id)}>
                      <View style={styles.postIcon}>
                        <View>
                          <Image
                            style={{width: 20, height: 20}}
                            source={{
                              uri:
                                'http://192.168.43.248:9000/images/icon_004.png',
                            }}
                          />
                        </View>
                        <View>
                          <Text style={{color: 'white'}}>
                            {' '}
                            {data.comments.length} Comments{' '}
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                  {addComment.id === data._id && (
                    <TextInput
                      style={styles.textInput}
                      onChangeText={comment => {
                        setComment(comment);
                      }}
                      placeholder="Enter your Comment"
                      value={comment}
                      onSubmitEditing={() => handleComment(data._id)}
                    />
                    // <View>
                    //   <TouchableHighlight />
                    // </View>
                                                                                       
                  )}
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
