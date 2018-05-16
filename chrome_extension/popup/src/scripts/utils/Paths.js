export const BASE_URL = 'https://magically-188518.firebaseapp.com';

export const getEditorUrl = (projectId) => {
  return `${BASE_URL}/editor/${projectId}/`;
};

export const getCreateProjectUrl = (url) => {
  return `${BASE_URL}/projects/${encodeURIComponent(url)}/create`;
};