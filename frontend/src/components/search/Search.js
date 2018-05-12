import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Input, {InputAdornment} from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';

const styles = theme => ({
  normalSearchInput: {
    background: 'rgba(0, 0, 0, 0.04)',
    color: '#525252',
    flex: 1,
    borderRadius: 5,
    padding: theme.spacing.unit
  },
  bigSearchInput: {
    borderTop: 'solid 1px #ababab',
    paddingTop: 2 * theme.spacing.unit,
    paddingBottom: 2 * theme.spacing.unit,
  },
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

  getNormalSearchBar() {
    return (
      <Input
        className={this.classes.normalSearchInput}
        placeholder={'Search Projects'}
        disableUnderline={true}
        value={this.props.websiteUrl}
        onKeyPress={(e) => this.onKeyPress(e)}
        onChange={(e) => this.props.onWebsiteURLChange(e.target.value)}
        startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
      />
    );
  }

  getBigSearchBar() {
    return (
      <Input placeholder="Type website URL"
             className={this.classes.bigSearchInput}
             fullWidth
             value={this.props.websiteUrl}
             onKeyPress={(e) => this.onKeyPress(e)}
             onChange={(e) => this.props.onWebsiteURLChange(e.target.value)}
             inputProps={{
               'aria-label': 'Url',
             }}/>
    );
  }

  render() {
    return this.props.variant === 'normal' ? this.getNormalSearchBar() : this.getBigSearchBar();
  }
}

Search.propTypes = {
  variant: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
  websiteUrl: PropTypes.string.isRequired,
  onWebsiteURLChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default withStyles(styles)(Search);
