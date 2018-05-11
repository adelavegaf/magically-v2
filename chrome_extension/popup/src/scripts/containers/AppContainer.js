import {connect} from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    tabs: state.tabs || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);