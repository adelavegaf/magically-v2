import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EDITOR} from '../components/utils/Views';
import Projects from '../components/projects/Projects';

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
    this.state = {
      projects: MOCK_PROJECT_DATA,
      websiteUrl: '',
      openCreateProjectDialog: false
    }
  }

  viewDidLoad() {
    super.viewDidLoad()
    // TODO(adelavega): query firebase for all projects that have URL: this.props.websiteUrl
  }

  didPressCreateProjectButton() {
    this.setState({openCreateProjectDialog: true});
  }

  cancelNewProject() {
    this.setState({openCreateProjectDialog: false});
  }

  createNewProject() {

  }

  render() {
    return React.createElement(Projects, {
        projects: this.state.projects,
        websiteUrl: this.state.websiteUrl,
        openCreateProjectDialog: this.state.openCreateProjectDialog,
        didPressCreateProjectButton: () => this.didPressCreateProjectButton(),
        cancelNewProject: () => this.cancelNewProject(),
        createNewProject: () => this.createNewProject(),
        changeView: this.props.changeView
      }
    );
  }
}

ProjectsContainer.propTypes = {
  changeView: PropTypes.func.isRequired
};

export default ProjectsContainer;
