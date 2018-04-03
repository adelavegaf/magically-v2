import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SignIn from '../components/auth/SignIn';
import firebase from '../firebase';
import {LANDING} from '../components/utils/Views';

export const REGISTER_VIEW = 'register';
export const LOGIN_VIEW = 'login';
const INITIAL_STATE = {
  email: '',
  password: '',
  confirmPassword: '',
  errorHelperText: '',
  currentAuthView: REGISTER_VIEW
};

class SignInContainer extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  changeAuthView() {
    const nextAuthView = this.state.currentAuthView === REGISTER_VIEW ? LOGIN_VIEW : REGISTER_VIEW;
    const nextState = INITIAL_STATE;
    nextState.currentAuthView = nextAuthView;
    this.setState(nextState);
  }

  register() {
    if (this.state.password === this.state.confirmPassword) {
      // TODO(adelavega): Only show error in one of the textfields. The appropriate one.
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then(() => this.props.changeView(LANDING, {}))
              .catch((error) => this.setState({errorHelperText: error.message}));
    }
    else {
      this.setState({errorHelperText: 'Passwords don\'t match'});
    }
  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.changeView(LANDING, {}))
            .catch((error) => this.setState({errorHelperText: error.message}));
  }

  onEmailChange(email) {
    this.setState({email: email});
  }

  onPasswordChange(password) {
    this.setState({password: password});
  }

  onConfirmPasswordChange(confirmPassword) {
    this.setState({confirmPassword: confirmPassword});
  }

  didPressActionButton() {
    switch (this.state.currentAuthView) {
      case REGISTER_VIEW:
        this.register();
        break;
      case LOGIN_VIEW:
        this.login();
        break;
    }
  }

  render() {
    return React.createElement(SignIn, {
      errorHelperText: this.state.errorHelperText,
      currentAuthView: this.state.currentAuthView,
      changeAuthView: () => this.changeAuthView(),
      onEmailChange: (email) => this.onEmailChange(email),
      onPasswordChange: (password) => this.onPasswordChange(password),
      onConfirmPasswordChange: (confirmPassword) => this.onConfirmPasswordChange(confirmPassword),
      didPressActionButton: () => this.didPressActionButton()
    });
  }
}

// TODO(adelavega): Add last view prop to redirect to proper view. Also add last view state.
SignInContainer.propTypes = {
  changeView: PropTypes.func.isRequired
};

export default SignInContainer;
