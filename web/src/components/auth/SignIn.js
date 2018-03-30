import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    height: '100%',
    background: 'black'
  },
  flex: {
    flex: 1
  },
  fullHeight: {
    height: '100%'
  },
  paper: {
    height: '100%'
  },
  paperWithBackground: {
    height: '100%',
    background: theme.palette.primary.main
  },
  textSpacing: {
    marginBottom: theme.spacing.unit * 2
  },
  buttonSpacing: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getPaperClass(usePrimaryColorAsBackground) {
    return usePrimaryColorAsBackground ? this.classes.paperWithBackground : this.classes.paper;
  }

  getScreenFragment(elevation, usePrimaryColorAsBackground, childComponents) {
    return (
      <Grid item xs={12} md={6} className={this.classes.fullHeight}>
        <Paper className={this.getPaperClass(usePrimaryColorAsBackground)} elevation={elevation}>
          <Grid container className={this.classes.fullHeight} spacing={0} justify={'center'} alignItems={'center'}>
            <Grid item xs={6}>
              {childComponents}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  }

  getLeftScreen() {
    return this.getScreenFragment(0, true, <div></div>);
  }

  getRightScreen() {
    const rightChildComponents = (
      <div>
        <Typography variant={'display2'} color={'primary'} className={this.classes.textSpacing}>
          Magically
        </Typography>
        <Typography variant={'headline'} className={this.classes.textSpacing}>
          Help make the web accessible to anyone
        </Typography>
        <Typography variant={'title'} color={'textSecondary'}>
          Join us today
        </Typography>
        <TextField
          label="Account"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          margin="normal"
          fullWidth
        />
        <Button variant={'raised'} color={'secondary'} className={this.classes.buttonSpacing}>Register</Button>
        <Typography>
          Already have an account? Sign in
        </Typography>
      </div>
    );
    return this.getScreenFragment(24, false, rightChildComponents);
  }

  render() {
    return (
      <Grid container className={this.classes.fullHeight} spacing={0}>
        {this.getLeftScreen()}
        {this.getRightScreen()}
      </Grid>
    );
  }
}

export default withStyles(styles)(SignIn);