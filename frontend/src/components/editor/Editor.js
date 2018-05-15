import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {LIGHT_GRAY} from '../utils/Colors';
import AppBarFactory from '../appbar/AppBarFactory';
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import ImageIcon from 'material-ui-icons/Image';
import LanguageIcon from 'material-ui-icons/Language';
import InvertColorsIcon from 'material-ui-icons/InvertColors';
import Paper from 'material-ui/Paper';
import {CONTRAST_FIXER, IMAGES_FIXER, LANGUAGE_FIXER} from '../../containers/editor/EditorContainer';
import ImageFixerContainer from '../../containers/editor/ImageFixerContainer';
import LanguageFixerContainer from '../../containers/editor/LanguageFixerContainer';
import ContrastFixerContainer from '../../containers/editor/ContrastFixerContainer';
import {CircularProgress} from 'material-ui/Progress';

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
  selectedListItemText: {
    textTransform: 'capitalize',
    fontWeight: 500
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
    this.state = {
      sideListMaxHeight: 0
    };
  }

  componentDidMount() {
    // TODO(adelavega): HACK, find a way to do this better. Get height to cap side list size.
    const height = this.editorElement.clientHeight - 8;
    this.setState({sideListMaxHeight: height});
  }


  getNavListItemClass(fixerName) {
    return fixerName === this.props.currentFixer ? this.classes.selectedListItem : ''
  }

  getNavListItemTextClass(fixerName) {
    return fixerName === this.props.currentFixer ? this.classes.selectedListItemText : this.classes.listItemText
  }

  getUnfixedErrorCount(fixerName) {
    if (this.props.loading) {
      return <div/>;
    }

    switch (fixerName) {
      case LANGUAGE_FIXER:
        return this.props.project.errors.langErrorsCount - this.props.project.errors.langErrorsFixCount;
      case CONTRAST_FIXER:
        return this.props.project.errors.contrastErrorsCount - this.props.project.errors.contrastErrorsFixCount;
      case IMAGES_FIXER:
        return this.props.project.errors.imageErrorsCount - this.props.project.errors.imageErrorsFixCount;
      default:
        return '';
    }
  }

  getFixerNameWithErrorCount(fixerName) {
    const unfixedErrorCount = this.getUnfixedErrorCount(fixerName);
    return unfixedErrorCount > 0 ? `${fixerName} (${unfixedErrorCount})` : fixerName;
  }

  getDrawer() {
    return (
      <Drawer variant={'persistent'} open={true} classes={{paper: this.classes.drawerPaper}}>
        <div className={this.classes.toolbar}/>
        <div className={this.classes.toolbar}/>
        <List component={'nav'}>
          <ListItem button className={this.getNavListItemClass(LANGUAGE_FIXER)}
                    onClick={() => this.props.didPressLanguageFixerButton()}>
            <ListItemIcon className={this.classes.languageIcon}>
              <LanguageIcon/>
            </ListItemIcon>
            <ListItemText className={this.getNavListItemTextClass(LANGUAGE_FIXER)}
                          primary={this.getFixerNameWithErrorCount(LANGUAGE_FIXER)}
                          disableTypography={true}/>
          </ListItem>

          <ListItem button className={this.getNavListItemClass(IMAGES_FIXER)}
                    onClick={() => this.props.didPressImagesFixerButton()}>
            <ListItemIcon className={this.classes.imageIcon}>
              <ImageIcon/>
            </ListItemIcon>
            <ListItemText className={this.getNavListItemTextClass(IMAGES_FIXER)}
                          primary={this.getFixerNameWithErrorCount(IMAGES_FIXER)}
                          disableTypography={true}/>
          </ListItem>

          <ListItem button className={this.getNavListItemClass(CONTRAST_FIXER)}
                    onClick={() => this.props.didPressContrastFixerButton()}>
            <ListItemIcon className={this.classes.contrastIcon}>
              <InvertColorsIcon/>
            </ListItemIcon>
            <ListItemText className={this.getNavListItemTextClass(CONTRAST_FIXER)}
                          primary={this.getFixerNameWithErrorCount(CONTRAST_FIXER)}
                          disableTypography={true}/>
          </ListItem>
        </List>
      </Drawer>
    );
  }

  getEditorMainView() {
    if (this.props.loading) {
      return (
        <Grid container justify={'center'} alignItems={'center'} className={this.classes.fullHeight}>
          <CircularProgress size={50}/>
        </Grid>
      );
    }
    switch (this.props.currentFixer) {
      case IMAGES_FIXER:
        return <ImageFixerContainer isOwner={this.props.isOwner}
                                    sideListMaxHeight={this.state.sideListMaxHeight}
                                    didEditImageDescription={this.props.didEditImageDescription}
                                    imageErrors={this.props.project.errors.imageErrors}
                                    imageErrorsCount={this.props.project.errors.imageErrorsCount}/>;
      case LANGUAGE_FIXER:
        return <LanguageFixerContainer isOwner={this.props.isOwner}
                                       sideListMaxHeight={this.state.sideListMaxHeight}
                                       didChangeLang={this.props.didChangeLang}
                                       langErrors={this.props.project.errors.langErrors}
                                       langErrorsCount={this.props.project.errors.langErrorsCount}/>;
      case CONTRAST_FIXER:
        return <ContrastFixerContainer isOwner={this.props.isOwner}
                                       didChangeForegroundColor={this.props.didChangeForegroundColor}
                                       didChangeBackgroundColor={this.props.didChangeBackgroundColor}
                                       sideListMaxHeight={this.state.sideListMaxHeight}
                                       contrastErrors={this.props.project.errors.contrastErrors}
                                       contrastErrorsCount={this.props.project.errors.contrastErrorsCount}
                                       applyColorContrastFixToAllErrors={this.props.applyColorContrastFixToAllErrors}/>;
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
            <div className={this.classes.fullHeight} ref={(element) => {
              this.editorElement = element
            }}>
              {this.getEditorMainView()}
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  getView() {
    return (
      <div className={this.classes.root}>
        <AppBarFactory
          isOwner={this.props.isOwner}
          projectTitle={this.props.loading ? 'Loading...' : this.props.project.title}
          type={'editor'}
          didEditTitle={this.props.didEditProjectTitle}
          didFinishEditingProjectTitle={this.props.didFinishEditingProjectTitle}/>
        {this.getDrawer()}
        {this.getEditor()}
      </div>
    );
  }

  getNoProjectFoundView() {
    return <div>No project found</div>
  }

  render() {
    const view = this.props.exists ? this.getView() : this.getNoProjectFoundView();
    return view;
  }
}

Editor.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  exists: PropTypes.bool.isRequired,
  currentFixer: PropTypes.string.isRequired,
  didPressLanguageFixerButton: PropTypes.func.isRequired,
  didPressImagesFixerButton: PropTypes.func.isRequired,
  didPressContrastFixerButton: PropTypes.func.isRequired,
  didEditProjectTitle: PropTypes.func.isRequired,
  didFinishEditingProjectTitle: PropTypes.func.isRequired,
  didEditImageDescription: PropTypes.func.isRequired,
  didChangeLang: PropTypes.func.isRequired,
  didChangeForegroundColor: PropTypes.func.isRequired,
  didChangeBackgroundColor: PropTypes.func.isRequired,
  applyColorContrastFixToAllErrors: PropTypes.func.isRequired
};

export default withStyles(styles)(Editor);
