import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const API_PATH = 'https://us-central1-one-time-password-dd26a.cloudfunctions.net/';

class SignUpForm extends Component {
  state = {
    phone: ''
  };

  // doing it this way we can avoid binding the context of 'this' down below
  // and avoid () => this.handleSubmit()
  handleSubmit = async () => {
    const { phone } = this.state;
    try {
      await axios.post(`${API_PATH}createUser`, {phone: this.state.phone});
      await axios.post(`${API_PATH}requestOneTimePassword`, {phone: this.state.phone});
    } catch (err) {
      this.setState({error: 'Could not create user or request password'});
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

export default SignUpForm;