import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox'

const styles = theme => ({
  editorSideList: {
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

  getListItemClass(domSelector) {
    if (!this.props.currentError) return '';
    return this.props.currentError.domSelector === domSelector ? this.classes.selectedListItem : ''
  }

  render() {
    const listItems = this.props.errors.map((e, i) => {
      return (
        <ListItem button
                  key={i}
                  className={this.getListItemClass(e.domSelector)}
                  onClick={() => this.props.changeError(e)}>
          <ListItemText primary={this.getLastPartOfUrl(e.imgURL)}/>
          <ListItemSecondaryAction>
            <Checkbox
              checked={e.fixed ? e.fixed : false}
            />
          </ListItemSecondaryAction>
        </ListItem>
      )
    });

    return (
      <Grid item className={this.classes.editorSideList}>
        <List className={this.classes.list}>
          <ListItem button disableGutters={true} divider={true}>
            <ListItemText primary={'Instructions'} align={'center'} className={this.classes.instructions}/>
          </ListItem>
          {listItems}
        </List>
      </Grid>
    )
  }
}

EditorSideList.propTypes = {
  errors: PropTypes.array.isRequired,
  currentError: PropTypes.object,
  changeError: PropTypes.func.isRequired
};

export default withStyles(styles)(EditorSideList);
