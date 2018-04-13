import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import EditorSideList from './EditorSideList';
import {CONTRAST_FIXER} from '../../containers/EditorContainer';
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
  }
});

class ContrastFixer extends Component {
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
  sideListMaxHeight: PropTypes.number.isRequired,
  contrastErrors: PropTypes.object.isRequired,
  currentError: PropTypes.object,
  didChangeForegroundColor: PropTypes.func.isRequired,
  didChangeBackgroundColor: PropTypes.func.isRequired,
  changeError: PropTypes.func.isRequired
};

export default withStyles(styles)(ContrastFixer);
