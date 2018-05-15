import firebase from './firebase';

export default class Api {
  static getProjectsWithUrl(url) {
    return firebase
      .firestore()
      .collection('projects')
      .where('websiteUrl', '==', url)
      .where('isLoading', '==', false)
      .orderBy('errors.totalFixCount', 'desc')
      .orderBy('createdAt', 'desc')
      .orderBy('favoriteCount', 'desc')
      .get()
      .then(projectsSnapshot => {
        return projectsSnapshot.docs.map(project => {
          return {
            id: project.id,
            ...project.data()
          }
        })
      });
  }

  static getProjectsWithUrlAndTitleFilter(url, titleFilter) {
    const endString = titleFilter.substring(0, titleFilter.length - 1) +
                      String.fromCharCode(titleFilter.charCodeAt(titleFilter.length - 1) + 1);
    return firebase
      .firestore()
      .collection('projects')
      .where('websiteUrl', '==', url)
      .where('isLoading', '==', false)
      .where('title', '>=', titleFilter)
      .where('title', '<', endString)
      .get()
      .then(projectsSnapshot => {
        return projectsSnapshot.docs.map(project => {
          return {
            id: project.id,
            ...project.data()
          }
        })
      });
  }

}