export const getCurrentTabInformationRequest = (tabId) => {
  return {
    type: 'GET_CURRENT_TAB_INFORMATION',
    tabId: tabId
  };
};

export const setCurrentProjectIdRequest = (tabId, projectId) => {
  return {
    type: 'SET_CURRENT_PROJECT_ID',
    tabId: tabId,
    projectId: projectId
  };
};