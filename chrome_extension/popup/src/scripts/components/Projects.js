import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Project from './Project';
import Search from './Search';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {getCreateProjectUrl} from '../utils/Paths';

const styles = theme => ({
  automaticFixIsDisabled: {
    color: '#a6343e',
    fontWeight: 500,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  informationText: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
});

class Projects extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
  }

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
        <Typography variant={'caption'} align={'center'} className={this.classes.informationText}>
          No projects found for this URL and/or search filter.
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
        {
          this.props.isAutomaticFixEnabled ? <div/> :
          <Typography variant={'caption'} align={'center'} className={this.classes.automaticFixIsDisabled}>
            Toggle the switch in the upper right corner to apply the project fixes.
          </Typography>
        }
        {this.getProjects()}
        <Typography variant={'caption'} align={'center'} gutterBottom={true} className={this.classes.informationText}>
          Click on the + button to create a project for this URL
        </Typography>
        <Tooltip title={'Create project for current URL in website'} placement={'left'}>
          <Button variant={'fab'}
                  color={'secondary'}
                  className={this.classes.fab}
                  mini={true}
                  target={'_blank'}
                  href={getCreateProjectUrl(this.props.url)}>
            <AddIcon/>
          </Button>
        </Tooltip>
      </div>
    );
  }
}

Projects.propTypes = {
  isAutomaticFixEnabled: PropTypes.bool.isRequired,
  url: PropTypes.string,
  projects: PropTypes.array.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  didPressProject: PropTypes.func.isRequired,
  didModifyProjectFilter: PropTypes.func.isRequired
};

export default withStyles(styles)(Projects);
