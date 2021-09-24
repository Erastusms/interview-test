import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
export default function Login({ login, userLogin, getToken }) {
  const URL = "http://localhost:3000";
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    loginAxios();
  };

  const loginAxios = async (req, res) => {
    try {
      const result = await axios({
        method: "POST",
        url: `${URL}/login`,
        data: form,
      });
      const access_token = result.data["access_token"];
      userLogin(true);
      getToken(access_token);
    } catch (err) {
      if (err.response.status === 404) {
        Swal.fire("ERROR", "Username not found", "error");
      } else {
        Swal.fire("ERROR", "Password is invalid", "error");
      }
    }
  };

  return (
    <div className="container-fluid">
      <div class="row justify-content-center mt-5 pt-5">
        <div class="col-5">
          <div className="mt-5">
            <h1>Github Jobs</h1>
            <p className="lh-base">
              Github Jobs membantu Anda mencari pekerjaan yang tepat dengan upah
              yang menggoda dan pastinya sesuai dengan kapabilitas Anda
            </p>
          </div>
        </div>
        <div class="col-4">
          <div className="shadow border border-2 p-3 rounded">
            <div className="mb-2 text-center">
              <h3>Login Sekarang</h3>
              <small>
                Belum punya akun? <Link to="/register">Register</Link>
              </small>
            </div>
            <div className="mb-3">
              <input
                name="username"
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3 text-center">
              <button
                onClick={(e) => submitHandler(e)}
                className="btn btn-block btn-primary"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
