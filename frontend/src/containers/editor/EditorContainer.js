import React, {Component} from 'react';
import Editor from '../../components/editor/Editor';
import firebase from '../../firebase';

export const LANGUAGE_FIXER = 'language';
export const IMAGES_FIXER = 'images';
export const CONTRAST_FIXER = 'contrast';
export const PROJECT_TITLE_MAX_LENGTH = 20;

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFixer: LANGUAGE_FIXER,
      project: {},
      isOwner: false,
      loading: true,
      exists: true
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
      .doc(this.props.match.params.projectId)
      .onSnapshot(doc => {
        if (!doc.data()) {
          this.setState({loading: false, exists: false});
          return;
        }
        this.setState({
          project: doc.data(),
          isOwner: this.isProjectOwner(doc.data()),
          loading: false,
          exists: true
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
      .doc(this.props.match.params.projectId)
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
      .doc(this.props.match.params.projectId)
      .set({title: 'Untitled'}, {merge: true});
  }

  didEditImageDescription(imageErrorKey, description, hasNoDescription) {
    // if there is no description when it should have a description.
    const shouldDeleteFix = !(hasNoDescription || description);
    const imageErrorsFixCount = this.state.project.errors.imageErrorsFixCount;
    const totalFixCount = this.state.project.errors.totalFixCount;
    const wasFixed = this.state.project.errors.imageErrors[imageErrorKey].isFixed;
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
      .doc(this.props.match.params.projectId)
      .update(updatedProject);
  }

  didChangeLang(langErrorKey, lang) {
    const shouldDeleteFix = lang.length === 0;
    const langErrorsFixCount = this.state.project.errors.langErrorsFixCount;
    const totalFixCount = this.state.project.errors.totalFixCount;
    const wasFixed = this.state.project.errors.langErrors[langErrorKey].isFixed;
    const updatedProject = {};

    updatedProject[`errors.langErrors.${langErrorKey}.lang`] = lang;
    updatedProject[`errors.langErrors.${langErrorKey}.isFixed`] = !shouldDeleteFix;

    if (shouldDeleteFix) {
      updatedProject[`errors.langErrorsFixCount`] = wasFixed ? langErrorsFixCount - 1 : langErrorsFixCount;
      updatedProject[`errors.totalFixCount`] = wasFixed ? totalFixCount - 1 : totalFixCount;
    } else {
      updatedProject[`errors.langErrorsFixCount`] = wasFixed ? langErrorsFixCount : langErrorsFixCount + 1;
      updatedProject[`errors.totalFixCount`] = wasFixed ? totalFixCount : totalFixCount + 1;
    }

    firebase
      .firestore()
      .collection('projects')
      .doc(this.props.match.params.projectId)
      .update(updatedProject);
  }

  didChangeContrastColor(contrastErrorKey, colorType, color, isFixed) {
    const contrastErrorsFixCount = this.state.project.errors.contrastErrorsFixCount;
    const totalFixCount = this.state.project.errors.totalFixCount;
    const wasFixed = this.state.project.errors.contrastErrors[contrastErrorKey].isFixed;
    const shouldDeleteFix = wasFixed && !isFixed;
    const updatedProject = {};

    updatedProject[`errors.contrastErrors.${contrastErrorKey}.${colorType}`] = color;
    updatedProject[`errors.contrastErrors.${contrastErrorKey}.isFixed`] = isFixed;

    if (shouldDeleteFix) {
      updatedProject[`errors.contrastErrorsFixCount`] = contrastErrorsFixCount - 1;
      updatedProject[`errors.totalFixCount`] = totalFixCount - 1;
    } else if (isFixed) {
      updatedProject[`errors.contrastErrorsFixCount`] =
        wasFixed ? contrastErrorsFixCount : contrastErrorsFixCount + 1;
      updatedProject[`errors.totalFixCount`] = wasFixed ? totalFixCount : totalFixCount + 1;
    }
    firebase
      .firestore()
      .collection('projects')
      .doc(this.props.match.params.projectId)
      .update(updatedProject);
  }

  didChangeForegroundColor(contrastErrorKey, color, isFixed) {
    this.didChangeContrastColor(contrastErrorKey, 'foregroundColor', color, isFixed);
  }

  didChangeBackgroundColor(contrastErrorKey, color, isFixed) {
    this.didChangeContrastColor(contrastErrorKey, 'backgroundColor', color, isFixed);
  }

  applyColorContrastFixToAllErrors(key) {
    const project = this.state.project;
    const error = project.errors.contrastErrors[key];
    const errorCount = project.errors.contrastErrorsCount;
    if (!error) {
      return;
    }
    const {foregroundColor, backgroundColor, isFixed} = error;
    const updatedProject = {};
    const contrastFixCount = isFixed ? errorCount : 0;
    updatedProject[`errors.totalFixCount`] =
      project.errors.imageErrorsFixCount + project.errors.langErrorsFixCount + contrastFixCount;
    updatedProject[`errors.contrastErrorsFixCount`] = contrastFixCount;
    for (let i = 0; i < errorCount; i++) {
      updatedProject[`errors.contrastErrors.${i}.foregroundColor`] = foregroundColor;
      updatedProject[`errors.contrastErrors.${i}.backgroundColor`] = backgroundColor;
      updatedProject[`errors.contrastErrors.${i}.isFixed`] = isFixed;
    }
    firebase
      .firestore()
      .collection('projects')
      .doc(this.props.match.params.projectId)
      .update(updatedProject);
  }

  render() {
    return React.createElement(Editor, {
        isOwner: this.state.isOwner,
        project: this.state.project,
        loading: this.state.loading,
        exists: this.state.exists,
        currentFixer: this.state.currentFixer,
        didPressLanguageFixerButton: () => this.didPressLanguageFixerButton(),
        didPressImagesFixerButton: () => this.didPressImagesFixerButton(),
        didPressContrastFixerButton: () => this.didPressContrastFixerButton(),
        didEditProjectTitle: (title) => this.didEditProjectTitle(title),
        didFinishEditingProjectTitle: () => this.didFinishEditingProjectTitle(),
        didEditImageDescription:
          (imageErrorKey, description, hasNoDescription) =>
            this.didEditImageDescription(imageErrorKey, description, hasNoDescription),
        didChangeLang: (langErrorKey, lang) => this.didChangeLang(langErrorKey, lang),
        didChangeForegroundColor: (contrastErrorKey, color, isFixed) => this.didChangeForegroundColor(contrastErrorKey,
          color, isFixed),
        didChangeBackgroundColor: (contrastErrorKey, color, isFixed) => this.didChangeBackgroundColor(contrastErrorKey,
          color, isFixed),
        applyColorContrastFixToAllErrors: (contrastErrorKey) => this.applyColorContrastFixToAllErrors(contrastErrorKey)
      }
    );
  }
}

EditorContainer.propTypes = {};

export default EditorContainer;
