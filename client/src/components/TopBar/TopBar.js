import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import RegisterModal from "../Auth/RegisterModal/RegisterModal";
import LogoutButton from "../Auth/LogoutButton/LogoutButton";
import LoginModal from "../Auth/LoginModal/LoginModal";

import "./TopBar.scss";

export class TopBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div className="root">
        <AppBar position="static" className="appBar">
          <Toolbar>
            <Typography variant="h6" className="title">
              Redux
            </Typography>
            <RegisterModal />
            <LoginModal />
            <LogoutButton />
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
