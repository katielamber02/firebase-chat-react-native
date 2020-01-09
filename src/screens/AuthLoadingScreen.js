import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import User from '../components/User'

import firebase from 'firebase/app'
import 'firebase/database';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  componentWillMount() {
    var firebaseConfig = {
      apiKey: "", // INSERT API KEY
      authDomain: "microcoderchat.firebaseapp.com",
      databaseURL: "https://microcoderchat.firebaseio.com",
      projectId: "microcoderchat",
      storageBucket: "microcoderchat.appspot.com",
      messagingSenderId: "159799875757",
      appId: "1:159799875757:web:393a71f4146bd8f8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }


  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
export default AuthLoadingScreen