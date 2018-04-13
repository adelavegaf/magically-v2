import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
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
  }
});

class ImageFixer extends Component {
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
        <Grid container direction={'column'} className={this.classes.imageEditorContainer}>
          <Grid item>
            <Typography variant={'headline'}>
              Describe this image
            </Typography>
          </Grid>
          <Grid item className={this.classes.centerContainer}>
            <img src={this.props.currentError.imgURL}/>
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
