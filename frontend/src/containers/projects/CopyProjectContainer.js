import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import CopyProject from '../../components/projects/CopyProject';
import firebase from '../../firebase';

class CopyProjectContainer extends Component {
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
        this.copyProject();
      } else {
        this.setState({isAuthenticated: false});
      }
      this.authUnsubscribe();
    });
  }

  copyProject() {
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
        copiedFrom: this.props.match.params.projectId,
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
    return React.createElement(CopyProject, {
        isAuthenticated: this.state.isAuthenticated
      }
    );
  }
}

CopyProjectContainer.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(CopyProjectContainer);
