import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import ProjectsContainer from '../containers/ProjectsContainer';
import Switch from 'material-ui/Switch';

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
        <AppBar color={'primary'} position={'static'}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Magically
            </Typography>
            <div style={{flex: 1}}/>
            <Tooltip title={
              `${this.props.isAutomaticFixEnabled ? 'Disable' : 'Enable'} automatic fix of websites based on a project`
            }>
              <Switch checked={this.props.isAutomaticFixEnabled}
                      onChange={() => this.props.didToggleAutomaticFixSwitch()}/>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <ProjectsContainer isAutomaticFixEnabled={this.props.isAutomaticFixEnabled} url={this.props.url}/>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  isAutomaticFixEnabled: PropTypes.bool.isRequired,
  url: PropTypes.string,
  didToggleAutomaticFixSwitch: PropTypes.func.isRequired
};

export default App;
