import React, {Component} from 'react';
import PropStyles from 'prop-types';
import AuthButton from '../../components/auth/AuthButton';
import {SIGN_IN} from '../../components/utils/Views';
import firebase from '../../firebase';

class AuthButtonContainer extends Component {
  constructor(props) {
    super(props);
    this.authUnsubscribe = null;
    this.state = {
      loggedIn: false,
      displayName: '',
      anchorElement: null
    };
  }

  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedIn: true,
          displayName: user.displayName ? user.displayName : user.email
        });
      }
      else {
        this.setState({
          loggedIn: false,
          displayName: ''
        });
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
  }

  changeView() {
    this.props.changeView(SIGN_IN, {});
  }

  didPressProfileButton(event) {
    this.setState({anchorElement: event.target})
  }

  closeMenu() {
    this.setState({anchorElement: null});
  }

  didPressLogoutButton() {
    firebase.auth().signOut();
    this.closeMenu();
  }

  render() {
    return React.createElement(AuthButton, {
      loggedIn: this.state.loggedIn,
      displayName: this.state.displayName,
      anchorElement: this.state.anchorElement,
      closeMenu: () => this.closeMenu(),
      didPressProfileButton: (event) => this.didPressProfileButton(event),
      didPressLogoutButton: () => this.didPressLogoutButton(),
      changeView: () => this.changeView()
    })
  }
}

AuthButtonContainer.propStyles = {
  changeView: PropStyles.func.isRequired
};

export default AuthButtonContainer;
