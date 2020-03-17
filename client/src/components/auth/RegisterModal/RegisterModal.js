import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./RegisterModal.scss";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { registerUser } from "../../../redux/actions/authActions";
import { clearErrors } from "../../../redux/actions/errorActions";

export class RegisterModal extends Component {
  state = {
    open: false,
    name: "",
    email: "",
    password: "",
    errorMessage: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    registerUser: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
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

    const { name, email, password } = this.state;

    // Create User object
    const newUser = { name, email, password };

    // Attempt to Register
    this.props.registerUser(newUser);
  };

  handleClose = () => {
    this.toggle();
    this.props.clearErrors();
  };

  render() {
    return (
      <React.Fragment>
        <Button color="secondary" variant="contained" onClick={this.toggle}>
          Register
        </Button>
        <Dialog
          open={this.state.open}
          maxWidth="sm"
          fullWidth
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            {this.state.errorMessage ? (
              <div className="errorMessage">{this.state.errorMessage}</div>
            ) : null}
            <TextField
              name="name"
              id="name"
              label="Name"
              type="text"
              fullWidth
              autoFocus
              margin="dense"
              onChange={this.onChange}
            />
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
              Submit
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
  registerUser,
  clearErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
