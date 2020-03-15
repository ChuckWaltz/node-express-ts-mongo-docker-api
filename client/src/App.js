import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./redux/store";

import ExamplesList from "./redux/components/ExamplesList";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header>Redux</header>
          <ExamplesList />
        </div>
      </Provider>
    );
  }
}

export default App;
