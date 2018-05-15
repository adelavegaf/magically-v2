import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
  },
  filter: {
    cursor: 'pointer'
  },
  selectedFilter: {
    cursor: 'pointer',
    fontWeight: '500',
    color: '#000'
  }
});

class ProjectsFilter extends Component {
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

  getFilterColumnItems(items, selectedItem, didPressFunction) {
    return items.map((item, index) => {
      return (
        <Grid item key={index}>
          <Typography variant={'caption'}
                      className={item === selectedItem ? this.props.classes.selectedFilter : this.props.classes.filter}
                      onClick={() => didPressFunction(item)}>
            {item}
          </Typography>
        </Grid>
      );
    });
  }

  getFilterColumn(heading, items, selectedItem, didPressFunction) {
    return (
      <Grid item xs={4} className={this.classes.filterColumn}>
        <Grid container direction={'column'}>
          {this.getFilterHeading(heading)}
          {this.getFilterColumnItems(items, selectedItem, didPressFunction)}
        </Grid>
      </Grid>
    );
  }

  getFilters() {
    return (
      <Grid container spacing={24}>
        {this.getFilterColumn('DATE', ['Today', 'This year', 'All time'], this.props.dateFilter,
          this.props.didPressDateFilter)}
        {this.getFilterColumn('OWNER', ['Anyone', 'Only me'], this.props.ownerFilter,
          this.props.didPressOwnerFilter)}
        {this.getFilterColumn('SORT BY', ['Favorites', 'Date', 'Completion Percentage'], this.props.sortByFilter,
          this.props.didPressSortByFilter)}
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
              About {this.props.projectCount} results
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

ProjectsFilter.propTypes = {
  projectCount: PropTypes.number.isRequired,
  dateFilter: PropTypes.string.isRequired,
  ownerFilter: PropTypes.string.isRequired,
  sortByFilter: PropTypes.string.isRequired,
  didPressDateFilter: PropTypes.func.isRequired,
  didPressOwnerFilter: PropTypes.func.isRequired,
  didPressSortByFilter: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProjectsFilter);
