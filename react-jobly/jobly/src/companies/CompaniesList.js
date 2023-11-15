import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyLink from "./CompanyLink";
import LoadingSpinner from "../LoadingSpinner";

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function CompaniesList() {
  console.debug("CompaniesList");

  const [companies, setCompanies] = useState(null);

  // fetch data and load without refreshing page
  useEffect(function getCompaniesOnMount() {
    console.debug("CompaniesList useEffect getCompaniesOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function search() {
    let companies = await JoblyApi.getCompanies();
    // console.log("companies sizes are: ", companies.length);
    // console.log(companies);
    setCompanies(companies);
  }
  if (!companies) return <LoadingSpinner />;
  //   console.log("companies sizes are: ", companies.length);
  return (
    // <div>
    //   {" "}
    //   {companies.map((c) => (
    //     <div>{c.name} </div>
    //   ))}
    // </div>
    // console.log(companies.length)
    //   <SearchForm searchFor={search} />
    <div>
      {companies.length ? (
        <div className="CompanyList-list">
          {companies.map((c) => (
            <CompanyLink
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default CompaniesList;
