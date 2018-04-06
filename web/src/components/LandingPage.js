import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import DownIcon from 'material-ui-icons/KeyboardArrowDown';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import {BOTTOM_STRIP_HEIGHT, FAB_SIZE} from './utils/Sizes';
import AppBarFactory from './appbar/AppBarFactory';
import SearchContainer from '../containers/SearchContainer';

const styles = theme => ({
  root: {
    height: '100%',
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  fullHeight: {
    height: '100%'
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  bottomContainer: {
    height: BOTTOM_STRIP_HEIGHT,
    background: theme.palette.primary.main,
  },
  bottomContainerStripe: {
    height: '10px',
    backgroundImage: 'linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,0))'
  },
  fab: {
    position: 'absolute',
    bottom: BOTTOM_STRIP_HEIGHT - FAB_SIZE / 2,
    right: theme.spacing.unit * 4
  },
  secondViewRoot: {
    height: '100%',
    flexGrow: 1,
    background: theme.palette.primary.main
  },
  secondViewText: {
    color: '#fff',
    fontWeight: '100',
    fontSize: '0.96em',
    marginBottom: theme.spacing.unit * 3
  },
  secondViewTextHeader: {
    color: '#fff',
    fontWeight: '100',
    fontSize: '3.5rem',
    fontFamily: 'Roboto'
  },
  toolbar: theme.mixins.toolbar
});


class LandingPage extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getFirstView() {
    return (
      <div className={this.classes.root}>
        <AppBarFactory type={'invisible'} searchBarStartText={''} changeView={this.props.changeView}/>

        <Grid container direction={'column'} className={this.classes.fullHeight} spacing={0}>

          <Grid container spacing={24} alignItems={'center'} className={this.classes.flex}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant={'display4'} align={'center'} color={'primary'}>
                    Magically
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant={'display1'} align={'center'} gutterBottom>
                    Crowdsourcing Accessibility in the Web
                  </Typography>
                </Grid>

                <Grid item md={2} lg={3} hidden={{smDown: true}}/>
                <Grid item xs={12} md={8} lg={6}>
                  <SearchContainer startText={''} variant={'big'} changeView={this.props.changeView}/>
                </Grid>
                <Grid item md={2} lg={3} hidden={{smDown: true}}/>

                <Grid item xs={12}>
                  <Typography align={'center'} color={'textSecondary'}>
                    Start by searching if another user has already tried fixing the accessibility issues of a website
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container className={this.classes.bottomContainer} spacing={0}>
            <Grid item xs={12} className={this.classes.bottomContainerStripe}/>
          </Grid>
        </Grid>
        <Button variant={'fab'} color={'secondary'} className={this.classes.fab}>
          <DownIcon/>
        </Button>
      </div>
    );
  }

  getSecondView() {
    return (
      <div className={this.classes.secondViewRoot}>
        <Grid container className={this.classes.fullHeight}>
          <div className={this.classes.toolbar}/>
          <Grid item xs={6} className={this.classes.fullHeight}>
            <Grid container justify={'center'} alignItems={'center'} className={this.classes.fullHeight}>
              <Grid item xs={6}>
                <h1 className={this.classes.secondViewTextHeader}>How does it work?</h1>
                <Typography variant={'subheading'} className={this.classes.secondViewText} gutterBottom={true}>
                  Through our web platform you can fix the most common accessibility issues that are present in a given
                  website.
                </Typography>
                <Typography variant={'subheading'} className={this.classes.secondViewText} gutterBottom={true}>
                  We try to provide an intuitive interface for you to fix the problems as easily and fast as possible.
                </Typography>
                <Typography variant={'subheading'} className={this.classes.secondViewText} gutterBottom={true}>
                  We then use the solutions you devised to correct the issues through our Chrome extension!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div className={this.classes.root}>
        {this.getFirstView()}
        {this.getSecondView()}
      </div>
    )
  }
}

LandingPage.propTypes = {
  changeView: PropTypes.func.isRequired
};

export default withStyles(styles)(LandingPage);
