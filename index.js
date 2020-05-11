import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import userData from './redux/reducer';

// STORE; GLOBALIZED STORE
// const globalStore = createStore(userData);

// const RNRedux = () => {
//   <Provider store={globalStore}>
//     <App />
//   </Provider>;
// };

AppRegistry.registerComponent(appName, () => App);
