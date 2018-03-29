import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EDITOR} from '../components/utils/Views';
import Project from '../components/projects/Project';

class ProjectContainer extends Component {
  constructor(props) {
    super(props);
  }

  didPressProject() {
    console.log('project');
  }

  didPressUpvoteButton() {
    console.log('upvote');
  }

  didPressDownvoteButton() {
    console.log('downvote');
  }

  didPressFavoriteButton() {
    console.log('favorite');
  }

  render() {
    return React.createElement(Project, {
        project: this.props.project,
        didPressProject: () => this.didPressProject(),
        didPressUpvoteButton: () => this.didPressUpvoteButton(),
        didPressDownvoteButton: () => this.didPressDownvoteButton(),
        didPressFavoriteButton: () => this.didPressFavoriteButton()
      }
    );
  }
}

ProjectContainer.propTypes = {
  project: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired
};

export default ProjectContainer;
