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
import Signin from "./components/auth/Signin";
import Signout from "./components/auth/Signout";

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem("token") },
  },
  applyMiddleware(reduxThunkMiddleWare)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/feature" component={Feature} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
