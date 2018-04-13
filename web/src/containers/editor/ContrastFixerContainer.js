import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ContrastFixer from '../../components/editor/ContrastFixer';

class ContrastFixerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentErrorKey: -1,
    };
  }

  changeError(key) {
    this.setState({
      currentErrorKey: key
    });
  }

  getLuminance(rgb) {
    const firstOperation = (n) => n / 3294;
    const secondOperation = (n) => Math.pow((n / 269 + 0.0513), 2.4);
    const getRValue = (n) => n <= 10 ? firstOperation(n) : secondOperation(n);
    const rg = getRValue(rgb.r);
    const gg = getRValue(rgb.g);
    const bg = getRValue(rgb.b);
    return 0.2126 * rg + 0.7152 * gg + 0.0722 * bg;
  }

  hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  calculateContrast(fgColor, bgColor) {
    const fgRgb = this.hexToRgb(fgColor);
    const bgRgb = this.hexToRgb(bgColor);
    const fgL = this.getLuminance(fgRgb);
    const bgL = this.getLuminance(bgRgb);
    const [l1, l2] = fgL > bgL ? [fgL, bgL] : [bgL, fgL];
    return (l1 + 0.05) / (l2 + 0.05);
  }

  didChangeForegroundColor(fgColor) {
    const error = this.props.contrastErrors[this.state.currentErrorKey];
    const expectedContrastString = error.expectedContrastRatio.split(':');
    const expectedContrast = parseFloat(expectedContrastString[0]);
    const currentContrast = this.calculateContrast(fgColor, error.backgroundColor);
    this.props.didChangeForegroundColor(this.state.currentErrorKey, fgColor, currentContrast >= expectedContrast);
  }

  didChangeBackgroundColor(bgColor) {
    const error = this.props.contrastErrors[this.state.currentErrorKey];
    const expectedContrastString = error.expectedContrastRatio.split(':');
    const expectedContrast = parseFloat(expectedContrastString[0]);
    const currentContrast = this.calculateContrast(error.foregroundColor, bgColor);
    this.props.didChangeBackgroundColor(this.state.currentErrorKey, bgColor, currentContrast >= expectedContrast);
  }

  render() {
    const contrastErrors = this.props.contrastErrors;
    const index = this.state.currentErrorKey;
    const error = contrastErrors[index];
    const currentContrast = error ? this.calculateContrast(error.foregroundColor, error.backgroundColor) : 0;
    return React.createElement(ContrastFixer, {
        sideListMaxHeight: this.props.sideListMaxHeight,
        contrastErrors: contrastErrors,
        currentError: error,
        currentContrast: currentContrast,
        didChangeForegroundColor: (fgColor) => this.didChangeForegroundColor(fgColor),
        didChangeBackgroundColor: (bgColor) => this.didChangeBackgroundColor(bgColor),
        changeError: (key, error) => this.changeError(key, error),
      }
    );
  }
}

ContrastFixerContainer.propTypes = {
  sideListMaxHeight: PropTypes.number.isRequired,
  contrastErrors: PropTypes.object.isRequired,
  didChangeForegroundColor: PropTypes.func.isRequired,
  didChangeBackgroundColor: PropTypes.func.isRequired,
};

export default ContrastFixerContainer;
