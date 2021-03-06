import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from '../styles';
import axios from 'axios';
import SERVER_URL from '../config';
import {useSelector} from 'react-redux';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker'


const Upload = ({navigation}) => {
  const [photo, setPhoto] = useState([]);
  const [category, setCategory] = useState('');
  const [caption, setCaption] = useState('');
  const [allCategory, setAllCategory] = useState([]);
  const user = useSelector(state => state.userData);
  const id = user.userData._id;

  useEffect(() => {
    axios.post(SERVER_URL + 'category/showcategory').then(res => {
      const categories = [];
      res.data.map((data, id) => {
        const p = {label: data.name, value: data.name};
        categories.push(p);
      });
      setAllCategory(categories);
      console.log('upload data is....', res.data, categories);
    });
  }, []);

  const handleChoosePhoto = () => {
    console.log('does this function been called???');
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.log('responseee', response);
        setPhoto(response);
      }
    });
  };

  const handleUploadpost = () => {
    if (caption && category && photo) {
      const imageData = {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'android'
            ? photo.uri
            : photo.uri.replace('file://', ''),
      };
      const formData = new FormData();
      formData.append('image', imageData);
      formData.append('caption', caption);
      formData.append('category', category);
      formData.append('postedBy', id);
      console.log('forUpdate', SERVER_URL, formData, Platform.OS);
      const userUpload = {
        image: imageData,
        caption: caption,
        category: category,
        postedBy: id,
      };
      axios
        .post(SERVER_URL + 'post/upload', formData)
        .then(res => {
          console.log('resUploadData', res.data);
          setCaption('');
          setCategory('');
          setPhoto([]);
        })
        .catch(error => {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
            error,
          );
          throw error;
        });
      //alert('Upload is done');
      //navigation.navigate('Home');
    } else alert('Required all data field!!');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={styles.mainWord}>UploadPost </Text>
          <Text> </Text>
          <Text style={styles.text}>Category {'\n'}</Text>

          <DropDownPicker
            items={allCategory}
            defaultValue={null}
            containerStyle={{height: 40}}
            style={{backgroundColor: 'white', width: '80%'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => setCategory(item.value)}
            value={category}
          />

          <Text> </Text>
          <Text style={styles.text}>Caption</Text>

          <TextInput
            style={styles.textInput}
            placeholder="write your caption here..."
            multiline={true}
            onChangeText={caption => {
              setCaption(caption);
            }}
            value={caption}
          />

          {photo.uri && (
            <Image source={{uri: photo.uri}} style={styleIn.uploadImage} />
          )}
          <Text> </Text>
          <View>
            <TouchableNativeFeedback onPress={handleChoosePhoto}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Choose Photo</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <Text> </Text>
        <View>
          <TouchableNativeFeedback onPress={handleUploadpost}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Upload Picture</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

const styleIn = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  uploadImage: {width: 60, height: 60, alignSelf: 'center'},
});
export default Upload;
