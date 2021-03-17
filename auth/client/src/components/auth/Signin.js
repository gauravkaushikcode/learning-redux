import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(formProps) {
    this.props.signin(formProps, () => {
      this.props.history.push("/feature");
    });
  }
  validate(formProps) {
    let errors = {};
    if (!formProps.email) {
      errors.email = "Enter an email";
    } else if (formProps.email.length < 5) {
      errors.email = "Enter correct email";
    }
    if (!formProps.password) {
      errors.password = "Enter a password";
    }
    return errors;
  }
  render() {
    let { email, password } = this.state;

    return (
      <Formik
        initialValues={{ email, password }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={this.onSubmit}
        validate={this.validate}
        enableReinitialize={true}
      >
        {(props) => (
          <Form>
            <ErrorMessage
              name="email"
              component="div"
              className="alert alert-warning"
            ></ErrorMessage>
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-warning"
            ></ErrorMessage>
            <fieldset>
              <label>Email</label>
              <Field
                name="email"
                type="text"
                component="input"
                autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Password</label>
              <Field
                name="password"
                type="password"
                component="input"
                autoComplete="none"
              />
            </fieldset>
            <div>{this.props.errorMessage}</div>
            <button type="submit">Sign In!</button>
          </Form>
        )}
      </Formik>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(connect(mapStateToProps, actions))(Signin);
