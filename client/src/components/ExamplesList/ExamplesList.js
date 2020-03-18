import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getExamples,
  deleteExample,
  addExample
} from "../../redux/actions/exampleActions";

import Button from "@material-ui/core/Button";

import "./ExamplesList.scss";

const itemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "200px",
  marginBottom: "10px"
};

const buttonStyle = {
  background: "#EF0E0E",
  color: "white",
  padding: "5px 10px",
  minWidth: "unset",
  cursor: "pointer"
};

class ExamplesList extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    examples: PropTypes.array.isRequired,
    examplesLoading: PropTypes.bool.isRequired,
    getExamples: PropTypes.func.isRequired,
    addExample: PropTypes.func.isRequired,
    deleteExample: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getExamples();
  }

  onDelete = id => {
    console.log(id);
    this.props.deleteExample(id);
  };

  render() {
    const { examples, examplesLoading, isAuthenticated } = this.props;
    return isAuthenticated ? (
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
              style={buttonStyle}
              onClick={() => this.onDelete(e._id)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    ) : (
      <div className="container">
        <h2>Please Log In To View List</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  examples: state.example.examples,
  examplesLoading: state.example.examplesLoading,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  getExamples,
  deleteExample,
  addExample
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamplesList);
