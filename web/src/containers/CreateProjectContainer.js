import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EDITOR} from '../components/utils/Views';
import CreateProject from '../components/projects/CreateProject';
import firebase from '../firebase';

class CreateProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    firebase.firestore().collection('projects').add({
      authorId: firebase.auth().currentUser.uid,
      authorDisplayName: firebase.auth().currentUser.displayName,
      authorEmail: firebase.auth().currentUser.email,
      title: 'Untitled',
      createdAt: new Date(),
      websiteUrl: this.props.websiteUrl,
      upvotes: 0,
      downvotes: 0,
      favorites: 0,
      errorNumber: 15, // TODO(adelavega): Remove property once the backend is connected.
      fixedNumber: 0,
      loading: true
    });
  }

  render() {
    return React.createElement(CreateProject, {
        websiteUrl: this.props.websiteUrl
      }
    );
  }
}

CreateProjectContainer.propTypes = {
  websiteUrl: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired
};

export default CreateProjectContainer;
