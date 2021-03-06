import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {InputAdornment} from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  searchInput: {
    background: 'rgba(0, 0, 0, 0.04)',
    color: '#525252',
    borderRadius: 5,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit
  }
});

class Search extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSearch();
      e.preventDefault();
    }
  }

  render() {
    return <TextField className={this.classes.searchInput}
                      placeholder={'Search Projects'}
                      onChange={(e) => this.props.didModifyProjectFilter(e.target.value)}
                      fullWidth={true}
                      autoFocus={true}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
                      }}/>
  }
}

Search.propTypes = {
  didModifyProjectFilter: PropTypes.func.isRequired
};

export default withStyles(styles)(Search);
