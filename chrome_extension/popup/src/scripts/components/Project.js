import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ContentCopy from 'material-ui-icons/ContentCopy';
import Delete from 'material-ui-icons/Delete';
import Favorite from 'material-ui-icons/Favorite';
import FavoriteBorder from 'material-ui-icons/FavoriteBorder';
import Paper from 'material-ui/Paper';

import './Project.css';

const styles = theme => ({
  resultContainer: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2
  },
  actionsContainer: {
    width: theme.spacing.unit * 9
  },
  iconContainer: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  iconButton: {
    height: theme.spacing.unit * 2,
    width: theme.spacing.unit * 2
  },
  favoriteBorderButton: {
    height: theme.spacing.unit * 2,
    width: theme.spacing.unit * 2,
    color: '#000'
  },
  favoriteButton: {
    height: theme.spacing.unit * 2,
    width: theme.spacing.unit * 2,
    color: '#e53145'
  },
  contentCopyButton: {
    height: theme.spacing.unit * 2,
    width: theme.spacing.unit * 2,
    color: '#356cf0'
  },
  deleteButton: {
    height: theme.spacing.unit * 2,
    width: theme.spacing.unit * 2,
    color: '#eb6523'
  },
  iconValue: {
    marginLeft: theme.spacing.unit
  }
});

class Project extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
  }

  getPercentageColor() {
    const percentage = this.getPercentage();
    let percentageColor = {color: '#000'};

    if (percentage < .40) {
      percentageColor = {color: '#d32f2f'};
    }
    else if (percentage < .70) {
      percentageColor = {color: '#ffca28'};
    }
    else {
      percentageColor = {color: '#7cb342'};
    }

    return percentageColor;
  }

  getPercentage() {
    return this.props.project.errors.totalFixCount / this.props.project.errors.totalErrorsCount
  }

  getResultInformation() {
    return (
      <Grid container justify={'center'} alignItems={'stretch'}>
        <Grid item xs>
          <div style={this.getPercentageColor()}>
            <Typography variant={'display3'} color={'inherit'} align={'center'}>
              {(this.getPercentage() * 100).toFixed(0)}%
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <Typography variant={'title'}>
            {this.props.project.title}
          </Typography>
          <Typography variant={'subheading'}>
            {this.props.project.authorDisplayName ? this.props.project.authorDisplayName : this.props.project.authorEmail.split('@')[0]}
          </Typography>
          <Typography variant={'body1'} color={'textSecondary'}>
            {this.props.project.createdAt.toLocaleDateString()}
          </Typography>
          <Typography variant={'caption'}>
            {this.props.project.errors.totalErrorsCount - this.props.project.errors.totalFixCount} errors remaining
          </Typography>
        </Grid>
        <Grid item className={this.classes.actionsContainer}>
          {this.getActionBar()}
        </Grid>
      </Grid>
    );
  }

  getActionBar() {
    return (
      <Grid container direction={'column'} justify={'center'}>
        <Grid item>

        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container direction={'column'} className={this.classes.resultContainer}>
        <Grid item xs>
          <Paper role={'button'} className={'project'} onClick={() => this.props.didPressProject()}>
            {this.getResultInformation()}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  didPressProject: PropTypes.func.isRequired
};

export default withStyles(styles)(Project);
