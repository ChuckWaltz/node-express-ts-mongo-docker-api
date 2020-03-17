import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./LoginModal.scss";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { loginUser } from "../../../redux/actions/authActions";
import { clearErrors } from "../../../redux/actions/errorActions";

export class LoginModal extends Component {
  state = {
    open: false,
    email: "",
    password: "",
    errorMessage: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    loginUser: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ errorMessage: error.response.message });
      } else {
        this.setState({ errorMessage: null });
      }
    }

    if (this.state.open) {
      if (isAuthenticated) {
        this.handleClose();
      }
    }
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    // Attempt to Login
    this.props.loginUser({ email, password });
  };

  handleClose = () => {
    this.toggle();
    this.props.clearErrors();
  };

  render() {
    return (
      <React.Fragment>
        <Button color="secondary" variant="contained" onClick={this.toggle}>
          Login
        </Button>
        <Dialog
          open={this.state.open}
          maxWidth="sm"
          fullWidth
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            {this.state.errorMessage ? (
              <div className="errorMessage">{this.state.errorMessage}</div>
            ) : null}
            <TextField
              name="email"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              margin="dense"
              onChange={this.onChange}
            />
            <TextField
              name="password"
              id="password"
              label="Password"
              type="password"
              fullWidth
              margin="dense"
              onChange={this.onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={this.onSubmit}>
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = {
  loginUser,
  clearErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
