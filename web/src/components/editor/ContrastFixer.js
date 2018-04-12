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
import {CONTRAST_FIXER, IMAGES_FIXER} from '../../containers/EditorContainer';

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
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container className={this.classes.fullHeight} zeroMinWidth>
        <EditorSideList fixerName={CONTRAST_FIXER}
                        currentError={this.props.currentError}
                        errors={this.props.contrastErrors}
                        changeError={this.props.changeError}/>
        {this.props.currentError ? this.getFixer() : this.getInstructions()}
      </Grid>
    );
  }
}

ContrastFixer.propTypes = {
  contrastErrors: PropTypes.object.isRequired,
  currentError: PropTypes.object,
  changeError: PropTypes.func.isRequired
};

export default withStyles(styles)(ContrastFixer);
