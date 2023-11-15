import React from "react";
import { Switch, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompaniesList from "../companies/CompaniesList";
import CompanyDetails from "../companies/CompanyDetails";
import JobsList from "../jobs/JobsList";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
import PrivateRoute from "./PrivateRoute";
import Profile from "../profile/Profile";

/** Site-wide routes.
 *
 * homepage, auth (login, signup), companies, users, jobs
 *
 * Visiting a non-existant route redirects to the homepage.
 */
function TheRoutes({ login, signup }) {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Homepage login={login} />} />
        </Route>

        {/* <Route path="/companies" element={<CompaniesList />} /> */}
        <Route exact path="/companies" element={<PrivateRoute />}>
          <Route exact path="/companies" element={<CompaniesList />} />
        </Route>

        {/* <Route path="/companies/:handle" element={<CompanyDetails />}></Route> */}
        <Route exact path="/companies/:handle" element={<PrivateRoute />}>
          <Route exact path="/companies/:handle" element={<CompanyDetails />} />
        </Route>

        {/* <Route path="/jobs" element={<JobsList />}></Route> */}
        <Route exact path="/jobs" element={<PrivateRoute />}>
          <Route exact path="/jobs" element={<JobsList />} />
        </Route>

        <Route exact path="/profile" element={<PrivateRoute />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>

        <Route path="/signup" element={<SignUp signup={signup} />}></Route>

        <Route path="/login" element={<Login login={login} />}></Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default TheRoutes;
