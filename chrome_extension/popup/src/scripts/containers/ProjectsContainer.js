import React, {Component} from 'react';
import Projects from '../components/Projects';
import MessagingApi from '../messaging/MessagingApi';

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
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

  render() {
    return React.createElement(Projects, {
      projects: this.state.projects,
      currentProjectId: this.state.currentProjectId,
      loading: this.state.loading,
      didPressProject: (projectId) => this.setCurrentProjectId(projectId)
    });
  }
}

export default ProjectsContainer;
