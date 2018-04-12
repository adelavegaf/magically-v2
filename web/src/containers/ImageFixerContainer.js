import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageFixer from '../components/editor/ImageFixer';

class ImageFixerContainer extends Component {
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

  didEditDescription(description) {
    this.props.didEditImageDescription(this.state.currentErrorKey, description);
  }

  render() {
    return React.createElement(ImageFixer, {
        didEditDescription: (description) => this.didEditDescription(description),
        imageErrors: this.props.imageErrors,
        currentError: this.props.imageErrors[this.state.currentErrorKey],
        changeError: (key, error) => this.changeError(key, error),
      }
    );
  }
}

ImageFixerContainer.propTypes = {
  didEditImageDescription: PropTypes.func.isRequired,
  imageErrors: PropTypes.object.isRequired
};

export default ImageFixerContainer;
