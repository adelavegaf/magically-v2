import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  logInButton: {
    marginRight: theme.spacing.unit * 3,
    textAlign: 'right'
  },
});


class AuthAppBarButton extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  render() {
    return (
      <Grid item xs={2} className={this.classes.logInButton}>
        <Button variant={'raised'} color="primary">Log in</Button>
      </Grid>
    );
  }
}

export default withStyles(styles)(AuthAppBarButton);
