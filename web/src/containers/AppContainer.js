import React, {Component} from 'react';
import App from '../components/App';
import {LANDING} from '../components/utils/Views';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: LANDING,
      currentViewProps: {}
    };
  }

  changeView(viewName, viewProps) {
    this.setState({currentView: viewName, currentViewProps: viewProps});
  }

  render() {
    return React.createElement(App, {
        currentView: this.state.currentView,
        currentViewProps: this.state.currentViewProps,
        changeView: (viewName, viewProps) => this.changeView(viewName, viewProps)
      }
    );
  }
}

export default AppContainer;
