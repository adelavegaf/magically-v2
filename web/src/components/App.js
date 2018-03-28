import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import PropTypes from 'prop-types';
import SearchResults from './search/SearchResults';
import Editor from './editor/Editor';
import {EDITOR, LANDING, SEARCH} from './utils/Views';
import LandingPageContainer from '../containers/LandingPageContainer';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#428e92',
      dark: '#00363a',
      main: '#006064',
      contrastText: '#fff'
    },
    secondary: {
      light: '#cfff95',
      dark: '#6b9b37',
      main: '#9ccc65',
      contrastText: '#000'
    },
  }
});

class App extends Component {
  getCurrentView() {
    switch (this.props.currentView) {
      case LANDING:
        return <LandingPageContainer/>;
      case SEARCH:
        return <SearchResults/>;
      case EDITOR:
        return <Editor/>;
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.getCurrentView()}
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  currentView: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired
};

export default App;
