import React, { Component, Fragment, useState, useEffect } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {View, Text,  StyleSheet,  TouchableNativeFeedback} from 'react-native';
import styles from '../styles';
import axios from 'axios';
import SERVER_URL from '../config';
 
const Chat = ({navigation})  => {
  const [selectedItems, setSelectedItems] = useState();
  const [usernameList, setUsernameList] = useState([]);

  useEffect(() => {
    axios.post(SERVER_URL +'user/usernames').then(res => {
        if(res.data){
            console.log("ress of chat now", res);
            const use = [];
            res.data.map((data, id) => {
                const p = {id: id, name: data.username};
                use.push(p);
              });
              setUsernameList(use);

        }
        else {
            console.log("res data of usernames", res);
        }
    }).catch(err => {
        console.log("error while chatting, err",  err);
    })
  },  []);

  return (
      <>
      {console.log("selected items", selectedItems, usernameList)}
      <View style={styleIn.container}>
      <View>
          <Text style={styles.mainWord}>
            Let's chat
          </Text>
          <Text style={styleIn.text}>Username </Text>
      </View>
        <Fragment>
          
          {/* Single */}
          <SearchableDropdown
            onItemSelect={(item) => {
            //   const items = selectedItems;
              console.log("item  select", item);
            //   items.push(item)
              setSelectedItems(item);
            }}
            containerStyle={{ padding: 5 }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={usernameList}
            //defaultIndex={2}
           // resetValue={false}
            textInputProps={
              {
                placeholder: "Username you wanna chat with...",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                // onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
    
        />
      </Fragment>
      </View>

     {selectedItems && <View style={{alignSelf:'center'}}>

          <TouchableNativeFeedback onPress={()=> navigation.navigate('chatting')}>
            <View style={styleIn.button}>
              <Text style={styles.buttonText}>chat now</Text>
            </View>
          </TouchableNativeFeedback>
        </View> }
    
      </>
  );
};

const styleIn = StyleSheet.create({
    text: {
        color: '#f4511e',
        margin:5,
        padding:20
      },
      container: {
        flex: 1,
        width: '100%',
      },
      button: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4511e',
        margin: 10,
        borderRadius:30
      },
})

export default Chat;