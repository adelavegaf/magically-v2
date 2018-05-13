import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import LandingPageContainer from '../containers/LandingPageContainer';
import ProjectsContainer from '../containers/projects/ProjectsContainer';
import EditorContainer from '../containers/editor/EditorContainer';
import SignInContainer from '../containers/auth/AuthContainer';
import CreateProjectContainer from '../containers/projects/CreateProjectContainer';
import {Route, Switch} from 'react-router-dom';

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
        <Switch>
          <Route exact path="/" component={LandingPageContainer}/>
          <Route exact path="/projects/:url" component={ProjectsContainer}/>
          <Route exact path="/projects/:url/create" component={CreateProjectContainer}/>
          <Route exact path="/editor/:projectId" component={EditorContainer}/>
          <Route exact path="/auth" component={SignInContainer}/>
        </Switch>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};

export default App;
