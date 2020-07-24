import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "./dashboard";
import Buffer from "../buffer";

class ProtectedRoute extends Component {
  state = {
    auth: false,
    loading: true,
    // TESTING UNCOMMENT FOR PRODUCTION
    // auth: true,
    // loading: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      this.setState({
        auth: true,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading, auth } = this.state;
    console.log(loading,auth)
    if (!loading && !auth) {
      return <Redirect to="/" />;
    } else if (!loading && auth) {
      return <Dashboard />;
    } else {
      return <Buffer />;
    }
  }
}

export default ProtectedRoute;
