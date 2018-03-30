import React, {Component} from 'react';
import PropStyles from 'prop-types';
import AuthButton from '../components/auth/AuthButton';
import {SIGN_IN} from '../components/utils/Views';

class AuthButtonContainer extends Component {
  constructor(props) {
    super(props);
  }

  changeView() {
    this.props.changeView(SIGN_IN, {});
  }

  render() {
    return React.createElement(AuthButton, {
      changeView: () => this.changeView()
    })
  }
}

AuthButtonContainer.propStyles = {
  changeView: PropStyles.func.isRequired
};

export default AuthButtonContainer;
