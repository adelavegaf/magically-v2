import React, {Component} from 'react';
import Projects from '../components/Projects';
import MessagingApi from '../messaging/MessagingApi';

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      filteredProjects: [],
      currentProjectId: -1,
      loading: true
    };
  }

  componentDidMount() {
    MessagingApi
      .getCurrentTabInformation()
      .then(response => {
        const {projects, currentProjectId} = response;
        this.setState({
          projects: projects,
          filteredProjects: projects,
          currentProjectId: currentProjectId,
          loading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  setCurrentProjectId(projectId) {
    MessagingApi
      .setCurrentProjectId(projectId)
      .then(response => {
        const {currentProjectId} = response;
        this.setState({currentProjectId: currentProjectId});
      })
      .catch(error => {
        console.error(error);
      })
  }

  didModifyProjectFilter(text) {
    const filteredProjects = this.state.projects.filter(
      project => project.title.toLowerCase().startsWith(text.toLowerCase()));
    this.setState({filteredProjects: filteredProjects});
  }

  render() {
    return React.createElement(Projects, {
      projects: this.state.filteredProjects,
      currentProjectId: this.state.currentProjectId,
      loading: this.state.loading,
      didPressProject: (projectId) => this.setCurrentProjectId(projectId),
      didModifyProjectFilter: (text) => this.didModifyProjectFilter(text)
    });
  }
}

export default ProjectsContainer;
