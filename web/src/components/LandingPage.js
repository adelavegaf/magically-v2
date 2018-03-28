import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import DownIcon from 'material-ui-icons/KeyboardArrowDown';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import {BOTTOM_STRIP_HEIGHT, FAB_SIZE} from './utils/Sizes';
import AppBarFactory from './appbar/AppBarFactory';

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
  input: {
    borderTop: 'solid 1px #ababab',
    paddingTop: 2 * theme.spacing.unit,
    paddingBottom: 2 * theme.spacing.unit,
  },
  bottomContainer: {
    height: BOTTOM_STRIP_HEIGHT,
    background: theme.palette.primary.main,
    boxShadow: 'inset 0px 5px 20px rgba(0, 0, 0, 0.50)'
  },
  fab: {
    position: 'absolute',
    bottom: BOTTOM_STRIP_HEIGHT - FAB_SIZE / 2,
    right: theme.spacing.unit * 4
  }
});


class LandingPage extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSearch();
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className={this.classes.root}>
        <AppBarFactory type={'invisible'}/>

        <Grid container direction={'column'} className={this.classes.fullHeight}>

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
                  <Input placeholder="Type website URL"
                         className={this.classes.input}
                         fullWidth
                         value={this.props.websiteUrl}
                         onKeyPress={(e) => this.onKeyPress(e)}
                         onChange={(e) => this.props.onWebsiteURLChange(e.target.value)}
                         inputProps={{
                           'aria-label': 'Description',
                         }}/>
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

          <Grid container>
            <Grid item xs={12} className={this.classes.bottomContainer}/>
          </Grid>
        </Grid>
        <Button variant={'fab'} color={'secondary'} className={this.classes.fab}>
          <DownIcon/>
        </Button>
      </div>
    );
  }
}

LandingPage.propTypes = {
  websiteUrl: PropTypes.string.isRequired,
  onWebsiteURLChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default withStyles(styles)(LandingPage);
