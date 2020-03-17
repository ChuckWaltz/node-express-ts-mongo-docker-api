import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getExamples } from "../../redux/actions/exampleActions";

import "./ExamplesList.scss";

class ExamplesList extends Component {
  static propTypes = {
    examples: PropTypes.array.isRequired,
    examplesLoading: PropTypes.bool.isRequired,
    getExamples: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getExamples();
  }

  render() {
    const { examples, examplesLoading } = this.props;
    return (
      <div className="container">
        <h2>Examples</h2>
        {examplesLoading ? <div>Loading...</div> : null}
        {examples.map(e => (
          <p key={e._id}>
            {e.name} - {e.age} - {e.gender}
          </p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  examples: state.example.examples,
  examplesLoading: state.example.examplesLoading
});

const mapDispatchToProps = {
  getExamples
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamplesList);
