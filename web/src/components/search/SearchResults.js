import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Grid from 'material-ui/Grid';
import {LIGHT_GRAY} from '../utils/Colors';
import SearchResult from './SearchResult';
import SearchFilter from './SearchFilter';
import AppBarFactory from '../appbar/AppBarFactory';

const styles = theme => ({
  root: {
    height: '100%',
    backgroundColor: LIGHT_GRAY
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  },
  flex: {
    flex: 1
  },
  appTitle: {
    paddingLeft: theme.spacing.unit * 3
  },
  searchInput: {
    color: theme.palette.primary.main,
    flex: 1,
    borderRadius: 2,
    padding: theme.spacing.unit
  },
  spacingForContainer: {
    marginTop: theme.spacing.unit * 3
  },
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

  getProjects() {
    return this.props.projects.map((project, index) => {
      return <SearchResult project={project} key={index}/>
    });
  }

  render() {
    return (
      <div className={this.classes.root}>

        <AppBarFactory type={'search'}/>

        <Grid container>

          <Grid item xs={2}/>

          <Grid item xs={8}>
            <SearchFilter/>
            {this.getProjects()}
          </Grid>

        </Grid>

        <Button variant={'fab'} color={'secondary'} className={this.classes.fab}>
          <AddIcon/>
        </Button>

      </div>
    );
  }
}

SearchResults.propTypes = {
  projects: PropTypes.array.isRequired,
  changeView: PropTypes.func.isRequired
};

export default withStyles(styles)(SearchResults);
