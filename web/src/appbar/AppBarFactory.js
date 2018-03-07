import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Input, {InputAdornment} from 'material-ui/Input';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {LIGHT_GRAY} from '../utils/Colors';
import AuthAppBarButton from '../auth/AuthAppBarButton';
import SearchIcon from 'material-ui-icons/Search';

const styles = theme => ({
  root: {
    height: '100%',
    backgroundColor: LIGHT_GRAY
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
  }
});

class AppBarFactory extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getInvisibleAppBar() {
    return (
      <AppBar elevation={0} color={'inherit'}>
        <Toolbar>
          <div className={this.classes.flex}/>
          <AuthAppBarButton/>
        </Toolbar>
      </AppBar>
    );
  }

  getSearchAppBar() {
    return (
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
    );
  }

  render() {
    switch(this.props.type) {
      case 'invisible':
        return this.getInvisibleAppBar();
      case 'search':
        return this.getSearchAppBar();
      default:
        return this.getInvisibleAppBar();
    }
  }
}

export default withStyles(styles)(AppBarFactory);
