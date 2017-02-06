import React, { Component } from 'react';
import {AppRegistry, View, StyleSheet, Linking, AsyncStorage} from 'react-native';
import {connect, Provider} from 'react-redux';
import store from './app/store';
import {Switch, Actions, Scene, Router} from 'react-native-router-flux';
import queryString from 'query-string';
import {persistStore} from 'redux-persist';


import Splash from './app/components/Splash';
import Login from './app/components/Login';
import Filter from './app/components/Filter';
import Signup from './app/components/Signup';
import Home from './app/components/Home';
import SwipeView from './app/components/SwipeView';
import Restaurant from './app/components/Restaurant';
import TabBar from './app/components/TabBar';
import DetailView from './app/components/DetailView';
import Loading from './app/components/Loading';

import {receiveRefreshToken, receiveAccessToken, updateLoggedIn} from './app/action-creators/auth';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

const connectedSwitch = connect(mapStateToProps)(Switch);

const selector = props => (true ? 'loggedIn' : 'notLoggedIn');

const scenes = Actions.create(
  <Scene key="root" component={connectedSwitch} selector={selector} >

    <Scene key="loggedIn">
      {/* <Scene key="filter" component={Filter} title="Filter" hideNavBar={true} /> */}
      <Scene key="tabBar" component={TabBar} title="Nav" hideNavBar intial />
      <Scene key="restaurant" component={Restaurant} hideNavBar={false} title="Restaurant" />
    </Scene>

    <Scene key="notLoggedIn">
      <Scene key="splash" component={Splash} title="Splash" hideNavBar initial/>
      <Scene key="login" component={Login} title="Login" hideNavBar/>
      <Scene key="signup" component={Signup} title="Signup" hideNavBar/>
    </Scene>

  </Scene>
);

export default class BiteSwipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rehydrated: false
    };
  }

  componentWillMount() {
    persistStore(store, {storage: AsyncStorage}, () => {
      this.setState({
        rehydrated: true
      })
    });
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    const obj = queryString.parse(event.url.replace('biteswipe://callback?', ''));
    if(obj.refreshToken && obj.accessToken) {
      store.dispatch(receiveRefreshToken(obj.refreshToken));
      store.dispatch(receiveAccessToken(obj.accessToken));
      store.dispatch(updateLoggedIn(true));
    }
  }

  render() {
    if(!this.state.rehydrated) {
      return (
        <Loading/>
        );
    } else {
      return (
          <Provider store={store}>
            <Router
              navigationBarStyle={styles.navBar}
              titleStyle={styles.navTitle}
              barButtonIconStyle={styles.navBarButton}
              scenes={scenes}/>
          </Provider>
        );
    }
  }
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#2196F3'
  },
  navTitle: {
    color: 'white'
  },
  navBarButton: {
    tintColor: 'white'
  }
});

AppRegistry.registerComponent('BiteSwipe', () => BiteSwipe);
