import React from "react";
import { Link } from "react-router-dom";

import "./CompanyLink.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function CompanyLink({ name, description, logoUrl, handle }) {
  console.debug("CompanyLink", logoUrl);

  return (
    <Link className="CompanyList card" to={`/companies/${handle}`}>
      <div className="card-body">
        <h6 className="card-title">
          {name}
          {logoUrl && (
            <img src={logoUrl} alt={name} className="float-right ml-5" />
          )}
        </h6>
        <p>
          <small>{description}</small>
        </p>
      </div>
    </Link>
  );
}

export default CompanyLink;
