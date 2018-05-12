import React, {Component} from 'react';
import {connect} from 'react-redux';
import Projects from '../components/Projects';
import {setCurrentProjectId} from '../actions';

const mapStateToProps = (state) => {
  return {
    tabs: state.tabs || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    didPressProject: (tabId, projectId) => dispatch(setCurrentProjectId(tabId, projectId))
  };
};

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      tabId: -1,
      currentProjectId: -1,
      loading: true
    };
  }

  componentDidMount() {
    chrome.tabs.query({active: true, currentWindow: true}, (arrayOfTabs) => {
      const activeTabId = arrayOfTabs[0].id;
      const tabInfo = this.props.tabs[activeTabId];
      if (!tabInfo) {
        console.info(`no tab info for tab ${activeTabId}`);
        return;
      }
      const {projects, currentProjectId} = tabInfo;
      console.info(activeTabId, projects, currentProjectId);
      this.setState({
        tabId: activeTabId,
        projects: projects,
        currentProjectId: currentProjectId,
        loading: false
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.tabId === -1) {
      return;
    }

    const lastTab = prevProps.tabs[this.state.tabId];
    const newTab = this.props.tabs[this.state.tabId];

    if (!lastTab || !newTab) {
      console.error('ProjectsContainer componentDidUpdate undefined found', lastTab, newTab);
      return
    }
    const lastProjectId = lastTab.currentProjectId;
    const newProjectId = newTab.currentProjectId;

    if (lastProjectId !== newProjectId) {
      this.setState({currentProjectId: newProjectId});
    }
  }

  render() {
    return React.createElement(Projects, {
      projects: this.state.projects,
      currentProjectId: this.state.currentProjectId,
      loading: this.state.loading,
      didPressProject: (projectId) => this.props.didPressProject(this.state.tabId, projectId)
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
