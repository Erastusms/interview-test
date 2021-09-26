/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

export default function DetailJob() {
  const URL = "http://localhost:3000";
  const params = useParams();
  const id = params.id;
  const [jobs, setJobs] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `${URL}/details-job/${id}`,
      });
      console.log(result.data);
      setJobs(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-8">
          <div className="mt-2 fs-6 text-muted">
            {jobs.type}/{jobs.location}
          </div>
          <div className="fs-2 fw-bolder text-primary">{jobs.title}</div>
          <div className="mt-3">{parse(`${jobs.description}`)}</div>
        </div>
        <div className="col-4 mt-5">
          <div className="sticky-top pt-1">
            <div className="card mt-5 shadow" style={{ width: "18rem" }}>
              <div className="card-body">
                <small className="fw-bolder">{jobs.company}</small>
                <hr />
                <img src={jobs.company_logo} alt="company logo" />
                <a
                  href={jobs.company_url}
                  style={{ "text-decoration": "none" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  {jobs.company_url}
                </a>
              </div>
            </div>
            <div className="card mt-3 shadow" style={{ width: "18rem" }}>
              <div className="card-body">
                <small className="text-black">How to apply</small>
                <hr />
                <p className="card-text h6">{parse(`${jobs.how_to_apply}`)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
