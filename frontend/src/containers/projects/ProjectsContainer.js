import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Projects from '../../components/projects/Projects';
import firebase from '../../firebase';


class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.authUnsubscribe = null;
    this.projectsUnsubscribe = null;
    this.state = {
      projects: [],
      openCreateProjectDialog: false,
      openCopyProjectDialog: false,
      copyProject: null,
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
      .where('websiteUrl', '==', decodeURIComponent(this.props.match.params.url))
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
    if (prevProps.match.params.url === this.props.match.params.url) {
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

  closeCreateProjectDialog() {
    this.setState({openCreateProjectDialog: false});
  }

  confirmCreateProjectDialog() {
    if (this.state.signedIn) {
      this.props.history.push(`/projects/${this.props.match.params.url}/create`);
    }
    else {
      this.props.history.push('/auth');
    }
  }

  didPressCopyProjectButton(project) {
    this.setState({openCopyProjectDialog: true, copyProject: project});
  }

  closeCopyProjectDialog() {
    this.setState({openCopyProjectDialog: false, copyProject: null});
  }

  confirmCopyProjectDialog() {
    if (this.state.signedIn) {
      this.props.history.push(`/projects/${this.props.match.params.url}/copy/${this.state.copyProject.id}`);
    }
    else {
      this.props.history.push('/auth');
    }
  }

  render() {
    return React.createElement(Projects, {
        signedIn: this.state.signedIn,
        fetching: this.state.fetching,
        projects: this.state.projects,
        websiteUrl: decodeURIComponent(this.props.match.params.url),
        openCreateProjectDialog: this.state.openCreateProjectDialog,
        openCopyProjectDialog: this.state.openCopyProjectDialog,
        didPressCreateProjectButton: () => this.didPressCreateProjectButton(),
        closeCreateProjectDialog: () => this.closeCreateProjectDialog(),
        confirmCreateProjectDialog: () => this.confirmCreateProjectDialog(),
        didPressCopyProjectButton: (project) => this.didPressCopyProjectButton(project),
        closeCopyProjectDialog: () => this.closeCopyProjectDialog(),
        confirmCopyProjectDialog: () => this.confirmCopyProjectDialog()
      }
    );
  }
}

ProjectsContainer.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(ProjectsContainer);
