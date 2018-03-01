import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  buttonContainer: {
    textAlign: 'center'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  input: {
    borderTop: 'solid 1px #ababab',
    paddingTop: 2 * theme.spacing.unit,
    paddingBottom:  2 * theme.spacing.unit,
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
        <Grid container spacing={24}>

          <Grid item xs={9} sm={10} md={10} lg={11}/>
          <Grid item xs={3} sm={2} lg={1} className={this.classes.buttonContainer}>
            <Button variant="raised" color="primary" className={this.classes.button}>
              LOG IN
            </Button>
          </Grid>

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
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
