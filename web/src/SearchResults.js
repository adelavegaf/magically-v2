import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import {FormControl, FormHelperText} from 'material-ui/Form';
import SearchIcon from 'material-ui-icons/Search';
import Grid from 'material-ui/Grid';
import Input, {InputAdornment} from 'material-ui/Input';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {LIGHT_GRAY} from './utils/Colors';

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
  searchInput: {
    color: theme.palette.primary.main,
    flex: 1,
    borderRadius: 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    padding: theme.spacing.unit
  }
});


class LandingPage extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  render() {
    return (
      <div className={this.classes.root}>
        <AppBar color={'inherit'} elevation={1}>
          <Toolbar>
            <Typography variant="title" color="primary">
              Magically
            </Typography>
            <Input
              className={this.classes.searchInput}
              placeholder={'Search'}
              endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
            />
            <div className={this.classes.flex}/>
            <Button variant={'raised'} color="primary">Log in</Button>
          </Toolbar>
        </AppBar>
        <Button variant={'fab'} color={'secondary'} className={this.classes.fab}>
          <AddIcon/>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
