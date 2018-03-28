import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {LIGHT_GRAY} from '../utils/Colors';
import AppBarFactory from '../appbar/AppBarFactory';
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import ImageIcon from 'material-ui-icons/Image';
import LanguageIcon from 'material-ui-icons/Language';
import InvertColorsIcon from 'material-ui-icons/InvertColors';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox'
import ImageFixer from './ImageFixer';
import EditorSideList from './EditorSideList';
import LanguageFixer from './LanguageFixer';

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
  fullHeight: {
    height: '100%'
  },
  centerContainer: {
    textAlign: 'center'
  },
  drawerPaper: {
    position: 'relative',
    width: theme.spacing.unit * 29,
    background: '#f2f2f2',
    borderRight: 'solid 0px'
  },
  languageIcon: {
    color: '#356cf0'
  },
  imageIcon: {
    color: '#eb6523'
  },
  contrastIcon: {
    color: '#178f47'
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
    this.errorType = 'Language';
  }

  getDrawer() {
    return (
      <Drawer variant={'persistent'} open={true} classes={{paper: this.classes.drawerPaper}}>
        <div className={this.classes.toolbar}/>
        <div className={this.classes.toolbar}/>
        <List component={'nav'}>
          <ListItem button>
            <ListItemIcon className={this.classes.languageIcon}>
              <LanguageIcon/>
            </ListItemIcon>
            <ListItemText primary={'Language'}/>
          </ListItem>

          <ListItem button>
            <ListItemIcon className={this.classes.imageIcon}>
              <ImageIcon/>
            </ListItemIcon>
            <ListItemText primary={'Images'}/>
          </ListItem>

          <ListItem button>
            <ListItemIcon className={this.classes.contrastIcon}>
              <InvertColorsIcon/>
            </ListItemIcon>
            <ListItemText primary={'Contrast'}/>
          </ListItem>
        </List>
      </Drawer>
    );
  }

  getEditorSideList() {
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

  getEditorMainView() {
    switch (this.errorType) {
      case 'Images':
        return <ImageFixer/>;
      case 'Language':
        return <LanguageFixer/>;
      case 'Contrast':
        break;
      default:
        break;
    }
  }

  getEditor() {
    return (
      <Grid container direction={'column'}>
        <Grid item className={this.classes.toolbar}/>
        <Grid item className={this.classes.toolbar}/>
        <Grid item className={this.classes.editorContainer}>
          <Paper className={this.classes.fullHeight}>
            <Grid container className={this.classes.fullHeight}>
              <EditorSideList/>
              {this.getEditorMainView()}
            </Grid>
          </Paper>
        </Grid>
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