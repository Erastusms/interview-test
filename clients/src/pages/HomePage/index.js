/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ListItems, Loading } from "components";

export default function HomePage() {
  const URL = "http://localhost:3000";
  const [currentPage] = useState(1);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(`${URL}/list-jobs/page=${currentPage}`);
      setJobs(result.data);
    };
    getData();
  }, []);

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div class="col">
          <small className="text-black fw-bold">Jobs Description</small>
          <input
            name="description"
            type="text"
            class="form-control"
            placeholder="Description"
          />
        </div>
        <div class="col">
          <small className="text-black fw-bold">Location</small>
          <input
            name="location"
            type="text"
            class="form-control"
            placeholder="Location"
          />
        </div>
        <div className="col-3 mt-4">
          <div className="row">
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Full Time only
                </label>
              </div>
            </div>
            <div className="col">
              <button type="button" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="border p-2 rounded">
          <h1 className="border-bottom">
            <span className="text-primary">Job List</span>
          </h1>
          <div className="row row-md-4">
            {jobs.length === 0 ? (
              <Loading />
            ) : (
              jobs.map((items) => {
                return (
                  <Link
                    to={`jobs/${items.id}`}
                    style={{ "text-decoration": "none" }}
                  >
                    <ListItems key={items.id} items={items} />
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
