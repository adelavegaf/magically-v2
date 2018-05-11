import {connect} from 'react-redux';
import Projects from '../components/Projects';

const mapStateToProps = (state) => {
  return {
    tabs: state.tabs || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);