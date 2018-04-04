import React, {Component} from 'react';
import PropStyles from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Menu, {MenuItem} from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import AccountIcon from 'material-ui-icons/AccountCircle';
import InboxIcon from 'material-ui-icons/Inbox';
import ExitIcon from 'material-ui-icons/ExitToApp';


const styles = theme => ({
  userProfileButton: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'rgb(74,48,42)',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '48px'
  },
  buttonMargin: {
    marginRight: theme.spacing.unit * 4
  }
});

class AuthButton extends Component {
  constructor(props) {
    super(props);
    const {classes} = props;
    this.classes = classes;
  }

  getLoginButton() {
    return (
      <Grid item>
        <Button variant={'raised'} color="primary" onClick={() => this.props.changeView()}>Log in</Button>
      </Grid>
    );
  }

  getProfileButton() {
    return (
      <div>
        <div className={this.classes.userProfileButton}
             role="button"
             aria-owns={this.props.anchorElement ? 'simple-menu' : null}
             aria-haspopup="true"
             onClick={(event) => this.props.didPressProfileButton(event)}>
          {this.props.displayName.substring(0, 1).toUpperCase()}
        </div>
        <Menu
          id="simple-menu"
          anchorEl={this.props.anchorElement}
          open={Boolean(this.props.anchorElement)}
          onClose={() => this.props.closeMenu()}
        >
          <MenuItem onClick={() => this.props.closeMenu()}>
            <ListItemIcon><AccountIcon/></ListItemIcon>
            <ListItemText primary={'Profile'}/>
          </MenuItem>
          <MenuItem onClick={() => this.props.closeMenu()}>
            <ListItemIcon><InboxIcon/></ListItemIcon>
            <ListItemText primary={'My projects'}/>
          </MenuItem>
          <MenuItem onClick={() => this.props.didPressLogoutButton()}>
            <ListItemIcon><ExitIcon/></ListItemIcon>
            <ListItemText primary={'Logout'}/>
          </MenuItem>
        </Menu>
      </div>
    )
  }

  render() {
    return (
      <div className={this.classes.buttonMargin}>
        {this.props.loggedIn ? this.getProfileButton() : this.getLoginButton()}
      </div>
    );
  }
}

AuthButton.propStyles = {
  didPressProfileButton: PropStyles.func.isRequired,
  didPressLogoutButton: PropStyles.func.isRequired,
  closeMenu: () => this.closeMenu(),
  anchorElement: PropStyles.object.isRequired,
  loggedIn: PropStyles.bool.isRequired,
  displayName: PropStyles.string.isRequired,
  changeView: PropStyles.func.isRequired
};

export default withStyles(styles)(AuthButton);
