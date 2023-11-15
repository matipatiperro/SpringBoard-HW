import React, { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);
  console.log("private route call, current user is: ", currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    // <Routes>
    // <Route exact={exact} path={path}>
    //   {children}
    // </Route>
    // </Routes>
    <Outlet />
  );
}

export default PrivateRoute;
