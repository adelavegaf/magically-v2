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
import ProjectContainer from '../../containers/projects/ProjectContainer';
import {CircularProgress} from 'material-ui/Progress';


const styles = theme => ({
  root: {
    height: '100%',
    backgroundColor: LIGHT_GRAY
  },
  contentContainer: {
    height: '100%',
    overflowY: 'scroll'
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
  },
  toolbar: theme.mixins.toolbar
});


class Projects extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getFetching() {
    return (
      <Grid container direction={'column'} spacing={24} justify={'center'} alignItems={'center'}
            className={this.classes.spacingForContainer}>
        <Grid item>
          <CircularProgress size={50}/>
        </Grid>
        <Grid item>
          <Typography variant={'subheading'} color={'textSecondary'}>
            Looking for projects
          </Typography>
        </Grid>
      </Grid>
    );
  }

  getNoResultsFound() {
    return (
      <Grid container direction={'column'} spacing={24} className={this.classes.spacingForContainer}>
        <Grid item>
          <Typography variant={'title'}>
            No results found
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant={'subheading'}>
            Tap on the + button to create a project for this URL.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  getProjects() {
    if (this.props.fetching) {
      return this.getFetching();
    }
    if (this.props.projects.length === 0) {
      return this.getNoResultsFound();
    }
    return this.props.projects.map((project, index) => {
      return <ProjectContainer project={project}
                               projectId={project.id}
                               didPressCopyProjectButton={() => this.props.didPressCopyProjectButton(project)}
                               key={index}/>
    });
  }

  getCopyProjectConfirmationDialog() {
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
          <Button onClick={() => this.props.closeCreateProjectDialog()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.props.confirmCreateProjectDialog()} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  getCreateProjectConfirmationDialog() {
    const dialogTitle = this.props.copyProject ?
                        this.props.copyProject.title + ' - ' + this.props.copyProject.authorEmail : '';
    return (
      <Dialog
        open={this.props.openCopyProjectDialog}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="copy-project-confirmation-dialog"
      >
        <DialogTitle id="copy-project-confirmation-dialog">
          {this.props.signedIn ? 'Copy this project to your account?' : 'Sign in to copy the project'}
        </DialogTitle>
        <DialogContent>
          <Typography variant={'subheading'} color={'textSecondary'}>
            {this.props.signedIn ? dialogTitle : ''}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.closeCopyProjectDialog()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.props.confirmCopyProjectDialog()} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    return (
      <div className={this.classes.root}>

        <AppBarFactory type={'search'} searchBarStartText={this.props.websiteUrl}/>

        <Grid container className={this.classes.contentContainer} justify={'center'}>
          <Grid item xs={8}>
            <div className={this.classes.toolbar}/>
            <ProjectsFilter projectCount={this.props.projects.length}
                            dateFilter={this.props.dateFilter}
                            ownerFilter={this.props.ownerFilter}
                            sortByFilter={this.props.sortByFilter}
                            didPressDateFilter={this.props.didPressDateFilter}
                            didPressOwnerFilter={this.props.didPressOwnerFilter}
                            didPressSortByFilter={this.props.didPressSortByFilter}/>
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
        {this.getCopyProjectConfirmationDialog()}
      </div>
    );
  }
}

Projects.propTypes = {
  fetching: PropTypes.bool.isRequired,
  signedIn: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  websiteUrl: PropTypes.string.isRequired,
  dateFilter: PropTypes.string.isRequired,
  ownerFilter: PropTypes.string.isRequired,
  sortByFilter: PropTypes.string.isRequired,
  didPressDateFilter: PropTypes.func.isRequired,
  didPressOwnerFilter: PropTypes.func.isRequired,
  didPressSortByFilter: PropTypes.func.isRequired,
  openCreateProjectDialog: PropTypes.bool.isRequired,
  didPressCreateProjectButton: PropTypes.func.isRequired,
  closeCreateProjectDialog: PropTypes.func.isRequired,
  confirmCreateProjectDialog: PropTypes.func.isRequired,
  copyProject: PropTypes.object,
  openCopyProjectDialog: PropTypes.bool.isRequired,
  didPressCopyProjectButton: PropTypes.func.isRequired,
  closeCopyProjectDialog: PropTypes.func.isRequired,
  confirmCopyProjectDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(Projects);
