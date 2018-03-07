import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import SearchIcon from 'material-ui-icons/Search';
import Grid from 'material-ui/Grid';
import Input, {InputAdornment} from 'material-ui/Input';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {LIGHT_GRAY} from '../utils/Colors';
import SearchResult from './SearchResult';
import SearchFilter from './SearchFilter';
import AuthAppBarButton from '../auth/AuthAppBarButton';

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

  render() {
    return (
      <div className={this.classes.root}>

        <AppBar color={'inherit'} elevation={1} position={'sticky'}>
          <Toolbar disableGutters={true}>
            <Grid container alignItems={'center'}>
              <Grid item xs={2}>
                <Typography variant="title" color="primary" className={this.classes.appTitle}>
                  Magically
                </Typography>
              </Grid>
              <Input
                className={this.classes.searchInput}
                placeholder={'Search'}
                endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
              />
              <div className={this.classes.flex}/>
              <AuthAppBarButton/>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid container>

          <Grid item xs={2}/>

          <Grid item xs={8}>
            <SearchFilter/>
            <SearchResult/>
          </Grid>

        </Grid>

        <Button variant={'fab'} color={'secondary'} className={this.classes.fab}>
          <AddIcon/>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(SearchResults);
