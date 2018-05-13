import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {REGISTER_VIEW} from '../../containers/auth/AuthContainer';

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
  },
  switchViewButton: {
    cursor: 'pointer',
    color: 'black'
  }
});

class Auth extends Component {
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

  isRegisterView() {
    return this.props.currentAuthView === REGISTER_VIEW;
  }

  getSecondaryMessage() {
    return this.isRegisterView() ? 'Join us today' : 'Continue where you left off';
  }

  getActionButtonText() {
    return this.isRegisterView() ? 'Register' : 'Login';
  }

  getAlternativeViewText() {
    return this.isRegisterView() ? 'Already have an account?' : 'Don\'t have an account?'
  }

  getSwitchViewText() {
    return this.isRegisterView() ? 'Sign in' : 'Register';
  }

  getExtraTextField() {
    return this.isRegisterView() ? (
      <TextField
        label="Confirm password"
        type="password"
        margin="normal"
        error={!!this.props.errorHelperText}
        helperText={this.props.errorHelperText}
        onChange={(e) => this.props.onConfirmPasswordChange(e.target.value)}
        fullWidth
      />
    ) : <div/>
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
          {this.getSecondaryMessage()}
        </Typography>
        <TextField
          label="Email"
          type="email"
          margin="normal"
          error={!!this.props.errorHelperText}
          helperText={this.props.errorHelperText}
          onChange={(e) => this.props.onEmailChange(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          margin="normal"
          error={!!this.props.errorHelperText}
          helperText={this.props.errorHelperText}
          onChange={(e) => this.props.onPasswordChange(e.target.value)}
          fullWidth
        />
        {this.getExtraTextField()}
        <Button variant={'raised'} color={'secondary'}
                className={this.classes.buttonSpacing}
                onClick={() => this.props.didPressActionButton()}>
          {this.getActionButtonText()}
        </Button>
        <Typography color={'textSecondary'}>
          {this.getAlternativeViewText() + ' '}
          <span className={this.classes.switchViewButton} onClick={() => this.props.changeAuthView()}>
            {this.getSwitchViewText()}
          </span>
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

Auth.propTypes = {
  errorHelperText: PropTypes.string.isRequired,
  currentAuthView: PropTypes.string.isRequired,
  changeAuthView: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onConfirmPasswordChange: PropTypes.func.isRequired,
  didPressActionButton: PropTypes.func.isRequired
};

export default withStyles(styles)(Auth);