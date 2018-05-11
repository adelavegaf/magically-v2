import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import {FormControl, FormHelperText} from 'material-ui/Form';
import {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Project from './Project';
import Search from './Search';
import Grid from 'material-ui/Grid';

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

const classes = {
  paper: {
    padding: '16px',
    height: '100%',
    margin: '8px'
  },
  projectSelect: {
    width: '100%'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      projects: [],
      selectedProject: null
    };
  }

  componentDidMount() {
    chrome.tabs.query({active: true, currentWindow: true}, (arrayOfTabs) => {
      const activeTabId = arrayOfTabs[0].id;
      console.log(activeTabId);
      const tabInfo = this.props.tabs[activeTabId];
      if (!tabInfo) {
        return;
      }
      const {projects, selectedProject} = tabInfo;
      console.log(projects, selectedProject);
      this.setState({projects: projects, selectedProject: selectedProject});
    });
  }

  getProjects() {
    return this.state.projects.map((project, key) => {
      return <Project project={project} isSelected={false} key={key}/>
    });
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

        {this.getProjects()}

      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  tabs: PropTypes.object.isRequired
};

export default App;
