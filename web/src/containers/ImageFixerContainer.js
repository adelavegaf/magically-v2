import React, {Component} from 'react';
import ImageFixer from '../components/editor/ImageFixer';

class ImageFixerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentError: null,
    };
  }

  changeError(error) {
    this.setState({currentError: error});
  }

  render() {
    return React.createElement(ImageFixer, {
        imageErrors: this.props.imageErrors,
        currentError: this.state.currentError,
        changeError: (error) => this.changeError(error),
      }
    );
  }
}

export default ImageFixerContainer;
