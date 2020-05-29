import React, {useEffect, useState} from 'react';
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
import ImagePicker from 'react-native-image-picker';
import styles from '../styles';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const Upload = ({navigation}) => {
  const [photo, setPhoto] = useState([]);
  const [category, setCategory] = useState('');
  const [caption, setCaption] = useState('');
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    axios.post('http://192.168.43.57:3002/category/showcategory').then(res => {
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

  const handleCategory = item => {
    console.log('category is been selected !!', item);
  };

  const handleUploadpost = () => {
    if (photo && category && caption) {
      const upload = {image: photo.uri, caption: caption, category: category};
      const formData = new FormData();
      formData.append('image', photo.uri);
      formData.append('caption', caption);
      formData.append('category', category);
      axios
        .post('http://192.168.43.57:3002/post/upload', formData)
        .then(res => {
          console.log('resUploadData', res.data);
          setCaption('');
          setCategory('');
          setPhoto([]);
        });
      alert('Upload is done');
      //navigation.navigate('Home');
    } else alert('Required all data field!!');
  };

  return (
    <ScrollView>
      <View style={styleIn.container}>
        <View>
          <Text style={styles.mainWord}>UploadPost</Text>
          <Text style={styles.text}>Category</Text>
          <DropDownPicker
            items={allCategory}
            placeholder="Select a category"
            containerStyle={{height: 40}}
            onChangeItem={item => setCategory(item.value)}
            value={category}
          />
          <Text style={styles.text}>Caption</Text>
          <TextInput
            style={styles.textInput}
            placeholder="write your caption here..."
            onChangeText={caption => {
              setCaption(caption);
            }}
            value={caption}
          />
          {photo.uri && (
            <Image
              source={{uri: photo.uri}}
              style={styleIn.uploadImage}
            />
          )}
          <Text> </Text>
          <View>
            <TouchableHighlight onPress={handleChoosePhoto}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Choose Photo</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <Text> </Text>
        <View>
          <TouchableHighlight onPress={handleUploadpost}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Upload Picture</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

const styleIn = StyleSheet.create({
  container:{flex: 1, alignItems: 'center', justifyContent: 'center'},
  uploadImage:{width: 60, height: 60, alignSelf: 'center'}

})
export default Upload;
