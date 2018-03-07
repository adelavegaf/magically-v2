import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import Favorite from 'material-ui-icons/Favorite';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  resultContainer: {
    marginTop: theme.spacing.unit * 6
  },
  actionsContainer: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2
  },
  iconContainer: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  iconButton: {
    height: theme.spacing.unit * 2,
    width: theme.spacing.unit * 2
  },
  iconValue: {
    marginLeft: theme.spacing.unit
  }
});

// COLORS: #d32f2f (red) #ffca28 (yellow)

class SearchResult extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
    this.percentage = Math.floor(Math.random() * 100);
  }

  getPercentageColor() {
    let percentageColor = {color: '#000'};

    if (this.percentage < 40) {
      percentageColor = {color: '#d32f2f'};
    }
    else if (this.percentage < 70) {
      percentageColor = {color: '#ffca28'};
    }
    else {
      percentageColor = {color: '#7cb342'};
    }

    return percentageColor;
  }

  getResultInformation() {
    return (
      <Grid container justify={'center'} alignItems={'center'}>
        <Grid item xs={6}>
          <div style={this.getPercentageColor()}>
            <Typography variant={'display3'} color={'inherit'} align={'center'}>
              {this.percentage}%
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Typography variant={'title'}>
            Project Name
          </Typography>
          <Typography variant={'subheading'}>
            Author - Date
          </Typography>
          <Typography variant={'caption'}>
            # errors remaining
          </Typography>
        </Grid>
      </Grid>
    );
  }

  getActionBar() {
    return (
      <Grid container justify={'flex-end'} className={this.classes.actionsContainer}>
        <Grid item>
          <Typography variant={'caption'} className={this.classes.iconContainer}>
            <IconButton className={this.classes.iconButton}>
              <Favorite className={this.classes.iconButton}/>
            </IconButton>
            <span className={this.classes.iconValue}>0</span>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant={'caption'} className={this.classes.iconContainer}>
            <IconButton className={this.classes.iconButton}>
              <ThumbUp className={this.classes.iconButton}/>
            </IconButton>
            <span className={this.classes.iconValue}>0</span>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant={'caption'} className={this.classes.iconContainer}>
            <IconButton className={this.classes.iconButton}>
              <ThumbDown className={this.classes.iconButton}/>
            </IconButton>
            <span className={this.classes.iconValue}>0</span>
          </Typography>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container direction={'column'} className={this.classes.resultContainer}>
        <Grid item xs={12} sm={9} md={6} lg={5} xl={3}>
          <Paper>
            {this.getResultInformation()}
            {this.getActionBar()}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchResult);
