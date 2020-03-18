import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import RegisterModal from "../Auth/RegisterModal";
import LogoutButton from "../Auth/LogoutButton";
import LoginModal from "../Auth/LoginModal";

import "./TopBar.scss";

import { Box } from "@material-ui/core";

export class TopBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authButtons = (
      <React.Fragment>
        <span id="welcome-message">{user ? `Welcome ${user.name}` : null}</span>
        <LogoutButton />
      </React.Fragment>
    );
    const guestButtons = (
      <React.Fragment>
        <Box mr={1.5}>
          <RegisterModal />
        </Box>
        <LoginModal />
      </React.Fragment>
    );

    return (
      <div className="root">
        <AppBar position="static" className="appBar">
          <Toolbar>
            <Typography variant="h6" className="title">
              Redux
            </Typography>
            {isAuthenticated === true
              ? authButtons
              : isAuthenticated === false
              ? guestButtons
              : null}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
