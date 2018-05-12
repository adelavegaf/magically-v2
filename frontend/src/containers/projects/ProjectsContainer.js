import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CREATE_PROJECT, SIGN_IN} from '../../components/utils/Views';
import Projects from '../../components/projects/Projects';
import firebase from '../../firebase';

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.authUnsubscribe = null;
    this.projectsUnsubscribe = null;
    this.state = {
      projects: [],
      websiteUrl: this.props.websiteUrl,
      openCreateProjectDialog: false,
      signedIn: false,
      fetching: true
    }
  }

  fetchProjects() {
    if (this.projectsUnsubscribe) {
      this.projectsUnsubscribe();
    }
    this.projectsUnsubscribe = firebase
      .firestore()
      .collection('projects')
      .where('websiteUrl', '==', this.props.websiteUrl)
      .where('isLoading', '==', false)
      .onSnapshot(snapshot => {
        const docs = snapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()}
        });
        this.setState({projects: docs, fetching: false});
      });
  }

  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({signedIn: true});
      } else {
        this.setState({signedIn: false});
      }
    });
    this.fetchProjects();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.websiteUrl === this.props.websiteUrl) {
      return;
    }
    this.fetchProjects();
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.projectsUnsubscribe();
  }

  didPressCreateProjectButton() {
    this.setState({openCreateProjectDialog: true});
  }

  closeDialog() {
    this.setState({openCreateProjectDialog: false});
  }

  confirmDialog() {
    if (this.state.signedIn) {
      this.props.changeView(CREATE_PROJECT, {websiteUrl: this.props.websiteUrl});
    }
    else {
      this.props.changeView(SIGN_IN, {});
    }
  }

  render() {
    return React.createElement(Projects, {
        signedIn: this.state.signedIn,
        fetching: this.state.fetching,
        projects: this.state.projects,
        websiteUrl: this.state.websiteUrl,
        openCreateProjectDialog: this.state.openCreateProjectDialog,
        didPressCreateProjectButton: () => this.didPressCreateProjectButton(),
        closeDialog: () => this.closeDialog(),
        confirmDialog: () => this.confirmDialog(),
        changeView: this.props.changeView
      }
    );
  }
}

ProjectsContainer.propTypes = {
  changeView: PropTypes.func.isRequired
};

export default ProjectsContainer;
