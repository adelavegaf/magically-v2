import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EDITOR} from '../components/utils/Views';
import Project from '../components/projects/Project';

class ProjectContainer extends Component {
  didPressProject() {
    this.props.changeView(EDITOR, {projectId: this.props.projectId, project: this.props.project});
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
        projectId: this.props.projectId,
        didPressProject: () => this.didPressProject(),
        didPressUpvoteButton: () => this.didPressUpvoteButton(),
        didPressDownvoteButton: () => this.didPressDownvoteButton(),
        didPressFavoriteButton: () => this.didPressFavoriteButton()
      }
    );
  }
}

ProjectContainer.propTypes = {
  projectId: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired
};

export default ProjectContainer;
