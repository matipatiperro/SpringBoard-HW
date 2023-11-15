import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Login from "../auth/Login";
// import "./Homepage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage({ login }) {
  const { currentUser } = useContext(UserContext);
  //   console.debug("Homepage", "currentUser=", currentUser);
  //   console.log("homepage");
  const [loginVisible, setloginVisible] = useState(false);

  React.useEffect(() => handleClick, []);

  async function handleClick(evt) {
    // evt.preventDefault();
    if (currentUser) {
      console.log("clicked login");
      setloginVisible(false);
    } else {
      setloginVisible(true);
    }
    console.log("****", loginVisible);
  }

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place.</p>

        {currentUser ? (
          <h2>
            Welcome Back, {currentUser.firstName || currentUser.username}!
          </h2>
        ) : loginVisible ? (
          <div>
            <Login login={login} dataFromParent={setloginVisible} />
          </div>
        ) : (
          <p>
            {/* <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
            Log in
          </Link> */}
            <button
              className="btn btn-primary font-weight-bold mr-3"
              onClick={handleClick}
            >
              Log in
            </button>
            <Link className="btn btn-primary font-weight-bold" to="/signup">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
