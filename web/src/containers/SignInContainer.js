import React, {Component} from 'react';
import SignIn from '../components/auth/SignIn';

export const REGISTER_VIEW = 'register';
export const LOGIN_VIEW = 'login';

class SignInContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentAuthView: REGISTER_VIEW
    }
  }

  changeAuthView() {
    const nextAuthView = this.state.currentAuthView === REGISTER_VIEW ? LOGIN_VIEW : REGISTER_VIEW;
    this.setState({currentAuthView: nextAuthView});
  }

  render() {
    return React.createElement(SignIn, {
      currentAuthView: this.state.currentAuthView,
      changeAuthView: () => this.changeAuthView()
    });
  }
}

export default SignInContainer;
