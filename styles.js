import {StyleSheet} from 'react-native';
import {white} from 'color-name';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4511e',
    margin: 10,
  },
  filterButton: {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4511e',
    margin: 5,
  },
  buttonText: {
    textAlign: 'center',
    padding: 15,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // resizeMode: "stretch"
  },
  forms: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    width: '100%',
  },
  textInput: {
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    fontSize: 20,
    width: '80%',
    // maxWidth:'80%',
    height:40,
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  login_sec: {
    width: '90%',
    padding: '5%',
    marginTop: 20,
    backgroundColor: '#faf9f9' /* Old browsers */,
  },
  profile: {
    justifyContent: 'center',
    width: '90%',
    padding: '5%',
    margin: 20,
    backgroundColor: '#faf9f9',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  post: {
    margin: 10,
    borderTopWidth: 2,
    borderTopColor: '#f4511e',
    zIndex: 0,
  },
  postHeader: {
    padding: 10,
    backgroundColor: '#f4511e',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postLeft: {justifyContent:'space-between'},
  postRight: {
    alignItems: 'flex-end',
  },
  postIcon: {
    flexDirection: 'row',
    backgroundColor: '#f4511e',
  },
  Comment: {
    backgroundColor: 'azure',
    margin: 8,
    padding: 4,
  },
  Comment2: {
    flexDirection: 'row',
  },
  DropDownMenu: {
    flex: 1,
  },
  mainWord: {
    fontSize: 30,
    color: '#f4511e',
    alignSelf: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#f4511e',
  },
  autoSuggestion: {
    alignSelf: 'center',
    width: '90%',
    position: 'absolute',
    backgroundColor: '#d1d5da',
    top: -10,
    zIndex: 1,
    padding: 5,
  },
  filterPost: {
    alignSelf: 'flex-end',
    width: '30%',
    position: 'absolute',
    backgroundColor: '#d1d5da',
    top: -5,
    zIndex: 1,
    padding: 5,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  text: {
    color: '#f4511e',
  },
});
export default styles;
