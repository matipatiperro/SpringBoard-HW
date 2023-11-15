import React, { useState, Navigate } from "react";
import { Link, useNavigate } from "react-router-dom";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm
 * Routed as /
 */

// function Login({ login }) {
function Login({ login, dataFromParent }) {
  //dataFromParent is whether the login form is currently in view
  //   let dataFromParent;
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  // datafromparent is the state for canceling out of the log in form
  console.log("var is: ", dataFromParent);
  async function handleCancel(evt) {
    evt.preventDefault();
    if (dataFromParent === undefined) {
      console.log("setVisible is undefined");
      return history("/");
    }
    dataFromParent(false);
  }

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("typeof login is: ", typeof login);
    let result = await login(formData);
    console.log("token request succeeded?: ", result);
    if (result.success) {
      console.log("successfull login");

      // set the form back to invisible
      //   dataFromParent(false);
      console.log("dataFromParent is: ", dataFromParent);
      history("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              {/* {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null} */}

              <button
                className="btn btn-secondary float-left"
                onClick={handleCancel}
              >
                Cancel
              </button>

              {/* <Link to="/login" className="btn btn-secondary float-left">
                Cancel
              </Link> */}

              <button
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
