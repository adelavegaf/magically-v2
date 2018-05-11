import {combineReducers} from 'redux';

const initialTabsState = {};

function tabs(state = initialTabsState, action) {
  switch (action.type) {
    case 'SET_TABS':
      return action.tabs;
    default:
      return state;
  }
}

export default combineReducers({tabs});