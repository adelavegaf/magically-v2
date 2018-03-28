import React, {Component} from 'react';
import LandingPage from '../components/LandingPage';

class LandingPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websiteUrl: ''
    };
  }

  onWebsiteURLChange(websiteUrl) {
    this.setState({websiteUrl: websiteUrl});
  }

  onSearch() {
    // TODO(adelavega): call change view with appropriate params
    console.log('searching for', this.state.websiteUrl);
  }

  render() {
    return React.createElement(LandingPage, {
        websiteUrl: this.state.websiteUrl,
        onWebsiteURLChange: (websiteUrl) => this.onWebsiteURLChange(websiteUrl),
        onSearch: () => this.onSearch()
      }
    );
  }
}

export default LandingPageContainer;
