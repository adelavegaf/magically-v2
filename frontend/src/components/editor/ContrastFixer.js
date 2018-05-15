import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
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
  },
  colorPickerContainer: {
    cursor: 'pointer'
  },
  colorPreview: {
    width: '36px',
    height: '36px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#eee',
    borderRadius: '8px',
    marginLeft: theme.spacing.unit
  },
  colorText: {
    marginRight: theme.spacing.unit
  },
  popover: {
    marginTop: theme.spacing.unit,
    position: 'absolute',
    zIndex: 2
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
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

  getChromePicker(color, changeFn) {
    return (
      <div className={this.classes.popover}>
        <div className={this.classes.cover} onClick={() => this.props.closePickers()}/>
        <ChromePicker color={color} onChange={(color, event) => changeFn(color.hex)}/>
      </div>
    )
  }

  getColorPicker(text, color, openPicker, displayPicker, changeFn) {
    return (
      <Grid container>
        <Grid item>
          <Paper className={this.classes.colorPickerContainer} onClick={openPicker}>
            <Grid container alignItems={'center'}>
              <Grid item>
                <div className={this.classes.colorPreview}
                     style={{backgroundColor: color}}/>
              </Grid>
              <Grid item>
                <Typography className={this.classes.colorText}>{text}</Typography>
              </Grid>
            </Grid>
          </Paper>
          {displayPicker ? this.getChromePicker(color, changeFn) : null}
        </Grid>
      </Grid>
    );
  }

  getColorPickers() {
    return this.props.isOwner ? (
      <Grid item>
        <Grid container>
          <Grid item>
            {this.getColorPicker('Foreground color',
              this.props.currentError.foregroundColor,
              this.props.openForegroundPicker,
              this.props.displayForegroundPicker,
              this.props.didChangeForegroundColor)}
          </Grid>
          <Grid item>
            {this.getColorPicker('Background color',
              this.props.currentError.backgroundColor,
              this.props.openBackgroundPicker,
              this.props.displayBackgroundPicker,
              this.props.didChangeBackgroundColor)}
          </Grid>
        </Grid>
      </Grid>
    ) : <div/>;
  }

  getFixer() {
    return (
      <Grid item className={this.classes.flex} style={{maxHeight: this.props.sideListMaxHeight}}>
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
          <Grid item>
            <Typography variant={'caption'} align={'center'}>
              The current contrast ratio is {this.props.currentContrast.toFixed(1)}:1. It must be at least
              at {this.props.currentError.expectedContrastRatio}.
            </Typography>
          </Grid>
          {this.getColorPickers()}
          <Grid item className={this.classes.spacingContainer}/>
          <Grid item className={this.classes.actionButtonsContainer}>
            <Grid container>
              <Grid item>
                <Button variant={'raised'} color={'primary'} onClick={this.props.didPressApplyToAll}>
                  Apply To All
                </Button>
              </Grid>
              <Grid item>
                <Button variant={'raised'} color={'primary'} onClick={this.props.didPressNext}>Next</Button>
              </Grid>
            </Grid>
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
  didPressNext: PropTypes.func.isRequired,
  displayForegroundPicker: PropTypes.bool.isRequired,
  openForegroundPicker: PropTypes.func.isRequired,
  displayBackgroundPicker: PropTypes.bool.isRequired,
  openBackgroundPicker: PropTypes.func.isRequired,
  closePickers: PropTypes.func.isRequired,
  didPressApplyToAll: PropTypes.func.isRequired,
};

export default withStyles(styles)(ContrastFixer);
