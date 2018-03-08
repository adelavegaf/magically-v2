import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import LandingPage from './LandingPage';
import SearchResults from './search/SearchResults';
import Editor from './editor/Editor';

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
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Editor/>
      </MuiThemeProvider>
    );
  }
}

export default App;
