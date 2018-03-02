import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import FilterIcon from 'material-ui-icons/FilterList';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  filterContainer: {
    marginTop: theme.spacing.unit * 3,
    borderBottom: 'solid 1px #eeeeee'
  },
  filterButton: {
    textAlign: 'right'
  }
});


class SearchResults extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  render() {
    return (
      <Grid container justify={'space-between'} alignItems={'center'} className={this.classes.filterContainer}>
        <Grid item xs={6}>
          <Typography>
            About 10 results
          </Typography>
        </Grid>
        <Grid item xs={6} className={this.classes.filterButton}>
          <Button color={'primary'}>
            <FilterIcon/>
            Filter
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchResults);
