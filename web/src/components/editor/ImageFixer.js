import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Input, {InputAdornment} from 'material-ui/Input';
import Checkbox from 'material-ui/Checkbox'
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';

const styles = theme => ({
  flex: {
    flex: 1
  },
  centerContainer: {
    textAlign: 'center'
  },
  imageEditorContainer: {
    height: '100%',
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2
  },
  imageEditorActionContainer: {
    padding: theme.spacing.unit * 2
  }
});

class ImageFixer extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  render() {
    return (
      <Grid item className={this.classes.flex}>
        <Grid container direction={'column'} className={this.classes.imageEditorContainer}>
          <Grid item>
            <Typography variant={'headline'}>
              Describe this image
            </Typography>
          </Grid>
          <Grid item className={this.classes.centerContainer}>
            <img src="http://via.placeholder.com/350x150" alt="missing description"/>
          </Grid>
          <Grid item>
            <Input placeholder="Type image description"
                   fullWidth
                   inputProps={{
                     'aria-label': 'image description',
                   }}/>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  value="no-alt"
                />
              }
              label="This is a decorative image that doesn't need a description"
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImageFixer);