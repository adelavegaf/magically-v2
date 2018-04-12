import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Editor from '../components/editor/Editor';
import firebase from '../firebase';

export const LANGUAGE_FIXER = 'language';
export const IMAGES_FIXER = 'images';
export const CONTRAST_FIXER = 'contrast';
export const PROJECT_TITLE_MAX_LENGTH = 20;

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFixer: LANGUAGE_FIXER,
      project: this.props.project,
      isOwner: this.isProjectOwner(this.props.project)
    };
    this.authUnsubscribe = null;
    this.projectUnsubscribe = null;
  }

  isProjectOwner(project) {
    const user = firebase.auth().currentUser;
    return user && project ? user.uid === project.authorId : false;
  }

  componentDidMount() {
    this.authUnsubscribe = firebase
      .auth()
      .onAuthStateChanged(() => {
        this.setState({isOwner: this.isProjectOwner(this.state.project)});
      });
    this.projectUnsubscribe = firebase
      .firestore()
      .collection('projects')
      .doc(this.props.projectId)
      .onSnapshot(doc => {
        this.setState({
          project: doc.data(),
          isOwner: this.isProjectOwner(doc.data())
        });
      });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.projectUnsubscribe();
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

  didEditProjectTitle(title) {
    if (title.length > PROJECT_TITLE_MAX_LENGTH) {
      return;
    }
    firebase
      .firestore()
      .collection('projects')
      .doc(this.props.projectId)
      .set({title: title}, {merge: true});
  }

  didFinishEditingProjectTitle() {
    const title = this.state.project.title;
    if (title.length > 0) {
      return;
    }
    firebase
      .firestore()
      .collection('projects')
      .doc(this.props.projectId)
      .set({title: 'Untitled'}, {merge: true});
  }

  didEditImageDescription(imageErrorKey, description) {
    const shouldDeleteFix = !description; // if description is null, we should delete it.
    const imageErrorsFixCount = this.props.project.errors.imageErrorsFixCount;
    const totalFixCount = this.props.project.errors.totalFixCount;
    const wasFixed = this.props.project.errors.imageErrors[imageErrorKey].isFixed || false;
    const updatedProject = {};

    updatedProject[`errors.imageErrors.${imageErrorKey}.description`] = description;
    updatedProject[`errors.imageErrors.${imageErrorKey}.isFixed`] = !shouldDeleteFix;

    if (shouldDeleteFix) {
      updatedProject[`errors.imageErrorsFixCount`] = wasFixed ? imageErrorsFixCount - 1 : imageErrorsFixCount;
      updatedProject[`errors.totalFixCount`] = wasFixed ? totalFixCount - 1 : totalFixCount;
    } else {
      updatedProject[`errors.imageErrorsFixCount`] = wasFixed ? imageErrorsFixCount : imageErrorsFixCount + 1;
      updatedProject[`errors.totalFixCount`] = wasFixed ? totalFixCount : totalFixCount + 1;
    }

    firebase
      .firestore()
      .collection('projects')
      .doc(this.props.projectId)
      .update(updatedProject)
  }

  render() {
    return React.createElement(Editor, {
        isOwner: this.state.isOwner,
        project: this.state.project,
        currentFixer: this.state.currentFixer,
        didPressLanguageFixerButton: () => this.didPressLanguageFixerButton(),
        didPressImagesFixerButton: () => this.didPressImagesFixerButton(),
        didPressContrastFixerButton: () => this.didPressContrastFixerButton(),
        didEditProjectTitle: (title) => this.didEditProjectTitle(title),
        didFinishEditingProjectTitle: () => this.didFinishEditingProjectTitle(),
        didEditImageDescription: (imageErrorKey, description) => this.didEditImageDescription(imageErrorKey, description),
        changeView: this.props.changeView
      }
    );
  }
}

EditorContainer.propTypes = {
  projectId: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired
};

export default EditorContainer;
