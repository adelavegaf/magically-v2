import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import Favorite from 'material-ui-icons/Favorite';

const styles = theme => ({
  resultContainer: {
    marginTop: theme.spacing.unit * 6
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
  }

  render() {
    return (
      <Grid container direction={'column'} className={this.classes.resultContainer}>
        <Grid container alignItems={'center'}>
          <Grid item>
            <Typography variant={'display3'} color={'secondary'}>
              77%
            </Typography>
          </Grid>
          <Grid item>
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
        <Grid container>
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
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchResult);
