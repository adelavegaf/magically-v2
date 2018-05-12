export const setCurrentProjectId = (tabId, projectId) => {
  return {
    type: 'SET_CURRENT_PROJECT_ID',
    tabId: tabId,
    currentProjectId: projectId
  }
};