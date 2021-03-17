import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunkMiddleWare from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";
import Feature from "./components/Feature";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/Signup";

const store = createStore(reducers, {}, applyMiddleware(reduxThunkMiddleWare));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/feature" component={Feature} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
