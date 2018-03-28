import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
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
  instructions: {
    paddingRight: '0px'
  }
});

class EditorSideList extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
    this.errors = [
      {name: 'jaf.jpg', fixed: true},
      {name: 'cat.jpg', fixed: true},
      {name: 'car1230.jpg', fixed: false},
    ];
  }

  render() {
    const listItems = this.errors.map((e, i) => {
      return (
        <ListItem button key={i}>
          <ListItemText primary={e.name}/>
          <ListItemSecondaryAction>
            <Checkbox
              checked={e.fixed}
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

export default withStyles(styles)(EditorSideList);