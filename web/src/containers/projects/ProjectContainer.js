import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EDITOR} from '../../components/utils/Views';
import Project from '../../components/projects/Project';
import firebase from '../../firebase';

class ProjectContainer extends Component {
  didPressProject() {
    this.props.changeView(EDITOR, {projectId: this.props.projectId, project: this.props.project});
  }

  didPressCopyButton() {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      // TODO(adelavega): Tell user to log in to copy project.
      return;
    }
    // TODO(adelavega): Do this after confirmation dialog.
    firebase
      .firestore()
      .collection('projects')
      .doc(this.props.projectId)
      .update({copyCount: this.props.project.copyCount + 1});
  }

  didPressFavoriteButton() {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      // TODO(adelavega): Tell user to log in to favorite project.
      return;
    }
    const userHadFavoriteProject = !!this.props.project.favoriteBy[currentUser.uid];
    const favoriteCount = this.props.project.favoriteCount;

    const updatedProject = {};
    updatedProject[`favoriteBy.${currentUser.uid}`] = !userHadFavoriteProject;
    updatedProject['favoriteCount'] = userHadFavoriteProject ? favoriteCount - 1 : favoriteCount + 1;
    firebase
      .firestore()
      .collection('projects')
      .doc(this.props.projectId)
      .update(updatedProject)
  }

  render() {
    const currentUser = firebase.auth().currentUser;
    const isFavorite = currentUser ? !!this.props.project.favoriteBy[currentUser.uid] : false;
    return React.createElement(Project, {
        project: this.props.project,
        projectId: this.props.projectId,
        isFavorite: isFavorite,
        didPressProject: () => this.didPressProject(),
        didPressCopyButton: () => this.didPressCopyButton(),
        didPressFavoriteButton: () => this.didPressFavoriteButton()
      }
    );
  }
}

ProjectContainer.propTypes = {
  projectId: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired
};

export default ProjectContainer;
