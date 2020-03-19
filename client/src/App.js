import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/authActions";

import { AUTH_ERROR } from "./redux/actions/actionTypes";

import TopBar from "./components/TopBar/TopBar";
import ExamplesList from "./components/ExamplesList/ExamplesList";

import "typeface-roboto";
import "./App.scss";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";

const theme = createMuiTheme({
  palette: {
    primary: indigo
  }
});

class App extends Component {
  componentDidMount() {
    if (store.getState().auth.token) store.dispatch(loadUser());
    else {
      store.dispatch({ type: AUTH_ERROR });
    }
  }
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <TopBar />
            <ExamplesList />
          </div>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
