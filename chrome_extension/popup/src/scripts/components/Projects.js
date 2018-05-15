import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Project from './Project';
import Search from './Search';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({});

class Projects extends Component {
  getProjects() {
    if (this.props.projects && this.props.projects.length > 0) {
      return this.props.projects.map((project, key) => {
        return <Project project={project}
                        projectId={key}
                        currentProjectId={this.props.currentProjectId}
                        onClick={() => this.props.didPressProject(key)}
                        key={key}/>
      });
    } else {
      return (
        <Typography variant={'caption'} align={'center'}>
          No projects found for this URL and/or search filter
        </Typography>
      );
    }
  }

  render() {
    return (
      <div>
        <Grid container>
          <Search didModifyProjectFilter={this.props.didModifyProjectFilter}/>
        </Grid>
        {this.getProjects()}
      </div>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  didPressProject: PropTypes.func.isRequired,
  didModifyProjectFilter: PropTypes.func.isRequired
};

export default withStyles(styles)(Projects);
