/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

const validateFormik = yup.object().shape({
  email: yup.string().label('Your Email').email().required(),
  password: yup.string().required().min(3, 'to short !').max(10, 'too short !'),
});
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

  doLogin = ({email, password}) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        // ketika email sesuai
        if (email === 'admin@admin.com' && password === '12345') {
          resolve(true);
        } else {
          reject(new Error('Your Email or Password not valid !!'));
        }
      }, 2000);
    });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>
            {'Simple Validate login '}
          </Text>
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values, actions) => {
            // lakukan login
            this.doLogin({
              email: values.email,
              password: values.password,
            })
              // lalu tampilkan error
              .then(() => alert(JSON.stringify(values)))
              .catch((e) => actions.setFieldError('erorrlogin', e.message))
              .finally(() => actions.setSubmitting(false));
          }}
          validationSchema={validateFormik}>
          {(formikProps) => (
            <>
              {formikProps.isSubmitting && <ActivityIndicator animating />}
              <View style={styles.formGroup}>
                <Text style={styles.txtLabel}>Email</Text>
                <TextInput
                  style={styles.txtInput}
                  keyboardType="email-address"
                  onChangeText={formikProps.handleChange('email')}
                  onBlur={formikProps.handleBlur('email')}
                />
                <Text style={{color: 'red'}}>
                  {formikProps.touched.email && formikProps.errors.email}
                </Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.txtLabel}>Password</Text>
                <TextInput
                  style={styles.txtInput}
                  onChangeText={formikProps.handleChange('password')}
                  onBlur={formikProps.handleBlur('password')}
                  secureTextEntry
                />
                <Text style={{color: 'red'}}>
                  {formikProps.touched.password && formikProps.errors.password}
                </Text>
              </View>
              <View style={styles.formGroup}>
                <Button onPress={formikProps.handleSubmit} title="Login" />
                <Text>{formikProps.errors.erorrlogin}</Text>
              </View>
            </>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formGroup: {
    margin: 5,
  },
  txtLabel: {
    marginBottom: 5,
  },
  txtInput: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
  },
});

export default App;
