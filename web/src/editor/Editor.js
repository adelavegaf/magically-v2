import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Input, {InputAdornment} from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import {LIGHT_GRAY} from '../utils/Colors';
import AppBarFactory from '../appbar/AppBarFactory';
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import ImageIcon from 'material-ui-icons/Image';
import LanguageIcon from 'material-ui-icons/Language';
import InvertColorsIcon from 'material-ui-icons/InvertColors';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    height: '100%',
    backgroundColor: LIGHT_GRAY,
    overflow: 'hidden',
    position: 'relative',
    flexGrow: 1,
    zIndex: 1,
    display: 'flex'
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: 'relative',
    width: theme.spacing.unit * 29,
    background: '#f2f2f2',
    borderRight: 'solid 0px'
  },
  editorContainer: {
    margin: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 6}px`,
    flex: 1
  },
  toolbar: theme.mixins.toolbar
});

class Editor extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getDrawer() {
    return (
      <Drawer variant={'persistent'} open={true} classes={{paper: this.classes.drawerPaper}}>
        <div className={this.classes.toolbar}/>
        <div className={this.classes.toolbar}/>
        <List component={'nav'}>
          <ListItem button>
            <ListItemIcon>
              <LanguageIcon/>
            </ListItemIcon>
            <ListItemText primary="Language"/>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ImageIcon/>
            </ListItemIcon>
            <ListItemText primary="Images"/>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <InvertColorsIcon/>
            </ListItemIcon>
            <ListItemText primary="Contrast"/>
          </ListItem>
        </List>
      </Drawer>
    );
  }

  getEditor() {
    return (
      <Grid container direction={'column'}>
        <div className={this.classes.toolbar}/>
        <div className={this.classes.toolbar}/>
        <Paper className={this.classes.editorContainer}>

        </Paper>
      </Grid>
    );
  }

  render() {
    return (
      <div className={this.classes.root}>
        <AppBarFactory type={'editor'}/>
        {this.getDrawer()}
        {this.getEditor()}
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
