import {combineReducers} from 'redux';

const initialTabsState = {};

function tabs(state = initialTabsState, action) {
  switch (action.type) {
    case 'SET_TABS':
      return action.tabs;
    case 'SET_CURRENT_PROJECT_ID':
      const updatedState = JSON.parse(JSON.stringify(state));
      updatedState[action.tabId].currentProjectId = action.currentProjectId;
      return updatedState;
    default:
      return state;
  }
}

export default combineReducers({tabs});
