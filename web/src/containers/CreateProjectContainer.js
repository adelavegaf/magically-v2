import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EDITOR} from '../components/utils/Views';
import CreateProject from '../components/projects/CreateProject';
import firebase from '../firebase';

class CreateProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.projectHandler = null;
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('projects')
      .add({
        authorId: firebase.auth().currentUser.uid,
        authorDisplayName: firebase.auth().currentUser.displayName,
        authorEmail: firebase.auth().currentUser.email,
        title: 'Untitled',
        createdAt: new Date(),
        websiteUrl: this.props.websiteUrl,
        upvotes: 0,
        downvotes: 0,
        favorites: 0,
        errorNumber: 15, // TODO(adelavega): Remove property once the backend is connected.
        fixedNumber: 0,
        isLoading: true
      })
      .then(projectRef => {
        const projectId = projectRef.id;
        this.projectHandler = firebase
          .firestore()
          .collection('projects')
          .doc(projectId)
          .onSnapshot(project => {
            if (!project.data().isLoading) {
              this.props.changeView(EDITOR, {projectId: projectId, project: project.data()});
            }
          })
      });
  }

  componentWillUnmount() {
    this.projectHandler();
  }

  render() {
    return React.createElement(CreateProject, {
        websiteUrl: this.props.websiteUrl
      }
    );
  }
}

CreateProjectContainer.propTypes = {
  websiteUrl: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired
};

export default CreateProjectContainer;
