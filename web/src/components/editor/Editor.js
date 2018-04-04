import React, {Component} from 'react';
import PropStyles from 'prop-types';
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
import {CONTRAST_FIXER, IMAGES_FIXER, LANGUAGE_FIXER} from '../../containers/EditorContainer';

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
  listItemText: {
    textTransform: 'capitalize'
  },
  selectedListItem: {
    background: 'rgba(0, 0, 0, .15)'
  },
  toolbar: theme.mixins.toolbar
});

class Editor extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getNavListItemClass(fixerName) {
    return fixerName === this.props.currentFixer ? this.classes.selectedListItem : ''
  }

  getDrawer() {
    return (
      <Drawer variant={'persistent'} open={true} classes={{paper: this.classes.drawerPaper}}>
        <div className={this.classes.toolbar}/>
        <div className={this.classes.toolbar}/>
        <List component={'nav'}>
          <ListItem button className={this.getNavListItemClass(LANGUAGE_FIXER)} onClick={() => this.props.didPressLanguageFixerButton()}>
            <ListItemIcon className={this.classes.languageIcon}>
              <LanguageIcon/>
            </ListItemIcon>
            <ListItemText className={this.classes.listItemText} primary={LANGUAGE_FIXER}/>
          </ListItem>

          <ListItem button className={this.getNavListItemClass(IMAGES_FIXER)} onClick={() => this.props.didPressImagesFixerButton()}>
            <ListItemIcon className={this.classes.imageIcon}>
              <ImageIcon/>
            </ListItemIcon>
            <ListItemText className={this.classes.listItemText} primary={IMAGES_FIXER}/>
          </ListItem>

          <ListItem button className={this.getNavListItemClass(CONTRAST_FIXER)} onClick={() => this.props.didPressContrastFixerButton()}>
            <ListItemIcon className={this.classes.contrastIcon}>
              <InvertColorsIcon/>
            </ListItemIcon>
            <ListItemText className={this.classes.listItemText} primary={CONTRAST_FIXER}/>
          </ListItem>
        </List>
      </Drawer>
    );
  }

  getEditorMainView() {
    switch (this.props.currentFixer) {
      case IMAGES_FIXER:
        return <ImageFixer/>;
      case LANGUAGE_FIXER:
        return <LanguageFixer/>;
      case CONTRAST_FIXER:
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
        <AppBarFactory type={'editor'} changeView={this.props.changeView}/>
        {this.getDrawer()}
        {this.getEditor()}
      </div>
    );
  }
}

Editor.propStyles = {
  project: PropStyles.object.isRequired,
  currentFixer: PropStyles.string.isRequired,
  didPressLanguageFixerButton: PropStyles.func.isRequired,
  didPressImagesFixerButton: PropStyles.func.isRequired,
  didPressContrastFixerButton: PropStyles.func.isRequired,
  changeView: PropStyles.func.isRequired
};

export default withStyles(styles)(Editor);
