import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Project from './Project';
import {RadioGroup} from 'material-ui/Radio';

const styles = theme => ({

});

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      selectedProject: null
    };
  }

  componentDidMount() {
    chrome.tabs.query({active: true, currentWindow: true}, (arrayOfTabs) => {
      const activeTabId = arrayOfTabs[0].id;
      console.log(activeTabId);
      const tabInfo = this.props.tabs[activeTabId];
      if (!tabInfo) {
        return;
      }
      const {projects, selectedProject} = tabInfo;
      console.log(projects, selectedProject);
      this.setState({projects: projects, selectedProject: selectedProject});
    });
  }

  getProjects() {
    return this.state.projects.map((project, key) => {
      return <Project project={project} isSelected={false} key={key}/>
    });
  }

  render() {
    return (
      <RadioGroup aria-label="project" name="projects" value={this.props.selectedProject} onChange={() => 1}>
        {this.getProjects()}
      </RadioGroup>
    );
  }
}

Projects.propTypes = {
  tabs: PropTypes.object.isRequired
};

export default withStyles(styles)(Projects);
