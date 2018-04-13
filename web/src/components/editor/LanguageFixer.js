import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Select from 'material-ui/Select';
import EditorSideList from './EditorSideList';
import {LANGUAGE_FIXER} from '../../containers/editor/EditorContainer';

const styles = theme => ({
  flex: {
    flex: 1
  },
  fullHeight: {
    height: '100%'
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

  getInstructions() {
    return <div/>;
  }

  getFixer() {
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
                value={this.props.currentError.lang || ''}
                onChange={(e) => this.props.didChangeLang(e.target.value)}
                inputProps={{
                  name: 'language',
                  id: 'language',
                }}
              >
                <MenuItem value={''}>None</MenuItem>
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

  render() {
    return (
      <Grid container className={this.classes.fullHeight}>
        <EditorSideList sideListMaxHeight={this.props.sideListMaxHeight}
                        fixerName={LANGUAGE_FIXER}
                        currentError={this.props.currentError}
                        errors={this.props.langErrors}
                        changeError={this.props.changeError}/>
        {this.props.currentError ? this.getFixer() : this.getInstructions()}
      </Grid>
    );
  }
}

export default withStyles(styles)(LanguageFixer);
