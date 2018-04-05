import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Grid from 'material-ui/Grid';
import {LIGHT_GRAY} from '../utils/Colors';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import ProjectsFilter from './ProjectsFilter';
import AppBarFactory from '../appbar/AppBarFactory';
import ProjectContainer from '../../containers/ProjectContainer';

const styles = theme => ({
  root: {
    height: '100%',
    backgroundColor: LIGHT_GRAY
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  },
  flex: {
    flex: 1
  },
  appTitle: {
    paddingLeft: theme.spacing.unit * 3
  },
  searchInput: {
    color: theme.palette.primary.main,
    flex: 1,
    borderRadius: 2,
    padding: theme.spacing.unit
  },
  spacingForContainer: {
    marginTop: theme.spacing.unit * 3
  },
  filterContainer: {
    marginTop: theme.spacing.unit * 3,
    borderBottom: 'solid 1px #eeeeee'
  },
  filterButton: {
    textAlign: 'right'
  }
});


class Projects extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getProjects() {
    return this.props.projects.map((project, index) => {
      return <ProjectContainer project={project} changeView={this.props.changeView} key={index}/>
    });
  }

  getCreateProjectConfirmationDialog() {
    return (
      <Dialog
        open={this.props.openCreateProjectDialog}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="create-new-project-confirmation-dialog"
      >
        <DialogTitle id="create-new-project-confirmation-dialog">
          {this.props.signedIn ? 'Create new project for this URL?' : 'Sign in to create project'}
        </DialogTitle>
        <DialogContent>
          <Typography variant={'subheading'} color={'textSecondary'}>
            {this.props.signedIn ? this.props.websiteUrl : ''}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.closeDialog()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.props.confirmDialog()} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    return (
      <div className={this.classes.root}>

        <AppBarFactory type={'search'} searchBarStartText={this.props.websiteUrl} changeView={this.props.changeView}/>

        <Grid container>

          <Grid item xs={2}/>

          <Grid item xs={8}>
            <ProjectsFilter/>
            {this.getProjects()}
          </Grid>

        </Grid>

        <Button variant={'fab'}
                color={'secondary'}
                className={this.classes.fab}
                onClick={() => this.props.didPressCreateProjectButton()}>
          <AddIcon/>
        </Button>

        {this.getCreateProjectConfirmationDialog()}
      </div>
    );
  }
}

Projects.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  websiteUrl: PropTypes.string.isRequired,
  openCreateProjectDialog: PropTypes.bool.isRequired,
  didPressCreateProjectButton: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  confirmDialog: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired
};

export default withStyles(styles)(Projects);
