import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CREATE_PROJECT, EDITOR, SIGN_IN} from '../components/utils/Views';
import Projects from '../components/projects/Projects';
import firebase from '../firebase';

const MOCK_PROJECT_DATA = [
  {
    name: 'Awesome Fix 1',
    author: 'adelavegaf',
    date: new Date(),
    errors: 7,
    percentage: .88,
    upvotes: 23,
    downvotes: 0,
    favorites: 1
  },
  {
    name: 'EzFix',
    author: 'jsmen',
    date: new Date(),
    errors: 10,
    percentage: .6,
    upvotes: 1,
    downvotes: 1,
    favorites: 0
  },
  {
    name: 'Colfuturo',
    author: 'mchief',
    date: new Date(),
    errors: 20,
    percentage: .3,
    upvotes: 0,
    downvotes: 11,
    favorites: 0
  },
];

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.authHandle = null;
    this.state = {
      projects: MOCK_PROJECT_DATA,
      websiteUrl: this.props.websiteUrl,
      openCreateProjectDialog: false,
      signedIn: false
    }
  }

  componentDidMount() {
    this.authHandle = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({signedIn: true});
      } else {
        this.setState({signedIn: false});
      }
    });
    // TODO(adelavega): query firebase for all projects that have URL: this.props.websiteUrl
  }

  componentWillUnmount() {
    this.authHandle();
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
