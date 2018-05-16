import React, {Component} from 'react';
import App from '../components/App';
import MessagingApi from '../messaging/MessagingApi';
import TabsApi from '../utils/TabsApi';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAutomaticFixEnabled: false,
      url: ''
    };
  }

  componentDidMount() {
    MessagingApi.getIsAutomaticFixEnabled().then(response => {
      this.setState({isAutomaticFixEnabled: response.isAutomaticFixEnabled});
    });
    TabsApi.getCurrentTabUrl().then(url => {
      console.log(url);
      this.setState({url: url});
    })
  }

  didToggleAutomaticFixSwitch() {
    MessagingApi.setIsAutomaticFixEnabled(!this.state.isAutomaticFixEnabled).then(response => {
      this.setState({isAutomaticFixEnabled: response.isAutomaticFixEnabled});
    })
  }

  render() {
    return React.createElement(App, {
      isAutomaticFixEnabled: this.state.isAutomaticFixEnabled,
      url: this.state.url,
      didToggleAutomaticFixSwitch: () => this.didToggleAutomaticFixSwitch()
    });
  }
}

export default AppContainer;