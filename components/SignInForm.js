import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const API_PATH = 'https://us-central1-one-time-password-dd26a.cloudfunctions.net/';

class SignInForm extends Component {
  state = {
    phone: '',
    code: ''
  };

  // doing it this way we can avoid binding the context of 'this' down below
  // and avoid () => this.handleSubmit()
  handleSubmit = async () => {
    const {phone, code} = this.state;
    try {
      const response = await axios.post(`${API_PATH}verifyOneTimePassword`, {phone, code});
      const { token } = response.data;
      await firebase.auth().signInWithCustomToken(token);
    } catch (err) {
      console.log(err);
      this.setState({error: 'Could not verify code'});
    }

  };

  render () {
    if (this.state.error) {
      return (
        <View>
          <Text>Error Occurred: {this.state.error}</Text>
        </View>
      );
    }

    return (
      <View>
        <View style={styles.formStyle}>
          <FormLabel>
            Enter Phone Number
          </FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({phone})}
          />
        </View>
        <View style={styles.formStyle}>
          <FormLabel>
            Enter Code
          </FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({code})}
          />
        </View>
        <Button
          title='Submit'
          onPress={this.handleSubmit}
        />
      </View>
    );
  }

}

const styles = {
  formStyle: {
    marginBottom: 10
  }
};

export default SignInForm;