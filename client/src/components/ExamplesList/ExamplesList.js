import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getExamples,
  deleteExample,
  addExample
} from "../../redux/actions/exampleActions";
import { clearErrors } from "../../redux/actions/errorActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./ExamplesList.scss";

const itemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "10px",
  border: "1px solid lightgrey",
  padding: "5px",
  paddingLeft: "10px",
  borderRadius: "5px"
};

const addButtonStyle = {
  background: "#18a126",
  color: "white",
  padding: "5px 10px",
  width: "100%",
  cursor: "pointer",
  marginTop: "5px"
};

const deleteButtonStyle = {
  background: "#EF0E0E",
  color: "white",
  padding: "5px 10px",
  minWidth: "unset",
  cursor: "pointer"
};

class ExamplesList extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    examples: PropTypes.array.isRequired,
    examplesLoading: PropTypes.bool.isRequired,
    getExamples: PropTypes.func.isRequired,
    addExample: PropTypes.func.isRequired,
    deleteExample: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  state = {
    addModalOpen: false,
    errorMessage: null,
    name: "",
    age: null,
    gender: "",
    formValid: false
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for add error
      if (error.id === "ADD_EXAMPLE_FAIL") {
        this.setState({ errorMessage: error.response.message });
      } else {
        this.setState({ errorMessage: null });
      }
    }
    if (isAuthenticated && !prevProps.isAuthenticated) this.props.getExamples();
  }

  toggleAddModal = () => {
    this.setState({ addModalOpen: !this.state.addModalOpen });
  };

  onDelete = id => {
    this.props.deleteExample(id);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.validateForm);
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, age, gender } = this.state;

    this.props.addExample({ name, age, gender });

    this.toggleAddModal();
  };

  handleClose = () => {
    this.toggleAddModal();
    this.props.clearErrors();
  };

  validateForm = () => {
    let valid = true;
    if (
      this.state.name.length < 2 ||
      this.state.age <= 0 ||
      this.state.gender.length < 1
    )
      valid = false;

    this.setState({ formValid: valid });
  };

  render() {
    const { examples, examplesLoading, isAuthenticated } = this.props;
    return isAuthenticated === true ? (
      <div className="container">
        <h2>Examples</h2>
        {examplesLoading ? <div>Loading...</div> : null}
        {examples.map(e => (
          <div key={e._id} style={itemStyle}>
            <div>
              {e.name} - {e.age} - {e.gender}
            </div>
            <Button
              variant="contained"
              style={deleteButtonStyle}
              onClick={() => this.onDelete(e._id)}
            >
              X
            </Button>
          </div>
        ))}
        {examplesLoading ? null : (
          <Button
            variant="contained"
            style={addButtonStyle}
            onClick={this.toggleAddModal}
          >
            Add
          </Button>
        )}

        <Dialog
          open={this.state.addModalOpen}
          maxWidth="sm"
          fullWidth
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Example</DialogTitle>
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
              name="age"
              id="age"
              label="Age"
              type="number"
              fullWidth
              margin="dense"
              onChange={this.onChange}
            />
            <TextField
              name="gender"
              id="gender"
              label="Gender"
              type="text"
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
            <Button
              color="primary"
              variant="contained"
              disabled={!this.state.formValid}
              onClick={this.onSubmit}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : isAuthenticated === false ? (
      <div className="container">
        <h2>Please Log In To View List</h2>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  examples: state.example.examples,
  examplesLoading: state.example.examplesLoading,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = {
  getExamples,
  deleteExample,
  addExample,
  clearErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamplesList);
