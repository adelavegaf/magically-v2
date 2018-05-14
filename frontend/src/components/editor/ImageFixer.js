import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Checkbox from 'material-ui/Checkbox'
import {FormControlLabel} from 'material-ui/Form';
import EditorSideList from './EditorSideList';
import {IMAGES_FIXER} from '../../containers/editor/EditorContainer';

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
  imageEditorContainer: {
    height: '100%',
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2
  },
  instructionContainer: {
    flex: 1,
    alignSelf: 'center'
  },
  instructionImageContainer: {
    alignSelf: 'center',
    width: '25%'
  },
  instructionText: {
    alignSelf: 'center',
    maxWidth: '60%'
  },
  instructionImage: {
    width: '100%',
    height: 'auto'
  },
  imageToFixContainer: {
    alignSelf: 'center',
    textAlign: 'center',
    height: '50%'
  },
  imageToFix: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
});

class ImageFixer extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getInstructions() {
    return (
      <Grid item className={this.classes.instructionContainer} style={{maxHeight: this.props.sideListMaxHeight}}>
        <Grid container direction={'column'} justify={'center'}>
          <Grid item className={this.classes.instructionImageContainer}>
            <img alt="" src="/pictures.png" className={this.classes.instructionImage}/>
          </Grid>
          <Grid item className={this.classes.instructionText}>
            <Typography variant={'title'} align={'center'}>
              Some images are missing a description. Informative images should aim for short, descriptive alternate
              text. Decorative images should pass an empty description.
            </Typography>
          </Grid>
          <Grid item className={this.classes.instructionText}>
            <Typography variant={'subheading'} align={'center'} color={'textSecondary'}>
              To fix this issue add a description using the textfield or state that the image is decorative.
            </Typography>
          </Grid>
          <Grid item className={this.classes.instructionText}>
            <Typography variant={'caption'}>
              <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel
                Buddha</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed
                by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0"
                      target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  getFixer() {
    return (
      <Grid item className={this.classes.flex} style={{maxHeight: this.props.sideListMaxHeight}}>
        <Grid container direction={'column'} className={this.classes.imageEditorContainer}>
          <Grid item>
            <Typography variant={'headline'}>
              Describe this image
            </Typography>
          </Grid>
          <Grid item className={this.classes.imageToFixContainer}>
            <img alt="missing description in website"
                 src={this.props.currentError.imgURL}
                 className={this.classes.imageToFix}/>
          </Grid>
          <Grid item>
            <Input placeholder="Type image description"
                   onChange={(event) => this.props.didEditDescription(event.target.value)}
                   value={this.props.currentError.description || ''}
                   disabled={this.props.hasNoDescription || !this.props.isOwner}
                   fullWidth
                   inputProps={{
                     'aria-label': 'image description',
                   }}/>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!this.props.isOwner}
                  checked={this.props.hasNoDescription}
                  onChange={(event, checked) => this.props.didPressHasNoDescription(checked)}
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

  render() {
    return (
      <Grid container className={this.classes.fullHeight}>
        <EditorSideList sideListMaxHeight={this.props.sideListMaxHeight}
                        fixerName={IMAGES_FIXER}
                        currentError={this.props.currentError}
                        errors={this.props.imageErrors}
                        changeError={this.props.changeError}/>
        {this.props.currentError ? this.getFixer() : this.getInstructions()}
      </Grid>
    );
  }
}

ImageFixer.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  sideListMaxHeight: PropTypes.number.isRequired,
  didPressHasNoDescription: PropTypes.func.isRequired,
  hasNoDescription: PropTypes.bool.isRequired,
  imageErrors: PropTypes.object.isRequired,
  currentError: PropTypes.object,
  changeError: PropTypes.func.isRequired,
  didEditDescription: PropTypes.func.isRequired
};

export default withStyles(styles)(ImageFixer);
