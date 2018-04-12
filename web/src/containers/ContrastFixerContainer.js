import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ContrastFixer from '../components/editor/ContrastFixer';

class ContrastFixerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentErrorKey: -1,
    };
  }

  changeError(key) {
    this.setState({
      currentErrorKey: key
    });
  }

  render() {
    const contrastErrors = this.props.contrastErrors;
    const index = this.state.currentErrorKey;
    const error = contrastErrors[index];
    return React.createElement(ContrastFixer, {
        contrastErrors: contrastErrors,
        currentError: error,
        changeError: (key, error) => this.changeError(key, error),
      }
    );
  }
}

ContrastFixerContainer.propTypes = {
  contrastErrors: PropTypes.object.isRequired
};

export default ContrastFixerContainer;
