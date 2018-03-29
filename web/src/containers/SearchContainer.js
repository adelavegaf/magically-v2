import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EDITOR} from '../components/utils/Views';
import SearchResults from '../components/search/SearchResults';

const MOCK_PROJECT_DATA = [
  {name: 'Awesome Fix 1', author: 'adelavegaf', date: new Date(), errors: 7, percentage: '88%', upvotes: 23, downvotes: 0, favorites: 1},
  {name: 'EzFix', author: 'jsmen', date: new Date(), errors: 10, percentage: '70%', upvotes: 1, downvotes: 1, favorites: 0},
  {name: 'Colfuturo', author: 'mchief', date: new Date(), errors: 20, percentage: '30%', upvotes: 0, downvotes: 11, favorites: 0},
];

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: MOCK_PROJECT_DATA
    }
  }

  viewDidLoad() {
    super.viewDidLoad()
    // TODO(adelavega): query firebase for all projects that have URL: this.props.websiteUrl
  }

  render() {
    return React.createElement(SearchResults, {
        projects: this.state.projects,
        changeView: this.props.changeView
      }
    );
  }
}

SearchContainer.propTypes = {
  changeView: PropTypes.func.isRequired
};

export default SearchContainer;
