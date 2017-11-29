import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

export default class App extends React.Component {

  componentDidMount () {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyBCOHuRiRn3pbcUtz7s4z5UyYvV33Xwy3s",
      authDomain: "one-time-password-dd26a.firebaseapp.com",
      databaseURL: "https://one-time-password-dd26a.firebaseio.com",
      projectId: "one-time-password-dd26a",
      storageBucket: "one-time-password-dd26a.appspot.com",
      messagingSenderId: "116792616322"
    };
    firebase.initializeApp(config);
  }

  render () {
    return (
      <View style={styles.container}>
        <SignUpForm/>
        <SignInForm/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
