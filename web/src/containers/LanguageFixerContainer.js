import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LanguageFixer from '../components/editor/LanguageFixer';

class LanguageFixerContainer extends Component {
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

  didChangeLang(lang) {
    this.props.didChangeLang(this.state.currentErrorKey, lang);
  }

  render() {
    return React.createElement(LanguageFixer, {
        sideListMaxHeight: this.props.sideListMaxHeight,
        didChangeLang: (language) => this.didChangeLang(language),
        langErrors: this.props.langErrors,
        currentError: this.props.langErrors[this.state.currentErrorKey],
        changeError: (key, error) => this.changeError(key, error),
      }
    );
  }
}

LanguageFixerContainer.propTypes = {
  sideListMaxHeight: PropTypes.number.isRequired,
  didChangeLang: PropTypes.func.isRequired,
  langErrors: PropTypes.object.isRequired,
  langErrorsCount: PropTypes.number.isRequired
};

export default LanguageFixerContainer;
