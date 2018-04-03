import React, {Component} from 'react';
import SignIn from '../components/auth/SignIn';

export const REGISTER_VIEW = 'register';
export const LOGIN_VIEW = 'login';
const INITIAL_STATE = {
  username: '',
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

  }

  login() {

  }

  onUsernameChange(username) {
    this.setState({username: username});
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
      onUsernameChange: (username) => this.onUsernameChange(username),
      onPasswordChange: (password) => this.onPasswordChange(password),
      onConfirmPasswordChange: (confirmPassword) => this.onConfirmPasswordChange(confirmPassword)
    });
  }
}

export default SignInContainer;
