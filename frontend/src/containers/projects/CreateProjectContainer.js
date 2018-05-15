import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateProject from '../../components/projects/CreateProject';
import firebase from '../../firebase';

class CreateProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true
    };
    this.authUnsubscribe = null;
    this.projectUnsubscribe = null;
  }

  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.addProject();
      } else {
        this.setState({isAuthenticated: false});
      }
      this.authUnsubscribe();
    });
  }

  addProject() {
    firebase
      .firestore()
      .collection('projects')
      .add({
        authorId: firebase.auth().currentUser.uid,
        authorDisplayName: firebase.auth().currentUser.displayName,
        authorEmail: firebase.auth().currentUser.email,
        title: 'Untitled',
        createdAt: new Date(),
        websiteUrl: decodeURIComponent(this.props.match.params.url),
        favoriteCount: 0,
        favoriteBy: {},
        copiedFrom: null,
        copyCount: 0,
        isLoading: true
      })
      .then(projectRef => {
        const projectId = projectRef.id;
        this.projectUnsubscribe = firebase
          .firestore()
          .collection('projects')
          .doc(projectId)
          .onSnapshot(project => {
            if (!project.data().isLoading) {
              this.props.history.replace(`/editor/${projectId}`);
            }
          })
      });
  }

  componentWillUnmount() {
    if (this.projectUnsubscribe) {
      this.projectUnsubscribe();
    }
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
    }
  }

  render() {
    return React.createElement(CreateProject, {
        isAuthenticated: this.state.isAuthenticated,
        websiteUrl: decodeURIComponent(this.props.match.params.url)
      }
    );
  }
}

CreateProjectContainer.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(CreateProjectContainer);
