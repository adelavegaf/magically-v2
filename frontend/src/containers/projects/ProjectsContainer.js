import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Projects from '../../components/projects/Projects';
import firebase from '../../firebase';


class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.authUnsubscribe = null;
    this.projectsUnsubscribe = null;
    this.state = {
      projects: [],
      openCreateProjectDialog: false,
      openCopyProjectDialog: false,
      copyProject: null,
      signedIn: false,
      fetching: true,
      dateFilter: 'All time',
      ownerFilter: 'Anyone',
      sortByFilter: 'Completion Percentage'
    }
  }

  fetchProjects() {
    if (this.projectsUnsubscribe) {
      this.projectsUnsubscribe();
    }
    this.projectsUnsubscribe = this
      .getCurrentProjectQuery()
      .onSnapshot(snapshot => {
        const docs = snapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()}
        });
        this.setState({projects: docs, fetching: false});
      });
  }

  getCurrentProjectQuery() {
    let query = this.getBaseProjectQuery();
    const date = new Date();
    let withDateFilter = false;
    switch (this.state.dateFilter) {
      case 'Today':
        date.setHours(0, 0, 0, 0);
        query = query.where('createdAt', '>=', date);
        withDateFilter = true;
        break;
      case 'This year':
        date.setMonth(0, 0);
        query = query.where('createdAt', '>=', date);
        withDateFilter = true;
        break;
      default:
        break;
    }

    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      switch (this.state.ownerFilter) {
        case 'Only me':
          query = query.where('authorId', '==', currentUser.uid);
          break;
        default:
          break;
      }
    }

    switch (this.state.sortByFilter) {
      case 'Completion Percentage':
        if (withDateFilter) {
          query = query.orderBy('createdAt', 'desc')
                       .orderBy('errors.totalFixCount', 'desc')
                       .orderBy('favoriteCount', 'desc');
        } else {
          query = query.orderBy('errors.totalFixCount', 'desc')
                       .orderBy('createdAt', 'desc')
                       .orderBy('favoriteCount', 'desc');
        }
        break;
      case 'Favorites':
        if (withDateFilter) {
          query = query.orderBy('createdAt', 'desc')
                       .orderBy('favoriteCount', 'desc')
                       .orderBy('errors.totalFixCount', 'desc');
        } else {
          query = query.orderBy('favoriteCount', 'desc')
                       .orderBy('createdAt', 'desc')
                       .orderBy('errors.totalFixCount', 'desc');
        }
        break;
      case 'Date':
        query = query.orderBy('createdAt', 'desc')
                     .orderBy('errors.totalFixCount', 'desc')
                     .orderBy('favoriteCount', 'desc');
        break;
      default:
        break;
    }
    return query;
  }

  getBaseProjectQuery() {
    return firebase
      .firestore()
      .collection('projects')
      .where('websiteUrl', '==', decodeURIComponent(this.props.match.params.url))
      .where('isLoading', '==', false);
  }

  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({signedIn: true});
      } else {
        this.setState({signedIn: false});
      }
    });
    this.fetchProjects();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.url === this.props.match.params.url &&
        prevState.dateFilter === this.state.dateFilter &&
        prevState.ownerFilter === this.state.ownerFilter &&
        prevState.sortByFilter === this.state.sortByFilter) {
      return;
    }
    this.fetchProjects();
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.projectsUnsubscribe();
  }

  didPressCreateProjectButton() {
    this.setState({openCreateProjectDialog: true});
  }

  closeCreateProjectDialog() {
    this.setState({openCreateProjectDialog: false});
  }

  confirmCreateProjectDialog() {
    if (this.state.signedIn) {
      this.props.history.push(`/projects/${this.props.match.params.url}/create`);
    }
    else {
      this.props.history.push('/auth');
    }
  }

  didPressCopyProjectButton(project) {
    this.setState({openCopyProjectDialog: true, copyProject: project});
  }

  closeCopyProjectDialog() {
    this.setState({openCopyProjectDialog: false, copyProject: null});
  }

  confirmCopyProjectDialog() {
    if (this.state.signedIn) {
      this.props.history.push(`/projects/${this.props.match.params.url}/copy/${this.state.copyProject.id}`);
    }
    else {
      this.props.history.push('/auth');
    }
  }

  didPressDateFilter(dateFilter) {
    this.setState({dateFilter: dateFilter});
  }

  didPressOwnerFilter(ownerFilter) {
    this.setState({ownerFilter: ownerFilter});
  }

  didPressSortByFilter(sortByFilter) {
    this.setState({sortByFilter: sortByFilter});
  }

  render() {
    return React.createElement(Projects, {
        signedIn: this.state.signedIn,
        fetching: this.state.fetching,
        projects: this.state.projects,
        websiteUrl: decodeURIComponent(this.props.match.params.url),
        openCreateProjectDialog: this.state.openCreateProjectDialog,
        openCopyProjectDialog: this.state.openCopyProjectDialog,
        dateFilter: this.state.dateFilter,
        ownerFilter: this.state.ownerFilter,
        sortByFilter: this.state.sortByFilter,
        didPressDateFilter: (filter) => this.didPressDateFilter(filter),
        didPressOwnerFilter: (filter) => this.didPressOwnerFilter(filter),
        didPressSortByFilter: (filter) => this.didPressSortByFilter(filter),
        didPressCreateProjectButton: () => this.didPressCreateProjectButton(),
        closeCreateProjectDialog: () => this.closeCreateProjectDialog(),
        confirmCreateProjectDialog: () => this.confirmCreateProjectDialog(),
        didPressCopyProjectButton: (project) => this.didPressCopyProjectButton(project),
        closeCopyProjectDialog: () => this.closeCopyProjectDialog(),
        confirmCopyProjectDialog: () => this.confirmCopyProjectDialog()
      }
    );
  }
}

ProjectsContainer.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(ProjectsContainer);
