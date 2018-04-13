import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox'
import {CONTRAST_FIXER, IMAGES_FIXER, LANGUAGE_FIXER} from '../../containers/editor/EditorContainer';

const styles = theme => ({
  editorSideList: {
    overflowY: 'auto',
    width: theme.spacing.unit * 29,
    height: '100%',
    paddingRight: '0px !important',
    paddingTop: '0px !important',
    borderRight: 'solid 1px #e0e0e0'
  },
  list: {
    paddingTop: '0px !important'
  },
  selectedListItem: {
    background: 'rgba(0, 0, 0, .15)'
  },
  instructions: {
    paddingRight: '0px'
  }
});

class EditorSideList extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getLastPartOfUrl(url) {
    return url.substr(url.lastIndexOf('/') + 1);
  }

  getListItemText(error) {
    switch (this.props.fixerName) {
      case IMAGES_FIXER:
        return this.getLastPartOfUrl(error.imgURL);
      case LANGUAGE_FIXER:
        return 'Missing language';
      case CONTRAST_FIXER:
        return 'contrast';
      default:
        return;
    }
  }

  getListItemClass(domSelector) {
    if (!this.props.currentError) {
      return '';
    }
    return this.props.currentError.domSelector === domSelector ? this.classes.selectedListItem : ''
  }

  getListItems() {
    return Object.entries(this.props.errors).map(([k, e]) => {
      return (
        <ListItem button
                  key={k}
                  className={this.getListItemClass(e.domSelector)}
                  onClick={() => this.props.changeError(k, e)}>
          <ListItemText primary={this.getListItemText(e)}/>
          <ListItemSecondaryAction>
            <Checkbox
              disableRipple
              checked={e.isFixed ? e.isFixed : false}
            />
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }

  render() {
    return (
      <Grid item className={this.classes.editorSideList}>
        <List className={this.classes.list} style={{maxHeight: this.props.sideListMaxHeight}}>
          <ListItem button disableGutters={true} divider={true}>
            <ListItemText primary={'Instructions'} align={'center'} className={this.classes.instructions}/>
          </ListItem>
          {this.getListItems()}
        </List>
      </Grid>
    )
  }
}

EditorSideList.propTypes = {
  sideListMaxHeight: PropTypes.number.isRequired,
  fixerName: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  currentError: PropTypes.object,
  changeError: PropTypes.func.isRequired
};

export default withStyles(styles)(EditorSideList);
