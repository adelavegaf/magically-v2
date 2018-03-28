import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import FilterIcon from 'material-ui-icons/FilterList';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  filterContainer: {
    marginTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    borderBottom: 'solid 1px #eeeeee'
  },
  filterColumn: {
    marginTop: theme.spacing.unit * 3
  },
  filterColumnHeader: {
    marginBottom: theme.spacing.unit * 3,
  },
  filterButton: {
    textAlign: 'right'
  }
});

class SearchFilter extends Component {
  constructor(props) {
    super(props);

    const {classes} = props;
    this.classes = classes;
    this.state = {
      expandFilter: false
    }
  }

  getFilterHeading(heading) {
    return (
      <Grid item className={this.classes.filterColumnHeader}>
        <Typography variant={'body2'}>
          {heading}
        </Typography>
      </Grid>
    );
  }

  getFilterColumnItems(items) {
    return items.map((item, index) => {
      return (
        <Grid item key={index}>
          <Typography variant={'caption'}>
            {item}
          </Typography>
        </Grid>
      );
    });
  }

  getFilterColumn(heading, items) {
    return (
      <Grid item xs={4} className={this.classes.filterColumn}>
        <Grid container direction={'column'}>
          {this.getFilterHeading(heading)}
          {this.getFilterColumnItems(items)}
        </Grid>
      </Grid>
    );
  }

  getFilters() {
    return (
      <Grid container spacing={24}>
        {this.getFilterColumn('DATE', ['Today', 'This year', 'All time'])}
        {this.getFilterColumn('OWNER', ['Anyone', 'Only others', 'Only me'])}
        {this.getFilterColumn('SORT BY', ['Favorites', 'Upvotes', 'Completion Percentage'])}
      </Grid>
    );
  }

  toggleFilter() {
    this.setState({expandFilter: !this.state.expandFilter});
  }

  render() {
    return (
      <Grid container className={this.classes.filterContainer}>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Grid item xs={6}>
            <Typography>
              About 10 results
            </Typography>
          </Grid>
          <Grid item xs={6} className={this.classes.filterButton}>
            <Button color={'primary'} onClick={() => this.toggleFilter()}>
              <FilterIcon/>
              Filter
            </Button>
          </Grid>
        </Grid>
        {this.state.expandFilter ? this.getFilters() : <div/>}
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchFilter);
