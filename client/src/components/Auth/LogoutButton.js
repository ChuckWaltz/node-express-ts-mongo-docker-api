import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import { logoutUser } from "../../redux/actions/authActions";

export class LogoutButton extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired
  };

  render() {
    return (
      <Button
        className="logoutButton"
        color="secondary"
        variant="contained"
        onClick={this.props.logoutUser}
      >
        Logout
      </Button>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
