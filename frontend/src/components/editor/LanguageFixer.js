import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
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
  },
  instructionContainer: {
    flex: 1,
    alignSelf: 'center'
  },
  instructionImageContainer: {
    alignSelf: 'center',
    width: '50%',
    maxWidth: '300px'
  },
  instructionText: {
    alignSelf: 'center',
    maxWidth: '60%'
  },
  instructionImage: {
    width: '100%',
    height: 'auto'
  }
});

class LanguageFixer extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getInstructions() {
    return (
      <Grid item className={this.classes.instructionContainer}>
        <Grid container direction={'column'} justify={'center'}>
          <Grid item className={this.classes.instructionImageContainer}>
            <img alt="" src="/language.png" className={this.classes.instructionImage}/>
          </Grid>
          <Grid item className={this.classes.instructionText}>
            <Typography variant={'title'} align={'center'}>
              If a page doesn't specify a lang attribute, a screen reader assumes that the page is in the default
              language that the user chose when setting up the screen reader. If the page isn't actually in the default
              language, then the screen reader might not announce the page's text correctly.
            </Typography>
          </Grid>
          <Grid item className={this.classes.instructionText}>
            <Typography variant={'subheading'} align={'center'} color={'textSecondary'}>
              To fix this issue select a language from the dropdown menu ☺️
            </Typography>
          </Grid>
          <Grid item className={this.classes.instructionText}>
            <Typography variant={'caption'}>
              <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a
                href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a
                href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC
                3.0 BY</a></div>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
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
                disabled={!this.props.isOwner}
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

LanguageFixer.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  langErrors: PropTypes.object.isRequired,
  currentError: PropTypes.object,
  sideListMaxHeight: PropTypes.number.isRequired,
  changeError: PropTypes.func.isRequired
};

export default withStyles(styles)(LanguageFixer);
