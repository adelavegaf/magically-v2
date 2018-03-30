import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Input, {InputAdornment} from 'material-ui/Input';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {LIGHT_GRAY} from '../utils/Colors';
import SearchIcon from 'material-ui-icons/Search';
import AuthButtonContainer from '../../containers/AuthButtonContainer';

const styles = theme => ({
  root: {
    height: '100%',
    backgroundColor: LIGHT_GRAY
  },
  leftContainer: {
    width: theme.spacing.unit * 29
  },
  flex: {
    flex: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appTitle: {
    paddingLeft: theme.spacing.unit * 9
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
          <AuthButtonContainer changeView={this.props.changeView}/>
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
            <AuthButtonContainer changeView={this.props.changeView}/>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }

  getEditorBar() {
    return (
      <AppBar color={'inherit'} className={this.classes.appBar}>
        <Toolbar disableGutters={true}>
          <Grid container alignItems={'center'}>
            <Grid item className={this.classes.leftContainer}>
              <Typography variant="title" color="primary" className={this.classes.appTitle}>
                Magically
              </Typography>
            </Grid>
            <div className={this.classes.flex}/>
            <AuthButtonContainer changeView={this.props.changeView}/>
          </Grid>
        </Toolbar>
        <Toolbar disableGutters={true}>
          <Grid container alignItems={'center'}>
            <Grid item className={this.classes.leftContainer}>
              <Typography variant="title" className={this.classes.appTitle}>
                Untitled
              </Typography>
            </Grid>
            <div className={this.classes.flex}/>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }

  render() {
    switch (this.props.type) {
      case 'invisible':
        return this.getInvisibleAppBar();
      case 'search':
        return this.getSearchAppBar();
      case 'editor':
        return this.getEditorBar();
      default:
        return this.getInvisibleAppBar();
    }
  }
}

export default withStyles(styles)(AppBarFactory);
