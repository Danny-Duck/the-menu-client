import React from "react";
import { Link } from "react-router-dom";
// import { BookmarksContext } from "../context/bookmarks-context";

class SignUp extends React.Component {
  //   static contextType = BookmarksContext;
  state = { email: "", password: "", full_name: "" };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password, full_name } = this.state;
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { email, password, full_name } }),
      });
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ auth: { email, password } }),
        });
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        this.props.history.push("/restaurant/new");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    const { email, password, full_name } = this.state;
    return (
      <div className="login-home">
        <header>
        {this.context.currentUser || localStorage.getItem("auth") ? (
          <>
            <Link className="button2" to="/dashboard">Dashboard</Link>
            <button className="button2" id="logout" onClick={() => this.handleLogout()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="button2" to="/login">Login</Link>
            <Link className="button2" to="/sign-up">Sign Up</Link>
          </>
        )}
        </header>
        <div className="login-box">
          <h2>Sign Up</h2>
          <form onSubmit={this.onFormSubmit}>
            <div className="user-box">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={this.onInputChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="full_name"
                id="full_name"
                value={full_name}
                onChange={this.onInputChange}
              />
              <label htmlFor="full_name">Full Name</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this.onInputChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default SignUp;
