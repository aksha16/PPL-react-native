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
import Styles from '../styles';

const Comments = ({route, navigation}) => {
  const {_id} = route.params;
  const [singlePostComments, setSinglePostComments] = useState([]);
  console.log('=======>>>>>>>>>>>', route, navigation);

  useEffect(() => {
    axios
      .post('http://192.168.43.57:3002/post/singlePost', {
        id: _id,
      })
      .then(res => {
        console.log('single post comments are', res.data);
        setSinglePostComments(res.data);
      });
  }, []);

  return (
    <>
      {console.log('lets see', singlePostComments.comments)}{' '}
      <ScrollView>
        <View>
          <Text style={styleIn.commentHeader}>Comments</Text>
          {singlePostComments.comments.map((commentItem, id) => {
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
        </View>
      </ScrollView>
      <Text>Ahahah</Text>
    </>
  );
};

const styleIn = StyleSheet.create({
  commentHeader: {
    fontSize: 18,
    color: '#f4511e',
    padding: 5,
    fontWeight: 'bold',
  },
  comments: {fontWeight: 'bold', fontSize: 15},
});

export default Comments;
