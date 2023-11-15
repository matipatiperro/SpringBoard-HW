import React from "react";
import JobDetails from "./JobDetails";

/** Show list of job cards.
 *
 * Used by both JobList and CompanyDetail to list jobs. Receives an apply
 * func prop which will be called by JobCard on apply.
 *
 * JobList -> JobCardList -> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 *
 */

function JobLink({ jobs, apply }) {
  console.debug("JobLink", "jobs=", jobs);

  return (
    <div className="JobCardList">
      {jobs.map(
        (job) => (
          <JobDetails
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}
          />
        )
        //   job.title
      )}
    </div>
  );
}

export default JobLink;
