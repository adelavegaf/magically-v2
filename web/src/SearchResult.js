import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {}
});


class SearchResult extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  render() {
    return (
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
    );
  }
}

export default withStyles(styles)(SearchResult);
