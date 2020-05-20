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
import {Dropdown} from 'react-native-material-dropdown';
import DropDownItem from 'react-native-drop-down-item';
import axios from 'axios';

const Upload = () => {
  const [photo, setPhoto] = useState();
  const [category, setCategory] = useState('');
  const [caption, setCaption] = useState('');
  const [showUpload, setshowUpload] = useState(false);
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    axios.post('http://192.168.1.11:3002/category/showcategory').then(res => {
      setAllCategory(res.data);
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
        setPhoto({photo: response});
        setshowUpload(false);
      }
    });
  };
  const handleShowupload = () => {
    setshowUpload(true);
  };

  const handleUpload = () => {
    alert('Done');
    setshowUpload(false);
  };

  return (
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{uri: 'content://media/external/images/media/23'}}
          style={{width: 300, height: 300}}
        />
        {showUpload ? (
          <View>
            <Text style={styles.mainWord}>UploadPost</Text>
            <Text>Category</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={category => {
                setCategory(category);
              }}
              placeholder="Enter Category"
              value={category}
            />
            {allCategory.map((data, i) => {
              return (
                <DropDownItem
                  key={i}
                  style={styles.textInput}
                  contentVisible={false}
                  invisibleImage={IC_ARR_DOWN}
                  visibleImage={IC_ARR_UP}
                  header={
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'blue',
                        }}>
                        {data.category}
                      </Text>
                    </View>
                  }
                />
              );
            })}
            <Text>Caption</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter caption"
              onChangeText={caption => {
                setCaption(caption);
              }}
              value={caption}
            />
            {photo && (
              // {console.log("lets see image has come")}
              <Image
                source={{uri: photo.uri}}
                style={{width: 30, height: 30}}
              />
            )}
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
          </View>
        ) : (
          <></>
        )}
        <Text> </Text>
        {showUpload ? (
          <Button title="Done" onPress={handleUpload} />
        ) : (
          <Button title="Uploads Picture" onPress={handleShowupload} />
        )}
      </View>
    </ScrollView>
  );
};

export default Upload;
