import React, {Component} from 'react';
import App from '../components/App';
import MessagingApi from '../messaging/MessagingApi';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAutomaticFixEnabled: false
    };
  }

  componentDidMount() {
    MessagingApi.getIsAutomaticFixEnabled().then(response => {
      this.setState({isAutomaticFixEnabled: response.isAutomaticFixEnabled});
    });
  }

  didToggleAutomaticFixSwitch() {
    MessagingApi.setIsAutomaticFixEnabled(!this.state.isAutomaticFixEnabled).then(response => {
      this.setState({isAutomaticFixEnabled: response.isAutomaticFixEnabled});
    })
  }

  render() {
    return React.createElement(App, {
      isAutomaticFixEnabled: this.state.isAutomaticFixEnabled,
      didToggleAutomaticFixSwitch: () => this.didToggleAutomaticFixSwitch()
    });
  }
}

export default AppContainer;