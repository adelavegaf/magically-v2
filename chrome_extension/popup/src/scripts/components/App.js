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

        <Paper style={classes.paper}>
          <FormControl style={classes.projectSelect}>
            <InputLabel htmlFor="project-select">Project</InputLabel>
            <Select value={10} inputProps={{id: 'project-select'}}>
              <MenuItem value={10}>Untitled - adelavega</MenuItem>
              <MenuItem value={20}>Super - rumbydombe</MenuItem>
            </Select>
            <FormHelperText>Load project</FormHelperText>
          </FormControl>
        </Paper>

      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  tabs: PropTypes.object.isRequired
};

export default App;
