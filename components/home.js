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
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Comments from './comments';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 12) / 16);
const imageWidth = dimensions.width - 2;

const Home = ({navigation}) => {
  const [pics, setPics] = useState([]);
  const [picsCopy, setPicsCopy] = useState([]);
  const picsrc = '/home/com122/Desktop/ppl/clientSide/public/uploadPics/';
  const a = [1, 2, 3, 4, 5, 6, 7];

  const user = useSelector(state => state.userData);
  const [comment, setComment] = useState('');
  const [addComment, setAddComment] = useState({id: ''});
  const Stack = createStackNavigator();

  useEffect(() => {
    axios.post('http://192.168.43.57:3002/post/showpost').then(res => {
      console.log('server dataaaaaa: ', res.data);
      setPics(res.data);
      setPicsCopy(res.data);
      console.log('dekhte hai ..', pics);
    });
    console.log('uploaded pictures has been come to Home.....');
  }, []);

  const showAddComment = id => {
    setAddComment({...addComment, id: id});
  };

  const handleLikes = id => {
    console.log('id check:', id);
    let index = pics.findIndex(x => x._id === id);
    console.log('index:', index, pics[index]);
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

          console.log('likes changed :', pics[index].likedBy);
        } else {
          oldpics[index].likedBy.pop();
          setPics(oldpics);
        }
      });
  };

  const handleComment = id => {
    if (comment) {
      const oldpics = [...pics];
      let index = pics.findIndex(x => x._id === id);
      console.log('index:', index, pics[index].comments);
      axios
        .post('http://192.168.43.57:3002/post/singlePost/addComments', {
          _id: id,
          comment: comment,
          commentedBy: user.userData._id,
        })
        .then(res => {
          console.log('comment output has come', res);
          oldpics[index].comments.push(res.data);
          setPics(oldpics);
          console.log('oldpost which is updated now', pics[index]);
          setComment('');
          setAddComment({...addComment, id: ''});
          alert('comment added.');
        });
    } else {
      alert('Please write your comment!');
    }
  };

  const AllComments = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="comments" component={Comments} />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <ScrollView>
        <Stack.Navigator>
          <Stack.Screen name="comments" component={Comments} />
        </Stack.Navigator>

        <View style={styles.container}>
          {pics.map((data, id) => {
            return (
              <View style={styles.post} key={id}>
                <View style={styles.postHeader}>
                  <View style={styles.postLeft}>
                    <View style={styles.postIcon}>
                      <View>
                        <Image
                          style={styleIn.postIcon}
                          source={{
                            uri: 'http://192.168.43.57:3002/images/img_6.png',
                          }}
                        />
                      </View>
                      <View>
                        <Text style={styleIn.name}>
                          {' '}
                          {data.postedBy.firstname +
                            ' ' +
                            data.postedBy.lastname}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styleIn.caption}>{data.caption}</Text>
                    </View>
                  </View>
                  <View style={styles.postRight}>
                    <View>
                      <Text style={styleIn.category}>{data.category}</Text>
                    </View>
                    <View>
                      <Text>{data.date}</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Image
                    style={styleIn.image}
                    source={{
                      uri: `http://192.168.43.57:3002/uploadPics/${data.image}`,
                    }}
                  />
                </View>

                <View>
                  <View style={styles.postHeader}>
                    <TouchableHighlight
                      onPress={() => {
                        handleLikes(data._id);
                      }}>
                      <View style={styles.postIcon}>
                        <View>
                          <Image
                            style={styleIn.postIcon}
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
                            style={styleIn.postIcon}
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
                  <View>
                    <Text style={styleIn.commentHeader}>Comments</Text>
                    {data.comments.slice(0, 2).map((commentItem, id) => {
                      return (
                        <Text style={styleIn.comments} key={commentItem._id}>
                          {commentItem.commentedBy.firstname +
                            ' ' +
                            commentItem.commentedBy.lastname}{' '}
                          :{' '}
                          <Text style={{fontWeight: 'normal'}}>
                            {commentItem.comment}
                          </Text>
                        </Text>
                      );
                    })}
                    {data.comments.length > 0 ? (
                      <View>
                        <Text
                          style={{color: 'blue'}}
                          onPress={() => {
                            navigation.navigate('Home', {Screen: 'comments'});
                            console.log('clicked???');
                          }}>
                          View all {data.comments.length} comments
                        </Text>
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>

                  {addComment.id === data._id && (
                    <>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={comment => {
                          setComment(comment);
                        }}
                        onSubmitEditing={comment => {
                          setComment(comment);
                        }}
                        placeholder="Enter your Comment"
                        value={comment}
                      />
                      <View style={styleIn.handleComment}>
                        <TouchableHighlight
                          onPress={() => handleComment(data._id)}>
                          <View style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                    </>
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

const styleIn = StyleSheet.create({
  postIcon: {width: 20, height: 20},
  name: {color: 'white', paddingHorizontal: 10},
  caption: {fontSize: 20, color: '#f4511e'},
  category: {
    fontSize: 20,
    backgroundColor: '#f4511e',
    padding: 5,
  },
  image: {width: imageWidth, height: imageHeight},
  commentHeader: {
    fontSize: 18,
    color: '#f4511e',
    padding: 5,
    fontWeight: 'bold',
  },
  comments: {fontWeight: 'bold', fontSize: 15},
  handleComment: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default Home;
