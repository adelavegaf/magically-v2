import firebase from './firebase';

export default class Api {
  static getProjectsWithUrl(url) {
    return firebase
      .firestore()
      .collection('projects')
      .where('websiteUrl', '==', url)
      .where('isLoading', '==', false)
      .get()
      .then(projectsSnapshot => projectsSnapshot.docs.map(project => project.data()));
  }
}