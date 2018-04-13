import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {LIGHT_GRAY} from '../utils/Colors';
import AuthButtonContainer from '../../containers/auth/AuthButtonContainer';
import SearchContainer from '../../containers/search/SearchContainer';

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
    marginLeft: theme.spacing.unit * 9
  },
  projectTitle: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: 500,
    border: 'solid 1px transparent',
    '&:hover': {
      border: 'solid 1px rgba(0,0,0, 0.15)'
    }
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

  getAuthButton() {
    return <AuthButtonContainer changeView={this.props.changeView}/>;
  }

  getInvisibleAppBar() {
    return (
      <AppBar elevation={0} color={'inherit'}>
        <Toolbar disableGutters={true}>
          <div className={this.classes.flex}/>
          {this.getAuthButton()}
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
            <SearchContainer startText={this.props.searchBarStartText}
                             variant={'normal'}
                             changeView={this.props.changeView}/>
            <div className={this.classes.flex}/>
            {this.getAuthButton()}
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.target.blur();
      this.props.didFinishEditingProjectTitle();
      e.preventDefault();
    }
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
            {this.getAuthButton()}
          </Grid>
        </Toolbar>
        <Toolbar disableGutters={true}>
          <Grid container alignItems={'center'}>
            <Grid item className={this.classes.leftContainer} xs>
              <Typography variant="title" className={this.classes.appTitle}>
                <div>
                  <input className={this.classes.projectTitle}
                         type="text"
                         pattern="[a-zA-Z0-9 ]+"
                         onKeyPress={(event) => this.onKeyPress(event)}
                         onBlur={this.props.didFinishEditingProjectTitle}
                         onChange={(event) => this.props.didEditTitle(event.target.value)}
                         value={this.props.projectTitle}/>
                </div>
              </Typography>
            </Grid>
            <Grid item xs/>
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

AppBarFactory.propTypes = {
  projectTitle: PropTypes.string,
  searchBarStartText: PropTypes.string,
  didEditTitle: PropTypes.func,
  didFinishEditingProjectTitle: PropTypes.func,
  changeView: PropTypes.func.isRequired
};

export default withStyles(styles)(AppBarFactory);
