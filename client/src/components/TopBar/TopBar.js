import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import RegisterModal from "../auth/RegisterModal/RegisterModal";

import "./TopBar.scss";

export class TopBar extends Component {
  static propTypes = {
    prop: PropTypes.any
  };

  render() {
    return (
      <div className="root">
        <AppBar position="static" className="appBar">
          <Toolbar>
            <Typography variant="h6" className="title">
              Redux
            </Typography>
            <RegisterModal />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
