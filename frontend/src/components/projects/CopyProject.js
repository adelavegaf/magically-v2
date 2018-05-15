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
  }
});


class CopyProject extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getView() {
    return (
      <div className={this.classes.root}>
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
                  Copying project into your account
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return this.props.isAuthenticated ? this.getView() : <div>You must log in to copy a project</div>
  }
}

CopyProject.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default withStyles(styles)(CopyProject);
