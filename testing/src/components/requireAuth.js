import React, { Component } from "react";
import { connect } from "react-redux";

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    //component just rendered
    componentDidMount() {
      this.authenticationStatus();
    }
    //componendt just updated
    componentDidUpdate() {
      this.authenticationStatus();
    }

    // helper method to check authentication
    authenticationStatus() {
      if (!this.props.auth) {
        console.log("leave");
        this.props.history.push("/");
      }
    }
    render() {
      return <ChildComponent />;
    }
  }
  function mapStateToProps(state) {
    return { auth: state.auth };
  }
  return connect(mapStateToProps)(ComposedComponent);
};
