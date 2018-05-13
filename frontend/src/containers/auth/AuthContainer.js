import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../../components/auth/Auth';
import firebase from '../../firebase';

export const REGISTER_VIEW = 'register';
export const LOGIN_VIEW = 'login';
const INITIAL_STATE = {
  email: '',
  password: '',
  confirmPassword: '',
  errorHelperText: '',
  currentAuthView: LOGIN_VIEW
};

class AuthContainer extends Component {

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

  goBack() {
    // TODO(adelavega): Figure out how to actually go back :)
    this.props.history.push('/');
    // this.props.history.goBack();
  }

  register() {
    if (this.state.password === this.state.confirmPassword) {
      // TODO(adelavega): Only show error in one of the textfields. The appropriate one.
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then(() => this.goBack())
              .catch((error) => this.setState({errorHelperText: error.message}));
    }
    else {
      this.setState({errorHelperText: 'Passwords don\'t match'});
    }
  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.goBack())
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
      default:
        return;
    }
  }

  render() {
    return React.createElement(Auth, {
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

AuthContainer.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(AuthContainer);
