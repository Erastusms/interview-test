import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {
  const history = useHistory();
  const URL = "http://localhost:3000";
  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    registerHandler();
  };

  const registerHandler = async () => {
    try {
      const result = await axios({
        method: "POST",
        url: `${URL}/register`,
        data: form,
      });
      console.log(result.data);
      history.push("/");
      Swal.fire("Congratulations", "Account has been created", "success");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
      console.log(err.response);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center py-5">
        <div className="col-md-6">
          <div className="shadow border border-2 p-3 rounded">
            <form class="row g-3 was-validated">
              <div className="mb-2 text-center">
                <h3>Daftar Sekarang</h3>
                <small>
                  Sudah punya akun? <Link to="/">Login</Link>
                </small>
              </div>
              <div className="mb-3">
                <small>Username</small>
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <small className="valid-feedback">Username is Good!</small>
              </div>
              <div className="mb-3">
                <small>Password</small>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <small className="valid-feedback">Nice password!</small>
              </div>
              <div className="mb-3 text-center">
                <button
                  className="btn btn-success"
                  onClick={(e) => submitHandler(e)}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
