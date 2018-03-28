import React, {Component} from 'react';
import App from '../components/App';
import {LANDING} from '../components/utils/Views';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: LANDING
    };
  }

  changeView(viewName) {
    this.setState({currentView: viewName});
  }

  render() {
    return React.createElement(App, {
        currentView: this.state.currentView,
        changeView: (viewName) => this.changeView(viewName)
      }
    );
  }
}

export default AppContainer;
