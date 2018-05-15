import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import EditorSideList from './EditorSideList';
import {CONTRAST_FIXER} from '../../containers/editor/EditorContainer';
import {ChromePicker} from 'react-color';

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
  contrastEditorContainer: {
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
  spacingContainer: {
    flex: 1,
    padding: '0px !important'
  },
  actionButtonsContainer: {
    alignSelf: 'flex-end'
  }
});

class ContrastFixer extends Component {
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
            <img alt="" src="/paint-palette.png" className={this.classes.instructionImage}/>
          </Grid>
          <Grid item className={this.classes.instructionText}>
            <Typography variant={'title'} align={'center'}>
              Elements must have sufficient color contrast. Specifically, the contrast between foreground and background
              colors must meet a ratio threshold.
            </Typography>
          </Grid>
          <Grid item className={this.classes.instructionText}>
            <Typography variant={'subheading'} align={'center'} color={'textSecondary'}>
              To fix this issue use the color pickers to change the foreground and background colors.
            </Typography>
          </Grid>
          <Grid item className={this.classes.instructionText}>
            <Typography variant={'caption'}>
              <div>Icons made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat
                Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed
                by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0"
                      target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  getColorPickers() {
    return this.props.isOwner ? (
      <Grid item>
        <Grid container justify={'space-around'}>
          <Grid item>
            <Typography variant={'title'} align={'center'}>Foreground Color</Typography>
            <ChromePicker color={this.props.currentError.foregroundColor}
                          onChange={(color, event) => this.props.didChangeForegroundColor(color.hex)}/>
          </Grid>
          <Grid item>
            <Typography variant={'title'} align={'center'}>Background Color</Typography>
            <ChromePicker color={this.props.currentError.backgroundColor}
                          onChange={(color, event) => this.props.didChangeBackgroundColor(color.hex)}/>
          </Grid>
        </Grid>
      </Grid>
    ) : <div/>;
  }

  getFixer() {
    return (
      <Grid item className={this.classes.flex}  style={{maxHeight: this.props.sideListMaxHeight}}>
        <Grid container direction={'column'} className={this.classes.contrastEditorContainer}>
          <Grid item>
            <Typography variant={'headline'}>
              Adjust the foreground and background colors
            </Typography>
          </Grid>
          <Grid item zeroMinWidth>
            <p style={{
              background: this.props.currentError.backgroundColor,
              color: this.props.currentError.foregroundColor
            }}>
              {this.props.currentError.text}
            </p>
          </Grid>
          {this.getColorPickers()}
          <Grid item>
            <Typography variant={'subheading'}>
              Current contrast ratio - {this.props.currentContrast.toFixed(1)}:1
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={'subheading'}>
              Expected contrast ratio - {this.props.currentError.expectedContrastRatio}
            </Typography>
          </Grid>
          <Grid item className={this.classes.spacingContainer}/>
          <Grid item className={this.classes.actionButtonsContainer}>
            <Button variant={'raised'} color={'primary'} onClick={this.props.didPressNext}>Next</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container className={this.classes.fullHeight} zeroMinWidth>
        <EditorSideList sideListMaxHeight={this.props.sideListMaxHeight}
                        fixerName={CONTRAST_FIXER}
                        currentError={this.props.currentError}
                        errors={this.props.contrastErrors}
                        changeError={this.props.changeError}/>
        {this.props.currentError ? this.getFixer() : this.getInstructions()}
      </Grid>
    );
  }
}

ContrastFixer.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  sideListMaxHeight: PropTypes.number.isRequired,
  contrastErrors: PropTypes.object.isRequired,
  currentError: PropTypes.object,
  didChangeForegroundColor: PropTypes.func.isRequired,
  didChangeBackgroundColor: PropTypes.func.isRequired,
  changeError: PropTypes.func.isRequired,
  didPressNext: PropTypes.func.isRequired
};

export default withStyles(styles)(ContrastFixer);
