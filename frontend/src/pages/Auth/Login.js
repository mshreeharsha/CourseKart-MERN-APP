import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/auth";

import "../../styles/Register.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", {
        email,
        password
      })
      if (res.data.success) {
        toast.success(res.data.message,{
          duration:3000
        })
        setAuth({
          ...auth,
          user: res.data.user,
            token: res.data.token,
          });
        localStorage.setItem("auth", JSON.stringify(res.data));

        //Navigate back to the page from where the user was redirected to login
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
         

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;