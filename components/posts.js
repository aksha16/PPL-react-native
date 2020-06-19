import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import styles from '../styles';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 12) / 16);
const imageWidth = dimensions.width - 2;
import SERVER_URL from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Posts = ({navigation}) => {
  const [pics, setPics] = useState([]);
  const [hide, setHide] = useState(false);
  const [filter, setFilter] = useState(false);

  const user = useSelector(state => state.userData);
  const [comment, setComment] = useState('');
  const [addComment, setAddComment] = useState({id: ''});

  useEffect(() => {
    axios.post(SERVER_URL + 'post/showpost').then(res => {
      console.log('server dataaaaaa: ', res.data);
      setPics(res.data);
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
      .post(SERVER_URL + 'post/likes', {
        _id: id,
        email: user.userData.email,
      })
      .then(res => {
        if (res.data.nModified === 1) {
          console.log('likes added !! ', res);
          oldpics[index].likedBy.push(user.userData.email);
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
        .post(SERVER_URL + 'post/singlePost/addComments', {
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

  const handleChange = e => {
    setHide(false);
    setFilter(true);
    axios
      .post(SERVER_URL + 'post/sort', {text: e})
      .then(res => {
        setPics(res.data);
      })
      .catch(error => {
        console.log('errors', error);
        throw error;
      });
  };

  const handleDissmisFilter = () => {
    setFilter(false);
    axios.post(SERVER_URL + 'post/showpost').then(res => {
      setPics(res.data);
    });
  };

  return (
    <>
      <ScrollView>
        <View>
          <Icon.Button
            name="filter"
            backgroundColor="#ffa21d"
            onPress={() => (hide ? setHide(false) : setHide(true))}>
            Filter Post
          </Icon.Button>
        </View>
        <View>
          {hide && (
            <View style={styles.filterPost}>
              <TouchableHighlight onPress={() => handleChange('latestFirst')}>
                <View style={{padding: 10, fontSize: 20, borderBottomWidth: 1}}>
                  <Text>Latest First</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => handleChange('oldestFirst')}>
                <View style={{padding: 10, fontSize: 20, borderBottomWidth: 1}}>
                  <Text>Oldest First</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => handleChange('mostLiked')}>
                <View style={{padding: 10, fontSize: 20, borderBottomWidth: 1}}>
                  <Text>Most Liked</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => handleChange('mostCommented')}>
                <View style={{padding: 10, fontSize: 20}}>
                  <Text>Most Commented</Text>
                </View>
              </TouchableHighlight>
            </View>
          )}
        </View>

        {filter && (
          <View>
            <Text style={styleIn.commentHeader}>Filter</Text>
            <View style={styleIn.filters}>
              <View>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Latest first</Text>
                </View>
              </View>
              <View>
                <TouchableHighlight onPress={handleDissmisFilter}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      Dismiss filter
                      <Entypo name="cross" size={15} />
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        )}

        <View style={styles.container}>
          {pics.map((data, id) => {
            const {postedBy: {firstname = '', lastname = ''} = {}} = data;
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
                          {firstname + ' ' + lastname}
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
                      <Text>
                        {data.date ? data.date.slice(0, 10) : ''}{' '}
                        {data.date ? data.date.slice(11, 19) : ''}{' '}
                      </Text>
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
                    <View style={styles.postIcon}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'white'}}>
                          {' '}
                          {data.likedBy.length} Likes{' '}
                        </Text>
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              handleLikes(data._id);
                            }}>
                            <Ionicons
                              name="ios-thumbs-up"
                              size={20}
                              color={
                                data.likedBy.includes(user.userData.email)
                                  ? 'orange'
                                  : 'white'
                              }
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

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
                            <FontAwesome name="comment" size={20} />
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View>
                    <Text style={styleIn.commentHeader}>Comments</Text>
                    {data.comments.slice(0, 2).map((commentItem, id) => {
                      return (
                        <View style={styleIn.showComment} key={commentItem._id}>
                          <Text style={styleIn.comments} key={commentItem._id}>
                            {commentItem.commentedBy.firstname +
                              ' ' +
                              commentItem.commentedBy.lastname}{' '}
                            :{' '}
                            <Text style={{fontWeight: 'normal'}}>
                              {commentItem.comment}
                            </Text>
                          </Text>
                        </View>
                      );
                    })}
                    {data.comments.length > 0 ? (
                      <View style={styleIn.showComment}>
                        <Text
                          style={{color: 'blue'}}
                          onPress={() => {
                            navigation.navigate('comments', {_id: data._id});
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
  filters: {flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'},
  showComment: {
    // marginTop: 16,
    // paddingVertical: 8,
    paddingLeft: 6,
    // borderColor: "grey",
    // borderBottomWidth:2,
    // color: "#20232a",
  },
});

export default Posts;
