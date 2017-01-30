import React, {Component} from 'react';

import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Linking
} from 'react-native';

import styles from './styles';

import {
  getTheme
} from 'react-native-material-kit';

import {
  SocialIcon,
  Button
} from 'react-native-elements';

import Hr from 'react-native-hr';

const theme = getTheme();

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setEmail(email) {
    this.setState({
      email
    })
  }

  setPassword(password) {
    this.setState({
      password
    })
  }

  render() {

    const oauth = (strategy) => {
      Linking
      .openURL(`http://10.0.2.2:1337/api/auth/${strategy}/login`)
      .catch(err => console.error);
    }

    const login = () => {
      this.props.login(this.state.email, this.state.password);
    };

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={[theme.cardStyle, styles.card]}>

          <SocialIcon
            title="Sign In With Facebook"
            button
            type="facebook"
            onPress={() => oauth("facebook")}
          />
          <SocialIcon
            title="Sign In With Google"
            button
            type="google-plus-official"
            onPress={() => oauth("google")}
          />
          <SocialIcon
            title="Sign In With Twitter"
            button
            type="twitter"
            onPress={() => oauth("twitter")}
          />

          <View style={styles.hr}>
            <Hr lineColor="black" text="or" margin={50}/>
          </View>

          <TextInput 
            placeholder="Email"
            onChangeText={(email) => this.setEmail(email)}
            value={this.state.email}
            keyboardType="email-address"
            style={styles.email}
          />
          <TextInput 
            placeholder="Password"
            onChangeText={(password) => this.setPassword(password)}
            value={this.state.password}
            secureTextEntry={true}
            style={styles.password}
          />

          <Button title="Login" onPress={login} buttonStyle={styles.login}/>
          
        </KeyboardAvoidingView>
      </View>
    );
  };
  
};
