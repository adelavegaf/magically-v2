import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PROJECTS} from '../../components/utils/Views';
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
    const searchProps = {websiteUrl: this.state.websiteUrl};
    this.props.changeView(PROJECTS, searchProps);
  }

  render() {
    return React.createElement(Search, {
        changeView: this.props.changeView,
        variant: this.props.variant,
        websiteUrl: this.state.websiteUrl,
        onWebsiteURLChange: (websiteUrl) => this.onWebsiteURLChange(websiteUrl),
        onSearch: () => this.onSearch()
      }
    );
  }
}

SearchContainer.propTypes = {
  startText: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired
};

export default SearchContainer;
