import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageFixer from '../../components/editor/ImageFixer';

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
    const {imageErrors, imageErrorsCount} = this.props;
    const index = this.state.currentErrorKey;
    const error = imageErrors[index];
    const hasNoDescription = error && error.description ? error.isFixed && error.description.length === 0 : false;
    return React.createElement(ImageFixer, {
        isOwner: this.props.isOwner,
        sideListMaxHeight: this.props.sideListMaxHeight,
        didPressHasNoDescription: (checked) => this.didPressHasNoDescription(checked),
        didEditDescription: (description) => this.didEditDescription(description),
        imageErrors: imageErrors,
        currentError: error,
        hasNoDescription: hasNoDescription,
        didPressNext: () => this.changeError((parseInt(this.state.currentErrorKey, 10) + 1) % imageErrorsCount),
        changeError: (key) => this.changeError(key),
      }
    );
  }
}

ImageFixerContainer.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  sideListMaxHeight: PropTypes.number.isRequired,
  didEditImageDescription: PropTypes.func.isRequired,
  imageErrors: PropTypes.object.isRequired,
  imageErrorsCount: PropTypes.number.isRequired
};

export default ImageFixerContainer;
