import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Project from './Project';

const styles = theme => ({});

class Projects extends Component {
  getProjects() {
    if (this.props.projects) {
      return this.props.projects.map((project, key) => {
        return <Project project={project}
                        projectId={key}
                        currentProjectId={this.props.currentProjectId}
                        onClick={() => this.props.didPressProject(key)}
                        key={key}/>
      });
    }
  }

  render() {
    return (
      <div>
        {this.getProjects()}
      </div>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  didPressProject: PropTypes.func.isRequired
};

export default withStyles(styles)(Projects);
