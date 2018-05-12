import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Radio from 'material-ui/Radio';
import RadioButtonUncheckedIcon from 'material-ui-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from 'material-ui-icons/RadioButtonChecked';

const styles = theme => ({
  project: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    cursor: 'pointer',
    '&:hover': {
      background: 'rgb(243, 246, 249)'
    }
  },
  radio: {
    marginLeft: '-8px',
    marginRight: '8px',
    height: '24px',
    width: '24px'
  },
  radioIconSize: {
    fontSize: '16px',
  },
  flex: {
    flex: 1
  },
  percentageContainer: {
    paddingRight: theme.spacing.unit * 2
  },
  percentage: {
    fontSize: '32px'
  },
  title: {
    fontSize: '16px'
  },
  author: {
    fontSize: '12px'
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
      <Grid container justify={'space-between'} alignItems={'center'}>
        <Radio className={this.classes.radio}
               checked={this.props.projectId === this.props.currentProjectId}
               color="secondary"
               icon={<RadioButtonUncheckedIcon className={this.classes.radioIconSize}/>}
               checkedIcon={<RadioButtonCheckedIcon className={this.classes.radioIconSize}/>}/>
        <div className={this.classes.percentageContainer} style={this.getPercentageColor()}>
          <Typography variant={'title'} color={'inherit'} align={'center'} className={this.classes.percentage}>
            {(this.getPercentage() * 100).toFixed(0)}%
          </Typography>
        </div>
        <Grid item className={this.classes.flex}>
          <Typography variant={'title'} className={this.classes.title}>
            {this.props.project.title}
          </Typography>
          <Typography variant={'subheading'} className={this.classes.author}>
            {this.props.project.authorDisplayName ? this.props.project.authorDisplayName :
             this.props.project.authorEmail.split('@')[0]}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'body1'} color={'textSecondary'} align={'right'}>
            {(new Date()).toLocaleDateString()/*this.props.project.createdAt.toLocaleDateString() */}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Paper role={'button'} className={this.classes.project} onClick={this.props.onClick}>
        {this.getResultInformation()}
      </Paper>
    );
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Project);
