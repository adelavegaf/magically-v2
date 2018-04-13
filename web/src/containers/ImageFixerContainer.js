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
    this.props.didEditImageDescription(this.state.currentErrorKey, description, false /* hasNoDescription */);
  }

  didPressHasNoDescription(checked) {
    this.props.didEditImageDescription(this.state.currentErrorKey, '', checked /* hasNoDescription */);
  }

  render() {
    const imageErrors = this.props.imageErrors;
    const index = this.state.currentErrorKey;
    const error = imageErrors[index];
    const hasNoDescription = error ? error.isFixed && error.description.length === 0 : false;
    return React.createElement(ImageFixer, {
        sideListMaxHeight: this.props.sideListMaxHeight,
        didPressHasNoDescription: (checked) => this.didPressHasNoDescription(checked),
        didEditDescription: (description) => this.didEditDescription(description),
        imageErrors: imageErrors,
        currentError: error,
        hasNoDescription: hasNoDescription,
        changeError: (key, error) => this.changeError(key, error),
      }
    );
  }
}

ImageFixerContainer.propTypes = {
  sideListMaxHeight: PropTypes.number.isRequired,
  didEditImageDescription: PropTypes.func.isRequired,
  imageErrors: PropTypes.object.isRequired
};

export default ImageFixerContainer;
