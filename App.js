/* eslint-disable no-alert */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import {Formik} from 'formik';

class App extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false,
  };

  _handlePress(values, actions) {
    setTimeout(() => {
      alert(JSON.stringify(values));
      actions.setSubmitting(false);
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Formik initialValues={{email: ''}} onSubmit={this._handlePress}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
        {/* <TextInput
          onChangeText={(email) => this.setState({email})}
          style={styles.textInput}
          value={this.state.email}
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={(password) => this.setState({password})}
          style={styles.textInput}
          value={this.state.password}
          secureTextEntry
        />
        <Button
          onPress={this._handlePress.bind(this)}
          disabled={this.state.isLoading}
          title="submit"
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  textInput: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'yellow',
    marginBottom: 10,
  },
});

export default App;
