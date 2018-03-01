import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

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
    minHeight: '96px',
    background: theme.palette.primary.main,
    boxShadow: 'inset 0px 5px 20px rgba(0, 0, 0, 0.50)'
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
        <AppBar elevation={0} color={'inherit'}>
          <Toolbar>
            <div className={this.classes.flex}/>
            <Button color="primary">Log in</Button>
          </Toolbar>
        </AppBar>
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
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
