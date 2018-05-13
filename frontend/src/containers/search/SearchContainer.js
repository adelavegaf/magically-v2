import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from '../../components/search/Search';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websiteUrl: this.props.startText
    };
  }

  onWebsiteURLChange(websiteUrl) {
    this.setState({websiteUrl: websiteUrl});
  }

  onSearch() {
    this.props.history.push(`/projects/${encodeURIComponent(this.state.websiteUrl)}`);
  }

  render() {
    return React.createElement(Search, {
        variant: this.props.variant,
        websiteUrl: this.state.websiteUrl,
        onWebsiteURLChange: (websiteUrl) => this.onWebsiteURLChange(websiteUrl),
        onSearch: () => this.onSearch()
      }
    );
  }
}

SearchContainer.propTypes = {
  history: PropTypes.object.isRequired,
  startText: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default withRouter(SearchContainer);
