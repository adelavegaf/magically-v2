import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LandingPage from '../components/LandingPage';
import {SEARCH} from '../components/utils/Views';

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
    const searchProps = {websiteUrl: this.state.websiteUrl};
    this.props.changeView(SEARCH, searchProps);
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

LandingPageContainer.propTypes = {
  changeView: PropTypes.func.isRequired
};

export default LandingPageContainer;
