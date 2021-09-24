import React from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function Header({ login, userLogin }) {
  const history = useHistory();

  const logoutHandler = (e) => {
    Swal.fire({
      title: "Hello there..",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        userLogin(false);
        localStorage.clear();
        history.push("/");
      }
    });
  };
  return (
    // <nav className="navbar navbar-light bg-light">
    //   <div className="container-fluid">
    //     <h4 className="navbar-brand">
    //       <span className="fw-bolder">Github</span> Jobs
    //     </h4>
    //   </div>
    // </nav>
    <nav className="navbar navbar-expand-sm bg-dark p-2">
      <div className="navbar-collapse collapse justify-content-between">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link navbar-brand" to="/">
              <span className="fw-bolder">Github</span> Jobs
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <button
            onClick={(e) => logoutHandler(e)}
            className="btn btn-sm btn-outline-danger"
          >
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
}
