import React, {Component} from 'react';
import PropStyles from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  logInButton: {
    marginRight: theme.spacing.unit * 3,
    textAlign: 'right'
  },
});

class AuthButton extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  render() {
    return (
      <Grid item xs={2} className={this.classes.logInButton}>
        <Button variant={'raised'} color="primary" onClick={() => this.props.changeView()}>Log in</Button>
      </Grid>
    );
  }
}

AuthButton.propStyles = {
  changeView: PropStyles.func.isRequired
};

export default withStyles(styles)(AuthButton);
