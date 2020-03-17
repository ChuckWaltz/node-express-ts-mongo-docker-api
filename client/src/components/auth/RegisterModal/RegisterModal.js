import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./RegisterModal.scss";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    error: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  onClose = () => {
    this.setState({
      open: false,
      name: "",
      email: "",
      password: "",
      errorMessage: null
    });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="secondary"
          variant="contained"
          onClick={this.toggle}
        >
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
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Name"
              type="name"
              fullWidth
              onChange={this.onChange}
            />
            <TextField
              margin="normal"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              onChange={this.onChange}
            />
            <TextField
              margin="normal"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={this.onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={this.onClose}>
              Cancel
            </Button>
            <Button color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = {
  /* registerUser */
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
