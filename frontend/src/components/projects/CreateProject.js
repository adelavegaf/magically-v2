import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import {LinearProgress} from 'material-ui/Progress';


const styles = theme => ({
  root: {
    height: '100%',
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  fullHeight: {
    height: '100%'
  },
  errorText: {
    color: '#a6343e'
  }
});


class CreateProject extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getLoadingView() {
    return (
      <Grid container spacing={24} justify={'center'} alignItems={'center'} className={this.classes.fullHeight}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant={'display4'} align={'center'} color={'primary'}>
                Magically
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant={'display1'} align={'center'} gutterBottom>
                Crowdsourcing Accessibility in the Web
              </Typography>
            </Grid>

            <Grid item xs={3}/>
            <Grid item xs={6}>
              <LinearProgress color="secondary"/>
            </Grid>
            <Grid item xs={3}/>

            <Grid item xs={12}>
              <Typography variant={'subheading'} align={'center'} color={'textSecondary'}>
                Creating project for {this.props.websiteUrl}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  getAuditErrorView() {
    return (
      <Grid container spacing={24} justify={'center'} alignItems={'center'} className={this.classes.fullHeight}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant={'display4'} align={'center'} color={'primary'}>
                Magically
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant={'display1'} align={'center'} gutterBottom>
                Oops something went wrong!
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant={'headline'} align={'center'} className={this.classes.errorText}>
                {this.props.auditError}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  getIsAuthenticatedView() {
    return (
      <div className={this.classes.root}>
        {this.props.auditError ? this.getAuditErrorView() : this.getLoadingView()}
      </div>
    );
  }

  render() {
    return this.props.isAuthenticated ? this.getIsAuthenticatedView() : <div>You must log in to create a project</div>
  }
}

CreateProject.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  websiteUrl: PropTypes.string.isRequired,
  auditError: PropTypes.string
};

export default withStyles(styles)(CreateProject);
