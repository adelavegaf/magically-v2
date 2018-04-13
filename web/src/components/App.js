import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import PropTypes from 'prop-types';
import {CREATE_PROJECT, EDITOR, LANDING, PROJECTS, SIGN_IN} from './utils/Views';
import LandingPageContainer from '../containers/LandingPageContainer';
import ProjectsContainer from '../containers/projects/ProjectsContainer';
import EditorContainer from '../containers/editor/EditorContainer';
import SignInContainer from '../containers/auth/SignInContainer';
import CreateProjectContainer from '../containers/projects/CreateProjectContainer';

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
    const currentViewProps = {...this.props.currentViewProps, changeView: this.props.changeView};
    switch (this.props.currentView) {
      case LANDING:
        return React.createElement(LandingPageContainer, currentViewProps);
      case PROJECTS:
        return React.createElement(ProjectsContainer, currentViewProps);
      case EDITOR:
        return React.createElement(EditorContainer, currentViewProps);
      case SIGN_IN:
        return React.createElement(SignInContainer, currentViewProps);
      case CREATE_PROJECT:
        return React.createElement(CreateProjectContainer, currentViewProps);
      default:
        return <div/>
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
  currentViewProps: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired
};

export default App;
