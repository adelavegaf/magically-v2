import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Editor from '../components/editor/Editor';

export const LANGUAGE_FIXER = 'language';
export const IMAGES_FIXER = 'images';
export const CONTRAST_FIXER = 'contrast';

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFixer: LANGUAGE_FIXER
    };
  }

  didPressLanguageFixerButton() {
    this.setState({currentFixer: LANGUAGE_FIXER});
  }

  didPressImagesFixerButton() {
    this.setState({currentFixer: IMAGES_FIXER});
  }

  didPressContrastFixerButton() {
    this.setState({currentFixer: CONTRAST_FIXER});
  }

  render() {
    return React.createElement(Editor, {
        project: this.props.project,
        currentFixer: this.state.currentFixer,
        didPressLanguageFixerButton: () => this.didPressLanguageFixerButton(),
        didPressImagesFixerButton: () => this.didPressImagesFixerButton(),
        didPressContrastFixerButton: () => this.didPressContrastFixerButton()
      }
    );
  }
}

EditorContainer.propTypes = {
  project: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired
};

export default EditorContainer;
