import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  flex: {
    flex: 1
  },
  centerContainer: {
    textAlign: 'center'
  },
  languageEditorContainer: {
    height: '100%',
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2
  },
  formControl: {
    width: theme.spacing.unit * 29,
  }
});

class LanguageFixer extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  render() {
    return (
      <Grid item className={this.classes.flex}>
        <Grid container direction={'column'} className={this.classes.languageEditorContainer}>
          <Grid item>
            <Typography variant={'headline'}>
              What language is this website written in?
            </Typography>
          </Grid>
          <Grid item>
            <FormControl className={this.classes.formControl}>
              <InputLabel htmlFor="language">Language</InputLabel>
              <Select
                value={1}
                inputProps={{
                  name: 'language',
                  id: 'language',
                }}
              >
                <MenuItem value={'en'}>English</MenuItem>
                <MenuItem value={'ru'}>Russian</MenuItem>
                <MenuItem value={'de'}>German</MenuItem>
                <MenuItem value={'ja'}>Japanese</MenuItem>
                <MenuItem value={'es'}>Spanish</MenuItem>
                <MenuItem value={'fr'}>French</MenuItem>
                <MenuItem value={'zh'}>Chinese</MenuItem>
                <MenuItem value={'pt'}>Portuguese</MenuItem>
                <MenuItem value={'it'}>Italian</MenuItem>
                <MenuItem value={'pl'}>Polish</MenuItem>
                <MenuItem value={'tr'}>Turkish</MenuItem>
                <MenuItem value={'nl'}>Dutch</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LanguageFixer);
