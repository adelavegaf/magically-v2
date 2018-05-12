import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Search from './Search';
import Grid from 'material-ui/Grid';
import ProjectsContainer from '../containers/ProjectsContainer';

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
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      projects: [],
      selectedProject: null
    };
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar color={'primary'} position={'static'}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Magically
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container>
          <Search/>
        </Grid>

        <ProjectsContainer/>
      </MuiThemeProvider>
    );
  }
}

export default App;
