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
import SERVER_URL from '../config';

const Comments = ({route, navigation}) => {
  const {_id} = route.params;
  const [singlePostComments, setSinglePostComments] = useState({});
  const [ifLoading, setIfLoading] = useState(true);
  console.log('=======>>>>>>>>>>> it came here////');

  useEffect(() => {
    console.log('problem is here???');

    axios
      .post( SERVER_URL + 'post/singlePost', {
        id: _id,
      })
      .then(res => {
        console.log('single post comments are', res.data);
        setSinglePostComments(res.data);
        setIfLoading(false);
      });
  }, []);
  
if(ifLoading){
  return(
    <ActivityIndicator></ActivityIndicator>
  )
}
  return (
    <>
      <ScrollView>
        <View>
          <Text style={styleIn.commentHeader}>Comments</Text>
          {singlePostComments.comments.map((item, id) => {
            return (
              <View style={styleIn.showComment} key={item._id}>
              <Text style={styleIn.comments} key={item._id}>
                {item.commentedBy.firstname + ' ' + item.commentedBy.lastname}{' '} :{'  '}
                <Text style={{fontWeight: 'normal'}}>{item.comment}</Text>
              </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
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
  showComment: {
    marginTop: 16,
    paddingVertical: 8,
    paddingLeft:6,
    borderColor: "grey",
    borderBottomWidth:StyleSheet.hairlineWidth,
    color: "#20232a",
  }
});

export default Comments;


